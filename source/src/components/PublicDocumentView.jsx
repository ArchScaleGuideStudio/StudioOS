import React, { useEffect, useMemo, useState } from 'react';
import { AlertCircle, Download, Printer, RefreshCw } from 'lucide-react';
import { InvoicePDFTemplate } from './InvoiceModal';
import { ContractPDFTemplate } from './ContractModal';
import {
  getShareLinkByToken,
  recordViewClose,
  recordViewHeartbeat,
  recordViewOpen,
} from '../lib/shareLinks';

function unavailableMessage(reason) {
  if (reason === 'expired') return 'This link has expired.';
  if (reason === 'disabled') return 'This link has been disabled.';
  if (reason === 'missing') return 'We could not find this shared document.';
  return 'This shared document is unavailable.';
}

export default function PublicDocumentView({ route }) {
  const [state, setState] = useState({ loading: true, link: null, event: null, error: '' });

  useEffect(() => {
    let cancelled = false;
    let heartbeat = null;
    let opened = null;

    async function load() {
      const link = await getShareLinkByToken(route.token);
      if (!link) {
        if (!cancelled) setState({ loading: false, link: null, event: null, error: 'missing' });
        return;
      }
      if (!link.isActive) {
        if (!cancelled) setState({ loading: false, link, event: null, error: 'disabled' });
        return;
      }
      if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
        if (!cancelled) setState({ loading: false, link, event: null, error: 'expired' });
        return;
      }
      opened = await recordViewOpen(link);
      if (cancelled) return;
      setState({ loading: false, link: opened.link || link, event: opened.event, error: '' });
      heartbeat = window.setInterval(() => {
        recordViewHeartbeat(opened.event);
      }, 20000);
    }

    load();

    const close = () => {
      if (opened?.event) recordViewClose(opened.event, opened.link);
    };
    window.addEventListener('pagehide', close);
    window.addEventListener('beforeunload', close);
    return () => {
      cancelled = true;
      if (heartbeat) window.clearInterval(heartbeat);
      window.removeEventListener('pagehide', close);
      window.removeEventListener('beforeunload', close);
      close();
    };
  }, [route.token]);

  const html = useMemo(() => {
    const payload = state.link?.documentPayload;
    if (!payload) return '';
    if (state.link?.documentType === 'contract') {
      return ContractPDFTemplate({ contract: payload, showToolbar: false });
    }
    const invoice = payload;
    const totals = invoice.totals || {
      lines: invoice.lineItems || [],
      subtotal: 0,
      discount: 0,
      taxableValue: 0,
      cgst: 0,
      sgst: 0,
      igst: 0,
      totalTax: 0,
      roundOff: 0,
      grandTotal: invoice.grand_total || 0,
      paidAmount: invoice.paid_amount || 0,
      balanceAmount: invoice.balance_amount || 0,
    };
    return InvoicePDFTemplate({ invoice, totals, showToolbar: false });
  }, [state.link]);

  if (state.loading) {
    return (
      <div className="min-h-screen bg-bone flex items-center justify-center p-6">
        <div className="bg-paper border border-line rounded-xl p-6 flex items-center gap-3 ink-soft">
          <RefreshCw className="w-4 h-4 animate-spin" />
          Loading shared document...
        </div>
      </div>
    );
  }

  if (state.error || !state.link?.documentPayload) {
    return (
      <div className="min-h-screen bg-bone flex items-center justify-center p-6">
        <div className="bg-paper border border-line rounded-xl p-8 max-w-md text-center">
          <AlertCircle className="w-8 h-8 text-terra mx-auto mb-3" />
          <h1 className="text-xl font-semibold ink mb-2">Link unavailable</h1>
          <p className="text-sm ink-soft">{unavailableMessage(state.error)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bone">
      <div className="sticky top-0 z-10 bg-paper/95 border-b border-line px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] font-mono uppercase tracking-wider ink-faint">Shared document</div>
          <div className="text-sm font-semibold ink truncate">
            {state.link.documentPayload.title} · {state.link.documentPayload.invoiceNumber || state.link.documentPayload.contractNumber}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {state.link.allowDownload && (
            <button onClick={() => window.print()} className="rounded bg-ink px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-terra">
              <Printer className="w-3 h-3 inline mr-1" /> Print
            </button>
          )}
          {state.link.allowDownload && (
            <button onClick={() => window.print()} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">
              <Download className="w-3 h-3 inline mr-1" /> PDF
            </button>
          )}
        </div>
      </div>
      <iframe
        title="Shared document preview"
        srcDoc={html}
        className="w-full"
        style={{ height: 'calc(100vh - 58px)', border: 0 }}
      />
    </div>
  );
}
