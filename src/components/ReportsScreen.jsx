import React from 'react';
import { BarChart3, Download, Lock } from 'lucide-react';

const WORKLOAD_TAGS = ['Full', 'Moderate', 'Low', 'None'];
const OWNERSHIP_GAP_TYPES = [
  'Task Allocation Issue (Manager)',
  'Role Clarity Issue (System)',
  'Skill Gap (Training)',
  'Member Behaviour Issue',
  'Business Demand Low',
  'Dependency Issue',
  'Other',
];
const LOW_WORKLOAD_REASONS = ['No tasks allocated', 'Role unclear', 'Skill mismatch', 'Dependency delays', 'Low initiative', 'Business slowdown', 'Other'];
const REVIEW_ACTIONS = ['Assign weekly goals', 'Reallocate tasks', 'Role correction', 'Training required', 'Shift function', 'Increase tracking', 'Performance watch', 'No action'];
const DEPT_LABELS = { MGT: 'Management', DSN: 'Design', SITE: 'Site', OPS: 'Operations', ACC: 'Accounts' };

function PageHeader({ icon: Icon, sublabel, title, description, rightSlot }) {
  return (
    <div className="px-6 py-5 border-b border-line bg-paper">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {Icon && <Icon className="w-4 h-4 text-terra" />}
            <span className="text-[11px] font-mono ink-faint uppercase tracking-wider">{sublabel}</span>
          </div>
          <h1 className="font-display text-3xl ink tracking-tight leading-none">{title}</h1>
          <div className="text-sm ink-soft mt-2 max-w-2xl">{description}</div>
        </div>
        {rightSlot && <div className="shrink-0">{rightSlot}</div>}
      </div>
    </div>
  );
}

function downloadCsv(filename, rows) {
  const escape = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const csv = rows.map((row) => row.map(escape).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function lastWorkingDays(count = 10) {
  const days = [];
  const d = new Date();
  while (days.length < count) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) days.unshift(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() - 1);
  }
  return days;
}

function managerName(member, members) {
  return members.find((m) => m.initials === member.reportsTo)?.value || 'Unassigned';
}

function allProjectTasksForExport(projects) {
  return projects.flatMap((project) => (project._wizard?.projectTasks || []).map((task) => ({
    projectId: project.id,
    projectName: project.name,
    title: task.title,
    assignee: task.assigneeName || task.assignee || 'Unassigned',
    status: task.status || '',
    stage: task.linkedStage || '',
    activity: task.linkedActivity || '',
    dueDate: task.dueDate || '',
    createdOn: task.createdOn || task.assignedAt || '',
    completedOn: task.completedOn || '',
  })));
}

function deriveWorkloadTag({ assigned, hours }) {
  if ((assigned || 0) <= 0 && (hours || 0) <= 0) return 'None';
  if ((assigned || 0) <= 1 || (hours || 0) < 3) return 'Low';
  if ((assigned || 0) <= 3 || (hours || 0) < 6) return 'Moderate';
  return 'Full';
}

function buildWorkloadSeed(masters, projects) {
  const members = (masters.MasterTeamMembers || []).filter((m) => m.status !== 'Inactive' && ['Doer', 'Intern'].includes(m.tier));
  const tasks = allProjectTasksForExport(projects);
  const days = lastWorkingDays(10);
  const lowNames = new Set(['Anish Rao', 'Aryan Khanna']);
  const noneNames = new Set(['Neha Pillai']);
  return members.flatMap((member) => days.map((date, idx) => {
    const relatedTasks = tasks.filter((task) => task.assignee === member.value);
    const assignedBase = relatedTasks.filter((task) => !task.dueDate || task.dueDate <= date).length;
    let assigned = Math.min(5, Math.max(0, Math.floor(assignedBase / 3) + ((member.id + idx) % 3)));
    let completed = Math.max(0, assigned - ((member.id + idx) % 2));
    let hours = Math.min(8, assigned * 1.8 + (completed ? 1 : 0));
    if (lowNames.has(member.value) && idx % 2 === 0) { assigned = 1; completed = 0; hours = 2; }
    if (noneNames.has(member.value) && idx % 3 === 0) { assigned = 0; completed = 0; hours = 0; }
    return {
      id: `wld-${member.id}-${date}`,
      memberId: member.id,
      memberName: member.value,
      employeeId: `EMP-${String(member.id).padStart(3, '0')}`,
      functionDept: DEPT_LABELS[member.dept] || member.dept || 'General',
      assignedManager: managerName(member, masters.MasterTeamMembers || []),
      managerInitials: member.reportsTo || '',
      date,
      tasksAssigned: assigned,
      tasksCompleted: completed,
      pendingTasks: Math.max(0, assigned - completed),
      estimatedWorkHours: Number(hours.toFixed(1)),
      focusArea: member.role || '',
      workloadTag: deriveWorkloadTag({ assigned, hours }),
    };
  }));
}

