import { supabase, isSupabaseConfigured } from './supabase';

const LINKS_KEY = 'studio-os-proposal-share-links-v1';
const SESSIONS_KEY = 'studio-os-proposal-view-sessions-v1';
const VISITOR_KEY = 'studio-os-proposal-visitor-id';

function safeJson(value, fallback) {
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function readLocal(key, fallback = []) {
  if (typeof window === 'undefined') return fallback;
  return safeJson(window.localStorage.getItem(key), fallback);
}

function writeLocal(key, value) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function generateProposalToken() {
  const bytes = new Uint8Array(18);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (byte) => byte.toString(36).padStart(2, '0')).join('').slice(0, 30);
  }
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 20)}`;
}

export function proposalPublicUrl(token) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}/#/public/proposal/${token}`;
}

export function parseProposalPublicRoute() {
  if (typeof window === 'undefined') return null;
  const hashMatch = window.location.hash.match(/^#\/public\/proposal\/([^/?#]+)/i);
  if (hashMatch) return { documentType: 'proposal', token: hashMatch[1] };
  const pathMatch = window.location.pathname.match(/^\/public\/proposal\/([^/?#]+)/i);
  if (pathMatch) return { documentType: 'proposal', token: pathMatch[1] };
  return null;
}

function getVisitorId() {
  if (typeof window === 'undefined') return 'server';
  let id = window.localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = `visitor-${generateProposalToken()}`;
    window.localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

function getDeviceInfo() {
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
  const width = typeof window !== 'undefined' ? window.innerWidth : 1280;
  const deviceType = /Mobi|Android|iPhone/i.test(userAgent) || width < 768
    ? 'mobile'
    : (/iPad|Tablet/i.test(userAgent) || width < 1100 ? 'tablet' : 'desktop');
  const browser = /Edg/i.test(userAgent) ? 'Edge'
    : /Chrome/i.test(userAgent) ? 'Chrome'
      : /Safari/i.test(userAgent) ? 'Safari'
        : /Firefox/i.test(userAgent) ? 'Firefox'
          : 'Browser';
  return { userAgent, deviceType, browser };
}

function normalizeLink(row) {
  if (!row) return null;
  return {
    id: row.id,
    proposalId: row.proposal_id || row.proposalId,
    token: row.token,
    publicUrl: row.public_url || row.publicUrl,
    totalViews: row.total_views ?? row.totalViews ?? 0,
    uniqueViews: row.unique_views ?? row.uniqueViews ?? 0,
    totalViewDurationSeconds: row.total_view_duration_seconds ?? row.totalViewDurationSeconds ?? 0,
    lastViewedAt: row.last_viewed_at || row.lastViewedAt || '',
    currentlyViewingCount: row.currently_viewing_count ?? row.currentlyViewingCount ?? 0,
    createdBy: row.created_by || row.createdBy || '',
    expiresAt: row.expires_at || row.expiresAt || '',
    isActive: row.is_active ?? row.isActive ?? true,
    allowDownload: row.allow_download ?? row.allowDownload ?? true,
    documentPayload: row.document_payload || row.documentPayload || {},
    createdAt: row.created_at || row.createdAt || '',
    updatedAt: row.updated_at || row.updatedAt || '',
  };
}

function toDbLink(link) {
  return {
    proposal_id: String(link.proposalId),
    token: link.token,
    public_url: link.publicUrl,
    total_views: link.totalViews || 0,
    unique_views: link.uniqueViews || 0,
    total_view_duration_seconds: link.totalViewDurationSeconds || 0,
    last_viewed_at: link.lastViewedAt || null,
    currently_viewing_count: link.currentlyViewingCount || 0,
    created_by: link.createdBy || null,
    expires_at: link.expiresAt || null,
    is_active: link.isActive !== false,
    allow_download: link.allowDownload !== false,
    document_payload: link.documentPayload || {},
  };
}

function normalizeSession(row) {
  if (!row) return null;
  return {
    id: row.id,
    shareLinkId: row.share_link_id || row.shareLinkId,
    proposalId: row.proposal_id || row.proposalId,
    visitorId: row.visitor_id || row.visitorId,
    sessionId: row.session_id || row.sessionId,
    ipAddress: row.ip_address || row.ipAddress || '',
    browser: row.browser || '',
    userAgent: row.user_agent || row.userAgent || '',
    deviceType: row.device_type || row.deviceType || '',
    openedAt: row.opened_at || row.openedAt || '',
    lastActivityAt: row.last_activity_at || row.lastActivityAt || '',
    closedAt: row.closed_at || row.closedAt || '',
    durationSeconds: row.duration_seconds ?? row.durationSeconds ?? 0,
    isCurrentlyViewing: row.is_currently_viewing ?? row.isCurrentlyViewing ?? false,
  };
}

export async function createProposalShareLink({ proposalId, documentPayload, createdBy = 'Studio', allowDownload = true, expiresAt = '' }) {
  const token = generateProposalToken();
  const now = new Date().toISOString();
  const link = {
    id: `proposal-share-${token}`,
    proposalId: String(proposalId),
    token,
    publicUrl: proposalPublicUrl(token),
    totalViews: 0,
    uniqueViews: 0,
    totalViewDurationSeconds: 0,
    lastViewedAt: '',
    currentlyViewingCount: 0,
    createdBy,
    expiresAt,
    isActive: true,
    allowDownload,
    documentPayload,
    createdAt: now,
    updatedAt: now,
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('proposal_share_links')
      .insert(toDbLink(link))
      .select('*')
      .single();
    if (!error && data) return normalizeLink(data);
    console.warn('[proposal_share_links] insert failed; using local fallback', error);
  }

  writeLocal(LINKS_KEY, [link, ...readLocal(LINKS_KEY)]);
  return link;
}

export async function listProposalShareLinks() {
  await reconcileProposalViewActivity();
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('proposal_share_links')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) return data.map(normalizeLink);
    console.warn('[proposal_share_links] list failed; using local fallback', error);
  }
  return readLocal(LINKS_KEY).map(normalizeLink).filter(Boolean);
}

export async function listProposalShareLinksForProposal(proposalId) {
  const links = await listProposalShareLinks();
  return links.filter((link) => String(link.proposalId) === String(proposalId));
}

export async function getProposalShareLinkByToken(token) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('proposal_share_links')
      .select('*')
      .eq('token', token)
      .maybeSingle();
    if (!error && data) return normalizeLink(data);
    if (error) console.warn('[proposal_share_links] token lookup failed; using local fallback', error);
  }
  return readLocal(LINKS_KEY).map(normalizeLink).find((link) => link.token === token) || null;
}

export async function updateProposalShareLink(id, patch) {
  if (isSupabaseConfigured && supabase) {
    const dbPatch = toDbLink({ ...patch, proposalId: patch.proposalId || '' });
    const { data, error } = await supabase
      .from('proposal_share_links')
      .update(dbPatch)
      .eq('id', id)
      .select('*')
      .maybeSingle();
    if (!error && data) return normalizeLink(data);
    console.warn('[proposal_share_links] update failed; using local fallback', error);
  }
  const links = readLocal(LINKS_KEY);
  const next = links.map((row) => row.id === id ? { ...row, ...patch, updatedAt: new Date().toISOString() } : row);
  writeLocal(LINKS_KEY, next);
  return normalizeLink(next.find((row) => row.id === id));
}

export async function listProposalViewSessions(shareLinkId = '') {
  await reconcileProposalViewActivity();
  if (isSupabaseConfigured && supabase) {
    let query = supabase.from('proposal_view_sessions').select('*').order('opened_at', { ascending: false });
    if (shareLinkId) query = query.eq('share_link_id', shareLinkId);
    const { data, error } = await query;
    if (!error && data) return data.map(normalizeSession);
    console.warn('[proposal_view_sessions] list failed; using local fallback', error);
  }
  const sessions = readLocal(SESSIONS_KEY).map(normalizeSession).filter(Boolean);
  return shareLinkId ? sessions.filter((session) => session.shareLinkId === shareLinkId) : sessions;
}

async function reconcileProposalViewActivity() {
  const staleBefore = Date.now() - 60000;
  if (isSupabaseConfigured && supabase) {
    const { data: current } = await supabase
      .from('proposal_view_sessions')
      .select('*')
      .eq('is_currently_viewing', true);
    const active = current || [];
    const stale = active.filter((row) => new Date(row.last_activity_at || row.opened_at || 0).getTime() < staleBefore);
    await Promise.all(stale.map((row) => {
      const opened = new Date(row.opened_at || Date.now()).getTime();
      const last = new Date(row.last_activity_at || Date.now()).getTime();
      const duration = Math.max(0, Math.round((last - opened) / 1000));
      return supabase
        .from('proposal_view_sessions')
        .update({
          closed_at: row.last_activity_at || new Date().toISOString(),
          duration_seconds: duration,
          is_currently_viewing: false,
        })
        .eq('id', row.id);
    }));
    const linkIds = [...new Set(active.map((row) => row.share_link_id).filter(Boolean))];
    await Promise.all(linkIds.map(async (linkId) => {
      const count = active.filter((row) => row.share_link_id === linkId && !stale.some((staleRow) => staleRow.id === row.id)).length;
      const addDuration = stale
        .filter((row) => row.share_link_id === linkId)
        .reduce((sum, row) => {
          const opened = new Date(row.opened_at || Date.now()).getTime();
          const last = new Date(row.last_activity_at || Date.now()).getTime();
          return sum + Math.max(0, Math.round((last - opened) / 1000));
        }, 0);
      const { data: link } = await supabase
        .from('proposal_share_links')
        .select('total_view_duration_seconds')
        .eq('id', linkId)
        .maybeSingle();
      return supabase
        .from('proposal_share_links')
        .update({
          currently_viewing_count: count,
          total_view_duration_seconds: (link?.total_view_duration_seconds || 0) + addDuration,
        })
        .eq('id', linkId);
    }));
    return;
  }

  const sessions = readLocal(SESSIONS_KEY).map(normalizeSession).filter(Boolean);
  const links = readLocal(LINKS_KEY).map(normalizeLink).filter(Boolean);
  const stale = sessions.filter((session) => (
    session.isCurrentlyViewing
    && new Date(session.lastActivityAt || session.openedAt || 0).getTime() < staleBefore
  ));
  if (stale.length === 0) return;
  const staleIds = new Set(stale.map((session) => session.id));
  const nextSessions = sessions.map((session) => {
    if (!staleIds.has(session.id)) return session;
    const opened = new Date(session.openedAt || Date.now()).getTime();
    const last = new Date(session.lastActivityAt || Date.now()).getTime();
    return {
      ...session,
      closedAt: session.lastActivityAt || new Date().toISOString(),
      durationSeconds: Math.max(0, Math.round((last - opened) / 1000)),
      isCurrentlyViewing: false,
    };
  });
  const nextLinks = links.map((link) => {
    const linkSessions = nextSessions.filter((session) => session.shareLinkId === link.id);
    const addDuration = stale
      .filter((session) => session.shareLinkId === link.id)
      .reduce((sum, session) => {
        const opened = new Date(session.openedAt || Date.now()).getTime();
        const last = new Date(session.lastActivityAt || Date.now()).getTime();
        return sum + Math.max(0, Math.round((last - opened) / 1000));
      }, 0);
    return {
      ...link,
      currentlyViewingCount: linkSessions.filter((session) => session.isCurrentlyViewing).length,
      totalViewDurationSeconds: (link.totalViewDurationSeconds || 0) + addDuration,
    };
  });
  writeLocal(SESSIONS_KEY, nextSessions);
  writeLocal(LINKS_KEY, nextLinks);
}

export async function startProposalViewSession(link) {
  const now = new Date().toISOString();
  const visitorId = getVisitorId();
  const sessionId = `session-${generateProposalToken()}`;
  const device = getDeviceInfo();
  const session = {
    id: `proposal-view-${generateProposalToken()}`,
    shareLinkId: link.id,
    proposalId: link.proposalId,
    visitorId,
    sessionId,
    ipAddress: '',
    browser: device.browser,
    userAgent: device.userAgent,
    deviceType: device.deviceType,
    openedAt: now,
    lastActivityAt: now,
    closedAt: '',
    durationSeconds: 0,
    isCurrentlyViewing: true,
  };

  let isUnique = true;
  if (isSupabaseConfigured && supabase) {
    const { data: existing } = await supabase
      .from('proposal_view_sessions')
      .select('id')
      .eq('share_link_id', link.id)
      .eq('visitor_id', visitorId)
      .limit(1);
    isUnique = !existing || existing.length === 0;

    const { data, error } = await supabase
      .from('proposal_view_sessions')
      .insert({
        share_link_id: link.id,
        proposal_id: link.proposalId,
        visitor_id: visitorId,
        session_id: sessionId,
        ip_address: '',
        browser: device.browser,
        user_agent: device.userAgent,
        device_type: device.deviceType,
        opened_at: now,
        last_activity_at: now,
        is_currently_viewing: true,
      })
      .select('*')
      .single();
    if (!error && data) {
      const updated = {
        ...link,
        totalViews: (link.totalViews || 0) + 1,
        uniqueViews: (link.uniqueViews || 0) + (isUnique ? 1 : 0),
        lastViewedAt: now,
        currentlyViewingCount: (link.currentlyViewingCount || 0) + 1,
      };
      await supabase
        .from('proposal_share_links')
        .update({
          total_views: updated.totalViews,
          unique_views: updated.uniqueViews,
          last_viewed_at: updated.lastViewedAt,
          currently_viewing_count: updated.currentlyViewingCount,
        })
        .eq('id', link.id);
      return { session: normalizeSession(data), link: updated };
    }
  }

  const sessions = readLocal(SESSIONS_KEY);
  isUnique = !sessions.some((row) => row.shareLinkId === link.id && row.visitorId === visitorId);
  writeLocal(SESSIONS_KEY, [session, ...sessions]);
  const updated = {
    ...link,
    totalViews: (link.totalViews || 0) + 1,
    uniqueViews: (link.uniqueViews || 0) + (isUnique ? 1 : 0),
    lastViewedAt: now,
    currentlyViewingCount: (link.currentlyViewingCount || 0) + 1,
    updatedAt: now,
  };
  writeLocal(LINKS_KEY, readLocal(LINKS_KEY).map((row) => row.id === link.id ? updated : row));
  return { session, link: updated };
}

export async function heartbeatProposalViewSession(session) {
  if (!session?.id) return;
  const now = new Date().toISOString();
  if (isSupabaseConfigured && supabase) {
    await supabase
      .from('proposal_view_sessions')
      .update({ last_activity_at: now, is_currently_viewing: true })
      .eq('id', session.id);
    return;
  }
  writeLocal(SESSIONS_KEY, readLocal(SESSIONS_KEY).map((row) => row.id === session.id ? {
    ...row,
    lastActivityAt: now,
    isCurrentlyViewing: true,
  } : row));
}

export async function closeProposalViewSession(session, link) {
  if (!session?.id) return;
  const now = new Date().toISOString();
  const duration = Math.max(0, Math.round((new Date(now) - new Date(session.openedAt)) / 1000));
  if (isSupabaseConfigured && supabase) {
    await supabase
      .from('proposal_view_sessions')
      .update({
        closed_at: now,
        last_activity_at: now,
        duration_seconds: duration,
        is_currently_viewing: false,
      })
      .eq('id', session.id);
    if (link?.id) {
      await supabase
        .from('proposal_share_links')
        .update({
          currently_viewing_count: Math.max(0, (link.currentlyViewingCount || 1) - 1),
          total_view_duration_seconds: (link.totalViewDurationSeconds || 0) + duration,
        })
        .eq('id', link.id);
    }
    return;
  }
  writeLocal(SESSIONS_KEY, readLocal(SESSIONS_KEY).map((row) => row.id === session.id ? {
    ...row,
    closedAt: now,
    lastActivityAt: now,
    durationSeconds: duration,
    isCurrentlyViewing: false,
  } : row));
  writeLocal(LINKS_KEY, readLocal(LINKS_KEY).map((row) => row.id === link?.id ? {
    ...row,
    currentlyViewingCount: Math.max(0, (row.currentlyViewingCount || 1) - 1),
    totalViewDurationSeconds: (row.totalViewDurationSeconds || 0) + duration,
    updatedAt: now,
  } : row));
}
