import React, { useMemo, useState } from 'react';
import { FileText, MessageSquare, Paperclip, Search, Send } from 'lucide-react';
import ProjectFilePreview from './ProjectFilePreview';

function contactKey(person) {
  return String(person?.contact || person?.mobile || person?.workPhone || person?.email || person?.name || person?.value || '')
    .toLowerCase()
    .replace(/\s+/g, '-');
}

function displayName(person) {
  return person?.name || person?.value || 'Member';
}

function initialsFor(name) {
  return String(name || 'M')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function messageText(comm) {
  return comm?.body || comm?.preview || comm?.subject || '';
}

function commMatchesMember(comm, member) {
  const name = displayName(member).toLowerCase();
  const key = contactKey(member);
  const haystack = [comm?.author, comm?.from, comm?.to, comm?.subject, comm?.body, comm?.preview]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return haystack.includes(name) || (key && haystack.includes(key));
}

function buildMembers(project, masters) {
  const wizard = project?._wizard || {};
  const team = masters?.MasterTeamMembers || [];
  const decisionMakers = wizard.decisionMakers || [];
  const projectTeamIds = new Set([
    project?.projectManagerRef,
    project?.designerRef,
    project?.siteManagerRef,
    ...(wizard.teamMemberRefs || []),
    ...(wizard.assignedTeamMemberIds || []),
  ].filter(Boolean));

  const selectedTeam = team.filter((member) => projectTeamIds.size === 0 || projectTeamIds.has(member.id));
  const projectVendors = (wizard.vendors || wizard.projectVendors || []).map((vendor) => ({
    ...vendor,
    name: vendor.name || vendor.value,
    role: vendor.role || vendor.trade || vendor.vendorType || 'Vendor',
    type: 'vendor',
  }));

  const people = [
    ...selectedTeam.map((member) => ({ ...member, name: member.value, type: 'team' })),
    ...decisionMakers.filter((member) => member.name || member.contact).map((member) => ({ ...member, type: 'client' })),
    ...projectVendors,
  ];

  return Array.from(new Map(people.map((person) => [contactKey(person), person])).values());
}

function memberFiles(project, member) {
  const wizard = project?._wizard || {};
  const files = [
    ...(wizard.projectFiles || project?.files || []),
    ...(wizard.designSubmissions || []).flatMap((submission) => (submission.attachments || []).map((file) => ({
      ...file,
      _submissionTitle: submission.title,
      uploadedBy: submission.submittedBy,
    }))),
  ];
  const name = displayName(member).toLowerCase();
  return files.filter((file) => String(file.uploadedBy || file.submittedBy || '').toLowerCase().includes(name));
}

export default function ProjectMemberChat({ project, masters, onUpdate, roleCode }) {
  const wizard = project?._wizard || {};
  const allComms = wizard.comms || [];
  const members = useMemo(() => buildMembers(project, masters), [project, masters]);
  const [selectedKey, setSelectedKey] = useState(() => contactKey(members[0]));
  const [search, setSearch] = useState('');
  const [body, setBody] = useState('');

  const selectedMember = members.find((member) => contactKey(member) === selectedKey) || members[0];
  const visibleMembers = members.filter((member) => {
    if (!search.trim()) return true;
    const q = search.trim().toLowerCase();
    return [displayName(member), member.role, member.contact, member.mobile, member.email].filter(Boolean).join(' ').toLowerCase().includes(q);
  });
  const thread = selectedMember
    ? allComms.filter((comm) => commMatchesMember(comm, selectedMember)).sort((a, b) => String(a.timestamp || a.date || '').localeCompare(String(b.timestamp || b.date || '')))
    : [];
  const files = selectedMember ? memberFiles(project, selectedMember) : [];

  const sendMessage = () => {
    const text = body.trim();
    if (!text || !selectedMember) return;
    const newMessage = {
      id: `chat-${Date.now()}`,
      channel: 'Internal Chat',
      author: 'Studio team',
      from: 'Studio team',
      to: displayName(selectedMember),
      subject: `Message to ${displayName(selectedMember)}`,
      body: text,
      preview: text,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().slice(0, 10),
      attachments: [],
      isClientVisible: false,
      isVendorVisible: false,
      isInternalOnly: true,
    };
    onUpdate({ _wizard: { ...wizard, comms: [...allComms, newMessage] } });
    setBody('');
  };

  if (members.length === 0) return null;

  return (
    <div className="bg-paper border border-line rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-line bg-bone flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider ink-faint">Internal chat</div>
          <div className="font-display text-xl ink leading-none">Project members</div>
        </div>
        <div className="text-[10px] font-mono ink-faint">{members.length} members in this project</div>
      </div>

      <div className="grid md:grid-cols-[300px_minmax(0,1fr)]" style={{ minHeight: '560px' }}>
        <aside className="border-r border-line bg-bone flex flex-col min-h-0">
          <div className="p-3 border-b border-line">
            <div className="flex items-center gap-2 px-2 py-2 bg-paper border border-line rounded">
              <Search className="w-3.5 h-3.5 ink-faint" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search members" className="bg-transparent outline-none text-sm w-full ink placeholder:ink-faint" />
            </div>
          </div>
          <div className="overflow-y-auto scrollbar-thin">
            {visibleMembers.map((member) => {
              const key = contactKey(member);
              const isActive = key === contactKey(selectedMember);
              const memberThread = allComms.filter((comm) => commMatchesMember(comm, member));
              const last = memberThread[memberThread.length - 1];
              return (
                <button
                  key={key}
                  onClick={() => setSelectedKey(key)}
                  className={`w-full text-left px-3 py-3 border-b border-line-soft flex items-center gap-3 ${isActive ? 'bg-paper' : 'hover:bg-paper/70'}`}
                >
                  <div className="w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center text-xs font-semibold shrink-0">
                    {initialsFor(displayName(member))}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm ink font-semibold truncate">{displayName(member)}</div>
                      <div className="text-[9px] font-mono ink-faint">{last?.date || ''}</div>
                    </div>
                    <div className="text-[11px] ink-soft truncate">{last ? messageText(last) : (member.role || member.type || 'Project member')}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="flex flex-col min-w-0 bg-paper">
          {selectedMember && (
            <div className="px-4 py-3 border-b border-line bg-bone flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center text-xs font-semibold shrink-0">
                  {initialsFor(displayName(selectedMember))}
                </div>
                <div className="min-w-0">
                  <div className="text-sm ink font-semibold truncate">{displayName(selectedMember)}</div>
                  <div className="text-[11px] ink-soft truncate">{selectedMember.role || selectedMember.type || 'Project member'}</div>
                </div>
              </div>
              <div className="text-[10px] font-mono ink-faint">{thread.length} messages</div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3 bg-bone">
            {thread.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center">
                <div>
                  <MessageSquare className="w-10 h-10 ink-faint mx-auto mb-3" />
                  <div className="text-sm ink font-semibold">No chat yet with {displayName(selectedMember)}</div>
                  <div className="text-[11px] ink-soft mt-1">Start an internal project-scoped thread below.</div>
                </div>
              </div>
            ) : (
              thread.map((comm) => {
                const outgoing = String(comm.from || comm.author || '').toLowerCase().includes('studio');
                return (
                  <div key={comm.id} className={`flex ${outgoing ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[78%] rounded-lg px-3 py-2 border ${outgoing ? 'bg-moss-soft border-moss-soft' : 'bg-paper border-line'}`}>
                      <div className="text-[13px] ink leading-relaxed whitespace-pre-wrap">{messageText(comm)}</div>
                      {(comm.attachments || []).length > 0 && (
                        <div className="mt-2 space-y-1">
                          {(comm.attachments || []).map((file) => (
                            <ProjectFilePreview key={file.id || file.name} file={file} className="w-full text-left flex items-center gap-2 px-2 py-1.5 bg-paper/80 border border-line-soft rounded">
                              <Paperclip className="w-3 h-3 text-terra" />
                              <span className="text-[11px] ink-soft truncate">{file.name || 'Attachment'}</span>
                            </ProjectFilePreview>
                          ))}
                        </div>
                      )}
                      <div className="text-[9px] font-mono ink-faint text-right mt-1">{comm.date || String(comm.timestamp || '').slice(0, 10)}</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {files.length > 0 && (
            <div className="px-4 py-2 border-t border-line bg-paper flex items-center gap-2 overflow-x-auto scrollbar-thin">
              <span className="text-[10px] font-mono uppercase tracking-wider ink-faint shrink-0">Files</span>
              {files.slice(0, 8).map((file) => (
                <ProjectFilePreview key={file.id || file.name} file={file} className="shrink-0 inline-flex items-center gap-1.5 px-2 py-1 border border-line rounded bg-bone text-[10px] ink-soft hover:text-terra hover:border-terra">
                  <FileText className="w-3 h-3" />
                  <span className="max-w-[160px] truncate">{file.name}</span>
                </ProjectFilePreview>
              ))}
            </div>
          )}

          <div className="p-3 border-t border-line bg-paper flex items-end gap-2">
            <textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              placeholder={`Message ${displayName(selectedMember)}`}
              className="input-base min-h-[44px] max-h-28 resize-none"
            />
            <button onClick={sendMessage} disabled={!body.trim()} className="h-11 w-11 rounded bg-ink text-white flex items-center justify-center hover:bg-terra disabled:opacity-40 disabled:cursor-not-allowed" title="Send message">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