function weekRangeFor(dateString) {
  const d = new Date(dateString);
  const day = d.getDay() || 7;
  const start = new Date(d);
  start.setDate(d.getDate() - day + 1);
  const end = new Date(start);
  end.setDate(start.getDate() + 4);
  return `${start.toISOString().slice(0, 10)} to ${end.toISOString().slice(0, 10)}`;
}

function classify(summary, previous) {
  const repeated = previous.filter((s) => s.memberId === summary.memberId && s.workloadPct >= 50).length >= 1;
  if (summary.workloadPct >= 70 || repeated) return { status: 'Red Flag', badge: 'Red Flag: Very Low Workload', className: 'bg-terra-soft text-terra' };
  if (summary.workloadPct >= 50) return { status: 'Caution', badge: 'Caution: 50%+ Low Workload', className: 'bg-[#FFF2D6] text-[#946519]' };
  return { status: 'Healthy', badge: 'Healthy', className: 'bg-moss-soft text-moss' };
}

function buildWeeklySummaries(records) {
  const groups = new Map();
  records.forEach((record) => {
    const weekRange = weekRangeFor(record.date);
    const key = `${record.memberId}-${weekRange}`;
    if (!groups.has(key)) {
      groups.set(key, { memberId: record.memberId, memberName: record.memberName, functionDept: record.functionDept, assignedManager: record.assignedManager, managerInitials: record.managerInitials, weekRange, totalTasksAssigned: 0, totalTasksCompleted: 0, noWorkDays: 0, lowWorkDays: 0, workingDays: 0, workloadScore: 0 });
    }
    const row = groups.get(key);
    row.totalTasksAssigned += Number(record.tasksAssigned) || 0;
    row.totalTasksCompleted += Number(record.tasksCompleted) || 0;
    row.noWorkDays += record.workloadTag === 'None' ? 1 : 0;
    row.lowWorkDays += record.workloadTag === 'Low' ? 1 : 0;
    row.workingDays += 1;
    row.workloadScore += ({ Full: 4, Moderate: 3, Low: 1, None: 0 }[record.workloadTag] ?? 0);
  });
  const sorted = Array.from(groups.values()).map((row) => {
    const workloadPct = row.workingDays ? Math.round(((row.lowWorkDays + row.noWorkDays) / row.workingDays) * 100) : 0;
    const avg = row.workingDays ? row.workloadScore / row.workingDays : 0;
    return { ...row, workloadPct, avgWorkloadLevel: avg >= 3.5 ? 'Full' : avg >= 2 ? 'Moderate' : avg > 0 ? 'Low' : 'None' };
  }).sort((a, b) => a.weekRange.localeCompare(b.weekRange));
  return sorted.map((summary, idx) => ({ ...summary, classification: classify(summary, sorted.slice(0, idx)) }))
    .sort((a, b) => b.workloadPct - a.workloadPct || a.memberName.localeCompare(b.memberName));
}

function inputClass(extra = '') {
  return `rounded border border-line bg-paper px-2 py-1 text-[11px] ink focus:outline-none focus:border-terra ${extra}`;
}

