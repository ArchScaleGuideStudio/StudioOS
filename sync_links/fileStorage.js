import { supabase, isSupabaseConfigured } from './supabase';

export const FILE_BUCKET =
  import.meta.env.VITE_SUPABASE_FILE_BUCKET || 'studio-os-files';
export const WORKSPACE_ID =
  import.meta.env.VITE_SUPABASE_ROW_ID || 'khanna-case-20260508';

function safeSegment(value, fallback = 'file') {
  return String(value || fallback)
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || fallback;
}

export function publicFileUrl(bucket, path) {
  if (!isSupabaseConfigured || !supabase || !bucket || !path) return '';
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data?.publicUrl || '';
}

function extensionFromName(name = '') {
  const ext = String(name).split('.').pop();
  return ext && ext !== name ? ext.toLowerCase().slice(0, 12) : '';
}

function classifyStoredFile(file) {
  const mime = (file && file.type) || '';
  const ext = extensionFromName((file && file.name) || '');
  if (mime.startsWith('image/')) return 'image';
  if (mime.startsWith('video/')) return 'video';
  if (mime.startsWith('audio/')) return 'audio';
  if (mime === 'application/pdf' || ext === 'pdf') return 'pdf';
  if (['dwg', 'dxf', 'rvt', 'rfa', 'skp', '3dm', 'ifc', 'stp', 'step'].includes(ext)) return 'dwg';
  if (['xls', 'xlsx', 'csv', 'tsv'].includes(ext)) return 'spreadsheet';
  if (['doc', 'docx', 'txt', 'rtf'].includes(ext)) return 'document';
  if (['zip', 'rar', '7z'].includes(ext)) return 'archive';
  return 'other';
}

function areaToFileCategory(area = '') {
  const value = String(area || '').toLowerCase();
  if (value.includes('drawing')) return 'drawing';
  if (value.includes('reference')) return 'reference';
  if (value.includes('spec')) return 'spec';
  if (value.includes('boq')) return 'boq';
  if (value.includes('mom')) return 'mom';
  if (value.includes('approval')) return 'approval';
  if (value.includes('invoice')) return 'invoice';
  if (value.includes('estimate')) return 'estimate';
  if (value.includes('proposal')) return 'proposal';
  if (value.includes('form')) return 'form';
  if (value.includes('comm')) return 'communication';
  if (value.includes('voice')) return 'voice_note';
  if (value.includes('site')) return 'site_photo';
  if (value.includes('vendor')) return 'vendor';
  if (value.includes('homepage')) return 'homepage';
  return 'general';
}

function toWorkspaceFileRow(file, stored, options = {}) {
  const displayName = options.displayName || file.name || 'untitled';
  return {
    workspace_id: options.workspaceId || WORKSPACE_ID,
    project_id: options.projectId || null,
    source_area: options.area || 'attachments',
    file_category: options.fileCategory || areaToFileCategory(options.area),
    original_name: file.name || displayName,
    display_name: displayName,
    file_ext: extensionFromName(file.name || displayName),
    mime_type: file.type || '',
    file_kind: options.fileKind || classifyStoredFile(file),
    size_bytes: file.size || 0,
    storage_bucket: stored.storageBucket,
    storage_path: stored.storagePath,
    public_url: stored.publicUrl || '',
    preview_url: stored.publicUrl || '',
    thumbnail_url: options.thumbnailUrl || '',
    status: 'active',
    tags: Array.isArray(options.tags) ? options.tags : [],
    description: options.description || '',
    uploaded_by: options.uploadedBy || '',
    metadata: options.metadata || {},
  };
}

