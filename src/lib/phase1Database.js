import { supabase, isSupabaseConfigured } from './supabase';
import { WORKSPACE_ID } from './fileStorage';

const PHASE1_TABLES = {
  leadSources: 'lead_sources',
  leadStatuses: 'lead_statuses',
  salesStages: 'sales_stages',
  leads: 'master_leads',
  salesDeals: 'sales_deals',
  clients: 'studio_clients',
  team: 'studio_team_members',
  projects: 'studio_projects',
  stages: 'workflow_stages',
  activities: 'workflow_activities',
  tasks: 'workflow_tasks',
  checklists: 'task_checklists',
  deliverables: 'workflow_deliverables',
};

function cleanText(value) {
  return value == null ? '' : String(value).trim();
}

const OBSOLETE_SALES_STAGE_LABELS = [
  'New Lead',
  'Call Booked',
  'Called/ Contacted (Filtered)',
  'Called / Contacted (Filtered)',
  'Called/Contacted (Filtered)',
  'Contacted',
  'Discovery (Fitment)',
  'Discovery Call',
  'Discovery Call Booked',
  'Pitch / Proposal Sent',
  'Pitch/Proposal Sent',
];
const OBSOLETE_SALES_STAGE_NAMES = new Set(OBSOLETE_SALES_STAGE_LABELS.map((name) => name.toLowerCase()));

function normalizeStageName(value) {
  return cleanText(value).toLowerCase().replace(/\s+/g, ' ');
}

function isObsoleteSalesStageName(value) {
  return OBSOLETE_SALES_STAGE_NAMES.has(normalizeStageName(value));
}

function keyPart(value, fallback = 'x') {
  return cleanText(value || fallback)
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || fallback;
}

function num(value) {
  const n = Number(String(value ?? '').replace(/[^0-9.-]+/g, ''));
  return Number.isFinite(n) ? n : null;
}

function amountFromBudget(value) {
  const text = cleanText(value).toLowerCase();
  if (!text) return null;
  const matches = [...text.matchAll(/(\d+(?:\.\d+)?)/g)].map((m) => Number(m[1]));
  if (!matches.length) return null;
  const base = matches.length > 1 ? (matches[0] + matches[1]) / 2 : matches[0];
  if (!Number.isFinite(base)) return null;
  if (/\b(cr|crore|crores)\b/.test(text)) return Math.round(base * 10000000);
  if (/\b(l|lac|lacs|lakh|lakhs)\b/.test(text)) return Math.round(base * 100000);
  if (/\b(k|thousand)\b/.test(text)) return Math.round(base * 1000);
  return Math.round(base);
}

