export const styleTag = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  /* === Phase 9.1 Part 1 — Foundation: Calm redesign tokens ===
     Existing token names (--bone, --paper, --terra, etc.) preserved for
     backward compat with 28K+ lines of existing code.
     Calm palette refines the warmth, lightens key surfaces. */
  --bone: #F8F2E5;          /* lighter cream — was #F4F1EA */
  --paper: #FFFFFF;          /* pure white surfaces — was #FCFAF5 */
  --paper-deep: #FFFFFF;
  --muted-warm: #F0E8D6;
  --line: #EADFC8;          /* warmer hairline — was #E5DFD3 */
  --line-soft: #F0E8D6;
  --line-deep: #D9C9A8;
  --ink: #2A1F15;            /* deeper warm ink — was #1A1815 */
  --ink-soft: #5C4A3A;       /* warm secondary — was #6B6660 */
  --ink-faint: #8A7558;      /* warm faint — was #9A938A */
  --terra: #B85C1F;          /* warmer terracotta — was #B4593C */
  --terra-soft: #FBE5DC;     /* warmer accent bg — was #F2DDD0 */
  --moss: #6B7355;
  --moss-soft: #E8EBE0;      /* warmer moss bg — was #DDE2D2 */
  --clay: #A67C5A;
}

/* === Phase 9.1 Part 1 — Single-font system (Inter throughout) ===
   .font-display, .font-ui, .font-mono all render Inter now.
   Class names retained so existing JSX continues to work without edits.
   Heading weight + tracking comes from utility classes (text-*, font-*),
   not the font-family. */
