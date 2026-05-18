# StudioOS Modular Copy

This folder is the new working copy created from `StudioOS_20260511_12.47_gant`.

## Source Layout

- `src/App.jsx` — main StudioOS app shell and screens from the supplied Gantt base.
- `src/data/seedProjects.js` — project seed data split out of the original large file.
- `src/data/initialMasters.js` — master library seed data split out of the original large file.
- `src/data/defaultBoardColumns.js` — dashboard board-column seed data.
- `src/styles/styleTag.js` — injected StudioOS theme CSS from the supplied base.
- `src/components/ProjectFilePreview.jsx` — in-app file preview module preserved from the working app.
- `src/components/ProjectMemberChat.jsx` — WhatsApp-like internal project chat UI preserved from the working app.
- `src/components/WhatsAppDashboardCard.jsx` — WhatsApp Web connection, QR, connected number, disconnect/reconnect module.
- `src/lib/supabase.js` — Supabase client config.
- `src/lib/workspaceStorage.js` — persistence layer with IndexedDB/local fallback and Supabase sync.
- `backend/server.js` — WhatsApp backend copied from the working app.
- `scripts/dev-all.mjs` — helper to run frontend + WhatsApp backend together.

## Run

```bash
npm run dev -- --port 5174
```

For WhatsApp backend + frontend:

```bash
npm run dev:all
```

## Verify

```bash
npm run build
```
