import { supabase, isSupabaseConfigured } from './supabase';
import { WORKSPACE_ID } from './fileStorage';

function cleanText(value) {
  return value == null ? '' : String(value).trim();
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function templateId(id) {
  return String(id || '').startsWith('questionnaire-template:')
    ? String(id)
    : `questionnaire-template:${id}`;
}

function questionId(id) {
  return String(id || '').startsWith('questionnaire-question:')
    ? String(id)
    : `questionnaire-question:${id}`;
}

function responseId(response = {}) {
  const id = cleanText(response.shareableLinkId || response.id || Date.now());
  return id.startsWith('questionnaire-response:') ? id : `questionnaire-response:${id}`;
}

function stripPrefix(id, prefix) {
  return cleanText(id).replace(new RegExp(`^${prefix}:`), '');
}

function templateToRow(template = {}) {
  return {
    id: templateId(template.id),
    studio_id: cleanText(template.studioId || template.studio_id || WORKSPACE_ID) || WORKSPACE_ID,
    template_name: cleanText(template.name || template.formName),
    project_category: cleanText(template.propertyCategory || template.projectCategory),
    property_type: cleanText(template.propertyType),
    variant: cleanText(template.variant || 'standard'),
    status: cleanText(template.status || (template.active === false ? 'inactive' : 'active')) || 'active',
    estimated_minutes: Number(template.estimatedMinutes || template.minutes) || null,
    intro_message_template_id: cleanText(template.introMessageTemplateId),
    thank_you_message_template_id: cleanText(template.thankYouMessageTemplateId),
    intro_text: cleanText(template.introText),
    thank_you_text: cleanText(template.outroText || template.thankYouText),
    raw: template,
  };
}

function questionToRow(question = {}) {
  return {
    id: questionId(question.id),
    studio_id: cleanText(question.studioId || question.studio_id || WORKSPACE_ID) || WORKSPACE_ID,
    template_id: templateId(question.templateId),
    question_order: Number(question.order) || 0,
    question_text: cleanText(question.text || question.question),
    question_type: cleanText(question.type || 'text'),
    is_required: question.required !== false,
    weight: Number(question.weight) || 0,
    options_json: asArray(question.options),
    scoring_json: question.scoring || question.scoringMap || {},
    help_text: cleanText(question.why || question.helpText),
    raw: question,
  };
}

function responseToRow(response = {}) {
  return {
    id: responseId(response),
    studio_id: cleanText(response.studioId || response.studio_id || WORKSPACE_ID) || WORKSPACE_ID,
    template_id: templateId(response.templateId),
    shareable_link_id: cleanText(response.shareableLinkId),
    prospect_name: cleanText(response.prospectName),
    prospect_phone: cleanText(response.prospectPhone),
    prospect_email: cleanText(response.prospectEmail),
    prospect_city: cleanText(response.prospectCity),
    project_category: cleanText(response.projectCategory),
    property_type: cleanText(response.propertyType),
    source_channel: cleanText(response.sourceChannel || 'direct') || 'direct',
    status: cleanText(response.status || 'link_sent') || 'link_sent',
    answers_json: asArray(response.answers),
    score_total: Number(response.scoreTotal) || 0,
    score_max_possible: Number(response.scoreMaxPossible) || 0,
    score_pct: Number(response.scorePct) || 0,
    tier: cleanText(response.tier || 'cold') || 'cold',
    created_on: cleanText(response.createdOn) || null,
    last_activity_on: cleanText(response.lastActivityOn) || null,
    completed_on: cleanText(response.completedOn) || null,
    converted_to_project_id: cleanText(response.convertedToProjectId),
    raw: response,
  };
}

function templateFromRow(row = {}) {
  const raw = row.raw && typeof row.raw === 'object' ? row.raw : {};
  return {
    ...raw,
    id: stripPrefix(row.id, 'questionnaire-template') || raw.id,
    studioId: cleanText(row.studio_id),
    name: cleanText(row.template_name),
    propertyCategory: cleanText(row.project_category),
    propertyType: cleanText(row.property_type),
    variant: cleanText(row.variant),
    status: cleanText(row.status || 'active'),
    estimatedMinutes: Number(row.estimated_minutes) || raw.estimatedMinutes,
    introMessageTemplateId: cleanText(row.intro_message_template_id),
    thankYouMessageTemplateId: cleanText(row.thank_you_message_template_id),
    introText: cleanText(row.intro_text),
    outroText: cleanText(row.thank_you_text),
    _fromSupabase: true,
  };
}

function questionFromRow(row = {}) {
  const raw = row.raw && typeof row.raw === 'object' ? row.raw : {};
  return {
    ...raw,
    id: stripPrefix(row.id, 'questionnaire-question') || raw.id,
    studioId: cleanText(row.studio_id),
    templateId: stripPrefix(row.template_id, 'questionnaire-template') || raw.templateId,
    order: Number(row.question_order) || 0,
    text: cleanText(row.question_text),
    type: cleanText(row.question_type || 'text'),
    required: row.is_required !== false,
    weight: Number(row.weight) || 0,
    options: asArray(row.options_json),
    scoring: row.scoring_json || {},
    why: cleanText(row.help_text),
    _fromSupabase: true,
  };
}

function responseFromRow(row = {}) {
  const raw = row.raw && typeof row.raw === 'object' ? row.raw : {};
  return {
    ...raw,
    id: stripPrefix(row.id, 'questionnaire-response') || raw.id,
    studioId: cleanText(row.studio_id),
    templateId: stripPrefix(row.template_id, 'questionnaire-template') || raw.templateId,
    shareableLinkId: cleanText(row.shareable_link_id),
    prospectName: cleanText(row.prospect_name),
    prospectPhone: cleanText(row.prospect_phone),
    prospectEmail: cleanText(row.prospect_email),
    prospectCity: cleanText(row.prospect_city),
    projectCategory: cleanText(row.project_category),
    propertyType: cleanText(row.property_type),
    sourceChannel: cleanText(row.source_channel),
    status: cleanText(row.status),
    answers: asArray(row.answers_json),
    scoreTotal: Number(row.score_total) || 0,
    scoreMaxPossible: Number(row.score_max_possible) || 0,
    scorePct: Number(row.score_pct) || 0,
    tier: cleanText(row.tier),
    createdOn: cleanText(row.created_on || row.created_at),
    lastActivityOn: cleanText(row.last_activity_on || row.updated_at),
    completedOn: cleanText(row.completed_on),
    convertedToProjectId: cleanText(row.converted_to_project_id),
    _fromSupabase: true,
  };
}

async function upsertRows(table, rows) {
  if (!rows.length) return { table, count: 0 };
  const { error } = await supabase.from(table).upsert(rows, { onConflict: 'id' });
  if (error) throw error;
  return { table, count: rows.length };
}

async function selectAll(table, orderColumn) {
  let query = supabase.from(table).select('*');
  if (orderColumn) query = query.order(orderColumn, { ascending: true });
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function loadQuestionnaireFoundation() {
  if (!isSupabaseConfigured || !supabase) {
    return { ok: false, mode: 'not_configured', masters: {}, counts: {} };
  }
  const [templates, questions, responses] = await Promise.all([
    selectAll('questionnaire_templates', 'template_name'),
    selectAll('questionnaire_questions', 'question_order'),
    selectAll('questionnaire_responses', 'created_at'),
  ]);
  const masters = {};
  if (templates.length) masters.MasterQuestionnaireTemplates = templates.map(templateFromRow);
  if (questions.length) masters.MasterQuestionnaireQuestions = questions.map(questionFromRow);
  if (responses.length) masters.QuestionnaireResponses = responses.map(responseFromRow);
  return {
    ok: true,
    mode: 'supabase',
    masters,
    counts: {
      questionnaire_templates: templates.length,
      questionnaire_questions: questions.length,
      questionnaire_responses: responses.length,
    },
  };
}

export async function syncQuestionnaireFoundation(masters = {}) {
  if (!isSupabaseConfigured || !supabase) {
    return { ok: false, mode: 'not_configured', counts: {} };
  }
  const templates = asArray(masters.MasterQuestionnaireTemplates).map(templateToRow).filter((row) => row.template_name);
  const questions = asArray(masters.MasterQuestionnaireQuestions).map(questionToRow).filter((row) => row.question_text && row.template_id);
  const responses = asArray(masters.QuestionnaireResponses).map(responseToRow).filter((row) => row.template_id && row.shareable_link_id);
  const results = [];
  results.push(await upsertRows('questionnaire_templates', templates));
  results.push(await upsertRows('questionnaire_questions', questions));
  results.push(await upsertRows('questionnaire_responses', responses));
  return {
    ok: true,
    mode: 'supabase',
    syncedAt: new Date().toISOString(),
    counts: Object.fromEntries(results.map((item) => [item.table, item.count])),
  };
}
