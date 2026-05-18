import React, { useEffect, useMemo, useState } from 'react';
import { AlertCircle, Download, Eye, Printer, RefreshCw } from 'lucide-react';
import {
  closeProposalViewSession,
  getProposalShareLinkByToken,
  heartbeatProposalViewSession,
  startProposalViewSession,
} from '../lib/proposalShareLinks';

function unavailableMessage(reason) {
  if (reason === 'expired') return 'This proposal link has expired.';
  if (reason === 'disabled') return 'This proposal link has been disabled.';
  if (reason === 'missing') return 'We could not find this proposal.';
  return 'This proposal is unavailable.';
}

function money(value) {
  const amount = Number(String(value || '').replace(/[^0-9.-]+/g, ''));
  if (!Number.isFinite(amount) || amount <= 0) return value || '-';
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(amount >= 100000000 ? 0 : 1)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(amount >= 1000000 ? 0 : 1)} L`;
  return `₹${amount.toLocaleString('en-IN')}`;
}

function buildProposalHtml(payload) {
  const title = payload?.proposalName || payload?.name || 'Proposal';
  const studio = payload?.studioName || 'Studio/OS';
  const client = payload?.clientName || payload?.leadName || 'Client';
  const sections = payload?.sections || [];
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${title}</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #191714; background: #f7f3ea; }
    .page { max-width: 920px; margin: 0 auto; padding: 48px 28px 72px; }
    .paper { background: #fff; border: 1px solid #e8ddc8; border-radius: 18px; overflow: hidden; box-shadow: 0 22px 70px rgba(42,31,21,.08); }
    .hero { padding: 48px; border-bottom: 1px solid #eee3cf; }
    .eyebrow { text-transform: uppercase; letter-spacing: .14em; color: #9a8060; font-size: 11px; font-weight: 700; margin-bottom: 18px; }
    h1 { font-size: clamp(34px, 6vw, 64px); line-height: .94; letter-spacing: -.04em; margin: 0 0 18px; }
    .sub { color: #66594b; font-size: 17px; line-height: 1.5; max-width: 680px; }
    .grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); border-bottom: 1px solid #eee3cf; }
    .metric { padding: 24px 28px; border-right: 1px solid #eee3cf; }
    .metric:last-child { border-right: 0; }
    .label { color: #94836d; text-transform: uppercase; letter-spacing: .12em; font-size: 10px; font-weight: 700; margin-bottom: 8px; }
    .value { font-size: 24px; font-weight: 750; }
    .content { padding: 38px 48px 48px; }
    .section { padding: 24px 0; border-bottom: 1px solid #f0e8da; }
    .section:last-child { border-bottom: 0; }
    h2 { margin: 0 0 10px; font-size: 22px; letter-spacing: -.02em; }
    p { color: #4f473d; line-height: 1.65; font-size: 15px; margin: 0; }
    .pill { display: inline-block; margin-top: 14px; padding: 8px 12px; background: #f7eadb; color: #9c4e21; border-radius: 999px; font-size: 12px; font-weight: 700; }
    .footer { padding: 22px 48px; border-top: 1px solid #eee3cf; color: #8a7b69; font-size: 12px; display: flex; justify-content: space-between; gap: 16px; }
    @media (max-width: 720px) {
      .page { padding: 18px 12px 36px; }
      .hero, .content, .footer { padding-left: 22px; padding-right: 22px; }
      .grid { grid-template-columns: 1fr; }
      .metric { border-right: 0; border-bottom: 1px solid #eee3cf; }
      .metric:last-child { border-bottom: 0; }
    }
  </style>
</head>
<body>
  <main class="page">
    <article class="paper">
      <section class="hero">
        <div class="eyebrow">${studio} · Proposal</div>
        <h1>${title}</h1>
        <div class="sub">Prepared for ${client}${payload?.projectName ? ` for ${payload.projectName}` : ''}. ${payload?.summary || 'A focused proposal for scope, commercial alignment, and next steps.'}</div>
      </section>
      <section class="grid">
        <div class="metric"><div class="label">Client</div><div class="value">${client}</div></div>
        <div class="metric"><div class="label">Estimated Value</div><div class="value">${money(payload?.dealValue || payload?.estimatedValue)}</div></div>
        <div class="metric"><div class="label">Stage</div><div class="value">${payload?.stage || 'Proposal'}</div></div>
      </section>
      <section class="content">
        ${(sections.length ? sections : [
          { title: 'Scope Direction', body: payload?.notes || 'We will refine the brief, align expectations, and define the project path with clear milestones.' },
          { title: 'Commercial Approach', body: 'The proposal value and terms are indicative until final scope and contract sign-off.' },
          { title: 'Next Step', body: 'Review this proposal and confirm if you would like the studio to proceed to the next stage.' },
        ]).map((section) => `
          <div class="section">
            <h2>${section.title}</h2>
            <p>${section.body}</p>
            ${section.badge ? `<span class="pill">${section.badge}</span>` : ''}
          </div>
        `).join('')}
      </section>
      <footer class="footer">
        <span>${studio}</span>
        <span>Shared proposal · read-only view</span>
      </footer>
    </article>
  </main>
</body>
</html>`;
}

export default function PublicProposalView({ route }) {
  const [state, setState] = useState({ loading: true, link: null, session: null, error: '' });

  useEffect(() => {
    let cancelled = false;
    let heartbeat = null;
    let opened = null;

    async function load() {
      const link = await getProposalShareLinkByToken(route.token);
      if (!link) {
        if (!cancelled) setState({ loading: false, link: null, session: null, error: 'missing' });
        return;
      }
      if (!link.isActive) {
        if (!cancelled) setState({ loading: false, link, session: null, error: 'disabled' });
        return;
      }
      if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
        if (!cancelled) setState({ loading: false, link, session: null, error: 'expired' });
        return;
      }
      opened = await startProposalViewSession(link);
      if (cancelled) return;
      setState({ loading: false, link: opened.link || link, session: opened.session, error: '' });
      heartbeat = window.setInterval(() => heartbeatProposalViewSession(opened.session), 18000);
    }

    load();

    const close = () => {
      if (opened?.session) closeProposalViewSession(opened.session, opened.link);
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

  const html = useMemo(() => buildProposalHtml(state.link?.documentPayload || {}), [state.link]);

  if (state.loading) {
    return (
      <div className="min-h-screen bg-bone flex items-center justify-center p-6">
        <div className="bg-paper border border-line rounded-xl p-6 flex items-center gap-3 ink-soft">
          <RefreshCw className="w-4 h-4 animate-spin" />
          Loading proposal...
        </div>
      </div>
    );
  }

  if (state.error) {
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
          <div className="text-[10px] font-mono uppercase tracking-wider ink-faint flex items-center gap-1.5">
            <Eye className="w-3 h-3" /> Shared proposal
          </div>
          <div className="text-sm font-semibold ink truncate">
            {state.link.documentPayload?.proposalName || state.link.documentPayload?.name || 'Proposal'}
          </div>
        </div>
        {state.link.allowDownload && (
          <div className="flex items-center gap-2">
            <button onClick={() => window.print()} className="rounded bg-ink px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-terra">
              <Printer className="w-3 h-3 inline mr-1" /> Print
            </button>
            <button onClick={() => window.print()} className="rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider ink-soft hover:ink">
              <Download className="w-3 h-3 inline mr-1" /> PDF
            </button>
          </div>
        )}
      </div>
      <iframe
        title="Shared proposal preview"
        srcDoc={html}
        className="w-full"
        style={{ height: 'calc(100vh - 58px)', border: 0 }}
      />
    </div>
  );
}
