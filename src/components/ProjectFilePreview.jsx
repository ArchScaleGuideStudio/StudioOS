import React, { useState } from 'react';
import { Download, ExternalLink, FileText, X } from 'lucide-react';

function formatBytes(bytes) {
  if (!bytes) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = Number(bytes);
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value >= 10 || unit === 0 ? 0 : 1)} ${units[unit]}`;
}

function downloadFile(file) {
  const href = file?.dataUrl || file?.publicUrl || file?.url;
  if (!href) return;
  const link = document.createElement('a');
  link.href = href;
  link.download = file.name || 'project-file';
  if (file?.publicUrl || file?.url) link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function previewKind(file) {
  const mime = file?.mimeType || file?.type || '';
  const name = file?.name || '';
  if ((file?.kind || '').startsWith('image') || mime.startsWith('image/')) return 'image';
  if ((file?.kind || '').startsWith('video') || mime.startsWith('video/')) return 'video';
  if ((file?.kind || '').startsWith('audio') || mime.startsWith('audio/')) return 'audio';
  if ((file?.kind || '') === 'pdf' || mime.includes('pdf') || /\.pdf$/i.test(name)) return 'pdf';
  return 'file';
}

export default function ProjectFilePreview({ file, children, className = '', title = 'Preview file' }) {
  const [open, setOpen] = useState(false);
  const kind = previewKind(file);
  const previewUrl = file?.dataUrl || file?.publicUrl || file?.url || '';

  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setOpen(true);
        }}
        className={className}
        title={title}
      >
        {children || <ExternalLink className="w-3.5 h-3.5" />}
      </button>

      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()} style={{ maxWidth: '980px', width: 'min(980px, 92vw)' }}>
            <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-line">
              <div className="min-w-0">
                <div className="font-display text-base ink truncate">{file?.name || 'Project file'}</div>
                <div className="text-[10px] font-mono ink-faint">{formatBytes(file?.sizeBytes)} {file?.mimeType || file?.type ? `· ${file.mimeType || file.type}` : ''}</div>
              </div>
              <div className="flex items-center gap-2">
                {previewUrl && (
                  <button onClick={() => downloadFile(file)} className="p-2 border border-line rounded ink-soft hover:ink hover:bg-bone" title="Download">
                    <Download className="w-4 h-4" />
                  </button>
                )}
                <button onClick={() => setOpen(false)} className="p-2 border border-line rounded ink-soft hover:ink hover:bg-bone" title="Close">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-5 bg-bone" style={{ maxHeight: '75vh', overflow: 'auto' }}>
              {!previewUrl ? (
                <div className="bg-paper border border-line rounded-lg p-8 text-center">
                  <FileText className="w-10 h-10 ink-faint mx-auto mb-3" />
                  <div className="text-sm ink font-semibold">No embedded preview data</div>
                  <div className="text-[11px] ink-soft mt-1">This project record is listed, but the actual file content has not been uploaded into this browser session.</div>
                </div>
              ) : kind === 'image' ? (
                <img src={previewUrl} alt={file.name || 'Project file'} className="block max-w-full mx-auto rounded border border-line bg-paper" />
              ) : kind === 'video' ? (
                <video src={previewUrl} controls className="block w-full rounded border border-line bg-ink" />
              ) : kind === 'audio' ? (
                <div className="bg-paper border border-line rounded-lg p-5">
                  <audio src={previewUrl} controls className="w-full" />
                </div>
              ) : kind === 'pdf' ? (
                <iframe title={file.name || 'PDF preview'} src={previewUrl} className="w-full bg-paper border border-line rounded" style={{ height: '68vh' }} />
              ) : (
                <div className="bg-paper border border-line rounded-lg p-8 text-center">
                  <FileText className="w-10 h-10 ink-faint mx-auto mb-3" />
                  <div className="text-sm ink font-semibold">Preview unavailable for this file type</div>
                  {previewUrl && (
                    <button onClick={() => downloadFile(file)} className="mt-4 px-4 py-2 bg-ink text-white rounded text-[11px] font-mono uppercase tracking-wider font-semibold hover:bg-terra">
                      Download file
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
