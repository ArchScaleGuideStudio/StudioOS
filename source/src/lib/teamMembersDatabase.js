import { supabase, isSupabaseConfigured } from './supabase';
import { WORKSPACE_ID } from './fileStorage';

function cleanText(value) {
  return value == null ? '' : String(value).trim();
}

function keyPart(value, fallback = 'team') {
  return cleanText(value || fallback)
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || fallback;
}

function teamRowId(member = {}) {
  const id = cleanText(member.id || member.teamMemberId || keyPart(member.value || member.name));
  return id.startsWith('team:') ? id : `team:${id}`;
}

function roleCodeFromTeamMember(member = {}) {
  const explicit = cleanText(member.roleCode || member.role_code);
  if (explicit) return explicit;
  const tier = cleanText(member.tier).toLowerCase();
  const dept = cleanText(member.dept || member.department || member.function).toLowerCase();
  const role = cleanText(member.role || member.roleTitle).toLowerCase();
  if (tier === 'admin' && /founder|principal|owner/.test(role)) return 'studio_owner';
  if (tier === 'admin') return 'admin';
  if (tier === 'manager' && /account|finance/.test(`${role} ${dept}`)) return 'accountant';
  if (tier === 'manager' && /site/.test(`${role} ${dept}`)) return 'site_manager';
  if (tier === 'manager') return 'pm_admin';
  if (/designer|draft|design/.test(`${role} ${dept}`)) return 'designer';
  if (/site|supervisor/.test(`${role} ${dept}`)) return 'site_manager';
  return 'team_member';
}

function managerIdFrom(member = {}, members = []) {
  const explicit = cleanText(member.managerId || member.manager_id);
  if (explicit) return explicit.startsWith('team:') ? explicit : `team:${explicit}`;
  const raw = cleanText(member.reportsTo);
  if (!raw) return null;
  const match = members.find((candidate) => {
    const values = [
      candidate.id,
      `team:${candidate.id}`,
      candidate.initials,
      candidate.value,
      candidate.name,
      candidate.email,
    ].map(cleanText);
    return values.some((value) => value && value === raw);
  });
  return match ? teamRowId(match) : null;
}

function teamMemberToRow(member = {}, members = [], actorName = '') {
  const rowId = teamRowId(member);
  const managerId = managerIdFrom(member, members);
  return {
    id: rowId,
    workspace_id: WORKSPACE_ID,
    studio_id: cleanText(member.studioId || member.studio_id || WORKSPACE_ID) || WORKSPACE_ID,
    auth_user_id: cleanText(member.authUserId || member.auth_user_id) || null,
    role_code: roleCodeFromTeamMember(member),
    invite_status: cleanText(member.inviteStatus || member.invite_status || 'not_invited') || 'not_invited',
    last_login_at: cleanText(member.lastLoginAt || member.last_login_at) || null,
    display_name: cleanText(member.value || member.name),
    initials: cleanText(member.initials),
    role_title: cleanText(member.role || member.roleTitle),
    department: cleanText(member.dept || member.department || member.function),
    email: cleanText(member.email),
    mobile: cleanText(member.mobile || member.phone),
    status: cleanText(member.status || 'Active') || 'Active',
    manager_id: managerId,
    accent: cleanText(member.accent),
    created_by_name: cleanText(member.createdBy || actorName),
    updated_by_name: cleanText(actorName || member.updatedBy),
    deleted_at: cleanText(member.deletedAt || member.deleted_at) || null,
    is_archived: Boolean(member.isArchived || member.is_archived),
    source_ref: `MasterTeamMembers:${member.id ?? ''}`,
    raw: { ...member, managerId: managerId ? managerId.replace(/^team:/, '') : '' },
  };
}

async function upsertWithFallback(row) {
  const { error } = await supabase.from('studio_team_members').upsert(row, { onConflict: 'id' });
  if (!error) return { ok: true, mode: 'supabase' };
  const message = cleanText(error.message || error.details || error.hint);
  if (!/studio_id|auth_user_id|role_code|invite_status|last_login_at|created_by|updated_by|deleted_at|is_archived|manager_id/i.test(message)) {
    throw error;
  }
  const {
    studio_id,
    auth_user_id,
    role_code,
    invite_status,
    last_login_at,
    created_by,
    updated_by,
    created_by_name,
    updated_by_name,
    deleted_at,
    is_archived,
    ...legacyRow
  } = row;
  const retry = await supabase.from('studio_team_members').upsert(legacyRow, { onConflict: 'id' });
  if (retry.error) throw retry.error;
  return { ok: true, mode: 'legacy_team_columns' };
}

export async function upsertTeamMember(member, members = [], actorName = '') {
  if (!isSupabaseConfigured || !supabase) return { ok: false, mode: 'not_configured' };
  const row = teamMemberToRow(member, members, actorName);
  if (!row.display_name) return { ok: false, mode: 'missing_name' };
  return upsertWithFallback(row);
}

export async function archiveTeamMember(member, members = [], actorName = '') {
  if (!isSupabaseConfigured || !supabase) return { ok: false, mode: 'not_configured' };
  const row = teamMemberToRow(
    {
      ...member,
      status: 'Inactive',
      isArchived: true,
      deletedAt: new Date().toISOString(),
    },
    members,
    actorName
  );
  return upsertWithFallback(row);
}