function boolFromYesNo(value) {
  if (typeof value === 'boolean') return value;
  const v = cleanText(value).toLowerCase();
  if (['yes', 'true', '1'].includes(v)) return true;
  if (['no', 'false', '0'].includes(v)) return false;
  return null;
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function textArray(value) {
  return asArray(value).map((item) => cleanText(item)).filter(Boolean);
}

function checklistItemsFrom(value) {
  if (Array.isArray(value)) {
    return value.map((item, idx) => ({
      text: cleanText(item.text || item.value || item.title || item),
      done: Boolean(item.done || item.isDone || item.checked),
      order: idx,
      raw: item,
    })).filter((item) => item.text);
  }
  return cleanText(value)
    .split(/\n+/)
    .map((text, idx) => ({ text: text.trim(), done: false, order: idx, raw: { text } }))
    .filter((item) => item.text);
}

function findClientIdForProject(project, clientsByName) {
  const wizard = project._wizard || {};
  if (wizard.primaryClientId) return `client:${wizard.primaryClientId}`;
  const clientName = cleanText(project.client || wizard.primaryClientName);
  return clientName ? clientsByName.get(clientName.toLowerCase()) || `client-name:${keyPart(clientName)}` : null;
}

function collectClients(projects, masters) {
  const rows = [];
  const byName = new Map();
  asArray(masters.MasterClients).forEach((client) => {
    const id = `client:${client.id ?? keyPart(client.value || client.name)}`;
    const displayName = cleanText(client.value || client.name || client.clientName);
    if (!displayName) return;
    byName.set(displayName.toLowerCase(), id);
    rows.push({
      id,
      workspace_id: WORKSPACE_ID,
      display_name: displayName,
      initials: cleanText(client.initials),
      client_type: cleanText(client.clientType || client.type),
      mobile: cleanText(client.mobile || client.phone || client.primaryMobile),
      email: cleanText(client.email || client.primaryEmail),
      city: cleanText(client.city),
      address: cleanText(client.address),
      gstin: cleanText(client.gstin || client.gst),
      accent: cleanText(client.accent),
      flags: textArray(client.flags),
      source_ref: `MasterClients:${client.id ?? ''}`,
      raw: client,
    });
  });

  projects.forEach((project) => {
    const wizard = project._wizard || {};
    const displayName = cleanText(project.client || wizard.primaryClientName);
    if (!displayName || byName.has(displayName.toLowerCase())) return;
    const id = `client-name:${keyPart(displayName)}`;
    byName.set(displayName.toLowerCase(), id);
    rows.push({
      id,
      workspace_id: WORKSPACE_ID,
      display_name: displayName,
      initials: cleanText(project.clientInitials),
      client_type: cleanText(project.category),
      mobile: cleanText(wizard.billingContact?.mobile || wizard.decisionMakers?.[0]?.contact),
      email: cleanText(wizard.decisionMakers?.[0]?.email),
      city: cleanText(project.city),
      address: cleanText(wizard.clientAddress),
      gstin: cleanText(wizard.clientGstin || wizard.clientGSTIN),
      accent: cleanText(project.accent),
      flags: textArray(wizard.clientFlags || project.clientFlags),
      source_ref: `project:${project.id}`,
      raw: { projectClient: project.client, billingContact: wizard.billingContact, decisionMakers: wizard.decisionMakers },
    });
  });
  return { rows, byName };
}

function collectTeam(masters) {
  return asArray(masters.MasterTeamMembers).map((member) => ({
    id: `team:${member.id ?? keyPart(member.value || member.name)}`,
    workspace_id: WORKSPACE_ID,
    display_name: cleanText(member.value || member.name),
    initials: cleanText(member.initials),
    role_title: cleanText(member.role || member.roleTitle),
    department: cleanText(member.department || member.function),
    email: cleanText(member.email),
    mobile: cleanText(member.mobile || member.phone),
    status: cleanText(member.status || 'Active') || 'Active',
    manager_id: member.managerId ? `team:${member.managerId}` : null,
    accent: cleanText(member.accent),
    source_ref: `MasterTeamMembers:${member.id ?? ''}`,
    raw: member,
  })).filter((row) => row.display_name);
}

function collectLeadSources(masters) {
  return asArray(masters.MasterLeadSources).map((source) => ({
    id: `lead-source:${source.id ?? keyPart(source.category || source.source)}`,
    workspace_id: WORKSPACE_ID,
    category: cleanText(source.category),
    source_name: cleanText(source.source || source.value || source.name),
    is_active: source.isActive !== false,
    remarks: cleanText(source.remarks),
    source_ref: `MasterLeadSources:${source.id ?? ''}`,
    raw: source,
  })).filter((row) => row.source_name);
}

function collectLeadStatuses(masters) {
  return asArray(masters.MasterLeadStatuses).map((status, idx) => ({
    id: `lead-status:${status.id ?? keyPart(status.status || status.value)}`,
    workspace_id: WORKSPACE_ID,
    status_name: cleanText(status.status || status.value || status.name),
    status_order: Number(status.order ?? status.ord ?? idx),
    is_active: status.isActive !== false,
    is_terminal: status.isTerminal === true,
    is_win: status.isWin === true,
    tone: cleanText(status.tone),
    source_ref: `MasterLeadStatuses:${status.id ?? ''}`,
    raw: status,
  })).filter((row) => row.status_name);
}

function collectSalesStages(masters) {
  return asArray(masters.MasterSalesStages).map((stage, idx) => ({
    id: `sales-stage:${stage.id ?? keyPart(stage.status || stage.value)}`,
    workspace_id: WORKSPACE_ID,
    status_name: cleanText(stage.status || stage.value || stage.name),
    status_order: Number(stage.order ?? stage.ord ?? idx),
    probability: Number(stage.probability) || 0,
    is_active: stage.isActive !== false,
    is_terminal: stage.isTerminal === true,
    is_win: stage.isWin === true,
    tone: cleanText(stage.tone),
    source_ref: `MasterSalesStages:${stage.id ?? ''}`,
    raw: stage,
  })).filter((row) => row.status_name);
}

function collectLeads(masters) {
  return asArray(masters.MasterLeads).map((lead) => ({
    id: `lead:${lead.id ?? keyPart(lead.name || lead.mobile)}`,
    workspace_id: WORKSPACE_ID,
    lead_name: cleanText(lead.name),
    mobile: cleanText(lead.mobile),
    email: cleanText(lead.email),
    city: cleanText(lead.city),
    source_category: cleanText(lead.sourceCategory),
    specific_source: cleanText(lead.specificSource),
    referral_person_name: cleanText(lead.referralPersonName),
    status: cleanText(lead.status || 'New Lead'),
    assigned_to: cleanText(lead.assignedTo),
    assigned_to_id: lead.assignedToId ? `team:${lead.assignedToId}` : null,
    enquiry_date: cleanText(lead.enquiryDate),
    next_follow_up_date: cleanText(lead.nextFollowUpDate),
    project_category: cleanText(lead.projectCategory),
    property_type: cleanText(lead.propertyType),
    project_size: cleanText(lead.projectSize),
    service_interest: cleanText(lead.serviceInterest),
    estimated_budget: cleanText(lead.estimatedBudget),
    estimated_budget_amount: amountFromBudget(lead.estimatedBudget),
    expected_start_timeline: cleanText(lead.expectedStartTimeline),
    reason_won: cleanText(lead.reasonWon),
    reason_lost: cleanText(lead.reasonLost),
    converted_to_project_id: cleanText(lead.convertedToProjectId),
    originated_from_response_id: cleanText(lead.originatedFromResponseId),
    notes: cleanText(lead.notes),
    tags: textArray(lead.tags),
    source_ref: `MasterLeads:${lead.id ?? ''}`,
    raw: lead,
  })).filter((row) => row.lead_name || row.mobile);
}

function collectSalesDeals(masters) {
  return asArray(masters.MasterSalesDeals)
    .map((deal) => {
      const stage = cleanText(deal.stage || 'Sales Qualified') || 'Sales Qualified';
      const amount = amountFromBudget(deal.dealValue);
      const probability = Number(deal.probability) || 0;
      return {
        id: `deal:${deal.id ?? keyPart(deal.name || deal.linkedLeadId)}`,
        workspace_id: WORKSPACE_ID,
        lead_id: deal.linkedLeadId ? `lead:${deal.linkedLeadId}` : null,
        client_id: deal.linkedClientId ? `client:${deal.linkedClientId}` : null,
        project_id: cleanText(deal.convertedProjectId) || null,
        deal_name: cleanText(deal.name),
        stage,
        estimated_value: amount,
        probability,
        weighted_value: amount == null ? null : Math.round(amount * probability) / 100,
        expected_close_date: cleanText(deal.expectedCloseDate),
        proposal_status: cleanText(deal.proposalStatus),
        pitch_status: cleanText(deal.pitchStatus),
        pitch_date: cleanText(deal.pitchDate),
        contract_status: cleanText(deal.contractStatus),
        sales_owner: cleanText(deal.salesOwner),
        status: stage,
        source_ref: `MasterSalesDeals:${deal.id ?? ''}`,
        raw: deal,
      };
    }).filter((row) => row.deal_name && !isObsoleteSalesStageName(row.stage));
}

function collectProjects(projects, clientsByName) {
  return projects.map((project) => {
    const wizard = project._wizard || {};
    return {
      id: String(project.id),
      workspace_id: WORKSPACE_ID,
      project_code: cleanText(project.id),
      project_name: cleanText(project.name || project.projectName || project.id),
      client_id: findClientIdForProject(project, clientsByName),
      client_name: cleanText(project.client || wizard.primaryClientName),
      category: cleanText(project.category),
      property_type: cleanText(project.propertyType),
      service_type: cleanText(project.serviceType),
      city: cleanText(project.city),
      state: cleanText(project.state),
      current_stage: cleanText(project.currentStage),
      status: cleanText(project.status),
      progress: num(project.progress),
      start_date: cleanText(project.startDate),
      expected_completion: cleanText(project.expCompletion),
      project_manager: cleanText(project.pm),
      project_manager_id: null,
      total_project_value: num(wizard.totalProjectValue),
      accent: cleanText(project.accent),
      raw: project,
    };
  });
}

function collectWorkflow(masters, projects) {
  const stages = [];
  const activities = [];
  const tasks = [];
  const checklists = [];
  const deliverables = [];

  asArray(masters.MasterWorkflowStages).forEach((stage, idx) => {
    stages.push({
      id: `master-stage:${stage.id ?? keyPart(stage.value)}`,
      workspace_id: WORKSPACE_ID,
      project_id: null,
      source_type: 'master',
      source_ref: `MasterWorkflowStages:${stage.id ?? ''}`,
      stage_name: cleanText(stage.value || stage.name),
      linked_service_type: cleanText(stage.linkedServiceType),
      stage_order: Number(stage.ord ?? idx),
      status: '',
      progress: null,
      start_date: '',
      due_date: '',
      raw: stage,
    });
  });

  asArray(masters.MasterActivities).forEach((activity, idx) => {
    activities.push({
      id: `master-activity:${activity.id ?? keyPart(activity.value)}`,
      workspace_id: WORKSPACE_ID,
      project_id: null,
      stage_id: activity.linkedStage ? `master-stage-name:${keyPart(activity.linkedStage)}` : null,
      source_type: 'master',
      source_ref: `MasterActivities:${activity.id ?? ''}`,
      activity_name: cleanText(activity.value || activity.name),
      linked_stage: cleanText(activity.linkedStage),
      linked_service_type: cleanText(activity.linkedServiceType),
      activity_order: Number(activity.ord ?? idx),
      status: '',
      progress: null,
      owner_id: null,
      owner_name: '',
      description: cleanText(activity.description),
      raw: activity,
    });
  });

  asArray(masters.MasterTasks).forEach((task, idx) => {
    const taskId = `master-task:${task.id ?? keyPart(task.value)}`;
    tasks.push({
      id: taskId,
      workspace_id: WORKSPACE_ID,
      project_id: null,
      stage_id: null,
      activity_id: task.linkedActivity ? `master-activity-name:${keyPart(task.linkedActivity)}` : null,
      source_type: 'master',
      source_ref: `MasterTasks:${task.id ?? ''}`,
      task_name: cleanText(task.value || task.title),
      description: cleanText(task.description),
      linked_stage: cleanText(task.linkedStage),
      linked_activity: cleanText(task.linkedActivity),
      task_order: Number(task.ord ?? idx),
      status: '',
      assignee_id: null,
      assignee_name: '',
      assigned_by_id: null,
      start_date: '',
      due_date: '',
      completed_on: '',
      default_duration_days: Number(task.defaultDurationDays) || null,
      default_role_tier: cleanText(task.defaultRoleTier),
      is_client_visible: true,
      is_vendor_visible: false,
      is_internal_only: false,
      raw: task,
    });
    checklistItemsFrom(task.defaultChecklist).forEach((item) => {
      checklists.push({
        id: `${taskId}:check:${item.order}`,
        workspace_id: WORKSPACE_ID,
        project_id: null,
        task_id: taskId,
        source_type: 'master',
        source_ref: `MasterTasks:${task.id ?? ''}:defaultChecklist`,
        item_text: item.text,
        item_order: item.order,
        is_done: item.done,
        raw: item.raw,
      });
    });
  });

  asArray(masters.MasterDeliverables).forEach((deliverable, idx) => {
    deliverables.push({
      id: `master-deliverable:${deliverable.id ?? keyPart(deliverable.value)}`,
      workspace_id: WORKSPACE_ID,
      project_id: null,
      stage_id: null,
      activity_id: deliverable.linkedActivity ? `master-activity-name:${keyPart(deliverable.linkedActivity)}` : null,
      source_type: 'master',
      source_ref: `MasterDeliverables:${deliverable.id ?? ''}`,
      deliverable_name: cleanText(deliverable.value || deliverable.title),
      linked_stage: cleanText(deliverable.linkedStage),
      linked_activity: cleanText(deliverable.linkedActivity),
      format: cleanText(deliverable.format),
      status: cleanText(deliverable.status),
      due_date: cleanText(deliverable.dueDate),
      client_facing: boolFromYesNo(deliverable.clientFacing),
      description: cleanText(deliverable.description),
      attachment_count: asArray(deliverable.attachments).length,
      raw: deliverable,
    });
  });

  projects.forEach((project) => {
    const wizard = project._wizard || {};
    asArray(wizard.projectStages).forEach((stage, sIdx) => {
      const stageId = `${project.id}:stage:${stage.id ?? keyPart(stage.name || stage.value || sIdx)}`;
      stages.push({
        id: stageId,
        workspace_id: WORKSPACE_ID,
        project_id: String(project.id),
        source_type: 'project',
        source_ref: `project._wizard.projectStages:${stage.id ?? sIdx}`,
        stage_name: cleanText(stage.name || stage.value || stage.stageName || project.currentStage),
        linked_service_type: cleanText(project.serviceType),
        stage_order: Number(stage.order ?? stage.ord ?? sIdx),
        status: cleanText(stage.status),
        progress: num(stage.progress),
        start_date: cleanText(stage.startDate),
        due_date: cleanText(stage.endDate || stage.dueDate),
        raw: stage,
      });

      asArray(stage.activities).forEach((activity, aIdx) => {
        const activityId = `${stageId}:activity:${activity.id ?? keyPart(activity.name || activity.value || aIdx)}`;
        activities.push({
          id: activityId,
          workspace_id: WORKSPACE_ID,
          project_id: String(project.id),
          stage_id: stageId,
          source_type: 'project',
          source_ref: `projectStage.activities:${activity.id ?? aIdx}`,
          activity_name: cleanText(activity.name || activity.value || activity.title),
          linked_stage: cleanText(stage.name || stage.value),
          linked_service_type: cleanText(project.serviceType),
          activity_order: Number(activity.order ?? activity.ord ?? aIdx),
          status: cleanText(activity.status),
          progress: num(activity.progress),
          owner_id: activity.assigneeId ? `team:${activity.assigneeId}` : null,
          owner_name: cleanText(activity.assigneeName || activity.assignee),
          description: cleanText(activity.description),
          raw: activity,
        });

        asArray(activity.deliverables).forEach((deliverable, dIdx) => {
          deliverables.push(buildProjectDeliverable(project, deliverable, dIdx, stageId, activityId, stage, activity));
        });
        asArray(activity.tasks).forEach((task, tIdx) => {
          addProjectTaskRows({ project, task, index: tIdx, stageId, activityId, stage, activity, tasks, checklists });
        });
      });
    });

    asArray(wizard.projectDeliverables).forEach((deliverable, idx) => {
      deliverables.push(buildProjectDeliverable(project, deliverable, idx, null, null));
    });
    asArray(wizard.projectTasks).forEach((task, idx) => {
      addProjectTaskRows({ project, task, index: idx, stageId: null, activityId: null, tasks, checklists });
    });
  });

  return { stages, activities, tasks, checklists, deliverables };
}

function buildProjectDeliverable(project, deliverable, idx, stageId, activityId, stage = {}, activity = {}) {
  const id = `${project.id}:deliverable:${deliverable.id ?? keyPart(deliverable.name || deliverable.value || deliverable.title || idx)}`;
  return {
    id,
    workspace_id: WORKSPACE_ID,
    project_id: String(project.id),
    stage_id: stageId,
    activity_id: activityId,
    source_type: 'project',
    source_ref: `project.deliverables:${deliverable.id ?? idx}`,
    deliverable_name: cleanText(deliverable.name || deliverable.value || deliverable.title),
    linked_stage: cleanText(deliverable.linkedStage || stage.name || stage.value),
    linked_activity: cleanText(deliverable.linkedActivity || activity.name || activity.value),
    format: cleanText(deliverable.format),
    status: cleanText(deliverable.status),
    due_date: cleanText(deliverable.dueDate),
    client_facing: boolFromYesNo(deliverable.clientFacing),
    description: cleanText(deliverable.description),
    attachment_count: asArray(deliverable.attachments).length,
    raw: deliverable,
  };
}

function addProjectTaskRows({ project, task, index, stageId, activityId, stage = {}, activity = {}, tasks, checklists }) {
  const taskId = `${project.id}:task:${task.id ?? keyPart(task.title || task.value || index)}`;
  tasks.push({
    id: taskId,
    workspace_id: WORKSPACE_ID,
    project_id: String(project.id),
    stage_id: stageId,
    activity_id: activityId,
    source_type: 'project',
    source_ref: `project._wizard.projectTasks:${task.id ?? index}`,
    task_name: cleanText(task.title || task.value || task.name),
    description: cleanText(task.description),
    linked_stage: cleanText(task.linkedStage || stage.name || stage.value),
    linked_activity: cleanText(task.linkedActivity || activity.name || activity.value),
    task_order: Number(task.order ?? task.ord ?? index),
    status: cleanText(task.status || 'todo'),
    assignee_id: task.assigneeId ? `team:${task.assigneeId}` : null,
    assignee_name: cleanText(task.assigneeName || task.assignee),
    assigned_by_id: task.assignedById ? `team:${task.assignedById}` : null,
    start_date: cleanText(task.startDate),
    due_date: cleanText(task.dueDate),
    completed_on: cleanText(task.completedOn || task.closedAt),
    default_duration_days: Number(task.defaultDurationDays) || null,
    default_role_tier: cleanText(task.defaultRoleTier),
    is_client_visible: task.isClientVisible !== false,
    is_vendor_visible: task.isVendorVisible === true,
    is_internal_only: task.isInternalOnly === true,
    raw: task,
  });
  checklistItemsFrom(task.checklist || task.checklists || task.items || task.defaultChecklist).forEach((item) => {
    checklists.push({
      id: `${taskId}:check:${item.raw?.id ?? item.order}`,
      workspace_id: WORKSPACE_ID,
      project_id: String(project.id),
      task_id: taskId,
      source_type: 'project',
      source_ref: `projectTask:${task.id ?? index}:checklist`,
      item_text: item.text,
      item_order: item.order,
      is_done: item.done,
      raw: item.raw,
    });
  });
}

function idFromSourceRef(sourceRef, fallback) {
  const ref = cleanText(sourceRef);
  const raw = ref.includes(':') ? ref.split(':').pop() : '';
  if (/^\d+$/.test(raw)) return Number(raw);
  return raw || fallback;
}

function leadSourceFromRow(row) {
  return {
    id: idFromSourceRef(row.source_ref, row.id),
    category: cleanText(row.category),
    source: cleanText(row.source_name),
    isActive: row.is_active !== false,
    remarks: cleanText(row.remarks),
    updatedOn: cleanText(row.updated_at),
    createdOn: cleanText(row.created_at),
    _fromSupabase: true,
  };
}

function leadStatusFromRow(row) {
  return {
    id: idFromSourceRef(row.source_ref, row.id),
    status: cleanText(row.status_name),
    order: Number(row.status_order) || 0,
    tone: cleanText(row.tone),
    isActive: row.is_active !== false,
    isTerminal: row.is_terminal === true,
    isWin: row.is_win === true,
    updatedOn: cleanText(row.updated_at),
    createdOn: cleanText(row.created_at),
    _fromSupabase: true,
  };
}

function salesStageFromRow(row) {
  return {
    id: idFromSourceRef(row.source_ref, row.id),
    status: cleanText(row.status_name),
    order: Number(row.status_order) || 0,
    probability: Number(row.probability) || 0,
    tone: cleanText(row.tone),
    isActive: row.is_active !== false,
    isTerminal: row.is_terminal === true,
    isWin: row.is_win === true,
    updatedOn: cleanText(row.updated_at),
    createdOn: cleanText(row.created_at),
    _fromSupabase: true,
  };
}

function leadFromRow(row) {
  return {
    id: idFromSourceRef(row.source_ref, row.id),
    name: cleanText(row.lead_name),
    mobile: cleanText(row.mobile),
    email: cleanText(row.email),
    city: cleanText(row.city),
    sourceCategory: cleanText(row.source_category),
    specificSource: cleanText(row.specific_source),
    referralPersonName: cleanText(row.referral_person_name),
    status: cleanText(row.status || 'New Lead') || 'New Lead',
    assignedTo: cleanText(row.assigned_to),
    assignedToId: row.assigned_to_id ? cleanText(row.assigned_to_id).replace(/^team:/, '') : '',
    enquiryDate: cleanText(row.enquiry_date),
    nextFollowUpDate: cleanText(row.next_follow_up_date),
    projectCategory: cleanText(row.project_category),
    propertyType: cleanText(row.property_type),
    projectSize: cleanText(row.project_size),
    serviceInterest: cleanText(row.service_interest),
    estimatedBudget: cleanText(row.estimated_budget),
    expectedStartTimeline: cleanText(row.expected_start_timeline),
    reasonWon: cleanText(row.reason_won),
    reasonLost: cleanText(row.reason_lost),
    convertedToProjectId: cleanText(row.converted_to_project_id),
    originatedFromResponseId: cleanText(row.originated_from_response_id),
    notes: cleanText(row.notes),
    tags: textArray(row.tags),
    updatedOn: cleanText(row.updated_at),
    createdOn: cleanText(row.created_at),
    _fromSupabase: true,
  };
}

function salesDealFromRow(row) {
  const raw = row.raw && typeof row.raw === 'object' ? row.raw : {};
  return {
    ...raw,
    id: idFromSourceRef(row.source_ref, row.id),
    name: cleanText(row.deal_name),
    stage: cleanText(row.stage || row.status || 'Sales Qualified') || 'Sales Qualified',
    dealValue: cleanText(raw.dealValue) || (row.estimated_value != null ? String(row.estimated_value) : ''),
    proposalStatus: cleanText(row.proposal_status || raw.proposalStatus || 'Not Started') || 'Not Started',
    pitchStatus: cleanText(row.pitch_status || raw.pitchStatus || 'Not Done') || 'Not Done',
    pitchDate: cleanText(row.pitch_date || raw.pitchDate),
    expectedCloseDate: cleanText(row.expected_close_date || raw.expectedCloseDate),
    probability: Number(row.probability) || Number(raw.probability) || 0,
    contractStatus: cleanText(row.contract_status || raw.contractStatus || 'Not Started') || 'Not Started',
    salesOwner: cleanText(row.sales_owner || raw.salesOwner),
    linkedLeadId: row.lead_id ? cleanText(row.lead_id).replace(/^lead:/, '') : raw.linkedLeadId,
    linkedClientId: row.client_id ? cleanText(row.client_id).replace(/^client:/, '') : raw.linkedClientId,
    convertedProjectId: cleanText(row.project_id || raw.convertedProjectId),
    updatedOn: cleanText(row.updated_at),
    createdOn: cleanText(row.created_at),
    _fromSupabase: true,
  };
}

function clientFromRow(row) {
  const raw = row.raw && typeof row.raw === 'object' ? row.raw : {};
  return {
    ...raw,
    id: idFromSourceRef(row.source_ref, row.id),
    value: cleanText(row.display_name),
    initials: cleanText(row.initials),
    clientType: cleanText(row.client_type),
    primaryContact: cleanText(row.mobile),
    primaryEmail: cleanText(row.email),
    city: cleanText(row.city),
    address: cleanText(row.address),
    gstin: cleanText(row.gstin),
    accent: cleanText(row.accent),
    flags: textArray(row.flags),
    updatedOn: cleanText(row.updated_at),
    createdOn: cleanText(row.created_at),
    _fromSupabase: true,
  };
}

function teamMemberFromRow(row) {
  const raw = row.raw && typeof row.raw === 'object' ? row.raw : {};
  return {
    ...raw,
    id: idFromSourceRef(row.source_ref, row.id),
    value: cleanText(row.display_name),
    initials: cleanText(row.initials),
    role: cleanText(row.role_title),
    dept: cleanText(row.department),
    email: cleanText(row.email),
    mobile: cleanText(row.mobile),
    status: cleanText(row.status || 'Active') || 'Active',
    managerId: row.manager_id ? cleanText(row.manager_id).replace(/^team:/, '') : raw.managerId,
    accent: cleanText(row.accent),
    updatedOn: cleanText(row.updated_at),
    createdOn: cleanText(row.created_at),
    _fromSupabase: true,
  };
}

async function selectAll(table, orderColumn) {
  let query = supabase.from(table).select('*');
  if (orderColumn) query = query.order(orderColumn, { ascending: true });
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function loadPipelineFoundation() {
  if (!isSupabaseConfigured || !supabase) {
    return { ok: false, mode: 'not_configured', masters: {}, counts: {} };
  }

  const [clientRows, teamRows, sourceRows, statusRows, salesStageRows, leadRows, dealRows] = await Promise.all([
    selectAll(PHASE1_TABLES.clients, 'display_name'),
    selectAll(PHASE1_TABLES.team, 'display_name'),
    selectAll(PHASE1_TABLES.leadSources, 'source_name'),
    selectAll(PHASE1_TABLES.leadStatuses, 'status_order'),
    selectAll(PHASE1_TABLES.salesStages, 'status_order'),
    selectAll(PHASE1_TABLES.leads, 'created_at'),
    selectAll(PHASE1_TABLES.salesDeals, 'created_at'),
  ]);

  const masters = {};
  if (clientRows.length) masters.MasterClients = clientRows.map(clientFromRow);
  if (teamRows.length) masters.MasterTeamMembers = teamRows.map(teamMemberFromRow);
  if (sourceRows.length) masters.MasterLeadSources = sourceRows.map(leadSourceFromRow);
  if (statusRows.length) masters.MasterLeadStatuses = statusRows.map(leadStatusFromRow);
  if (salesStageRows.length) masters.MasterSalesStages = salesStageRows.map(salesStageFromRow);
  if (leadRows.length) masters.MasterLeads = leadRows.map(leadFromRow);
  const cleanDealRows = dealRows.filter((row) => !isObsoleteSalesStageName(row.stage || row.status));
  if (cleanDealRows.length) masters.MasterSalesDeals = cleanDealRows.map(salesDealFromRow);

  return {
    ok: true,
    mode: 'supabase',
    masters,
    counts: {
      studio_clients: clientRows.length,
      studio_team_members: teamRows.length,
      lead_sources: sourceRows.length,
      lead_statuses: statusRows.length,
      sales_stages: salesStageRows.length,
      master_leads: leadRows.length,
      sales_deals: dealRows.length,
    },
  };
}

async function upsertRows(table, rows) {
  if (!rows.length) return { table, count: 0 };
  const { error } = await supabase.from(table).upsert(rows, { onConflict: 'id' });
  if (error) throw error;
  return { table, count: rows.length };
}

async function deleteObsoleteSalesDeals() {
  const { error } = await supabase
    .from(PHASE1_TABLES.salesDeals)
    .delete()
    .in('stage', OBSOLETE_SALES_STAGE_LABELS);
  if (error) throw error;
}

export async function syncPhase1Foundation({ projects = [], masters = {} } = {}) {
  if (!isSupabaseConfigured || !supabase) {
    return { ok: false, mode: 'not_configured', counts: {} };
  }

  const { rows: clients, byName: clientsByName } = collectClients(projects, masters);
  const leadSources = collectLeadSources(masters);
  const leadStatuses = collectLeadStatuses(masters);
  const salesStages = collectSalesStages(masters);
  const leads = collectLeads(masters);
  const salesDeals = collectSalesDeals(masters);
  const team = collectTeam(masters);
  const projectRows = collectProjects(projects, clientsByName);
  const workflow = collectWorkflow(masters, projects);

  const batches = [
    [PHASE1_TABLES.leadSources, leadSources],
    [PHASE1_TABLES.leadStatuses, leadStatuses],
    [PHASE1_TABLES.salesStages, salesStages],
    [PHASE1_TABLES.leads, leads],
    [PHASE1_TABLES.salesDeals, salesDeals],
    [PHASE1_TABLES.clients, clients],
    [PHASE1_TABLES.team, team],
    [PHASE1_TABLES.projects, projectRows],
    [PHASE1_TABLES.stages, workflow.stages],
    [PHASE1_TABLES.activities, workflow.activities],
    [PHASE1_TABLES.tasks, workflow.tasks],
    [PHASE1_TABLES.checklists, workflow.checklists],
    [PHASE1_TABLES.deliverables, workflow.deliverables],
  ];

  await deleteObsoleteSalesDeals();

  const results = [];
  for (const [table, rows] of batches) {
    results.push(await upsertRows(table, rows));
  }

  return {
    ok: true,
    mode: 'supabase',
    syncedAt: new Date().toISOString(),
    counts: Object.fromEntries(results.map((r) => [r.table, r.count])),
  };
}

export async function syncLeadRows(leads = []) {
  if (!isSupabaseConfigured || !supabase) {
    return { ok: false, mode: 'not_configured', count: 0 };
  }
  const rows = collectLeads({ MasterLeads: leads });
  const result = await upsertRows(PHASE1_TABLES.leads, rows);
  return {
    ok: true,
    mode: 'supabase',
    syncedAt: new Date().toISOString(),
    count: result.count,
  };
}

export async function deleteLeadRow(leadId) {
  if (!isSupabaseConfigured || !supabase) {
    return { ok: false, mode: 'not_configured' };
  }
  const id = String(leadId || '').startsWith('lead:') ? String(leadId) : `lead:${leadId}`;
  const { error } = await supabase.from(PHASE1_TABLES.leads).delete().eq('id', id);
  if (error) throw error;
  return {
    ok: true,
    mode: 'supabase',
    deletedAt: new Date().toISOString(),
  };
}

export async function listPhase1FoundationHealth() {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase.from('studio_phase1_foundation_health').select('*');
  if (error) throw error;
  return data || [];
}
