import { supabase, isSupabaseConfigured } from './supabase';

const SHARE_LINKS_KEY = 'studio-os-share-links-v1';
const VIEW_EVENTS_KEY = 'studio-os-document-view-events-v1';
const VISITOR_KEY = 'studio-os-public-visitor-id';

const safeJson = (value, fallback) => {
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

const readLocal = (key, fallback = []) => {
  if (typeof window === 'undefined') return fallback;
  return safeJson(window.localStorage.getItem(key), fallback);
};

const writeLocal = (key, value) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export function generatePublicToken() {
  const bytes = new Uint8Array(18);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (byte) => byte.toString(36).padStart(2, '0')).join('').slice(0, 28);
  }
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 18)}`;
}

export function publicDocumentUrl(documentType, token) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}/#/public/${documentType}/${token}`;
}

export function parsePublicDocumentRoute() {
  if (typeof window === 'undefined') return null;
  const hashMatch = window.location.hash.match(/^#\/public\/([^/]+)\/([^/?#]+)/i);
  if (hashMatch) return { documentType: hashMatch[1], token: hashMatch[2] };
  const pathMatch = window.location.pathname.match(/^\/public\/([^/]+)\/([^/?#]+)/i);
  if (pathMatch) return { documentType: pathMatch[1], token: pathMatch[2] };
  return null;
}

export function getVisitorId() {
  if (typeof window === 'undefined') return 'server';
  let id = window.localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = `visitor-${generatePublicToken()}`;
    window.localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

export function getDeviceInfo() {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
  const width = typeof window !== 'undefined' ? window.innerWidth : 1280;
  const deviceType = /Mobi|Android|iPhone/i.test(ua) || width < 768
    ? 'mobile'
    : (/iPad|Tablet/i.test(ua) || width < 1100 ? 'tablet' : 'desktop');
  const browser = /Edg/i.test(ua) ? 'Edge'
    : /Chrome/i.test(ua) ? 'Chrome'
      : /Safari/i.test(ua) ? 'Safari'
        : /Firefox/i.test(ua) ? 'Firefox'
          : 'Browser';
  return { userAgent: ua, deviceType, browser };
}

function normalizeLink(row) {
  if (!row) return null;
  return {
    id: row.id,
    documentType: row.document_type || row.documentType,
    documentId: row.document_id || row.documentId,
    token: row.token,
    publicUrl: row.public_url || row.publicUrl,
    createdBy: row.created_by || row.createdBy,
    isActive: row.is_active ?? row.isActive ?? true,
    allowDownload: row.allow_download ?? row.allowDownload ?? true,
    expiresAt: row.expires_at || row.expiresAt || '',
    totalViews: row.total_views ?? row.totalViews ?? 0,
    uniqueViews: row.unique_views ?? row.uniqueViews ?? 0,
    lastViewedAt: row.last_viewed_at || row.lastViewedAt || '',
    currentlyViewingCount: row.currently_viewing_count ?? row.currentlyViewingCount ?? 0,
    documentPayload: row.document_payload || row.documentPayload || null,
    createdAt: row.created_at || row.createdAt,
    updatedAt: row.updated_at || row.updatedAt,
  };
}

function toDbLink(row) {
  return {
    id: row.id,
    document_type: row.documentType,
    document_id: row.documentId,
    token: row.token,
    public_url: row.publicUrl,
    created_by: row.createdBy,
    is_active: row.isActive,
    allow_download: row.allowDownload,
    expires_at: row.expiresAt || null,
    total_views: row.totalViews || 0,
    unique_views: row.uniqueViews || 0,
    last_viewed_at: row.lastViewedAt || null,
    currently_viewing_count: row.currentlyViewingCount || 0,
    document_payload: row.documentPayload || null,
    updated_at: new Date().toISOString(),
  };
}

export async function createShareLink({ documentType, documentId, documentPayload, createdBy = 'Studio', allowDownload = true }) {
  const token = generatePublicToken();
  const now = new Date().toISOString();
  const link = {
    id: `share-${token}`,
    documentType,
    documentId,
    token,
    publicUrl: publicDocumentUrl(documentType, token),
    createdBy,
    isActive: true,
    allowDownload,
    expiresAt: '',
    totalViews: 0,
    uniqueViews: 0,
    lastViewedAt: '',
    currentlyViewingCount: 0,
    documentPayload,
    createdAt: now,
    updatedAt: now,
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('share_links').insert(toDbLink(link)).select('*').single();
    if (!error && data) return normalizeLink(data);
    console.warn('[share_links] Supabase insert failed; using local fallback', error);
  }

  const links = readLocal(SHARE_LINKS_KEY);
  writeLocal(SHARE_LINKS_KEY, [link, ...links]);
  return link;
}

export async function listShareLinks() {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('share_links').select('*').order('created_at', { ascending: false });
    if (!error && data) return data.map(normalizeLink);
    console.warn('[share_links] Supabase list failed; using local fallback', error);
  }
  return readLocal(SHARE_LINKS_KEY).map(normalizeLink).filter(Boolean);
}

export async function listShareLinksForDocument(documentType, documentId) {
  const links = await listShareLinks();
  return links.filter((link) => link.documentType === documentType && String(link.documentId) === String(documentId));
}

export async function getShareLinkByToken(token) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('share_links').select('*').eq('token', token).maybeSingle();
    if (!error && data) return normalizeLink(data);
    if (error) console.warn('[share_links] Supabase token lookup failed; using local fallback', error);
  }
  return readLocal(SHARE_LINKS_KEY).map(normalizeLink).find((link) => link.token === token) || null;
}

export async function updateShareLink(id, patch) {
  const normalizedPatch = {
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('share_links').update(toDbLink({ id, ...normalizedPatch })).eq('id', id).select('*').maybeSingle();
    if (!error && data) return normalizeLink(data);
    console.warn('[share_links] Supabase update failed; using local fallback', error);
  }
  const links = readLocal(SHARE_LINKS_KEY);
  const next = links.map((link) => link.id === id ? { ...link, ...normalizedPatch } : link);
  writeLocal(SHARE_LINKS_KEY, next);
  return normalizeLink(next.find((link) => link.id === id));
}

export async function recordViewOpen(link) {
  const now = new Date().toISOString();
  const visitorId = getVisitorId();
  const sessionId = `session-${generatePublicToken()}`;
  const device = getDeviceInfo();
  const event = {
    id: `view-${generatePublicToken()}`,
    shareLinkId: link.id,
    documentType: link.documentType,
    documentId: link.documentId,
    visitorId,
    sessionId,
    ipAddress: '',
    userAgent: device.userAgent,
    deviceType: device.deviceType,
    browser: device.browser,
    openedAt: now,
    lastActivityAt: now,
    closedAt: '',
    viewDurationSeconds: 0,
    isCurrentlyViewing: true,
  };

  let isUnique = true;
  if (isSupabaseConfigured && supabase) {
    const { data: existing } = await supabase
      .from('document_view_events')
      .select('id')
      .eq('share_link_id', link.id)
      .eq('visitor_id', visitorId)
      .limit(1);
    isUnique = !existing || existing.length === 0;
    const { error } = await supabase.from('document_view_events').insert({
      id: event.id,
      share_link_id: event.shareLinkId,
      document_type: event.documentType,
      document_id: event.documentId,
      visitor_id: event.visitorId,
      session_id: event.sessionId,
      ip_address: event.ipAddress,
      user_agent: event.userAgent,
      device_type: event.deviceType,
      browser: event.browser,
      opened_at: event.openedAt,
      last_activity_at: event.lastActivityAt,
      is_currently_viewing: true,
    });
    if (!error) {
      const updated = {
        ...link,
        totalViews: (link.totalViews || 0) + 1,
        uniqueViews: (link.uniqueViews || 0) + (isUnique ? 1 : 0),
        lastViewedAt: now,
        currentlyViewingCount: (link.currentlyViewingCount || 0) + 1,
      };
      await supabase.from('share_links').update(toDbLink(updated)).eq('id', link.id);
      return { event, link: updated };
    }
  }

  const events = readLocal(VIEW_EVENTS_KEY);
  isUnique = !events.some((e) => e.shareLinkId === link.id && e.visitorId === visitorId);
  writeLocal(VIEW_EVENTS_KEY, [event, ...events]);
  const links = readLocal(SHARE_LINKS_KEY);
  const updated = {
    ...link,
    totalViews: (link.totalViews || 0) + 1,
    uniqueViews: (link.uniqueViews || 0) + (isUnique ? 1 : 0),
    lastViewedAt: now,
    currentlyViewingCount: (link.currentlyViewingCount || 0) + 1,
    updatedAt: now,
  };
  writeLocal(SHARE_LINKS_KEY, links.map((row) => row.id === link.id ? updated : row));
  return { event, link: updated };
}

export async function recordViewHeartbeat(event) {
  if (!event?.id) return;
  const now = new Date().toISOString();
  if (isSupabaseConfigured && supabase) {
    await supabase.from('document_view_events').update({ last_activity_at: now, is_currently_viewing: true }).eq('id', event.id);
    return;
  }
  const events = readLocal(VIEW_EVENTS_KEY);
  writeLocal(VIEW_EVENTS_KEY, events.map((row) => row.id === event.id ? { ...row, lastActivityAt: now, isCurrentlyViewing: true } : row));
}

export async function recordViewClose(event, link) {
  if (!event?.id) return;
  const now = new Date().toISOString();
  const duration = Math.max(0, Math.round((new Date(now) - new Date(event.openedAt)) / 1000));
  if (isSupabaseConfigured && supabase) {
    await supabase.from('document_view_events').update({
      closed_at: now,
      last_activity_at: now,
      view_duration_seconds: duration,
      is_currently_viewing: false,
    }).eq('id', event.id);
    if (link?.id) {
      await supabase.from('share_links').update({
        currently_viewing_count: Math.max(0, (link.currentlyViewingCount || 1) - 1),
        updated_at: now,
      }).eq('id', link.id);
    }
    return;
  }
  const events = readLocal(VIEW_EVENTS_KEY);
  writeLocal(VIEW_EVENTS_KEY, events.map((row) => row.id === event.id ? {
    ...row,
    closedAt: now,
    lastActivityAt: now,
    viewDurationSeconds: duration,
    isCurrentlyViewing: false,
  } : row));
  const links = readLocal(SHARE_LINKS_KEY);
  writeLocal(SHARE_LINKS_KEY, links.map((row) => row.id === link?.id ? {
    ...row,
    currentlyViewingCount: Math.max(0, (row.currentlyViewingCount || 1) - 1),
    updatedAt: now,
  } : row));
}

