# Studio/OS Backup Standing Instructions

For every future stage backup, generate one full package that includes:

- Current React source modules
- Backend source
- SQL schema files for tables and sync foundations
- Package manifests and scripts
- Current workspace data JSON from the running app
- Current flows and UI code at that stage

Use the in-app path:

Settings -> Backup export -> Download Full Source ZIP

The backend also mirrors each generated full ZIP into:

`/Users/sd369/Downloads/APH_codes`

This is the standing backup folder for stage checkpoints. The mirrored ZIP is the handoff package to use before continuing large product changes.

Notes:

- `node_modules`, browser sessions, `.env`, and generated build folders are intentionally excluded from the source backup to keep the package portable and clean.
- Reinstall dependencies with `npm install` after restoring.
- Rebuild with `npm run build`.
- Start the app with the current project scripts.
- The JSON data file inside the ZIP is the current workspace state from the running app at the moment of export.
