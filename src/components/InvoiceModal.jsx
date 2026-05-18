import React, { useEffect, useMemo, useState } from 'react';
import { Copy, ExternalLink, Link as LinkIcon, RefreshCw, ShieldOff } from 'lucide-react';
import { createShareLink, listShareLinksForDocument, updateShareLink } from '../lib/shareLinks';

const TAX_OPTIONS = [
  { label: 'No Tax', value: 'No Tax', pct: 0, bucket: 'none' },
  { label: 'GST 5%', value: 'GST 5%', pct: 5, bucket: 'gst' },
  { label: 'GST 12%', value: 'GST 12%', pct: 12, bucket: 'gst' },
  { label: 'GST 18%', value: 'GST 18%', pct: 18, bucket: 'gst' },
  { label: 'GST 28%', value: 'GST 28%', pct: 28, bucket: 'gst' },
  { label: 'CGST + SGST', value: 'CGST + SGST', pct: 18, bucket: 'cgst_sgst' },
  { label: 'IGST', value: 'IGST', pct: 18, bucket: 'igst' },
  { label: 'Custom Tax', value: 'Custom Tax', pct: 18, bucket: 'custom' },
];

const STATUS_OPTIONS = [
  'Draft',
  'Estimate Sent',
  'Invoice Raised',
  'Partially Paid',
  'Paid',
  'Overdue',
  'Cancelled',
];

