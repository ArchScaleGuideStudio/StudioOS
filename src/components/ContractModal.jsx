import React, { useEffect, useMemo, useState } from 'react';
import {
  Copy,
  Download,
  FileCheck2,
  Link as LinkIcon,
  Mail,
  MessageSquare,
  Printer,
} from 'lucide-react';
import { createShareLink, listShareLinksForDocument, updateShareLink } from '../lib/shareLinks';

const uid = () => `contract-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
let documentAmountDisplayUnit = 'auto';
const isoToday = () => new Date().toISOString().slice(0, 10);
const addDays = (date, days) => {
  const d = date ? new Date(date) : new Date();
  if (Number.isNaN(d.getTime())) return isoToday();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};
const money = (n) => {
  const amount = Number(n) || 0;
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';
  if (documentAmountDisplayUnit === 'lakhs') {
    const value = abs / 100000;
    return `${sign}₹${value >= 100 ? value.toFixed(0) : value >= 10 ? value.toFixed(1) : value.toFixed(2)} L`;
  }
  if (documentAmountDisplayUnit === 'crores') {
    const value = abs / 10000000;
    return `${sign}₹${value >= 10 ? value.toFixed(1) : value.toFixed(2)} Cr`;
  }
  if (abs >= 10000000) return `${sign}₹${(abs / 10000000).toFixed(abs >= 100000000 ? 1 : 2)} Cr`;
  if (abs >= 100000) return `${sign}₹${(abs / 100000).toFixed(abs >= 1000000 ? 1 : 2)} L`;
  return `${sign}₹${Math.round(abs).toLocaleString('en-IN')}`;
};
const fmtDate = (s) => {
  if (!s) return '';
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
};
const cleanCode = (value, fallback = 'PROJECT') => (
  (value || fallback)
    .toString()
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '')
    .toUpperCase()
    .slice(0, 18) || fallback
);
const safeFileName = (value) => String(value || 'contract')
  .replace(/[^a-z0-9-]+/gi, '-')
  .replace(/^-|-$/g, '')
  .toLowerCase();
const esc = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');
const paragraphs = (value) => String(value || '')
  .split(/\n{2,}/)
  .map((p) => `<p>${esc(p).replace(/\n/g, '<br />')}</p>`)
  .join('');

const STATUS_OPTIONS = ['Draft', 'Contract Prepared', 'Contract Sent', 'Signed', 'Cancelled'];

const DEFAULT_CONTRACT_TEMPLATES = [
  {
    id: 'design-services',
    value: 'Design Services Agreement',
    type: 'Design Services',
    linkedServiceType: 'Design + Technical Drawing + Consultation',
    description: 'Interior design scope, stage approvals, fees, payments, revisions, and client responsibilities.',
    sections: [
      {
        title: 'Scope of Services',
        body: 'The Studio shall provide interior design services for the Project, including concept direction, schematic design, design development, drawings, specifications, coordination notes, and stage-wise deliverables as mutually agreed.\n\nAny additional services, site visits, procurement support, or execution coordination outside the agreed scope shall be recorded as a variation or addendum.',
      },
      {
        title: 'Commercial Terms and Milestones',
        body: 'The Client agrees to pay the stage amount linked to this contract/milestone as per the payment schedule. Work for the next stage may be paused until the applicable milestone payment is received.\n\nTaxes, reimbursables, vendor payments, statutory fees, printing, travel, and third-party costs are payable separately unless specifically included in the commercial proposal.',
      },
      {
        title: 'Approvals, Timelines, and Revisions',
        body: 'Client approvals must be provided in writing through email, WhatsApp, project portal, or signed minutes. Timelines are dependent on timely approvals, information availability, and site/vendor dependencies.\n\nTwo rounds of reasonable design revisions are included at each major stage unless otherwise stated. Additional revisions may be billed separately.',
      },
    ],
  },
  {
    id: 'turnkey-build',
    value: 'Design + Build / Turnkey Contract',
    type: 'Turnkey Execution',
    linkedServiceType: 'Design + Build (Turnkey)',
    description: 'Execution responsibilities, procurement coordination, site dependencies, variation orders, and handover.',
    sections: [
      {
        title: 'Execution Scope',
        body: 'The Studio shall coordinate design-led execution for the Project as per approved drawings, specifications, and agreed BOQ. Execution may involve vendors, contractors, suppliers, site supervisors, and specialist consultants.\n\nAny work not clearly listed in the approved scope, drawings, BOQ, or written variation shall be treated as additional work.',
      },
      {
        title: 'Procurement and Site Conditions',
        body: 'Material selection, procurement timelines, availability, lead times, and site access conditions may affect the project schedule. The Client shall provide site access, permissions, power, water, lift access, society approvals, and timely decisions.\n\nMaterial substitutions may be recommended when original products are delayed, discontinued, or commercially unsuitable.',
      },
      {
        title: 'Payments, Variations, and Handover',
        body: 'The Client agrees to release payments as per the milestone schedule. Variation orders, additional quantities, upgraded materials, or client-requested changes shall be documented and billed separately.\n\nHandover shall be subject to completion of agreed scope, settlement of dues, snag closure process, and final documentation.',
      },
    ],
  },
  {
    id: 'procurement-site-coordination',
    value: 'Procurement & Site Coordination Addendum',
    type: 'Addendum',
    linkedServiceType: 'Design + Technical Drawing + Consultation + Procurement',
    description: 'Add-on contract for sourcing, vendor coordination, purchase approvals, and site administration.',
    sections: [
      {
        title: 'Addendum Purpose',
        body: 'This addendum records additional procurement, vendor coordination, or site administration services requested by the Client for the Project. It shall be read along with the primary design or execution agreement.',
      },
      {
        title: 'Procurement Responsibilities',
        body: 'The Studio may assist with product research, vendor comparison, quotation review, sample coordination, purchase tracking, and installation coordination. Vendor payments, product warranties, delivery risks, and statutory obligations remain governed by the vendor/client transaction unless separately contracted.',
      },
      {
        title: 'Fees and Validity',
        body: 'Fees under this addendum are payable as per the linked milestone or agreed stage amount. The commercial terms remain valid for the period mentioned in the contract unless extended in writing.',
      },
    ],
  },
];

function inferContractServiceType(row = {}) {
  if (row.linkedServiceType || row.serviceType || row.defaultServiceType) return row.linkedServiceType || row.serviceType || row.defaultServiceType;
  const haystack = `${row.value || ''} ${row.name || ''} ${row.type || ''}`.toLowerCase();
  if (haystack.includes('turnkey') || haystack.includes('build')) return 'Design + Build (Turnkey)';
  if (haystack.includes('procurement')) return 'Design + Technical Drawing + Consultation + Procurement';
  return 'Design + Technical Drawing + Consultation';
}

function resolveStudio(masters = {}) {
  const settings = masters.MasterStudioSettings?.[0] || {};
  return {
    name: settings.studioName || 'Studio/OS Demo',
    gstin: settings.gstin || '',
    address: settings.registeredAddress || '',
    email: settings.billingEmail || '',
    phone: settings.phone || '',
    logoUrl: settings.logoUrl || '',
    signatoryName: settings.authorisedSignatory || settings.ownerName || '',
    signatoryTitle: settings.signatoryTitle || 'Authorised Signatory',
  };
}

function resolveClient(project = {}, masters = {}) {
  const wizard = project._wizard || {};
  const clients = masters.MasterClients || masters.Clients || [];
  const masterClient = clients.find((c) => String(c.id) === String(wizard.primaryClientId || project.clientId));
  const primaryDecisionMaker = (wizard.decisionMakers || []).find((d) => d.isPrimary) || (wizard.decisionMakers || [])[0] || {};
  const billing = typeof wizard.billingContact === 'object' ? wizard.billingContact : {};
  return {
    id: masterClient?.id || wizard.primaryClientId || project.clientId || '',
    name: billing.name || masterClient?.name || project.client || primaryDecisionMaker.name || '',
    address: masterClient?.address || project.clientAddress || wizard.clientAddress || '',
    gstin: masterClient?.gstin || project.clientGstin || wizard.clientGstin || '',
    email: masterClient?.email || billing.email || primaryDecisionMaker.email || project.clientEmail || '',
    mobile: masterClient?.mobile || masterClient?.phone || billing.mobile || primaryDecisionMaker.mobile || primaryDecisionMaker.phone || primaryDecisionMaker.contact || '',
  };
}

function milestoneName(milestone = {}) {
  return milestone.name || milestone.stage || milestone.linkedStage || 'Payment milestone';
}

function milestoneAmount(milestone = {}) {
  return Number.parseFloat(milestone.amount ?? milestone.billedAmount ?? milestone.invoiced_amount ?? 0) || 0;
}

function milestoneDueDate(milestone = {}) {
  return milestone.targetDate || milestone.dueDate || milestone.due_date || addDays(isoToday(), 7);
}

function contractTemplates(masters = {}) {
  const rows = masters.MasterContractTemplates || masters.ContractTemplates || [];
  if (!Array.isArray(rows) || rows.length === 0) return DEFAULT_CONTRACT_TEMPLATES;
  return rows.map((row, index) => ({
    id: row.id || row.code || `contract-template-${index + 1}`,
    value: row.value || row.name || row.title || `Contract Template ${index + 1}`,
    type: row.type || row.contractType || row.category || 'Contract',
    linkedServiceType: inferContractServiceType(row),
    description: row.description || '',
    sections: Array.isArray(row.sections) && row.sections.length
      ? row.sections
      : DEFAULT_CONTRACT_TEMPLATES[index % DEFAULT_CONTRACT_TEMPLATES.length].sections,
  }));
}

export function buildContractDraft({ project = {}, masters = {}, milestone = {}, milestones = [], existingContract = null }) {
  if (existingContract) return existingContract;
  const templates = contractTemplates(masters);
  const serviceType = project.serviceType || project._wizard?.serviceType || project.linkedServiceType || '';
  const template = templates.find((item) => String(item.linkedServiceType || '').trim() === String(serviceType || '').trim()) || templates[0];
  const studio = resolveStudio(masters);
  const client = resolveClient(project, masters);
  const projectCode = cleanCode(project.code || project.id || project.name);
  const savedContracts = project._wizard?.contracts || [];
  const nextNumber = String(savedContracts.length + 1).padStart(4, '0');
  const amount = milestoneAmount(milestone);
  const previouslyContracted = milestones
    .filter((m) => (m.id || milestoneName(m)) !== (milestone.id || milestoneName(milestone)))
    .reduce((sum, m) => sum + Number.parseFloat(m.contractedAmount ?? 0), 0);

  return {
    id: uid(),
    templateId: template.id,
    templateName: template.value,
    contractType: template.type,
    contractNumber: `CTR/${new Date().getFullYear()}/${projectCode}/${nextNumber}`,
    title: template.value,
    contractDate: isoToday(),
    effectiveDate: isoToday(),
    validUntil: addDays(isoToday(), 30),
    status: 'Draft',
    studio,
    client,
    project: {
      id: project.id || '',
      code: project.code || project.id || '',
      name: project.name || '',
      location: [project.city, project.state].filter(Boolean).join(', ') || project.location || '',
    },
    milestone: {
      id: milestone.id || '',
      name: milestoneName(milestone),
      stage: milestone.linkedStage || milestone.stage || milestoneName(milestone),
      amount,
      dueDate: milestoneDueDate(milestone),
      previouslyContracted,
    },
    scopeSummary: `${milestoneName(milestone)} contract for ${project.name || 'the project'}.`,
    sections: template.sections.map((section) => ({ ...section })),
    footerNote: 'This document is prepared for review and signature by the authorised parties.',
    senderBusinessName: studio.name,
    senderName: studio.signatoryName,
    senderTitle: studio.signatoryTitle,
  };
}

function Field({ label, value, onChange, type = 'text', className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[10px] font-mono uppercase tracking-wider ink-faint mb-1">{label}</span>
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-line bg-paper px-3 py-2 text-sm ink focus:outline-none focus:border-terra"
      />
    </label>
  );
}

function TextArea({ label, value, onChange, rows = 3 }) {
  return (
    <label className="block">
      <span className="block text-[10px] font-mono uppercase tracking-wider ink-faint mb-1">{label}</span>
      <textarea
        value={value || ''}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-line bg-paper px-3 py-2 text-sm ink focus:outline-none focus:border-terra"
      />
    </label>
  );
}

function ContractStatusBadge({ status }) {
  const tone = status === 'Signed'
    ? 'bg-moss-soft text-moss'
    : status === 'Cancelled'
      ? 'bg-terra-soft text-terra'
      : 'bg-bone ink-soft';
  return <span className={`inline-flex rounded px-2 py-1 text-[10px] font-mono uppercase tracking-wider font-semibold ${tone}`}>{status || 'Draft'}</span>;
}

export function ContractPDFTemplate({ contract, showToolbar = true }) {
  const sections = (contract.sections || []).map((section, index) => `
    <section class="contract-section">
      <div class="section-number">${String(index + 1).padStart(2, '0')}</div>
      <div>
        <h2>${esc(section.title)}</h2>
        ${paragraphs(section.body)}
      </div>
    </section>
  `).join('');
  const logoBlock = contract.studio?.logoUrl
    ? `<img class="logo-img" src="${esc(contract.studio.logoUrl)}" />`
    : `<div class="logo-placeholder">LOGO</div>`;

  return `
    <html>
      <head>
        <title>${esc(contract.contractNumber)}</title>
        <style>
          @page { size: A4; margin: 0; }
          * { box-sizing: border-box; }
          html, body { margin: 0; padding: 0; background: #ECE5D8; }
          body { font-family: Inter, Arial, sans-serif; color: #2A1F15; font-size: 10.8px; line-height: 1.42; }
          .print-toolbar { position: sticky; top: 0; z-index: 5; display: flex; justify-content: center; gap: 8px; padding: 10px; background: rgba(236,229,216,.94); border-bottom: 1px solid #D9C9A8; }
          .print-toolbar button { border: 1px solid #D9C9A8; background: #fff; color: #2A1F15; border-radius: 8px; padding: 8px 12px; font: 700 11px Inter, Arial, sans-serif; letter-spacing: .05em; text-transform: uppercase; cursor: pointer; }
          .print-toolbar .primary { background: #2A1F15; color: #fff; border-color: #2A1F15; }
          .page { width: 210mm; min-height: 297mm; margin: 0 auto; background: #fff; padding: 12mm 13mm 11mm; display: flex; flex-direction: column; overflow: hidden; page-break-after: always; }
          .top { display: flex; justify-content: space-between; gap: 10mm; border-bottom: 1px solid #EADFC8; padding-bottom: 6mm; }
          .brand { display: grid; grid-template-columns: 23mm 1fr; gap: 5mm; max-width: 112mm; }
          .logo-placeholder, .logo-img { width: 23mm; height: 23mm; border: 1px solid #D9C9A8; border-radius: 4mm; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 800; color: #B85C1F; object-fit: contain; }
          .studio-name { font-size: 15px; font-weight: 850; margin-bottom: 2px; }
          .doc-title { text-align: right; min-width: 72mm; }
          h1 { font-size: 24px; line-height: 1.02; margin: 0 0 3mm; letter-spacing: -0.02em; }
          .label { color: #8A7558; font-size: 8.5px; text-transform: uppercase; letter-spacing: .09em; font-weight: 700; }
          .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5mm 5mm; text-align: right; }
          .muted { color: #6B6258; }
          .strong { font-weight: 850; }
          .party-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; margin-top: 5mm; }
          .box { border: 1px solid #EADFC8; border-radius: 3mm; padding: 3.5mm; min-height: 26mm; }
          .box-title { font-size: 8.5px; text-transform: uppercase; letter-spacing: .1em; color: #8A7558; margin-bottom: 2mm; font-weight: 800; }
          .milestone-strip { margin-top: 4mm; border: 1px solid #EADFC8; background: #FAF7F0; border-radius: 3mm; padding: 3mm 3.5mm; display: grid; grid-template-columns: 1.5fr .8fr .8fr .8fr; gap: 4mm; }
          .summary { margin-top: 4mm; font-size: 12px; font-weight: 700; }
          .contract-section { display: grid; grid-template-columns: 10mm 1fr; gap: 4mm; border-top: 1px solid #EADFC8; padding-top: 4mm; margin-top: 4mm; }
          .section-number { color: #B85C1F; font-weight: 850; font-size: 10px; }
          h2 { margin: 0 0 1.5mm; font-size: 14px; line-height: 1.15; }
          p { margin: 0 0 2.5mm; }
          .footer { margin-top: auto; border-top: 1px solid #EADFC8; padding-top: 5mm; display: grid; grid-template-columns: 1fr 1fr; gap: 10mm; }
          .sign-box { min-height: 28mm; border: 1px dashed #D9C9A8; border-radius: 3mm; padding: 3.5mm; display: flex; flex-direction: column; justify-content: flex-end; }
          .foot-note { margin-top: 4mm; font-size: 9px; color: #8A7558; }
          @media screen { .page { margin: 16px auto 32px; box-shadow: 0 18px 50px rgba(42,31,21,.18); } }
          @media print { html, body { background: #fff; } .print-toolbar { display: none; } .page { margin: 0; box-shadow: none; } }
        </style>
      </head>
      <body>
        ${showToolbar ? `<div class="print-toolbar">
          <button class="primary" onclick="window.print()">Print / Save PDF</button>
          <button onclick="window.close()">Close</button>
        </div>` : ''}
        <main class="page">
          <section class="top">
            <div class="brand">
              ${logoBlock}
              <div>
                <div class="studio-name">${esc(contract.studio?.name || '')}</div>
                <div>${contract.studio?.gstin ? `GSTIN: ${esc(contract.studio.gstin)}` : '&nbsp;'}</div>
                <div class="muted">${esc(contract.studio?.email || '')}</div>
                <div class="muted">${esc(contract.studio?.phone || '')}</div>
                <div class="muted">${esc(contract.studio?.address || '')}</div>
              </div>
            </div>
            <div class="doc-title">
              <h1>${esc(contract.title || 'Contract')}</h1>
              <div class="meta-grid">
                <div><div class="label">No.</div><strong>${esc(contract.contractNumber)}</strong></div>
                <div><div class="label">Date</div><strong>${fmtDate(contract.contractDate)}</strong></div>
                <div><div class="label">Effective</div><strong>${fmtDate(contract.effectiveDate)}</strong></div>
                <div><div class="label">Valid Until</div><strong>${fmtDate(contract.validUntil)}</strong></div>
              </div>
            </div>
          </section>
          <section class="party-grid">
            <div class="box">
              <div class="box-title">Client</div>
              <div class="strong">${esc(contract.client?.name || '')}</div>
              <div>${contract.client?.gstin ? `GSTIN: ${esc(contract.client.gstin)}` : '&nbsp;'}</div>
              <div>${esc(contract.client?.email || '')}</div>
              <div>${esc(contract.client?.mobile || '')}</div>
              <div class="muted">${esc(contract.client?.address || '')}</div>
            </div>
            <div class="box">
              <div class="box-title">Project</div>
              <div class="strong">${esc(contract.project?.name || '')}</div>
              <div>${esc(contract.project?.code || '')}</div>
              <div>${esc(contract.project?.location || '')}</div>
              <div class="muted">${esc(contract.milestone?.stage || '')}</div>
            </div>
          </section>
          <section class="milestone-strip">
            <div><div class="label">Milestone</div><strong>${esc(contract.milestone?.name || '')}</strong></div>
            <div><div class="label">Value</div><strong>${money(contract.milestone?.amount)}</strong></div>
            <div><div class="label">Due Date</div><strong>${fmtDate(contract.milestone?.dueDate)}</strong></div>
            <div><div class="label">Status</div><strong>${esc(contract.status)}</strong></div>
          </section>
          <div class="summary">${esc(contract.scopeSummary || '')}</div>
          ${sections}
          <section class="footer">
            <div class="sign-box">
              <div class="label">Client Acceptance</div>
              <div>Signature / Name / Date</div>
            </div>
            <div class="sign-box">
              <div class="label">For ${esc(contract.senderBusinessName || contract.studio?.name || '')}</div>
              <div class="strong">${esc(contract.senderName || '')}</div>
              <div>${esc(contract.senderTitle || 'Authorised Signatory')}</div>
            </div>
          </section>
          <div class="foot-note">${esc(contract.footerNote || '')}</div>
        </main>
      </body>
    </html>
  `;
}

function downloadContractHtml(contract) {
  const html = ContractPDFTemplate({ contract, showToolbar: true });
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${safeFileName(contract.contractNumber)}-${safeFileName(contract.project?.name)}.html`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function recipientPhone(contract) {
  const digits = String(contract.client?.mobile || '').replace(/[^\d]/g, '');
  if (!digits) return '';
  return digits.length === 10 ? `91${digits}` : digits;
}

function contractMessage(contract) {
  return [
    `${contract.title} ${contract.contractNumber}`,
    `Project: ${contract.project?.name || ''}`,
    `Stage: ${contract.milestone?.name || ''}`,
    `Contract value: ${money(contract.milestone?.amount)}`,
    `Date: ${fmtDate(contract.contractDate)}`,
    `Valid until: ${fmtDate(contract.validUntil)}`,
    'Please review the contract and confirm acceptance.',
  ].filter(Boolean).join('\n');
}

function shareStatus(link) {
  if (!link) return { label: 'Not Published', className: 'bg-bone ink-faint' };
  if (!link.isActive) return { label: 'Disabled', className: 'bg-terra-soft text-terra' };
  if (link.expiresAt && new Date(link.expiresAt) < new Date()) return { label: 'Expired', className: 'bg-terra-soft text-terra' };
  if ((link.currentlyViewingCount || 0) > 0) return { label: 'Currently Viewing', className: 'bg-moss-soft text-moss' };
  if ((link.totalViews || 0) > 0) return { label: 'Viewed', className: 'bg-moss-soft text-moss' };
  return { label: 'Published', className: 'bg-moss-soft text-moss' };
}

export default function ContractModal({ open, project, masters, milestone, milestones = [], existingContract, onClose, onSave }) {
  documentAmountDisplayUnit = masters?.MasterStudioSettings?.[0]?.amountDisplayUnit || 'auto';
  const [contract, setContract] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [shareLinks, setShareLinks] = useState([]);
  const [shareBusy, setShareBusy] = useState(false);
  const templates = useMemo(() => contractTemplates(masters), [masters]);

  useEffect(() => {
    if (!open) return;
    setContract(buildContractDraft({ project, masters, milestone, milestones, existingContract }));
    setShowPreview(false);
    setShareLinks([]);
  }, [open, project, masters, milestone, milestones, existingContract]);

  useEffect(() => {
    if (!open || !contract?.id) return;
    let cancelled = false;
    listShareLinksForDocument('contract', contract.id).then((links) => {
      if (!cancelled) setShareLinks(links);
    });
    return () => { cancelled = true; };
  }, [open, contract?.id]);

  const previewHtml = useMemo(() => contract ? ContractPDFTemplate({ contract, showToolbar: false }) : '', [contract]);
  if (!open || !contract) return null;

  const patch = (updates) => setContract((prev) => ({ ...prev, ...updates }));
  const patchNested = (key, updates) => setContract((prev) => ({ ...prev, [key]: { ...prev[key], ...updates } }));
  const patchSection = (index, updates) => setContract((prev) => ({
    ...prev,
    sections: prev.sections.map((section, i) => (i === index ? { ...section, ...updates } : section)),
  }));
  const applyTemplate = (templateId) => {
    const template = templates.find((item) => String(item.id) === String(templateId)) || templates[0];
    patch({
      templateId: template.id,
      templateName: template.value,
      contractType: template.type,
      title: template.value,
      sections: template.sections.map((section) => ({ ...section })),
    });
  };
  const finalContractFor = (status = contract.status) => ({
    ...contract,
    status,
    updatedAt: new Date().toISOString(),
  });
  const saveAs = (status, sendMeta = null) => {
    onSave?.(finalContractFor(status), sendMeta);
  };
  const openLink = (url) => {
    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (!opened) window.location.href = url;
  };
  const printPreview = () => {
    const frame = document.getElementById('contract-print-frame');
    frame?.contentWindow?.focus();
    frame?.contentWindow?.print();
  };
  const latestShareLink = shareLinks[0] || null;
  const latestShareStatus = shareStatus(latestShareLink);
  const createTrackableLink = async () => {
    setShareBusy(true);
    try {
      const finalContract = finalContractFor(contract.status || 'Draft');
      const link = await createShareLink({
        documentType: 'contract',
        documentId: finalContract.id,
        documentPayload: finalContract,
        createdBy: finalContract.studio?.name || 'Studio',
        allowDownload: true,
      });
      setShareLinks((current) => [link, ...current.filter((l) => l.id !== link.id)]);
      await navigator.clipboard?.writeText(link.publicUrl);
      window.alert('Trackable contract link created and copied.');
    } catch (error) {
      console.error(error);
      window.alert('Could not create contract link. Please check Supabase/local storage availability.');
    } finally {
      setShareBusy(false);
    }
  };
  const copyShareLink = async () => {
    if (!latestShareLink) return;
    await navigator.clipboard?.writeText(latestShareLink.publicUrl);
    window.alert('Contract share link copied.');
  };
  const disableShareLink = async () => {
    if (!latestShareLink) return;
    const updated = await updateShareLink(latestShareLink.id, { ...latestShareLink, isActive: false });
    setShareLinks((current) => current.map((link) => link.id === updated.id ? updated : link));
  };
  const sendEmail = () => {
    const finalContract = finalContractFor('Contract Sent');
    const message = contractMessage(finalContract);
    const subject = encodeURIComponent(`${finalContract.title} ${finalContract.contractNumber} - ${finalContract.project?.name || ''}`);
    const body = encodeURIComponent(message);
    openLink(`mailto:${finalContract.client?.email || ''}?subject=${subject}&body=${body}`);
    window.alert('Email draft opened and logged. Please attach/download the contract copy if needed.');
    onSave?.(finalContract, { channel: 'Email', recipient: finalContract.client?.email || '', message });
  };
  const sendWhatsApp = async () => {
    const finalContract = finalContractFor('Contract Sent');
    const message = contractMessage(finalContract);
    const phone = recipientPhone(finalContract);
    const url = phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;
    openLink(url);
    try {
      await navigator.clipboard?.writeText(message);
    } catch (error) {
      // Clipboard may be blocked in embedded browsers.
    }
    window.alert('WhatsApp draft opened and logged. Please press Send in WhatsApp.');
    onSave?.(finalContract, { channel: 'WhatsApp', recipient: finalContract.client?.mobile || '', message });
  };
  const copyWhatsApp = async () => {
    try {
      await navigator.clipboard?.writeText(contractMessage(contract));
      window.alert('Contract message copied.');
    } catch (error) {
      window.alert('Could not copy automatically. Use Send via WhatsApp to open the prepared message.');
    }
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/40 flex items-start justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-6xl rounded-xl bg-paper shadow-2xl border border-line overflow-hidden">
        <div className="sticky top-0 z-10 bg-paper border-b border-line px-4 sm:px-6 py-4 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ContractStatusBadge status={contract.status} />
              <span className="text-[10px] font-mono uppercase tracking-wider ink-faint">{contract.contractType}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold ink leading-tight">Contract for {contract.milestone.name}</h2>
            <p className="text-sm ink-soft mt-1">{contract.project.name} · {money(contract.milestone.amount)} contract value</p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setShowPreview(true)} className="rounded bg-ink px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-terra">
              Preview / Print
            </button>
            <button type="button" onClick={onClose} className="rounded border border-line px-3 py-2 text-sm ink-soft hover:ink">Close</button>
          </div>
        </div>

        {showPreview && (
          <div className="fixed inset-0 z-[140] bg-black/55 flex items-start justify-center p-3 sm:p-5 overflow-y-auto">
            <div className="w-full max-w-5xl bg-paper rounded-xl border border-line shadow-2xl overflow-hidden">
              <div className="sticky top-0 z-10 bg-paper border-b border-line px-4 py-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider ink-faint">A4 Contract Preview</div>
                  <div className="text-sm font-semibold ink">{contract.title} · {contract.contractNumber}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={printPreview} className="rounded bg-ink px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-terra">
                    <Printer className="w-3 h-3 inline mr-1" /> Print / Save PDF
                  </button>
                  <button type="button" onClick={() => downloadContractHtml(contract)} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">
                    <Download className="w-3 h-3 inline mr-1" /> Download
                  </button>
                  <button type="button" onClick={() => setShowPreview(false)} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">Back</button>
                </div>
              </div>
              <iframe
                id="contract-print-frame"
                title="Contract A4 print preview"
                srcDoc={previewHtml}
                className="w-full bg-[#ece5d8]"
                style={{ height: 'calc(100vh - 96px)', border: 0 }}
              />
            </div>
          </div>
        )}

        <div className="p-4 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 rounded-lg border border-line bg-paper p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="block sm:col-span-2">
                  <span className="block text-[10px] font-mono uppercase tracking-wider ink-faint mb-1">Contract Template</span>
                  <select
                    value={contract.templateId}
                    onChange={(e) => applyTemplate(e.target.value)}
                    className="w-full rounded border border-line bg-paper px-3 py-2 text-sm ink focus:outline-none focus:border-terra"
                  >
                    {templates.map((template) => <option key={template.id} value={template.id}>{template.value}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="block text-[10px] font-mono uppercase tracking-wider ink-faint mb-1">Status</span>
                  <select
                    value={contract.status}
                    onChange={(e) => patch({ status: e.target.value })}
                    className="w-full rounded border border-line bg-paper px-3 py-2 text-sm ink focus:outline-none focus:border-terra"
                  >
                    {STATUS_OPTIONS.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field label="Contract Title" value={contract.title} onChange={(v) => patch({ title: v })} />
                <Field label="Contract Number" value={contract.contractNumber} onChange={(v) => patch({ contractNumber: v })} />
                <Field label="Contract Date" type="date" value={contract.contractDate} onChange={(v) => patch({ contractDate: v })} />
                <Field label="Effective Date" type="date" value={contract.effectiveDate} onChange={(v) => patch({ effectiveDate: v })} />
                <Field label="Valid Until" type="date" value={contract.validUntil} onChange={(v) => patch({ validUntil: v })} />
                <Field label="Contract Value" type="number" value={contract.milestone.amount} onChange={(v) => patchNested('milestone', { amount: v })} />
              </div>
              <TextArea label="Scope Summary" value={contract.scopeSummary} onChange={(v) => patch({ scopeSummary: v })} rows={2} />
            </div>

            <div className="rounded-lg border border-line bg-bone p-4 space-y-3">
              <div className="text-[10px] font-mono uppercase tracking-wider ink-faint">Share & Tracking</div>
              <div className="flex items-center justify-between">
                <ContractStatusBadge status={latestShareStatus.label} />
                <span className="text-[11px] ink-faint">{latestShareLink ? `${latestShareLink.totalViews || 0} views` : 'No link yet'}</span>
              </div>
              {latestShareLink && (
                <div className="rounded border border-line bg-paper p-2 text-[11px] ink-soft break-all">{latestShareLink.publicUrl}</div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={createTrackableLink} disabled={shareBusy} className="rounded bg-ink px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-terra disabled:opacity-50">
                  <LinkIcon className="w-3 h-3 inline mr-1" /> {latestShareLink ? 'Regenerate' : 'Create Link'}
                </button>
                <button type="button" onClick={copyShareLink} disabled={!latestShareLink} className="rounded border border-line bg-paper px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink disabled:opacity-50">
                  <Copy className="w-3 h-3 inline mr-1" /> Copy
                </button>
                <button type="button" onClick={disableShareLink} disabled={!latestShareLink || !latestShareLink.isActive} className="rounded border border-line bg-paper px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink disabled:opacity-50">
                  Disable
                </button>
                <button type="button" onClick={() => saveAs('Signed')} className="rounded border border-line bg-paper px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">
                  Mark Signed
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-lg border border-line bg-paper p-4 space-y-3">
              <div className="text-[10px] font-mono uppercase tracking-wider ink-faint">Client Details</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Client Name" value={contract.client.name} onChange={(v) => patchNested('client', { name: v })} />
                <Field label="Client GSTIN" value={contract.client.gstin} onChange={(v) => patchNested('client', { gstin: v })} />
                <Field label="Client Email" value={contract.client.email} onChange={(v) => patchNested('client', { email: v })} />
                <Field label="Client Mobile" value={contract.client.mobile} onChange={(v) => patchNested('client', { mobile: v })} />
              </div>
              <TextArea label="Client Address" value={contract.client.address} onChange={(v) => patchNested('client', { address: v })} />
            </div>
            <div className="rounded-lg border border-line bg-paper p-4 space-y-3">
              <div className="text-[10px] font-mono uppercase tracking-wider ink-faint">Project & Sender</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Project Name" value={contract.project.name} onChange={(v) => patchNested('project', { name: v })} />
                <Field label="Project Code" value={contract.project.code} onChange={(v) => patchNested('project', { code: v })} />
                <Field label="Project Location" value={contract.project.location} onChange={(v) => patchNested('project', { location: v })} />
                <Field label="Milestone / Stage" value={contract.milestone.name} onChange={(v) => patchNested('milestone', { name: v })} />
                <Field label="Sender Business Name" value={contract.senderBusinessName} onChange={(v) => patch({ senderBusinessName: v })} />
                <Field label="Sender Name" value={contract.senderName} onChange={(v) => patch({ senderName: v })} />
                <Field label="Sender Title" value={contract.senderTitle} onChange={(v) => patch({ senderTitle: v })} />
                <Field label="Studio GSTIN" value={contract.studio.gstin} onChange={(v) => patchNested('studio', { gstin: v })} />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-paper p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider ink-faint">Contract Body</div>
                <div className="text-sm ink font-semibold">Multi-page A4 content with editable sections</div>
              </div>
              <FileCheck2 className="w-4 h-4 text-terra" />
            </div>
            {(contract.sections || []).map((section, index) => (
              <div key={index} className="rounded border border-line-soft bg-bone p-3 space-y-2">
                <Field label={`Section ${index + 1} Title`} value={section.title} onChange={(v) => patchSection(index, { title: v })} />
                <TextArea label="Clause Text" value={section.body} onChange={(v) => patchSection(index, { body: v })} rows={5} />
              </div>
            ))}
            <TextArea label="Footer Note" value={contract.footerNote} onChange={(v) => patch({ footerNote: v })} rows={2} />
          </div>

          <div className="sticky bottom-0 bg-paper border border-line rounded-lg p-3 flex flex-wrap items-center gap-2 shadow-lg">
            <button type="button" onClick={() => saveAs('Draft')} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">Save Draft</button>
            <button type="button" onClick={() => saveAs('Contract Prepared')} className="rounded bg-ink px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-terra">Generate Contract</button>
            <button type="button" onClick={() => setShowPreview(true)} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">
              <Printer className="w-3 h-3 inline mr-1" /> Preview / Print
            </button>
            <button type="button" onClick={() => downloadContractHtml(contract)} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">
              <Download className="w-3 h-3 inline mr-1" /> Download
            </button>
            <button type="button" onClick={sendEmail} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">
              <Mail className="w-3 h-3 inline mr-1" /> Send Email
            </button>
            <button type="button" onClick={sendWhatsApp} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">
              <MessageSquare className="w-3 h-3 inline mr-1" /> Send WhatsApp
            </button>
            <button type="button" onClick={copyWhatsApp} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">
              <Copy className="w-3 h-3 inline mr-1" /> Copy Message
            </button>
            <button type="button" onClick={onClose} className="ml-auto rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
