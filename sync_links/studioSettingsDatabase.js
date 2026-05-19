import { supabase, isSupabaseConfigured } from './supabase';
import { FILE_BUCKET, WORKSPACE_ID, publicFileUrl } from './fileStorage';

function cleanText(value) {
  return value == null ? '' : String(value).trim();
}

function safeSegment(value, fallback = 'asset') {
  return cleanText(value || fallback)
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || fallback;
}

function jsonObject(value, fallback) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : fallback;
}

function jsonArray(value, fallback) {
  return Array.isArray(value) ? value : fallback;
}

function settingsToRow(settings = {}) {
  const studioId = cleanText(settings.studioId || settings.studio_id || WORKSPACE_ID) || WORKSPACE_ID;
  return {
    id: cleanText(settings.settingsId || settings.id || `studio-settings:${studioId}`),
    studio_id: studioId,
    studio_name: cleanText(settings.studioName),
    tagline: cleanText(settings.tagline),
    logo_url: cleanText(settings.logoUrl),
    favicon_url: cleanText(settings.faviconUrl || settings.logoUrl),
    logo_initials: cleanText(settings.logoInitials),
    logo_accent: cleanText(settings.logoAccent),
    default_city_id: cleanText(settings.defaultCityId),
    default_city: cleanText(settings.defaultCity),
    default_state_ut: cleanText(settings.defaultStateUt || settings.defaultState),
    website_url: cleanText(settings.websiteUrl),
    founded_year: cleanText(settings.foundedYear),
    gstin: cleanText(settings.gstin),
    pan: cleanText(settings.pan),
    cin_number: cleanText(settings.cinNumber),
    billing_email: cleanText(settings.billingEmail),
    registered_address: cleanText(settings.registeredAddress),
    default_service_type: cleanText(settings.defaultServiceType),
    default_workflow_template: cleanText(settings.defaultWorkflowTemplate),
    default_payment_template: cleanText(settings.defaultPaymentTemplate),
    default_project_id_prefix: cleanText(settings.defaultProjectIdPrefix || 'STD') || 'STD',
    amount_display_unit: cleanText(settings.amountDisplayUnit || 'lakhs') || 'lakhs',
    default_reminder_channel: cleanText(settings.defaultReminderChannel || 'WhatsApp') || 'WhatsApp',
    business_hours_start: cleanText(settings.businessHoursStart || '10:00') || '10:00',
    business_hours_end: cleanText(settings.businessHoursEnd || '19:00') || '19:00',
    working_days: jsonArray(settings.workingDays, ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']),
    cover_images: jsonObject(settings.coverImages, {}),
    cover_image_frames: jsonObject(settings.coverImageFrames, {}),
    cover_card_order: jsonArray(settings.coverCardOrder, []),
    dashboard_pulse_order: jsonArray(settings.dashboardPulseOrder, []),
    updated_by_name: cleanText(settings.lastUpdatedBy),
    raw: settings,
  };
}

function rowToSettings(row = {}) {
  const raw = row.raw && typeof row.raw === 'object' ? row.raw : {};
  return {
    ...raw,
    id: raw.id || 1,
    settingsId: cleanText(row.id),
    studioId: cleanText(row.studio_id),
    studioName: cleanText(row.studio_name),
    tagline: cleanText(row.tagline),
    logoUrl: cleanText(row.logo_url),
    faviconUrl: cleanText(row.favicon_url),
    logoInitials: cleanText(row.logo_initials),
    logoAccent: cleanText(row.logo_accent),
    defaultCityId: cleanText(row.default_city_id),
    defaultCity: cleanText(row.default_city),
    defaultStateUt: cleanText(row.default_state_ut),
    defaultState: cleanText(row.default_state_ut),
    websiteUrl: cleanText(row.website_url),
    foundedYear: cleanText(row.founded_year),
    gstin: cleanText(row.gstin),
    pan: cleanText(row.pan),
    cinNumber: cleanText(row.cin_number),
    billingEmail: cleanText(row.billing_email),
    registeredAddress: cleanText(row.registered_address),
    defaultServiceType: cleanText(row.default_service_type),
    defaultWorkflowTemplate: cleanText(row.default_workflow_template),
    defaultPaymentTemplate: cleanText(row.default_payment_template),
    defaultProjectIdPrefix: cleanText(row.default_project_id_prefix || 'STD') || 'STD',
    amountDisplayUnit: cleanText(row.amount_display_unit || 'lakhs') || 'lakhs',
    defaultReminderChannel: cleanText(row.default_reminder_channel || 'WhatsApp') || 'WhatsApp',
    businessHoursStart: cleanText(row.business_hours_start || '10:00') || '10:00',
    businessHoursEnd: cleanText(row.business_hours_end || '19:00') || '19:00',
    workingDays: jsonArray(row.working_days, raw.workingDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']),
    coverImages: jsonObject(row.cover_images, raw.coverImages || {}),
    coverImageFrames: jsonObject(row.cover_image_frames, raw.coverImageFrames || {}),
    coverCardOrder: jsonArray(row.cover_card_order, raw.coverCardOrder || []),
    dashboardPulseOrder: jsonArray(row.dashboard_pulse_order, raw.dashboardPulseOrder || []),
    lastUpdatedOn: row.updated_at ? String(row.updated_at).slice(0, 10) : raw.lastUpdatedOn,
    lastUpdatedBy: cleanText(row.updated_by_name || raw.lastUpdatedBy),
    _fromSupabase: true,
  };
}

function isMissingTableError(error) {
  const text = cleanText(error?.message || error?.details || error?.hint);
  return /studio_settings|studio_brand_assets|does not exist|schema cache|column .* does not exist/i.test(text);
}

export async function loadStudioSettings() {
  if (!isSupabaseConfigured || !supabase) return { ok: false, mode: 'not_configured' };
  const { data, error } = await supabase
    .from('studio_settings')
    .select('*')
    .eq('studio_id', WORKSPACE_ID)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    if (isMissingTableError(error)) return { ok: false, mode: 'needs_sql', message: error.message };
    throw error;
  }
  if (!data) return { ok: false, mode: 'empty' };
  return { ok: true, mode: 'supabase', settings: rowToSettings(data) };
}

export async function syncStudioSettings(settings = {}) {
  if (!isSupabaseConfigured || !supabase) return { ok: false, mode: 'not_configured' };
  const row = settingsToRow(settings);
  const { error } = await supabase.from('studio_settings').upsert(row, { onConflict: 'id' });
  if (error) {
    if (isMissingTableError(error)) return { ok: false, mode: 'needs_sql', message: error.message };
    throw error;
  }
  return { ok: true, mode: 'supabase', syncedAt: new Date().toISOString() };
}

export async function uploadStudioBrandAsset(file, { assetType = 'logo', uploadedBy = '' } = {}) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured for brand asset uploads.');
  }
  if (!file) throw new Error('No file selected.');
  if (!file.type.startsWith('image/')) throw new Error('Please upload an image file.');

  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const unique = Math.random().toString(36).slice(2, 8);
  const path = [
    safeSegment(WORKSPACE_ID),
    'studio-brand-assets',
    safeSegment(assetType),
    `${stamp}-${unique}-${safeSegment(file.name || assetType)}`,
  ].join('/');

  const { error: uploadError } = await supabase.storage.from(FILE_BUCKET).upload(path, file, {
    cacheControl: '3600',
    contentType: file.type || 'application/octet-stream',
    upsert: false,
  });
  if (uploadError) throw new Error(uploadError.message || 'Could not upload brand asset.');

  const publicUrl = publicFileUrl(FILE_BUCKET, path);
  const assetRow = {
    studio_id: WORKSPACE_ID,
    asset_type: assetType,
    file_name: file.name || assetType,
    file_url: publicUrl,
    storage_bucket: FILE_BUCKET,
    storage_path: path,
    mime_type: file.type || '',
    size_bytes: file.size || 0,
    uploaded_by_name: uploadedBy,
    is_active: true,
  };

  const { data, error } = await supabase
    .from('studio_brand_assets')
    .insert(assetRow)
    .select('*')
    .single();
  if (error) {
    if (isMissingTableError(error)) return { publicUrl, storageBucket: FILE_BUCKET, storagePath: path, databaseWarning: error.message };
    throw error;
  }
  return { publicUrl, storageBucket: FILE_BUCKET, storagePath: path, asset: data };
}
