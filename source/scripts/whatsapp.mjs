import { spawn } from 'node:child_process';
import http from 'node:http';

const statusUrl = new URL(process.env.VITE_WHATSAPP_API_BASE || 'http://localhost:3002');
statusUrl.pathname = '/whatsapp/status';

function checkStatus() {
  return new Promise((resolve) => {
    const req = http.get(statusUrl, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => resolve({ ok: res.statusCode >= 200 && res.statusCode < 500, body }));
    });
    req.on('error', () => resolve({ ok: false, body: '' }));
    req.setTimeout(800, () => {
      req.destroy();
      resolve({ ok: false, body: '' });
    });
  });
}

const status = await checkStatus();
if (status.ok) {
  console.log(`WhatsApp backend is already running at ${statusUrl.origin}`);
  if (status.body) console.log(status.body);
  process.exit(0);
}

const child = spawn('npm', ['--prefix', 'backend', 'start'], {
  cwd: process.cwd(),
  stdio: 'inherit',
  env: process.env,
});

child.on('exit', (code, signal) => {
  process.exit(code ?? (signal ? 1 : 0));
});