const uid = () => `inv-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
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
const num = (v) => Number.parseFloat(v) || 0;
const cleanCode = (value, fallback = 'PROJECT') => (
  (value || fallback)
    .toString()
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '')
    .toUpperCase()
    .slice(0, 18) || fallback
);

function resolveStudio(masters = {}) {
  const settings = masters.MasterStudioSettings?.[0] || {};
  return {
    name: settings.studioName || 'Studio/OS Demo',
    gstin: settings.gstin || '',
    address: settings.registeredAddress || '',
    email: settings.billingEmail || '',
    phone: settings.phone || '',
    bankName: settings.bankName || '',
    accountName: settings.accountName || settings.studioName || '',
    accountNumber: settings.accountNumber || '',
    ifsc: settings.ifsc || '',
    upiId: settings.upiId || '',
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

function milestoneAmount(milestone = {}) {
  return num(milestone.amount ?? milestone.billedAmount);
}

function milestonePaid(milestone = {}) {
  return num(milestone.amountReceived ?? milestone.receivedAmount ?? milestone.paid_amount);
}

function milestoneDueDate(milestone = {}) {
  return milestone.targetDate || milestone.dueDate || milestone.due_date || addDays(isoToday(), 7);
}

function milestoneName(milestone = {}) {
  return milestone.name || milestone.stage || milestone.linkedStage || 'Payment milestone';
}

function taxMeta(type) {
  return TAX_OPTIONS.find((t) => t.value === type) || TAX_OPTIONS[0];
}

function computeLine(item) {
  const quantity = num(item.quantity) || 1;
  const rate = num(item.rate);
  const taxableAmount = quantity * rate;
  const taxPercentage = item.taxType === 'Custom Tax' ? num(item.taxPercentage) : taxMeta(item.taxType).pct;
  const taxAmount = taxableAmount * taxPercentage / 100;
  return {
    ...item,
    quantity,
    rate,
    taxableAmount,
    taxPercentage,
    taxAmount,
    lineTotal: taxableAmount + taxAmount,
  };
}

function computeTotals(invoice) {
  const lines = (invoice.lineItems || []).map(computeLine);
  const subtotal = lines.reduce((sum, item) => sum + item.taxableAmount, 0);
  const discount = num(invoice.discount);
  const taxableValue = Math.max(0, subtotal - discount);
  const lineTaxable = subtotal || 1;
  const taxScale = taxableValue / lineTaxable;
  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  lines.forEach((item) => {
    const meta = taxMeta(item.taxType);
    const taxAmount = item.taxAmount * taxScale;
    if (meta.bucket === 'igst') {
      igst += taxAmount;
    } else if (meta.bucket === 'none') {
      // no tax
    } else {
      cgst += taxAmount / 2;
      sgst += taxAmount / 2;
    }
  });

  const totalTax = cgst + sgst + igst;
  const rawGrandTotal = taxableValue + totalTax;
  const roundedGrandTotal = Math.round(rawGrandTotal);
  const roundOff = roundedGrandTotal - rawGrandTotal;
  const paidAmount = num(invoice.paidAmount);
  return {
    lines,
    subtotal,
    discount,
    taxableValue,
    cgst,
    sgst,
    igst,
    totalTax,
    roundOff,
    grandTotal: roundedGrandTotal,
    paidAmount,
    balanceAmount: Math.max(0, roundedGrandTotal - paidAmount),
  };
}

export function buildInvoiceDraft({ project = {}, masters = {}, milestone = {}, milestones = [], type = 'Invoice', existingInvoice = null }) {
  if (existingInvoice) {
    return {
      ...existingInvoice,
      lineItems: existingInvoice.lineItems || existingInvoice.items || [],
      paidAmount: existingInvoice.paidAmount ?? existingInvoice.paid_amount ?? 0,
    };
  }

  const studio = resolveStudio(masters);
  const client = resolveClient(project, masters);
  const amount = milestoneAmount(milestone);
  const paid = milestonePaid(milestone);
  const currentDue = Math.max(0, amount - paid);
  const pastDue = milestones
    .filter((m) => (m.id || milestoneName(m)) !== (milestone.id || milestoneName(milestone)))
    .reduce((sum, m) => {
      const due = milestoneAmount(m);
      const received = milestonePaid(m);
      const balance = Math.max(0, due - received);
      return milestoneDueDate(m) < isoToday() ? sum + balance : sum;
    }, 0);
  const previouslyBilled = milestones.reduce((sum, m) => sum + num(m.billedAmount ?? m.invoiced_amount), 0);
  const projectCode = cleanCode(project.code || project.id || project.name);
  const prefix = type === 'Estimate' ? 'EST' : 'INV';
  const savedInvoices = project._wizard?.invoices || [];
  const savedDocs = milestones.flatMap((m) => Array.isArray(m.billingDocs) ? m.billingDocs : []);
  const nextNumber = savedInvoices.length + savedDocs.filter((doc) => (doc.number || '').startsWith(prefix)).length + 1;
  const invoiceNumber = `${prefix}/${new Date().getFullYear()}/${projectCode}/${String(nextNumber).padStart(4, '0')}`;

  return {
    id: uid(),
    invoiceType: type === 'Estimate' ? 'Estimate' : 'Tax Invoice',
    title: type === 'Estimate' ? 'Estimate' : 'Tax Invoice',
    invoiceNumber,
    invoiceDate: isoToday(),
    dueDate: milestoneDueDate(milestone),
    status: type === 'Estimate' ? 'Draft' : 'Draft',
    studio,
    client,
    project: {
      id: project.id || '',
      code: project.code || project.id || '',
      name: project.name || '',
      location: [project.city, project.state].filter(Boolean).join(', '),
    },
    milestone: {
      id: milestone.id || '',
      name: milestoneName(milestone),
      stage: milestone.linkedStage || milestone.stage || milestone.triggerCondition || milestoneName(milestone),
      amount,
      previouslyBilled,
      pastDue,
      totalPayable: currentDue + pastDue,
    },
    lineItems: [
      {
        id: uid(),
        description: `${milestoneName(milestone)} - professional design services`,
        hsnSacCode: '998391',
        quantity: 1,
        unit: 'Stage',
        rate: currentDue || amount,
        taxType: 'GST 18%',
        taxPercentage: 18,
      },
    ],
    discount: 0,
    paidAmount: paid,
    bankName: studio.bankName,
    accountName: studio.accountName,
    accountNumber: studio.accountNumber,
    ifsc: studio.ifsc,
    upiId: studio.upiId,
    paymentTerms: 'Payment due within 7 days of invoice date.',
    notes: 'Thank you for the opportunity to work on this project.',
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

function TextArea({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="block text-[10px] font-mono uppercase tracking-wider ink-faint mb-1">{label}</span>
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        className="w-full rounded border border-line bg-paper px-3 py-2 text-sm ink focus:outline-none focus:border-terra"
      />
    </label>
  );
}

export function InvoiceStatusBadge({ status }) {
  const tone = status === 'Paid' ? 'bg-moss-soft text-moss' : status === 'Overdue' ? 'bg-terra-soft text-terra' : 'bg-bone ink-soft';
  return <span className={`inline-flex rounded px-2 py-1 text-[10px] font-mono uppercase tracking-wider font-semibold ${tone}`}>{status || 'Draft'}</span>;
}

export function InvoiceLineItemsTable({ items, onChange }) {
  const updateItem = (id, updates) => onChange(items.map((item) => item.id === id ? { ...item, ...updates } : item));
  const addItem = () => onChange([
    ...items,
    { id: uid(), description: 'Additional design service', hsnSacCode: '998391', quantity: 1, unit: 'Item', rate: 0, taxType: 'GST 18%', taxPercentage: 18 },
  ]);
  const deleteItem = (id) => onChange(items.length > 1 ? items.filter((item) => item.id !== id) : items);

  return (
    <div className="rounded-lg border border-line overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-sm">
          <thead className="bg-bone text-[10px] font-mono uppercase tracking-wider ink-faint">
            <tr>
              <th className="text-left p-3">Description / HSN-SAC</th>
              <th className="text-right p-3">Qty</th>
              <th className="text-left p-3">Unit</th>
              <th className="text-right p-3">Rate</th>
              <th className="text-right p-3">Taxable</th>
              <th className="text-left p-3">Tax</th>
              <th className="text-right p-3">Tax Amt</th>
              <th className="text-right p-3">Total</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((raw) => {
              const item = computeLine(raw);
              return (
                <tr key={item.id} className="border-t border-line-soft align-top">
                  <td className="p-3">
                    <input value={item.description} onChange={(e) => updateItem(item.id, { description: e.target.value })} className="w-full rounded border border-line bg-paper px-2 py-1.5 ink" />
                    <input value={item.hsnSacCode || ''} onChange={(e) => updateItem(item.id, { hsnSacCode: e.target.value })} placeholder="HSN / SAC" className="mt-1 w-32 rounded border border-line bg-paper px-2 py-1 text-xs ink-soft" />
                  </td>
                  <td className="p-3"><input type="number" value={item.quantity} onChange={(e) => updateItem(item.id, { quantity: e.target.value })} className="w-20 rounded border border-line bg-paper px-2 py-1.5 text-right" /></td>
                  <td className="p-3"><input value={item.unit || ''} onChange={(e) => updateItem(item.id, { unit: e.target.value })} className="w-24 rounded border border-line bg-paper px-2 py-1.5" /></td>
                  <td className="p-3"><input type="number" value={item.rate} onChange={(e) => updateItem(item.id, { rate: e.target.value })} className="w-28 rounded border border-line bg-paper px-2 py-1.5 text-right" /></td>
                  <td className="p-3 text-right font-medium ink">{money(item.taxableAmount)}</td>
                  <td className="p-3">
                    <select
                      value={item.taxType}
                      onChange={(e) => updateItem(item.id, { taxType: e.target.value, taxPercentage: taxMeta(e.target.value).pct })}
                      className="w-32 rounded border border-line bg-paper px-2 py-1.5"
                    >
                      {TAX_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                    {item.taxType === 'Custom Tax' && (
                      <input type="number" value={item.taxPercentage} onChange={(e) => updateItem(item.id, { taxPercentage: e.target.value })} className="mt-1 w-20 rounded border border-line bg-paper px-2 py-1 text-xs" />
                    )}
                  </td>
                  <td className="p-3 text-right ink-soft">{money(item.taxAmount)}</td>
                  <td className="p-3 text-right font-semibold ink">{money(item.lineTotal)}</td>
                  <td className="p-3 text-right">
                    <button type="button" onClick={() => deleteItem(item.id)} className="rounded border border-line px-2 py-1 text-[11px] ink-faint hover:text-terra">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="border-t border-line-soft bg-bone p-3">
        <button type="button" onClick={addItem} className="rounded bg-ink px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-terra">+ Add Line Item</button>
      </div>
    </div>
  );
}

export function TaxSummary({ invoice, totals, onChange }) {
  return (
    <div className="rounded-lg border border-line bg-paper p-4">
      <div className="text-[10px] font-mono uppercase tracking-wider ink-faint mb-3">Tax Summary</div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between"><span>Subtotal</span><strong>{money(totals.subtotal)}</strong></div>
        <div className="flex items-center justify-between gap-3">
          <span>Discount</span>
          <input type="number" value={invoice.discount || 0} onChange={(e) => onChange({ discount: e.target.value })} className="w-32 rounded border border-line px-2 py-1 text-right" />
        </div>
        <div className="flex justify-between"><span>Taxable Value</span><strong>{money(totals.taxableValue)}</strong></div>
        <div className="flex justify-between"><span>CGST</span><span>{money(totals.cgst)}</span></div>
        <div className="flex justify-between"><span>SGST</span><span>{money(totals.sgst)}</span></div>
        <div className="flex justify-between"><span>IGST</span><span>{money(totals.igst)}</span></div>
        <div className="flex justify-between"><span>Round Off</span><span>{money(totals.roundOff)}</span></div>
        <div className="flex justify-between border-t border-line pt-3 text-base ink"><span className="font-semibold">Grand Total</span><strong>{money(totals.grandTotal)}</strong></div>
        <div className="flex justify-between ink-soft"><span>Paid</span><span>{money(totals.paidAmount)}</span></div>
        <div className="flex justify-between ink-soft"><span>Balance</span><span>{money(totals.balanceAmount)}</span></div>
      </div>
    </div>
  );
}

export function PaymentDetailsBlock({ invoice, onChange }) {
  return (
    <div className="rounded-lg border border-line bg-paper p-4">
      <div className="text-[10px] font-mono uppercase tracking-wider ink-faint mb-3">Payment Details</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Bank Name" value={invoice.bankName} onChange={(v) => onChange({ bankName: v })} />
        <Field label="Account Name" value={invoice.accountName} onChange={(v) => onChange({ accountName: v })} />
        <Field label="Account Number" value={invoice.accountNumber} onChange={(v) => onChange({ accountNumber: v })} />
        <Field label="IFSC" value={invoice.ifsc} onChange={(v) => onChange({ ifsc: v })} />
        <Field label="UPI ID" value={invoice.upiId} onChange={(v) => onChange({ upiId: v })} />
        <Field label="Paid Amount" type="number" value={invoice.paidAmount} onChange={(v) => onChange({ paidAmount: v })} />
      </div>
      <div className="mt-3 space-y-3">
        <TextArea label="Payment Terms" value={invoice.paymentTerms} onChange={(v) => onChange({ paymentTerms: v })} />
        <TextArea label="Notes" value={invoice.notes} onChange={(v) => onChange({ notes: v })} />
      </div>
    </div>
  );
}

export function InvoicePDFTemplate({ invoice, totals, showToolbar = true }) {
  const rows = [...(totals.lines || [])];
  while (rows.length < 4) rows.push(null);
  const logoBlock = invoice.studio.logoUrl
    ? `<img class="logo-img" src="${invoice.studio.logoUrl}" />`
    : `<div class="logo-placeholder">${(invoice.studio.name || 'Studio').slice(0, 2).toUpperCase()}</div>`;
  const lineRows = rows.map((item, index) => item
    ? `<tr>
        <td class="desc">${item.description}<div class="sub">HSN/SAC: ${item.hsnSacCode || '-'}</div></td>
        <td>${item.quantity}</td>
        <td>${item.unit || ''}</td>
        <td class="num">${money(item.rate)}</td>
        <td class="num">${money(item.taxableAmount)}</td>
        <td>${item.taxType} ${item.taxPercentage}%</td>
        <td class="num">${money(item.taxAmount)}</td>
        <td class="num strong">${money(item.lineTotal)}</td>
      </tr>`
    : `<tr class="empty-row">
        <td class="desc"><span class="muted">Line item ${index + 1}</span><div class="sub">&nbsp;</div></td>
        <td>&nbsp;</td><td>&nbsp;</td><td class="num">&nbsp;</td><td class="num">&nbsp;</td><td>&nbsp;</td><td class="num">&nbsp;</td><td class="num">&nbsp;</td>
      </tr>`
  ).join('');

  return `
    <html>
      <head>
        <title>${invoice.invoiceNumber}</title>
        <style>
          @page { size: A4; margin: 0; }
          * { box-sizing: border-box; }
          html, body { margin: 0; padding: 0; background: #ECE5D8; }
          body { font-family: Inter, Arial, sans-serif; color: #2A1F15; font-size: 10.5px; line-height: 1.28; }
          .print-toolbar { position: sticky; top: 0; z-index: 5; display: flex; justify-content: center; gap: 8px; padding: 10px; background: rgba(236,229,216,.94); border-bottom: 1px solid #D9C9A8; }
          .print-toolbar button { border: 1px solid #D9C9A8; background: #fff; color: #2A1F15; border-radius: 8px; padding: 8px 12px; font: 700 11px Inter, Arial, sans-serif; letter-spacing: .05em; text-transform: uppercase; cursor: pointer; }
          .print-toolbar .primary { background: #2A1F15; color: #fff; border-color: #2A1F15; }
          .page { width: 210mm; height: 297mm; margin: 0 auto; background: #fff; padding: 12mm 13mm; display: flex; flex-direction: column; overflow: hidden; }
          .row { display: flex; justify-content: space-between; gap: 10mm; }
          .top { align-items: flex-start; border-bottom: 1px solid #EADFC8; padding-bottom: 7mm; }
          .brand { display: grid; grid-template-columns: 22mm 1fr; gap: 5mm; min-width: 86mm; }
          .logo-placeholder, .logo-img { width: 22mm; height: 22mm; border: 1px solid #D9C9A8; border-radius: 4mm; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 15px; color: #B85C1F; object-fit: contain; }
          .studio-name { font-size: 15px; font-weight: 800; margin-bottom: 2px; }
          .doc-title { text-align: right; min-width: 70mm; }
          h1 { font-size: 24px; line-height: 1; margin: 0 0 3mm; letter-spacing: -0.02em; }
          .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5mm 5mm; text-align: right; }
          .label { color: #8A7558; font-size: 8.5px; text-transform: uppercase; letter-spacing: .08em; }
          .muted, .sub { color: #6B6258; }
          .sub { font-size: 9px; margin-top: 1mm; }
          .strong { font-weight: 800; }
          .section-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; margin-top: 5mm; }
          .box { border: 1px solid #EADFC8; border-radius: 3mm; padding: 3.5mm; min-height: 28mm; }
          .box-title { font-size: 8.5px; text-transform: uppercase; letter-spacing: .1em; color: #8A7558; margin-bottom: 2mm; font-weight: 700; }
          .compact-lines > div { margin-bottom: 1mm; }
          .milestone-strip { margin-top: 4mm; border: 1px solid #EADFC8; background: #FAF7F0; border-radius: 3mm; padding: 3mm 3.5mm; display: grid; grid-template-columns: 1.6fr .8fr .8fr .8fr; gap: 4mm; }
          table { width: 100%; border-collapse: collapse; margin-top: 5mm; table-layout: fixed; }
          th, td { border-bottom: 1px solid #EADFC8; padding: 2.7mm 2mm; text-align: left; vertical-align: top; }
          th { font-size: 8px; text-transform: uppercase; letter-spacing: .08em; color: #8A7558; background: #FAF7F0; }
          td { height: 16mm; }
          .empty-row td { color: #C8B99D; }
          .desc { width: 34%; }
          .num { text-align: right; white-space: nowrap; }
          .bottom { margin-top: auto; display: grid; grid-template-columns: 1fr 70mm; gap: 5mm; align-items: start; border-top: 1px solid #EADFC8; padding-top: 4mm; }
          .payment-box { min-height: 36mm; }
          .totals { border: 1px solid #EADFC8; border-radius: 3mm; padding: 3mm; }
          .total-line { display: flex; justify-content: space-between; gap: 5mm; padding: 1.2mm 0; }
          .grand { border-top: 1px solid #D9C9A8; margin-top: 1mm; padding-top: 2mm; font-size: 15px; font-weight: 900; }
          .notes-line { margin-top: 3mm; min-height: 11mm; border-top: 1px dashed #EADFC8; padding-top: 2mm; color: #6B6258; }
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
          <section class="row top">
            <div class="brand">
              ${logoBlock}
              <div class="compact-lines">
                <div class="studio-name">${invoice.studio.name || ''}</div>
                <div>${invoice.studio.gstin ? `GSTIN: ${invoice.studio.gstin}` : '&nbsp;'}</div>
                <div class="muted">${invoice.studio.email || '&nbsp;'}</div>
                <div class="muted">${invoice.studio.address || '&nbsp;'}</div>
              </div>
            </div>
            <div class="doc-title">
              <h1>${invoice.title}</h1>
              <div class="meta-grid">
                <div><div class="label">No.</div><strong>${invoice.invoiceNumber}</strong></div>
                <div><div class="label">Date</div><strong>${fmtDate(invoice.invoiceDate)}</strong></div>
                <div><div class="label">Due</div><strong>${fmtDate(invoice.dueDate)}</strong></div>
                <div><div class="label">Status</div><strong>${invoice.status}</strong></div>
              </div>
            </div>
          </section>
          <section class="section-grid">
            <div class="box compact-lines">
              <div class="box-title">Bill To</div>
              <div class="strong">${invoice.client.name || '&nbsp;'}</div>
              <div>${invoice.client.gstin ? `GSTIN: ${invoice.client.gstin}` : '&nbsp;'}</div>
              <div>${invoice.client.email || '&nbsp;'}</div>
              <div>${invoice.client.mobile || '&nbsp;'}</div>
              <div class="muted">${invoice.client.address || '&nbsp;'}</div>
            </div>
            <div class="box compact-lines">
              <div class="box-title">Project</div>
              <div class="strong">${invoice.project.name || '&nbsp;'}</div>
              <div>${invoice.project.code || '&nbsp;'}</div>
              <div>${invoice.project.location || '&nbsp;'}</div>
              <div class="muted">${invoice.milestone.stage || '&nbsp;'}</div>
              <div class="muted">${invoice.paymentTerms || '&nbsp;'}</div>
            </div>
          </section>
          <section class="milestone-strip">
            <div><div class="label">Milestone</div><strong>${invoice.milestone.name || '&nbsp;'}</strong></div>
            <div><div class="label">Stage Amount</div><strong>${money(invoice.milestone.amount)}</strong></div>
            <div><div class="label">Past Due</div><strong>${money(invoice.milestone.pastDue)}</strong></div>
            <div><div class="label">Payable</div><strong>${money(totals.grandTotal)}</strong></div>
          </section>
          <table>
            <thead>
              <tr><th class="desc">Description</th><th>Qty</th><th>Unit</th><th class="num">Rate</th><th class="num">Taxable</th><th>Tax</th><th class="num">Tax Amt</th><th class="num">Total</th></tr>
            </thead>
            <tbody>${lineRows}</tbody>
          </table>
          <section class="bottom">
            <div class="box payment-box compact-lines">
              <div class="box-title">Payment Details</div>
              <div><strong>${invoice.bankName || '&nbsp;'}</strong></div>
              <div>${invoice.accountName || '&nbsp;'}</div>
              <div>${invoice.accountNumber || '&nbsp;'}</div>
              <div>${invoice.ifsc || '&nbsp;'}</div>
              <div>${invoice.upiId || '&nbsp;'}</div>
              <div class="notes-line">${invoice.notes || '&nbsp;'}</div>
            </div>
            <div class="totals">
              <div class="total-line"><span>Subtotal</span><strong>${money(totals.subtotal)}</strong></div>
              <div class="total-line"><span>Discount</span><span>${money(totals.discount)}</span></div>
              <div class="total-line"><span>Taxable Value</span><span>${money(totals.taxableValue)}</span></div>
              <div class="total-line"><span>CGST</span><span>${money(totals.cgst)}</span></div>
              <div class="total-line"><span>SGST</span><span>${money(totals.sgst)}</span></div>
              <div class="total-line"><span>IGST</span><span>${money(totals.igst)}</span></div>
              <div class="total-line"><span>Round Off</span><span>${money(totals.roundOff)}</span></div>
              <div class="total-line grand"><span>Grand Total</span><span>${money(totals.grandTotal)}</span></div>
              <div class="total-line muted"><span>Paid</span><span>${money(totals.paidAmount)}</span></div>
              <div class="total-line muted"><span>Balance</span><span>${money(totals.balanceAmount)}</span></div>
            </div>
          </section>
        </main>
      </body>
    </html>
  `;
}

function openPrintableInvoice(invoice, totals) {
  const win = window.open('', '_blank', 'width=980,height=1200');
  if (!win) return;
  win.document.write(InvoicePDFTemplate({ invoice, totals }));
  win.document.close();
  win.focus();
}

function safeFileName(value) {
  return String(value || 'invoice')
    .replace(/[^a-z0-9-]+/gi, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function downloadInvoiceHtml(invoice, totals) {
  const html = InvoicePDFTemplate({ invoice, totals, showToolbar: true });
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${safeFileName(invoice.invoiceNumber)}-${safeFileName(invoice.project?.name)}.html`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function whatsappText(invoice, totals) {
  return [
    `${invoice.title} ${invoice.invoiceNumber}`,
    `Project: ${invoice.project.name}`,
    `Milestone: ${invoice.milestone.name}`,
    `Amount: ${money(totals.grandTotal)}`,
    `Due date: ${fmtDate(invoice.dueDate)}`,
    invoice.paymentTerms,
  ].filter(Boolean).join('\n');
}

function recipientPhone(invoice) {
  const digits = String(invoice.client.mobile || '').replace(/[^\d]/g, '');
  if (!digits) return '';
  return digits.length === 10 ? `91${digits}` : digits;
}

function documentTypeForInvoice(invoice) {
  return invoice?.invoiceType === 'Estimate' ? 'estimate' : 'invoice';
}

function shareStatus(link) {
  if (!link) return { label: 'Not Viewed', className: 'bg-bone ink-faint' };
  if (!link.isActive) return { label: 'Disabled', className: 'bg-terra-soft text-terra' };
  if (link.expiresAt && new Date(link.expiresAt) < new Date()) return { label: 'Expired', className: 'bg-terra-soft text-terra' };
  if ((link.currentlyViewingCount || 0) > 0) return { label: 'Currently Viewing', className: 'bg-moss-soft text-moss' };
  if ((link.totalViews || 0) > 0) return { label: 'Viewed', className: 'bg-moss-soft text-moss' };
  return { label: 'Not Viewed', className: 'bg-bone ink-faint' };
}

export default function InvoiceModal({ open, project, masters, milestone, milestones = [], existingInvoice, mode = 'Invoice', onClose, onSave }) {
  documentAmountDisplayUnit = masters?.MasterStudioSettings?.[0]?.amountDisplayUnit || 'auto';
  const [invoice, setInvoice] = useState(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [shareLinks, setShareLinks] = useState([]);
  const [shareBusy, setShareBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    setInvoice(buildInvoiceDraft({ project, masters, milestone, milestones, type: mode, existingInvoice }));
    setShowPdfPreview(false);
    setShareLinks([]);
  }, [open, project, masters, milestone, milestones, existingInvoice, mode]);

  useEffect(() => {
    if (!open || !invoice?.id) return;
    let cancelled = false;
    listShareLinksForDocument(documentTypeForInvoice(invoice), invoice.id).then((links) => {
      if (!cancelled) setShareLinks(links);
    });
    return () => { cancelled = true; };
  }, [open, invoice?.id, invoice?.invoiceType]);

  const totals = useMemo(() => invoice ? computeTotals(invoice) : null, [invoice]);
  const pdfPreviewHtml = useMemo(() => invoice && totals ? InvoicePDFTemplate({ invoice, totals, showToolbar: false }) : '', [invoice, totals]);
  if (!open || !invoice || !totals) return null;

  const patch = (updates) => setInvoice((prev) => ({ ...prev, ...updates }));
  const patchNested = (key, updates) => setInvoice((prev) => ({ ...prev, [key]: { ...prev[key], ...updates } }));
  const finalInvoiceFor = (status, invoiceType = invoice.invoiceType) => (
    { ...invoice, invoiceType, title: invoiceType === 'Estimate' ? 'Estimate' : 'Tax Invoice', status, totals, lineItems: totals.lines, updatedAt: new Date().toISOString() }
  );
  const saveAs = (status, invoiceType = invoice.invoiceType, sendMeta = null) => {
    const finalInvoice = finalInvoiceFor(status, invoiceType);
    onSave?.(finalInvoice, sendMeta);
  };
  const openLink = (url) => {
    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (!opened) window.location.href = url;
  };
  const saveAndSendEmail = () => {
    const invoiceType = invoice.invoiceType === 'Estimate' ? 'Estimate' : 'Tax Invoice';
    const status = invoiceType === 'Estimate' ? 'Estimate Sent' : 'Invoice Raised';
    const finalInvoice = finalInvoiceFor(status, invoiceType);
    const message = whatsappText(finalInvoice, totals);
    const subject = encodeURIComponent(`${finalInvoice.title} ${finalInvoice.invoiceNumber} - ${finalInvoice.project.name}`);
    const body = encodeURIComponent(message);
    openLink(`mailto:${finalInvoice.client.email || ''}?subject=${subject}&body=${body}`);
    window.alert('Email draft opened and logged in Communication Log. Please press Send in your email app.');
    onSave?.(finalInvoice, { channel: 'Email', recipient: finalInvoice.client.email || '', message });
  };
  const saveAndSendWhatsApp = async () => {
    const invoiceType = invoice.invoiceType === 'Estimate' ? 'Estimate' : 'Tax Invoice';
    const status = invoiceType === 'Estimate' ? 'Estimate Sent' : 'Invoice Raised';
    const finalInvoice = finalInvoiceFor(status, invoiceType);
    const message = whatsappText(finalInvoice, totals);
    const phone = recipientPhone(finalInvoice);
    const url = phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;
    openLink(url);
    try {
      await navigator.clipboard?.writeText(message);
    } catch (error) {
      // Clipboard can be blocked in embedded browsers. The WhatsApp URL still carries the message.
    }
    window.alert('WhatsApp draft opened and logged in Communication Log. Please press Send in WhatsApp.');
    onSave?.(finalInvoice, { channel: 'WhatsApp', recipient: finalInvoice.client.mobile || '', message });
  };
  const copyWhatsApp = async () => {
    try {
      await navigator.clipboard?.writeText(whatsappText(invoice, totals));
      window.alert('WhatsApp message copied.');
    } catch (error) {
      window.alert('Could not copy automatically. Use Send via WhatsApp to open the prepared message.');
    }
  };
  const printPdfPreview = () => {
    const frame = document.getElementById('invoice-print-frame');
    frame?.contentWindow?.focus();
    frame?.contentWindow?.print();
  };
  const downloadA4Copy = () => downloadInvoiceHtml(invoice, totals);
  const latestShareLink = shareLinks[0] || null;
  const latestShareStatus = shareStatus(latestShareLink);
  const createTrackableLink = async () => {
    setShareBusy(true);
    try {
      const finalInvoice = finalInvoiceFor(invoice.status || 'Draft', invoice.invoiceType);
      const link = await createShareLink({
        documentType: documentTypeForInvoice(finalInvoice),
        documentId: finalInvoice.id,
        documentPayload: finalInvoice,
        createdBy: finalInvoice.studio?.name || 'Studio',
        allowDownload: true,
      });
      setShareLinks((current) => [link, ...current.filter((l) => l.id !== link.id)]);
      await navigator.clipboard?.writeText(link.publicUrl);
      window.alert('Trackable public link created and copied.');
    } catch (error) {
      console.error(error);
      window.alert('Could not create share link. Please check Supabase or local storage availability.');
    } finally {
      setShareBusy(false);
    }
  };
  const copyShareLink = async () => {
    if (!latestShareLink) return;
    await navigator.clipboard?.writeText(latestShareLink.publicUrl);
    window.alert('Share link copied.');
  };
  const disableShareLink = async () => {
    if (!latestShareLink) return;
    const updated = await updateShareLink(latestShareLink.id, { ...latestShareLink, isActive: false });
    setShareLinks((current) => current.map((link) => link.id === updated.id ? updated : link));
  };
  return (
    <div className="fixed inset-0 z-[120] bg-black/40 flex items-start justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-6xl rounded-xl bg-paper shadow-2xl border border-line overflow-hidden">
        <div className="sticky top-0 z-10 bg-paper border-b border-line px-4 sm:px-6 py-4 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <InvoiceStatusBadge status={invoice.status} />
              <span className="text-[10px] font-mono uppercase tracking-wider ink-faint">{invoice.invoiceType}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold ink leading-tight">{invoice.title} for {invoice.milestone.name}</h2>
            <p className="text-sm ink-soft mt-1">{invoice.project.name} · {money(totals.grandTotal)} payable</p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setShowPdfPreview(true)} className="rounded bg-ink px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-terra">Preview / Print PDF</button>
            <button type="button" onClick={onClose} className="rounded border border-line px-3 py-2 text-sm ink-soft hover:ink">Close</button>
          </div>
        </div>

        {showPdfPreview && (
          <div className="fixed inset-0 z-[140] bg-black/55 flex items-start justify-center p-3 sm:p-5 overflow-y-auto">
            <div className="w-full max-w-5xl bg-paper rounded-xl border border-line shadow-2xl overflow-hidden">
              <div className="sticky top-0 z-10 bg-paper border-b border-line px-4 py-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider ink-faint">A4 Preview</div>
                  <div className="text-sm font-semibold ink">{invoice.title} · {invoice.invoiceNumber}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={printPdfPreview} className="rounded bg-ink px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-terra">Print / Save PDF</button>
                  <button type="button" onClick={downloadA4Copy} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">Download</button>
                  <button type="button" onClick={() => setShowPdfPreview(false)} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">Back to Invoice</button>
                </div>
              </div>
              <iframe
                id="invoice-print-frame"
                title="Invoice A4 print preview"
                srcDoc={pdfPreviewHtml}
                className="w-full bg-[#ece5d8]"
                style={{ height: 'calc(100vh - 96px)', border: 0 }}
              />
            </div>
          </div>
        )}

        <div className="p-4 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-lg border border-line bg-paper p-4">
              <div className="text-[10px] font-mono uppercase tracking-wider ink-faint mb-3">Header</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Studio / Company Name" value={invoice.studio.name} onChange={(v) => patchNested('studio', { name: v })} />
                <Field label="Title" value={invoice.title} onChange={(v) => patch({ title: v })} />
                <Field label="Invoice / Estimate No." value={invoice.invoiceNumber} onChange={(v) => patch({ invoiceNumber: v })} />
                <Field label="Invoice Date" type="date" value={invoice.invoiceDate} onChange={(v) => patch({ invoiceDate: v })} />
                <Field label="Due Date" type="date" value={invoice.dueDate} onChange={(v) => patch({ dueDate: v })} />
                <Field label="Project Name" value={invoice.project.name} onChange={(v) => patchNested('project', { name: v })} />
              </div>
            </div>

            <div className="rounded-lg border border-line bg-paper p-4">
              <div className="text-[10px] font-mono uppercase tracking-wider ink-faint mb-3">Client Details</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Client Name" value={invoice.client.name} onChange={(v) => patchNested('client', { name: v })} />
                <Field label="Client GSTIN" value={invoice.client.gstin} onChange={(v) => patchNested('client', { gstin: v })} />
                <Field label="Client Email" value={invoice.client.email} onChange={(v) => patchNested('client', { email: v })} />
                <Field label="Client Mobile" value={invoice.client.mobile} onChange={(v) => patchNested('client', { mobile: v })} />
                <div className="sm:col-span-2">
                  <TextArea label="Client Address" value={invoice.client.address} onChange={(v) => patchNested('client', { address: v })} />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-bone p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider ink-faint mb-3">Project & Milestone</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div><div className="ink-faint">Project Code</div><strong>{invoice.project.code || '-'}</strong></div>
              <div><div className="ink-faint">Location</div><strong>{invoice.project.location || '-'}</strong></div>
              <div><div className="ink-faint">Current Stage</div><strong>{invoice.milestone.stage}</strong></div>
              <div><div className="ink-faint">Stage Amount</div><strong>{money(invoice.milestone.amount)}</strong></div>
              <div><div className="ink-faint">Previously Billed</div><strong>{money(invoice.milestone.previouslyBilled)}</strong></div>
              <div><div className="ink-faint">Past Due</div><strong>{money(invoice.milestone.pastDue)}</strong></div>
              <div><div className="ink-faint">Total Payable</div><strong>{money(totals.grandTotal)}</strong></div>
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-wider ink-faint mb-1">Invoice Status</span>
                <select value={invoice.status} onChange={(e) => patch({ status: e.target.value })} className="w-full rounded border border-line bg-paper px-2 py-1.5">
                  {STATUS_OPTIONS.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-paper p-4">
            <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider ink-faint mb-1">Share & Tracking</div>
                <div className="text-sm ink font-semibold">Shareable trackable public link</div>
                <div className="text-[11px] ink-soft mt-0.5">Creates a read-only browser link for this {documentTypeForInvoice(invoice)} and tracks views.</div>
              </div>
              <button
                type="button"
                onClick={createTrackableLink}
                disabled={shareBusy}
                className="rounded bg-ink px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-terra disabled:opacity-60"
              >
                <LinkIcon className="w-3 h-3 inline mr-1" />
                {shareBusy ? 'Creating...' : 'Create Share Link'}
              </button>
            </div>

            {latestShareLink ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-mono uppercase tracking-wider rounded px-2 py-1 ${latestShareStatus.className}`}>{latestShareStatus.label}</span>
                  <span className="text-[10px] font-mono ink-faint">Active link</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value={latestShareLink.publicUrl}
                    className="flex-1 rounded border border-line bg-bone px-3 py-2 text-xs ink-soft"
                  />
                  <button type="button" onClick={copyShareLink} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink" title="Copy link">
                    <Copy className="w-3 h-3" />
                  </button>
                  <button type="button" onClick={() => window.open(latestShareLink.publicUrl, '_blank', 'noopener,noreferrer')} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink" title="Open public link">
                    <ExternalLink className="w-3 h-3" />
                  </button>
                  <button type="button" onClick={disableShareLink} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:text-terra" title="Disable link">
                    <ShieldOff className="w-3 h-3" />
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  <div className="rounded border border-line-soft bg-bone p-2"><div className="ink-faint">Total Views</div><strong>{latestShareLink.totalViews || 0}</strong></div>
                  <div className="rounded border border-line-soft bg-bone p-2"><div className="ink-faint">Unique Views</div><strong>{latestShareLink.uniqueViews || 0}</strong></div>
                  <div className="rounded border border-line-soft bg-bone p-2"><div className="ink-faint">Last Viewed</div><strong>{latestShareLink.lastViewedAt ? new Date(latestShareLink.lastViewedAt).toLocaleString('en-IN') : '-'}</strong></div>
                  <div className="rounded border border-line-soft bg-bone p-2"><div className="ink-faint">Currently Viewing</div><strong>{latestShareLink.currentlyViewingCount || 0}</strong></div>
                </div>
              </div>
            ) : (
              <div className="rounded border border-dashed border-line bg-bone px-3 py-3 text-[12px] ink-soft">
                No public link yet. Click Create Share Link to generate a private token URL.
              </div>
            )}
          </div>

          <InvoiceLineItemsTable items={invoice.lineItems || []} onChange={(lineItems) => patch({ lineItems })} />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
            <PaymentDetailsBlock invoice={invoice} onChange={patch} />
            <TaxSummary invoice={invoice} totals={totals} onChange={patch} />
          </div>
        </div>

        <div className="sticky bottom-0 bg-paper border-t border-line px-4 sm:px-6 py-4 flex flex-wrap gap-2 justify-end">
          <button type="button" onClick={() => saveAs('Draft')} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">Save Draft</button>
          <button type="button" onClick={() => saveAs('Estimate Sent', 'Estimate')} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">Generate Estimate</button>
          <button type="button" onClick={() => saveAs('Invoice Raised', 'Tax Invoice')} className="rounded bg-ink px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-terra">Generate Invoice</button>
          <button type="button" onClick={() => setShowPdfPreview(true)} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">Preview / Print PDF</button>
          <button type="button" onClick={downloadA4Copy} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">Download</button>
          <button type="button" onClick={saveAndSendEmail} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">Send via Email</button>
          <button type="button" onClick={saveAndSendWhatsApp} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">Send via WhatsApp</button>
          <button type="button" onClick={copyWhatsApp} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">Copy Message</button>
          <button type="button" onClick={() => saveAs('Invoice Raised', 'Tax Invoice')} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">Mark as Billed</button>
          <button type="button" onClick={() => saveAs('Paid', 'Tax Invoice')} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">Mark as Paid</button>
        </div>
      </div>
    </div>
  );
}