export default function ReportsScreen({ projects, masters, setMasters, currentRoleCode, currentProfile }) {
  const allMembers = masters.MasterTeamMembers || [];
  const canAccess = ['super_admin', 'admin', 'studio_owner', 'pm_admin'].includes(currentRoleCode);
  const isAdmin = ['super_admin', 'admin', 'studio_owner'].includes(currentRoleCode);
  const currentMember = allMembers.find((m) => m.value === currentProfile?.user?.name || m.initials === currentProfile?.user?.initials);
  const seedRecords = React.useMemo(() => buildWorkloadSeed(masters, projects), [masters, projects]);
  const storedRecords = masters.MasterWorkloadDailyRecords || [];
  const dailyRecords = storedRecords.length ? storedRecords : seedRecords;
  const visibleRecords = isAdmin || !currentMember ? dailyRecords : dailyRecords.filter((r) => r.managerInitials === currentMember.initials || r.assignedManager === currentMember.value);
  const weeklySummaries = React.useMemo(() => buildWeeklySummaries(visibleRecords), [visibleRecords]);
  const reviewMonth = new Date().toISOString().slice(0, 7);
  const storedReviews = masters.MasterWorkloadMonthlyReviews || [];
  const latestByMember = new Map();
  weeklySummaries.forEach((summary) => {
    if (!latestByMember.has(summary.memberId) || summary.weekRange > latestByMember.get(summary.memberId).weekRange) latestByMember.set(summary.memberId, summary);
  });
  const monthlyReviews = Array.from(latestByMember.values()).map((summary) => {
    const existing = storedReviews.find((r) => String(r.memberId) === String(summary.memberId) && r.reviewMonth === reviewMonth);
    return {
      id: existing?.id || `wmr-${summary.memberId}-${reviewMonth}`,
      memberId: summary.memberId,
      memberName: summary.memberName,
      functionDept: summary.functionDept,
      manager: summary.assignedManager,
      reviewMonth,
      workloadStatus: existing?.workloadStatus || summary.classification.status,
      weeklyEvidenceSummary: existing?.weeklyEvidenceSummary || `${summary.weekRange}: ${summary.lowWorkDays} low + ${summary.noWorkDays} no-work days (${summary.workloadPct}%).`,
      dailyEvidenceSnapshot: existing?.dailyEvidenceSnapshot || `${summary.totalTasksAssigned} assigned, ${summary.totalTasksCompleted} completed in latest week.`,
      managerObservation: existing?.managerObservation || '',
      ownershipGapType: existing?.ownershipGapType || '',
      reasonForLowWorkload: existing?.reasonForLowWorkload || '',
      actionRequired: existing?.actionRequired || '',
      nextReviewDate: existing?.nextReviewDate || '',
    };
  });
  const counts = weeklySummaries.reduce((acc, row) => {
    acc[row.classification.status] = (acc[row.classification.status] || 0) + 1;
    return acc;
  }, {});

  const persistDailyRecord = (id, patch) => {
    const base = storedRecords.length ? storedRecords : seedRecords;
    setMasters((m) => ({
      ...m,
      MasterWorkloadDailyRecords: base.map((row) => {
        if (row.id !== id) return row;
        const next = { ...row, ...patch };
        next.pendingTasks = Math.max(0, Number(next.tasksAssigned) - Number(next.tasksCompleted));
        return next;
      }),
    }));
  };

  const persistMonthlyReview = (review, patch) => {
    setMasters((m) => {
      const current = m.MasterWorkloadMonthlyReviews || [];
      const nextReview = { ...review, ...patch, updatedAt: new Date().toISOString() };
      return {
        ...m,
        MasterWorkloadMonthlyReviews: current.some((r) => r.id === review.id)
          ? current.map((r) => r.id === review.id ? nextReview : r)
          : [...current, nextReview],
      };
    });
  };

  const exportTasks = () => {
    const tasks = allProjectTasksForExport(projects);
    downloadCsv('studio-os-tasks-export.csv', [
      ['Project ID', 'Project Name', 'Task', 'Assignee', 'Status', 'Stage', 'Activity', 'Due Date', 'Created On', 'Completed On'],
      ...tasks.map((t) => [t.projectId, t.projectName, t.title, t.assignee, t.status, t.stage, t.activity, t.dueDate, t.createdOn, t.completedOn]),
    ]);
  };

  if (!canAccess) {
    return (
      <div className="flex-1 overflow-auto scrollbar-thin bg-bone p-8">
        <div className="bg-paper border border-line rounded-xl p-8 text-center max-w-xl mx-auto">
          <Lock className="w-8 h-8 ink-faint mx-auto mb-3" />
          <h2 className="text-xl font-semibold ink">Reports restricted</h2>
          <p className="text-sm ink-soft mt-2">Monthly Review Notes are visible only to Admin and Managers. Doers can update daily data later, but cannot see review notes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto scrollbar-thin bg-bone">
      <PageHeader
        icon={BarChart3}
        sublabel="Reports · Workload monitoring"
        title="Monthly Review Notes"
        description="A structured system for spotting under-utilisation, improving task allocation, and clarifying ownership. Not a punishment tool."
        rightSlot={<button onClick={exportTasks} className="flex items-center gap-1.5 rounded bg-ink px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-terra"><Download className="w-3.5 h-3.5" /> Export Tasks CSV</button>}
      />
      <div className="p-6 space-y-5" style={{ maxWidth: '1400px' }}>
        <div className="grid grid-cols-4 gap-3">
          {[
            ['Total Members', new Set(visibleRecords.map((r) => r.memberId)).size, 'ink'],
            ['Healthy', counts.Healthy || 0, 'text-moss'],
            ['Caution', counts.Caution || 0, 'text-[#946519]'],
            ['Red Flag', counts['Red Flag'] || 0, 'text-terra'],
          ].map(([label, value, tone]) => <div key={label} className="bg-paper border border-line rounded-xl p-4"><div className="text-[11px] ink-faint mb-2">{label}</div><div className={`text-2xl font-semibold ${tone}`}>{value}</div></div>)}
        </div>

        <section className="bg-paper border border-line rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-line bg-bone"><div className="text-sm font-semibold ink">Stage 1 · Daily Tracker</div><div className="text-[11px] ink-soft">Raw truth layer. Managers can edit. Pending tasks auto-fills when tasks assigned/completed changes.</div></div>
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead className="bg-bone ink-soft"><tr>{['Member', 'Emp ID', 'Function', 'Manager', 'Date', 'Assigned', 'Completed', 'Pending', 'Hours', 'Focus Area', 'Tag'].map((h) => <th key={h} className="text-left px-3 py-2 font-mono uppercase tracking-wider text-[10px]">{h}</th>)}</tr></thead>
              <tbody>{visibleRecords.slice(0, 30).map((row) => (
                <tr key={row.id} className="border-t border-line-soft">
                  <td className="px-3 py-2 font-semibold ink">{row.memberName}</td><td className="px-3 py-2 ink-soft">{row.employeeId}</td><td className="px-3 py-2 ink-soft">{row.functionDept}</td><td className="px-3 py-2 ink-soft">{row.assignedManager}</td>
                  <td className="px-3 py-2"><input type="date" value={row.date} onChange={(e) => persistDailyRecord(row.id, { date: e.target.value })} className={inputClass()} /></td>
                  <td className="px-3 py-2"><input type="number" value={row.tasksAssigned} onChange={(e) => persistDailyRecord(row.id, { tasksAssigned: Number(e.target.value) })} className={inputClass('w-20')} /></td>
                  <td className="px-3 py-2"><input type="number" value={row.tasksCompleted} onChange={(e) => persistDailyRecord(row.id, { tasksCompleted: Number(e.target.value) })} className={inputClass('w-20')} /></td>
                  <td className="px-3 py-2 ink">{row.pendingTasks}</td>
                  <td className="px-3 py-2"><input type="number" value={row.estimatedWorkHours} onChange={(e) => persistDailyRecord(row.id, { estimatedWorkHours: Number(e.target.value) })} className={inputClass('w-20')} /></td>
                  <td className="px-3 py-2"><input value={row.focusArea || ''} onChange={(e) => persistDailyRecord(row.id, { focusArea: e.target.value })} className={inputClass('min-w-[180px]')} /></td>
                  <td className="px-3 py-2"><select value={row.workloadTag} onChange={(e) => persistDailyRecord(row.id, { workloadTag: e.target.value })} className={inputClass()}>{WORKLOAD_TAGS.map((tag) => <option key={tag}>{tag}</option>)}</select></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>

        <section className="bg-paper border border-line rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-line bg-bone"><div className="text-sm font-semibold ink">Stage 2 · Weekly Summary</div><div className="text-[11px] ink-soft">Insight layer. Workload % = (Low days + No-work days) divided by total working days.</div></div>
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead className="bg-bone ink-soft"><tr>{['Member', 'Week Range', 'Assigned', 'Completed', 'No Work', 'Low Work', 'Avg Level', 'Workload %', 'Status'].map((h) => <th key={h} className="text-left px-3 py-2 font-mono uppercase tracking-wider text-[10px]">{h}</th>)}</tr></thead>
              <tbody>{weeklySummaries.map((row) => <tr key={`${row.memberId}-${row.weekRange}`} className="border-t border-line-soft"><td className="px-3 py-2 font-semibold ink">{row.memberName}</td><td className="px-3 py-2 ink-soft">{row.weekRange}</td><td className="px-3 py-2">{row.totalTasksAssigned}</td><td className="px-3 py-2">{row.totalTasksCompleted}</td><td className="px-3 py-2">{row.noWorkDays}</td><td className="px-3 py-2">{row.lowWorkDays}</td><td className="px-3 py-2">{row.avgWorkloadLevel}</td><td className="px-3 py-2 font-semibold">{row.workloadPct}%</td><td className="px-3 py-2"><span className={`rounded px-2 py-1 text-[10px] font-mono uppercase tracking-wider ${row.classification.className}`}>{row.classification.badge}</span></td></tr>)}</tbody>
            </table>
          </div>
        </section>

        <section className="bg-paper border border-line rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-line bg-bone"><div className="text-sm font-semibold ink">Stage 3 · Monthly Review Notes</div><div className="text-[11px] ink-soft">Decision layer. Managers record the reason, ownership gap, action, and next review date.</div></div>
          <div className="divide-y divide-line-soft">{monthlyReviews.map((review) => (
            <div key={review.id} className="p-4 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4">
              <div><div className="text-base font-semibold ink">{review.memberName}</div><div className="text-[11px] ink-soft">{review.functionDept} · {review.manager}</div><select value={review.workloadStatus} onChange={(e) => persistMonthlyReview(review, { workloadStatus: e.target.value })} className={`${inputClass()} mt-3 w-full`}>{['Healthy', 'Caution', 'Red Flag'].map((s) => <option key={s}>{s}</option>)}</select></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-3"><div className="rounded bg-bone border border-line-soft p-3 text-[11px] ink-soft"><strong className="ink">Weekly evidence:</strong> {review.weeklyEvidenceSummary}</div><div className="rounded bg-bone border border-line-soft p-3 text-[11px] ink-soft"><strong className="ink">Daily snapshot:</strong> {review.dailyEvidenceSnapshot}</div></div>
                <textarea value={review.managerObservation} onChange={(e) => persistMonthlyReview(review, { managerObservation: e.target.value })} placeholder="Manager observation" className="md:col-span-3 rounded border border-line bg-paper px-3 py-2 text-sm ink min-h-[76px]" />
                <select value={review.ownershipGapType} onChange={(e) => persistMonthlyReview(review, { ownershipGapType: e.target.value })} className={inputClass()}><option value="">Ownership gap type</option>{OWNERSHIP_GAP_TYPES.map((x) => <option key={x}>{x}</option>)}</select>
                <select value={review.reasonForLowWorkload} onChange={(e) => persistMonthlyReview(review, { reasonForLowWorkload: e.target.value })} className={inputClass()}><option value="">Reason for low workload</option>{LOW_WORKLOAD_REASONS.map((x) => <option key={x}>{x}</option>)}</select>
                <select value={review.actionRequired} onChange={(e) => persistMonthlyReview(review, { actionRequired: e.target.value })} className={inputClass()}><option value="">Action required</option>{REVIEW_ACTIONS.map((x) => <option key={x}>{x}</option>)}</select>
                <input type="date" value={review.nextReviewDate} onChange={(e) => persistMonthlyReview(review, { nextReviewDate: e.target.value })} className={inputClass()} />
              </div>
            </div>
          ))}</div>
        </section>

        <section className="bg-paper border border-line rounded-xl p-4">
          <div className="text-sm font-semibold ink mb-2">Stage 6 · Future Alerts</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] ink-soft">{['Member enters Caution', 'Member enters Red Flag', '2+ consecutive low workload weeks', '2+ no-work days in a row'].map((item) => <div key={item} className="rounded border border-dashed border-line px-3 py-2 bg-bone">{item} · future trigger</div>)}</div>
        </section>
      </div>
    </div>
  );
}