.font-display { font-family: 'Inter', system-ui, -apple-system, sans-serif; font-feature-settings: 'cv11', 'ss01'; letter-spacing: -0.015em; }
.font-ui      { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
.font-mono    { font-family: 'Inter', system-ui, -apple-system, sans-serif; font-feature-settings: 'tnum'; }

.app-bg { background: var(--bone); }
.paper { background: var(--paper); }
.ink { color: var(--ink); }
.ink-soft { color: var(--ink-soft); }
.ink-faint { color: var(--ink-faint); }
.bg-paper { background: var(--paper); }
.bg-bone { background: var(--bone); }
.bg-muted-warm { background: var(--muted-warm); }
.bg-line { background: var(--line); }
.border-line { border-color: var(--line); }
.border-line-soft { border-color: var(--line-soft); }
.border-ink { border-color: var(--ink); }
.text-terra { color: var(--terra); }
.bg-terra { background: var(--terra); }
.bg-terra-soft { background: var(--terra-soft); }
.border-terra { border-color: var(--terra); }
.bg-moss { background: var(--moss); }
.text-moss { color: var(--moss); }
.bg-moss-soft { background: var(--moss-soft); }
.bg-clay { background: var(--clay); }
.text-clay { color: var(--clay); }
.bg-ink { background: var(--ink); }

.grid-paper {
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 28px 28px;
  background-position: -1px -1px;
}

.scrollbar-thin::-webkit-scrollbar { width: 6px; height: 6px; }
.scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
.scrollbar-thin::-webkit-scrollbar-thumb { background: var(--line-deep); border-radius: 3px; }
.scrollbar-thin::-webkit-scrollbar-thumb:hover { background: var(--terra); }

.fade-in { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.input-base {
  width: 100%;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 10px 12px;
  color: var(--ink);
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  outline: none;
  transition: border-color 0.15s, background 0.15s;
}
.input-base:focus { border-color: var(--ink); background: var(--paper-deep); }
.input-base::placeholder { color: var(--ink-faint); }
.input-base:disabled { background: var(--muted-warm); color: var(--ink-soft); cursor: not-allowed; }

.input-sm {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 4px 8px;
  color: var(--ink);
  font-size: 13px;
  font-family: 'Inter', sans-serif;
  outline: none;
  width: 100%;
}
.input-sm:focus { border-color: var(--ink); background: var(--paper-deep); }

.chip-pick {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--paper);
  color: var(--ink-soft);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}
.chip-pick:hover { border-color: var(--ink); color: var(--ink); }
.chip-pick.active { background: var(--ink); border-color: var(--ink); color: white; }
.chip-pick.terra.active { background: var(--terra); border-color: var(--terra); }

.spec-marker {
  font-family: 'Inter', monospace;
  font-feature-settings: 'tnum';
  font-size: 12px;
  color: var(--ink-faint);
  width: 36px;
  flex-shrink: 0;
}

/* Vibrant accents — Backup & Restore */
.bg-blue-vibrant { background: #2563EB; }
.text-blue-vibrant { color: #2563EB; }
.bg-green-vibrant { background: #16A34A; }
.text-green-vibrant { color: #16A34A; }
.bg-amber-soft { background: #FEF6E7; }
.border-amber { border-color: #F6D38C; }
.text-amber-deep { color: #7C2D12; }
.text-amber-mid { color: #92400E; }

.action-card-blue {
  background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
  border: none;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}
.action-card-blue:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.25);
}
.action-card-green {
  background: linear-gradient(135deg, #16A34A 0%, #15803D 100%);
  border: none;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}
.action-card-green:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(22, 163, 74, 0.25);
}

/* Modals */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(26, 24, 21, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 24px;
  animation: fadeIn 0.2s ease-out;
}
.modal-card {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 24px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-out;
  max-height: 90vh;
  overflow-y: auto;
}

.app-mobile-menu-button,
.app-mobile-nav-backdrop {
  display: none;
}

@media (max-width: 1024px) {
  .app-header-inner {
    padding-left: 14px !important;
    padding-right: 14px !important;
    gap: 10px;
  }

  .app-mobile-menu-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .app-shell-body {
    min-height: calc(100vh - 57px) !important;
  }

  .app-sidebar {
    position: fixed;
    left: 0;
    top: 57px;
    bottom: 0;
    width: min(82vw, 300px) !important;
    max-width: 300px;
    z-index: 70;
    transform: translateX(-105%);
    box-shadow: 0 20px 60px rgba(0,0,0,0.18);
  }

  .app-sidebar.mobile-open {
    transform: translateX(0);
  }

  .app-mobile-nav-backdrop {
    display: block;
    position: fixed;
    inset: 57px 0 0 0;
    z-index: 60;
    background: rgba(42,31,21,0.28);
  }

  .app-main {
    width: 100%;
    min-width: 0;
  }

  .px-12 {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }

  .py-12 {
    padding-top: 24px !important;
    padding-bottom: 24px !important;
  }

  .pt-8 { padding-top: 20px !important; }
  .pb-6 { padding-bottom: 16px !important; }

  .grid-cols-6,
  .grid-cols-5,
  .grid-cols-4,
  .grid-cols-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }

  .w-64,
  .w-72,
  .w-80 {
    max-width: 100%;
  }

  .text-\\[24px\\] { font-size: 24px !important; }

  .sticky.top-0 > .flex {
    overflow-x: auto;
    scrollbar-width: thin;
    -webkit-overflow-scrolling: touch;
  }
}

@media (max-width: 640px) {
  body {
    font-size: 16px;
  }

  .app-header-inner {
    padding-top: 10px !important;
    padding-bottom: 10px !important;
  }

  .app-header-inner > div:first-child {
    gap: 8px !important;
    min-width: 0;
  }

  .app-header-inner > div:last-child {
    gap: 6px !important;
  }

  .app-header-inner .font-display {
    font-size: 16px !important;
  }

  .app-header-inner .text-\\[12px\\] {
    display: none;
  }

  .grid-cols-6,
  .grid-cols-5,
  .grid-cols-4,
  .grid-cols-3,
  .grid-cols-2 {
    grid-template-columns: minmax(0, 1fr) !important;
  }

  .gap-6 { gap: 12px !important; }
  .gap-5 { gap: 12px !important; }
  .gap-4 { gap: 10px !important; }

  .p-8 { padding: 20px !important; }
  .p-6 { padding: 18px !important; }
  .p-5 { padding: 16px !important; }

  .text-\\[12px\\] { font-size: 13px !important; }
  .text-\\[13px\\] { font-size: 14px !important; }
  .text-\\[14px\\] { font-size: 16px !important; }
  .text-\\[16px\\] { font-size: 16px !important; }
  .text-\\[20px\\] { font-size: 20px !important; }
  .text-\\[24px\\] { font-size: 24px !important; }

  .input-base {
    min-height: 48px;
    font-size: 16px;
    padding: 11px 12px;
  }

  .input-sm {
    min-height: 42px;
    font-size: 14px;
    padding: 8px 10px;
  }

  .chip-pick {
    font-size: 13px;
    padding: 8px 11px;
  }

  button {
    min-height: 38px;
  }

  .sticky.top-0 button,
  [role="tab"],
  .app-sidebar button {
    font-size: 14px !important;
  }

  .page-header {
    padding: 18px 20px 0 !important;
  }

  .page-header-main {
    gap: 8px !important;
  }

  .page-header-kicker {
    margin-bottom: 8px !important;
    gap: 7px !important;
  }

  .page-header-kicker svg {
    width: 17px !important;
    height: 17px !important;
  }

  .page-header-kicker-text {
    font-size: 13px !important;
    line-height: 1.2 !important;
    letter-spacing: 0.08em !important;
    color: var(--ink-faint) !important;
  }

  .page-header-title {
    font-size: 24px !important;
    line-height: 1.05 !important;
    letter-spacing: 0 !important;
    margin: 0 !important;
  }

  .page-header-description {
    font-size: 16px !important;
    line-height: 1.45 !important;
    margin-top: 12px !important;
    max-width: 34rem !important;
    color: var(--ink-soft) !important;
  }

  .page-header-tabs {
    margin-top: 22px !important;
    margin-bottom: 0 !important;
    gap: 0 !important;
    justify-content: stretch;
    overflow-x: auto;
  }

  .files-top-tab {
    flex: 1 0 50%;
    min-height: 64px !important;
    padding: 10px 10px 12px !important;
    text-align: center;
  }

  .files-top-tab-label,
  .files-top-tab-sublabel {
    font-size: 14px !important;
    line-height: 1.25 !important;
  }

  .files-top-tab-label {
    font-weight: 700 !important;
    color: var(--ink-soft);
  }

  .files-top-tab.border-terra .files-top-tab-label {
    color: var(--ink) !important;
  }

  .files-top-tab-sublabel {
    margin-top: 5px !important;
    font-weight: 600 !important;
    color: var(--ink-faint) !important;
  }

  .files-top-tab.border-terra .files-top-tab-sublabel {
    color: var(--terra) !important;
  }

  .flex.items-center.justify-between {
    min-width: 0;
  }

  table {
    min-width: 680px;
  }

  .overflow-x-auto,
  .scrollbar-thin {
    -webkit-overflow-scrolling: touch;
  }
}
`;
