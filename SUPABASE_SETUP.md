# Supabase Setup for Studio/OS

This repository intentionally excludes live Supabase secrets and schema files.
Use this file to configure a Supabase project and enable the app's DB-backed features.

## 1. Create a Supabase project

1. Go to https://app.supabase.com and create a new project.
2. In the Supabase dashboard, note the `SUPABASE_URL` and `anon` public key.
3. Create the required storage buckets:
   - `studio-os-files`
   - `portfolio-assets`
   - `whiteboard-assets`

## 2. Configure local environment variables

Copy the sample file in `source/.env.example` to `source/.env.local`:

```bash
cd source
cp .env.example .env.local
```

Then replace the placeholder values with your Supabase project values.

The app expects these values:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SUPABASE_TABLE`
- `VITE_SUPABASE_ROW_ID`
- `VITE_SUPABASE_FILE_BUCKET`
- `VITE_SUPABASE_PORTFOLIO_BUCKET`
- `VITE_SUPABASE_WHITEBOARD_BUCKET`

## 3. Create the required database schema

The application reads and writes to these Supabase tables:

- `studio_workspace`
- `studio_settings`
- `studio_brand_assets`
- `workspace_files`
- `file_links`
- `workspace_file_library`
- `share_links`
- `document_view_events`
- `proposal_share_links`
- `proposal_view_sessions`
- `questionnaire_templates`
- `questionnaire_questions`
- `questionnaire_responses`
- `lead_sources`
- `lead_statuses`
- `sales_stages`
- `master_leads`
- `sales_deals`
- `sales_notes`
- `sales_followups`
- `sales_files`
- `sales_contracts`
- `sales_payment_terms`
- `sales_portfolio_proofs`
- `sales_activity_log`
- `studio_clients`
- `studio_team_members`
- `studio_projects`
- `workflow_stages`
- `workflow_activities`
- `workflow_tasks`
- `task_checklists`
- `workflow_deliverables`
- `studio_phase1_foundation_health`

> This repo does not include the full SQL schema definitions. Create them in the Supabase SQL editor or import them from your existing project.

## 4. Run the app

From the `source` directory:

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 5174
```

## 5. Verify connectivity

- Confirm `isSupabaseConfigured` is true in `source/src/lib/supabase.js`.
- Confirm `supabase` is not `null`.
- If the app reports `mode: 'not_configured'`, the env file or keys are still missing.

## 6. Notes

- `.env` and `.env.local` are intentionally not checked in.
- If the Supabase schema is missing, the app may fall back to localStorage or return `not_configured` for DB-backed flows.
- Use this same `.env.local` approach when deploying locally or to a staging environment.