export async function createWorkspaceFileRecord(file, stored, options = {}) {
  if (!isSupabaseConfigured || !supabase) return null;
  const row = toWorkspaceFileRow(file, stored, options);
  const { data, error } = await supabase
    .from('workspace_files')
    .insert(row)
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function linkWorkspaceFile(fileId, {
  workspaceId = WORKSPACE_ID,
  projectId = null,
  linkedType = 'project',
  linkedId = projectId || workspaceId,
  relationType = 'attachment',
  sortOrder = 0,
  notes = '',
  createdBy = '',
} = {}) {
  if (!isSupabaseConfigured || !supabase || !fileId || !linkedType || !linkedId) return null;
  const { data, error } = await supabase
    .from('file_links')
    .upsert({
      workspace_id: workspaceId,
      project_id: projectId,
      file_id: fileId,
      linked_type: linkedType,
      linked_id: String(linkedId),
      relation_type: relationType,
      sort_order: sortOrder,
      notes,
      created_by: createdBy,
    }, { onConflict: 'file_id,linked_type,linked_id,relation_type' })
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function listWorkspaceFiles({ workspaceId = WORKSPACE_ID, projectId, linkedType, linkedId, category, status = 'active' } = {}) {
  if (!isSupabaseConfigured || !supabase) return [];
  let query = supabase.from('workspace_files').select('*').eq('workspace_id', workspaceId).order('created_at', { ascending: false });
  if (projectId) query = query.eq('project_id', projectId);
  if (category && category !== 'all') query = query.eq('file_category', category);
  if (status && status !== 'all') query = query.eq('status', status);

  const { data: files, error } = await query;
  if (error) throw error;
  if (!linkedType && !linkedId) return files || [];

  let linkQuery = supabase.from('file_links').select('file_id').eq('workspace_id', workspaceId);
  if (projectId) linkQuery = linkQuery.eq('project_id', projectId);
  if (linkedType) linkQuery = linkQuery.eq('linked_type', linkedType);
  if (linkedId) linkQuery = linkQuery.eq('linked_id', String(linkedId));
  const { data: links, error: linkError } = await linkQuery;
  if (linkError) throw linkError;
  const ids = new Set((links || []).map((l) => l.file_id));
  return (files || []).filter((f) => ids.has(f.id));
}

export async function listWorkspaceFileLibrary({ workspaceId = WORKSPACE_ID, projectId, category, status = 'active', search = '' } = {}) {
  if (!isSupabaseConfigured || !supabase) return [];
  let query = supabase
    .from('workspace_file_library')
    .select('*')
    .eq('workspace_id', workspaceId)
    .order('created_at', { ascending: false });

  if (projectId && projectId !== 'all') query = query.eq('project_id', projectId);
  if (category && category !== 'all') query = query.eq('file_category', category);
  if (status && status !== 'all') query = query.eq('status', status);
  if (search && search.trim()) {
    const q = `%${search.trim().replace(/[%_]/g, '')}%`;
    query = query.or(`display_name.ilike.${q},original_name.ilike.${q},source_area.ilike.${q},file_category.ilike.${q},uploaded_by.ilike.${q}`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function uploadWorkspaceFile(file, {
  workspaceId = WORKSPACE_ID,
  projectId,
  area = 'attachments',
  linkedType,
  linkedId,
  relationType = 'attachment',
  ...metadataOptions
} = {}) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured for file uploads.');
  }
  if (!file) throw new Error('No file selected.');

  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const unique = Math.random().toString(36).slice(2, 8);
  const name = safeSegment(file.name || 'attachment');
  const path = [
    safeSegment(workspaceId || WORKSPACE_ID || 'workspace'),
    safeSegment(projectId || 'unassigned-project'),
    safeSegment(area),
    `${stamp}-${unique}-${name}`,
  ].join('/');

  const { error } = await supabase.storage.from(FILE_BUCKET).upload(path, file, {
    cacheControl: '3600',
    contentType: file.type || 'application/octet-stream',
    upsert: false,
  });

  if (error) {
    throw new Error(error.message || 'Could not upload file to Supabase Storage.');
  }

  const stored = {
    storageBucket: FILE_BUCKET,
    storagePath: path,
    publicUrl: publicFileUrl(FILE_BUCKET, path),
  };

  try {
    const fileRecord = await createWorkspaceFileRecord(file, stored, {
      workspaceId,
      projectId,
      area,
      ...metadataOptions,
    });
    if (fileRecord?.id) {
      await linkWorkspaceFile(fileRecord.id, {
        workspaceId,
        projectId,
        linkedType: linkedType || (projectId ? 'project' : 'workspace'),
        linkedId: linkedId || projectId || workspaceId,
        relationType,
        createdBy: metadataOptions.uploadedBy || '',
      });
    }
    return {
      ...stored,
      fileId: fileRecord?.id || null,
      fileRecord,
    };
  } catch (error) {
    console.warn('[Studio/OS] File uploaded, but database metadata was not saved. Run supabase_files_foundation_schema.sql.', error);
    return {
      ...stored,
      fileId: null,
      fileRecord: null,
      databaseWarning: error?.message || 'File metadata table is not ready.',
    };
  }
}

export async function pruneWorkspaceFilesForLink({
  workspaceId = WORKSPACE_ID,
  linkedType,
  linkedId,
  relationType,
  keepPublicUrls = [],
  keepFileIds = [],
  deleteStorageObjects = true,
} = {}) {
  if (!isSupabaseConfigured || !supabase || !linkedType || !linkedId || !relationType) {
    return { pruned: 0, removedStorage: 0, skipped: true };
  }

  const { data: links, error: linkError } = await supabase
    .from('file_links')
    .select('id,file_id')
    .eq('workspace_id', workspaceId)
    .eq('linked_type', linkedType)
    .eq('linked_id', String(linkedId))
    .eq('relation_type', relationType);
  if (linkError) throw linkError;

  const linkedFileIds = (links || []).map((link) => link.file_id).filter(Boolean);
  if (!linkedFileIds.length) return { pruned: 0, removedStorage: 0, skipped: false };

  const { data: files, error: filesError } = await supabase
    .from('workspace_files')
    .select('id,public_url,storage_bucket,storage_path,status')
    .in('id', linkedFileIds);
  if (filesError) throw filesError;

  const keepUrls = new Set((keepPublicUrls || []).filter(Boolean));
  const keepIds = new Set((keepFileIds || []).filter(Boolean));
  const staleFiles = (files || []).filter((file) => (
    !keepIds.has(file.id) &&
    !keepUrls.has(file.public_url) &&
    file.status !== 'deleted'
  ));

  let removedStorage = 0;
  if (deleteStorageObjects) {
    const byBucket = staleFiles.reduce((acc, file) => {
      if (!file.storage_bucket || !file.storage_path) return acc;
      if (!acc[file.storage_bucket]) acc[file.storage_bucket] = [];
      acc[file.storage_bucket].push(file.storage_path);
      return acc;
    }, {});
    for (const [bucket, paths] of Object.entries(byBucket)) {
      const { error } = await supabase.storage.from(bucket).remove(paths);
      if (!error) removedStorage += paths.length;
    }
  }

  const staleIds = staleFiles.map((file) => file.id);
  if (staleIds.length) {
    await supabase
      .from('workspace_files')
      .update({ status: 'deleted', updated_at: new Date().toISOString() })
      .in('id', staleIds);
    await supabase
      .from('file_links')
      .delete()
      .in('file_id', staleIds);
  }

  return { pruned: staleIds.length, removedStorage, skipped: false };
}
