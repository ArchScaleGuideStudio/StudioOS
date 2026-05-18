import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'whatsapp-web.js';
import qrcode from 'qrcode';
import qrcodeTerminal from 'qrcode-terminal';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFile } from 'child_process';
import fs from 'fs/promises';
import { createReadStream } from 'fs';
import os from 'os';
import { promisify } from 'util';

const { Client, LocalAuth } = pkg;
const execFileAsync = promisify(execFile);

// Configuration
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const testRecipientNumber = normalizePhoneNumber(process.env.WHATSAPP_TEST_RECIPIENT || '919372745434');
const forceTestRecipient = process.env.WHATSAPP_FORCE_TEST_RECIPIENT === 'true';
const whatsappClientId = process.env.WHATSAPP_CLIENT_ID || 'studio-os-test';
const whatsappSessionPath = path.join(__dirname, 'sessions', `session-${whatsappClientId}`);

const app = express();
const server = createServer(app);
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
];
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  exposedHeaders: ['Content-Disposition', 'X-StudioOS-Mirrored-Path', 'X-StudioOS-CSV-Path']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Rate limiting
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 100; // Max 100 requests per minute

app.use((req, res, next) => {
  const key = req.ip;
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  
  if (!rateLimit.has(key)) {
    rateLimit.set(key, []);
  }
  
  const requests = rateLimit.get(key).filter(time => time > windowStart);
  requests.push(now);
  rateLimit.set(key, requests);
  
  if (requests.length > RATE_LIMIT_MAX) {
    return res.status(429).json({
      error: 'Too many requests',
      message: 'Rate limit exceeded. Please try again later.',
      retryAfter: Math.ceil(RATE_LIMIT_WINDOW / 1000)
    });
  }
  
  next();
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('[Server] Global error:', error);
  
  if (error.type === 'entity.parse.error') {
    return res.status(400).json({
      error: 'Invalid JSON',
      message: 'Request body contains invalid JSON'
    });
  }
  
  if (error.type === 'entity.too.large') {
    return res.status(413).json({
      error: 'Request too large',
      message: 'Request body exceeds maximum size limit'
    });
  }
  
  res.status(500).json({
    error: 'Internal server error',
    message: 'An unexpected error occurred',
    timestamp: new Date().toISOString()
  });
});

// WhatsApp Client
let whatsappClient = null;
let connectionStatus = 'disconnected';
let qrCode = null;
let qrCodeImage = null;
let reconnectTimer = null;
let reconnectAttempts = 0;
let initializingClient = false;
let connectedAccount = null;
let desiredPairingNumber = '';
let manualDisconnecting = false;

function normalizePhoneNumber(number) {
  return String(number || '').replace(/[^\d]/g, '');
}

function normalizeOutgoingPhoneNumber(number) {
  const digits = normalizePhoneNumber(number);
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 11 && digits.startsWith('0')) return `91${digits.slice(1)}`;
  return digits;
}


function readConnectedAccount() {
  const info = whatsappClient?.info || null;
  const wid = info?.wid?._serialized || info?.wid?.user || '';
  const number = normalizePhoneNumber(info?.wid?.user || wid);
  return info ? {
    number,
    chatId: wid || (number ? number + '@c.us' : ''),
    pushname: info.pushname || '',
    platform: info.platform || '',
  } : null;
}

function statusPayload(extra = {}) {
  return {
    status: connectionStatus,
    qr: qrCode,
    qrImage: qrCodeImage,
    connected: connectionStatus === 'connected',
    account: connectedAccount,
    desiredPairingNumber,
    ...extra,
  };
}

function formatWhatsAppChatId(number) {
  const formattedNumber = normalizeOutgoingPhoneNumber(number);
  if (formattedNumber.length < 10 || formattedNumber.length > 15) {
    const error = new Error('Invalid phone number. Use country code plus number, for example 919999999999.');
    error.statusCode = 400;
    throw error;
  }
  return `${formattedNumber}@c.us`;
}

function resolveOutgoingNumber(requestedNumber) {
  if (forceTestRecipient && testRecipientNumber) {
    return testRecipientNumber;
  }
  return requestedNumber;
}

function ensureWhatsAppConnected() {
  if (!whatsappClient || connectionStatus !== 'connected') {
    const hint = connectionStatus === 'authenticated'
      ? 'WhatsApp is authenticated but still loading. Wait until the dashboard status says connected, then try again.'
      : 'WhatsApp not connected. Open the dashboard WhatsApp panel and scan the QR code first.';
    const error = new Error(hint);
    error.statusCode = 503;
    throw error;
  }
}

async function ensureWhatsAppReadyForSend() {
  if (connectionStatus === 'connected') return;

  if (['authenticated', 'connecting', 'restarting', 'reconnecting'].includes(connectionStatus)) {
    await waitForWhatsAppConnection(30000);
    return;
  }

  ensureWhatsAppConnected();
}

function isRecoverableWhatsAppError(error) {
  return /detached Frame|Execution context was destroyed|Protocol error|Target closed|Session closed|Page crashed|Navigating frame was detached/i.test(error?.message || '');
}

function isSessionLockedError(error) {
  return /browser is already running|Use a different `userDataDir`|userDataDir/i.test(error?.message || '');
}

async function terminateLockedSessionBrowser() {
  if (process.platform !== 'darwin' && process.platform !== 'linux') {
    return false;
  }

  try {
    await execFileAsync('pkill', ['-f', whatsappSessionPath]);
    console.log(`[WhatsApp] Stopped stale browser process for ${whatsappSessionPath}`);
    return true;
  } catch (error) {
    if (error.code === 1) {
      console.warn('[WhatsApp] No stale browser process found for session lock.');
      return false;
    }
    console.warn('[WhatsApp] Could not stop stale browser process:', error.message);
    return false;
  }
}

async function assertRegisteredWhatsAppUser(chatId) {
  const isRegistered = await whatsappClient.isRegisteredUser(chatId);
  if (!isRegistered) {
    const error = new Error('This number is not registered on WhatsApp.');
    error.statusCode = 400;
    throw error;
  }
}

function emitOutgoingMessage(response, to, body) {
  io.emit('whatsapp:message', {
    from: 'studio-os',
    to,
    body,
    timestamp: Math.floor(Date.now() / 1000),
    id: response.id?._serialized,
    direction: 'outgoing'
  });
}

function scheduleReconnect(reason) {
  if (reconnectTimer) return;
  reconnectAttempts += 1;
  const delayMs = Math.min(30000, 3000 * reconnectAttempts);
  connectionStatus = 'reconnecting';
  io.emit('whatsapp:status', { status: connectionStatus, reason, reconnectAttempts, retryInMs: delayMs });

  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    initializeWhatsAppClient();
  }, delayMs);
}

function waitForWhatsAppConnection(timeoutMs = 30000) {
  return new Promise((resolve, reject) => {
    if (connectionStatus === 'connected') {
      resolve(true);
      return;
    }

    const startedAt = Date.now();
    const interval = setInterval(() => {
      if (connectionStatus === 'connected') {
        clearInterval(interval);
        resolve(true);
        return;
      }

      if (connectionStatus === 'qr' || connectionStatus === 'auth_failure') {
        clearInterval(interval);
        const error = new Error('WhatsApp needs QR scan before messages can be sent.');
        error.statusCode = 503;
        reject(error);
        return;
      }

      if (Date.now() - startedAt > timeoutMs) {
        clearInterval(interval);
        const error = new Error('WhatsApp reconnect timed out. Restart the backend and scan QR if shown.');
        error.statusCode = 503;
        reject(error);
      }
    }, 500);
  });
}

function timestampForFilename(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);
  const map = Object.fromEntries(parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]));
  return `${map.year}${map.month}${map.day}_${map.hour}${map.minute}`;
}

async function removeIfExists(targetPath) {
  try {
    await fs.rm(targetPath, { recursive: true, force: true });
  } catch (error) {
    console.warn(`[Backup] Cleanup warning for ${targetPath}:`, error.message);
  }
}

async function createSourceBackupZip(dataBackup) {
  const stamp = timestampForFilename();
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'studio-os-source-backup-'));
  const zipPath = path.join(tempDir, `StudioOS_full_backup_${stamp}.zip`);
  const dataPath = path.join(tempDir, `studio-os-data-backup-${stamp}.json`);
  const manifestPath = path.join(tempDir, `BACKUP_STANDARD_MANIFEST_${stamp}.txt`);
  const mirrorDir = process.env.STUDIO_OS_BACKUP_EXPORT_DIR || path.join(os.homedir(), 'Downloads', 'APH_codes');

  const excludePatterns = [
    'node_modules/*',
    'dist/*',
    '.git/*',
    '*.DS_Store',
    '.env',
    'backend/node_modules/*',
    'backend/sessions/*',
    'backend/.wwebjs_cache/*',
    'backend/.env',
  ];

  const zipArgs = ['-qr', zipPath, '.', '-x', ...excludePatterns];
  await execFileAsync('zip', zipArgs, {
    cwd: projectRoot,
    maxBuffer: 1024 * 1024 * 25,
  });

  if (dataBackup) {
    await fs.writeFile(dataPath, JSON.stringify(dataBackup, null, 2), 'utf8');
    await execFileAsync('zip', ['-qj', zipPath, dataPath], {
      cwd: projectRoot,
      maxBuffer: 1024 * 1024 * 5,
    });
  }

  const manifest = [
    'StudioOS Backup Standard Guardrail',
    `Created: ${stamp}`,
    '',
    'This ZIP is intended to be the clean full-source backup package.',
    '',
    'Included:',
    '- Full Source ZIP: React/Vite app code, JSX modules, backend source, SQL schema files, package files.',
    '- Data Backup JSON: studio-os-data-backup-*.json containing projects, master tables, settings, theme, board columns, forms, contracts, and workspace content.',
    '',
    'Intentionally excluded:',
    '- node_modules and backend/node_modules, because dependencies can be rebuilt from package-lock.json.',
    '- dist, because it is generated build output.',
    '- backend/sessions and browser/WhatsApp session caches, because they are generated runtime/session artifacts.',
    '- .env and backend/.env, because secrets must not be exported in routine backups.',
    '',
    'Supabase credentials to store separately:',
    '- VITE_SUPABASE_URL',
    '- VITE_SUPABASE_ANON_KEY',
    '- VITE_SUPABASE_TABLE',
    '- VITE_SUPABASE_ROW_ID',
    '- VITE_SUPABASE_FILE_BUCKET',
    '',
    'Restore rule:',
    'Keep this ZIP together with the separately stored Supabase credentials. If node_modules is missing, run npm install before starting the app.',
    '',
  ].join('\n');
  await fs.writeFile(manifestPath, manifest, 'utf8');
  await execFileAsync('zip', ['-qj', zipPath, manifestPath], {
    cwd: projectRoot,
    maxBuffer: 1024 * 1024 * 5,
  });

  let mirroredPath = '';
  try {
    await fs.mkdir(mirrorDir, { recursive: true });
    mirroredPath = path.join(mirrorDir, path.basename(zipPath));
    await fs.copyFile(zipPath, mirroredPath);
    console.log(`[Backup] Mirrored source backup to ${mirroredPath}`);
  } catch (error) {
    console.warn(`[Backup] Could not mirror source backup to ${mirrorDir}:`, error.message);
  }

  return {
    zipPath,
    tempDir,
    filename: path.basename(zipPath),
    mirroredPath,
  };
}

async function restartWhatsAppClientNow(reason = 'manual restart', options = {}) {
  console.log(`[WhatsApp] Restarting client: ${reason}`);
  if (options.desiredPairingNumber !== undefined) desiredPairingNumber = normalizePhoneNumber(options.desiredPairingNumber);
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
  connectionStatus = 'restarting';
  io.emit('whatsapp:status', statusPayload({ reason }));

  if (whatsappClient) {
    try {
      await whatsappClient.destroy();
    } catch (error) {
      console.warn('[WhatsApp] Client cleanup warning:', error.message);
    }
  }
  whatsappClient = null;
  initializingClient = false;

  initializeWhatsAppClient();
}

async function sendWhatsAppMessageWithRetry(chatId, message) {
  await ensureWhatsAppReadyForSend();

  try {
    return await whatsappClient.sendMessage(chatId, message);
  } catch (error) {
    if (!isRecoverableWhatsAppError(error)) {
      throw error;
    }

    console.warn('[WhatsApp] Recoverable send error, restarting client and retrying once:', error.message);
    await restartWhatsAppClientNow(error.message);
    await waitForWhatsAppConnection(30000);
    await assertRegisteredWhatsAppUser(chatId);
    return whatsappClient.sendMessage(chatId, message);
  }
}

// Initialize WhatsApp Client
function initializeWhatsAppClient(options = {}) {
  const { retriedSessionLock = false } = options;
  if (initializingClient) {
    console.log('[WhatsApp] Initialization already in progress.');
    return;
  }
  initializingClient = true;
  console.log('[WhatsApp] Initializing client...');
  if (whatsappClient) {
    try {
      whatsappClient.destroy();
    } catch (error) {
      console.warn('[WhatsApp] Previous client cleanup warning:', error.message);
    }
  }
  connectionStatus = 'connecting';
  connectedAccount = null;
  io.emit('whatsapp:status', statusPayload());
  
  whatsappClient = new Client({
    authStrategy: new LocalAuth({
      clientId: whatsappClientId,
      dataPath: path.join(__dirname, 'sessions')
    }),
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    }
  });

  // WhatsApp Events
  whatsappClient.on('qr', async (qr) => {
    console.log('[WhatsApp] QR Code received');
    initializingClient = false;
    qrCode = qr;
    qrCodeImage = null;
    connectionStatus = 'qr';
    connectedAccount = null;
    const expiresAt = Date.now() + 60000;
    
    // Generate QR code image
    try {
      const qrImage = await qrcode.toDataURL(qr);
      qrCodeImage = qrImage;
      io.emit('whatsapp:qr', statusPayload({ qr, qrImage, expiresAt }));
    } catch (error) {
      console.error('[WhatsApp] Failed to generate QR image:', error);
      io.emit('whatsapp:qr', statusPayload({ qr, qrImage: null, expiresAt }));
    }
    
    // Display QR in terminal
    qrcodeTerminal.generate(qr, { small: true });
  });

  whatsappClient.on('ready', () => {
    console.log('[WhatsApp] Client is ready!');
    initializingClient = false;
    connectionStatus = 'connected';
    qrCode = null;
    qrCodeImage = null;
    reconnectAttempts = 0;
    connectedAccount = readConnectedAccount();
    io.emit('whatsapp:ready', statusPayload());
    io.emit('whatsapp:status', statusPayload());
  });

  whatsappClient.on('authenticated', () => {
    console.log('[WhatsApp] Client authenticated!');
    connectionStatus = 'authenticated';
    io.emit('whatsapp:authenticated', statusPayload({
      message: 'WhatsApp login is valid. Waiting for the client to become ready...',
    }));
    io.emit('whatsapp:status', statusPayload({
      message: 'WhatsApp login is valid. Waiting for the client to become ready...',
    }));
  });

  whatsappClient.on('auth_failure', (msg) => {
    console.error('[WhatsApp] Authentication failure:', msg);
    initializingClient = false;
    connectionStatus = 'auth_failure';
    io.emit('whatsapp:error', { type: 'auth_failure', message: msg });
  });

  whatsappClient.on('disconnected', (reason) => {
    console.log('[WhatsApp] Client disconnected:', reason);
    initializingClient = false;
    connectionStatus = 'disconnected';
    connectedAccount = null;
    qrCode = null;
    qrCodeImage = null;
    io.emit('whatsapp:disconnected', statusPayload({ reason }));
    if (manualDisconnecting) {
      manualDisconnecting = false;
      io.emit('whatsapp:status', statusPayload({ reason: 'manual disconnect' }));
      return;
    }
    scheduleReconnect(reason);
  });

  whatsappClient.on('message', (message) => {
    console.log('[WhatsApp] Message received:', message.body);
    io.emit('whatsapp:message', {
      from: message.from,
      to: message.to,
      body: message.body,
      timestamp: message.timestamp,
      id: message.id._serialized
    });
  });

  whatsappClient.on('message_ack', (msg, ack) => {
    console.log('[WhatsApp] Message ack:', ack);
    io.emit('whatsapp:message_ack', { messageId: msg.id._serialized, ack });
  });

  whatsappClient.on('change_state', (state) => {
    console.log('[WhatsApp] State changed:', state);
    io.emit('whatsapp:status', { status: connectionStatus, state });
  });

  // Error handling
  whatsappClient.on('error', (error) => {
    console.error('[WhatsApp] Error:', error);
    initializingClient = false;
    connectionStatus = 'error';
    io.emit('whatsapp:error', { type: 'client_error', message: error.message });
  });

  // Initialize client
  whatsappClient.initialize().catch((error) => {
    console.error('[WhatsApp] Failed to initialize:', error);
    initializingClient = false;
    if (isSessionLockedError(error) && !retriedSessionLock) {
      connectionStatus = 'restarting';
      io.emit('whatsapp:status', {
        status: connectionStatus,
        reason: 'stale_session_browser',
        message: 'A stale WhatsApp browser process was holding the session. Cleaning it up and retrying.',
      });
      terminateLockedSessionBrowser().finally(() => {
        setTimeout(() => initializeWhatsAppClient({ retriedSessionLock: true }), 1500);
      });
      return;
    }
    connectionStatus = 'error';
    io.emit('whatsapp:error', { type: 'init_error', message: error.message });
  });
}

// Socket.IO Events
io.on('connection', (socket) => {
  console.log('[Socket] Client connected:', socket.id);
  
  // Send current status on connection
  socket.emit('whatsapp:status', statusPayload());
  
  socket.on('disconnect', () => {
    console.log('[Socket] Client disconnected:', socket.id);
  });
});

// API Routes

// Friendly landing page for accidental backend visits.
app.get('/', (req, res) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  res.type('html').send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Studio/OS WhatsApp Backend</title>
    <style>
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #F4F1EA; color: #1A1815; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      main { width: min(520px, calc(100vw - 32px)); background: #FCFAF5; border: 1px solid #E5DFD3; border-radius: 10px; padding: 28px; box-shadow: 0 20px 60px rgba(26, 24, 21, 0.12); }
      h1 { margin: 0 0 8px; font-size: 24px; }
      p { margin: 0 0 18px; color: #6B6660; line-height: 1.5; }
      a { display: inline-flex; align-items: center; border-radius: 6px; background: #1A1815; color: white; text-decoration: none; padding: 10px 14px; font-size: 13px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }
      code { background: #EDEAE2; border-radius: 4px; padding: 2px 5px; }
    </style>
  </head>
  <body>
    <main>
      <h1>WhatsApp backend is running</h1>
      <p>This port is only for API calls like <code>/health</code> and <code>/whatsapp/status</code>. Open the Studio/OS React app on the frontend port.</p>
      <a href="${frontendUrl}">Open Studio/OS app</a>
    </main>
  </body>
</html>`);
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    whatsapp: connectionStatus,
    timestamp: new Date().toISOString()
  });
});

// Source + data backup ZIP.
app.post('/source-backup', async (req, res) => {
  let cleanupDir = null;
  try {
    const { dataBackup } = req.body || {};
    const { zipPath, tempDir, filename, mirroredPath } = await createSourceBackupZip(dataBackup);
    cleanupDir = tempDir;
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    if (mirroredPath) res.setHeader('X-StudioOS-Mirrored-Path', encodeURIComponent(mirroredPath));

    const stream = createReadStream(zipPath);
    stream.on('error', (error) => {
      console.error('[Backup] Zip stream error:', error);
      if (!res.headersSent) res.status(500).json({ error: 'Failed to stream backup zip' });
    });
    stream.on('close', () => {
      removeIfExists(cleanupDir);
    });
    stream.pipe(res);
  } catch (error) {
    console.error('[Backup] Source zip error:', error);
    if (cleanupDir) await removeIfExists(cleanupDir);
    res.status(500).json({
      error: 'Failed to create source backup',
      details: error.message || 'Unknown error',
    });
  }
});

app.post('/table-csv-export', async (req, res) => {
  try {
    const { tableName, filename, csv } = req.body || {};
    if (!tableName || !filename || typeof csv !== 'string') {
      return res.status(400).json({ error: 'tableName, filename, and csv are required' });
    }
    const safeFilename = String(filename).replace(/[^a-zA-Z0-9._-]/g, '_').replace(/_+/g, '_');
    const mirrorDir = process.env.STUDIO_OS_BACKUP_EXPORT_DIR || path.join(os.homedir(), 'Downloads', 'APH_codes');
    await fs.mkdir(mirrorDir, { recursive: true });
    const csvPath = path.join(mirrorDir, safeFilename);
    await fs.writeFile(csvPath, csv, 'utf8');
    console.log(`[Export] ${tableName} CSV saved to ${csvPath}`);
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"`);
    res.setHeader('X-StudioOS-CSV-Path', encodeURIComponent(csvPath));
    res.send(csv);
  } catch (error) {
    console.error('[Export] Table CSV error:', error);
    res.status(500).json({
      error: 'Failed to export table CSV',
      details: error.message || 'Unknown error',
    });
  }
});

// Get WhatsApp status
app.get('/whatsapp/status', (req, res) => {
  res.json(statusPayload());
});

// Send message
app.post('/send-message', async (req, res) => {
  try {
    const { number, message } = req.body;
    
    if (!number || !message) {
      return res.status(400).json({ 
        error: 'Number and message are required' 
      });
    }
    
    const resolvedNumber = resolveOutgoingNumber(number);
    const whatsappNumber = formatWhatsAppChatId(resolvedNumber);
    await ensureWhatsAppReadyForSend();
    await assertRegisteredWhatsAppUser(whatsappNumber);
    
    console.log(`[WhatsApp] Sending message to ${whatsappNumber}${forceTestRecipient ? ' (test override)' : ''}: ${message}`);
    
    const response = await sendWhatsAppMessageWithRetry(whatsappNumber, message);
    emitOutgoingMessage(response, whatsappNumber, message);
    
    res.json({
      success: true,
      messageId: response.id._serialized,
      to: whatsappNumber,
      requestedTo: formatWhatsAppChatId(number),
      forcedRecipient: forceTestRecipient,
      message: message
    });
    
  } catch (error) {
    console.error('[WhatsApp] Send message error:', error);
    res.status(error.statusCode || 500).json({ 
      error: 'Failed to send message',
      details: error.message 
    });
  }
});

// Notify designer (approval notification)
app.post('/notify-designer', async (req, res) => {
  try {
    const { designerPhone, designerName, projectName, clientName, approvedBy, approvalTitle } = req.body;
    
    if (!designerPhone || !projectName || !clientName) {
      return res.status(400).json({ 
        error: 'Designer phone, project name, and client name are required' 
      });
    }
    
    const approverLabel = approvedBy || clientName;
    const message = `Client ${approverLabel} approved the design file.

Project: ${projectName}
Client: ${clientName}
${approvalTitle ? `Approval: ${approvalTitle}` : ''}

Please check dashboard for details.`;
    
    const resolvedNumber = resolveOutgoingNumber(designerPhone);
    const whatsappNumber = formatWhatsAppChatId(resolvedNumber);
    await ensureWhatsAppReadyForSend();
    await assertRegisteredWhatsAppUser(whatsappNumber);
    
    console.log(`[WhatsApp] Sending approval notification to ${designerName || whatsappNumber} at ${whatsappNumber}${forceTestRecipient ? ' (test override)' : ''}`);
    
    const response = await sendWhatsAppMessageWithRetry(whatsappNumber, message);
    emitOutgoingMessage(response, whatsappNumber, message);
    
    res.json({
      success: true,
      messageId: response.id._serialized,
      to: whatsappNumber,
      requestedTo: formatWhatsAppChatId(designerPhone),
      forcedRecipient: forceTestRecipient,
      recipientName: designerName || null,
      projectName,
      clientName
    });
    
  } catch (error) {
    console.error('[WhatsApp] Notify designer error:', error);
    res.status(error.statusCode || 500).json({ 
      error: 'Failed to send approval notification',
      details: error.message 
    });
  }
});


app.post('/whatsapp/disconnect', async (req, res) => {
  try {
    const shouldForgetNumber = req.body?.forgetNumber || req.body?.clearSession;
    desiredPairingNumber = shouldForgetNumber ? '' : normalizePhoneNumber(req.body?.desiredPairingNumber || '');
    manualDisconnecting = true;
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }

    connectionStatus = 'disconnecting';
    io.emit('whatsapp:status', statusPayload({ reason: 'manual disconnect' }));

    if (whatsappClient) {
      try {
        await whatsappClient.logout();
      } catch (error) {
        console.warn('[WhatsApp] Logout warning:', error.message);
      }
      try {
        await whatsappClient.destroy();
      } catch (error) {
        console.warn('[WhatsApp] Destroy warning:', error.message);
      }
    }

    whatsappClient = null;
    initializingClient = false;
    connectedAccount = null;
    qrCode = null;
    qrCodeImage = null;
    connectionStatus = 'disconnected';

    try {
      await fs.rm(whatsappSessionPath, { recursive: true, force: true });
    } catch (error) {
      console.warn('[WhatsApp] Session cleanup warning:', error.message);
    }

    manualDisconnecting = false;
    io.emit('whatsapp:status', statusPayload({ reason: 'manual disconnect' }));
    res.json({
      success: true,
      ...statusPayload({
        status: 'disconnected',
        connected: false,
        account: null,
        qr: null,
        qrImage: null,
        desiredPairingNumber: '',
      }),
    });
  } catch (error) {
    manualDisconnecting = false;
    console.error('[WhatsApp] Disconnect error:', error);
    res.status(500).json({
      error: 'Failed to disconnect WhatsApp client',
      details: error.message,
    });
  }
});

// Restart WhatsApp client
app.post('/whatsapp/restart', async (req, res) => {
  try {
    await restartWhatsAppClientNow('manual dashboard restart', { desiredPairingNumber: req.body?.desiredPairingNumber });
    res.json({ success: true, message: 'WhatsApp client restarting' });
    
  } catch (error) {
    console.error('[WhatsApp] Restart error:', error);
    res.status(500).json({ 
      error: 'Failed to restart WhatsApp client',
      details: error.message 
    });
  }
});

// Get recent messages (mock implementation)
app.get('/messages/recent', (req, res) => {
  res.json({
    messages: [],
    total: 0
  });
});

// 404 handler (must be after all routes)
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: 'The requested endpoint does not exist',
    path: req.path,
    method: req.method
  });
});

// Start server
const PORT = process.env.PORT || 3001;

// Initialize WhatsApp client
initializeWhatsAppClient();

server.listen(PORT, () => {
  console.log(`[Server] Running on port ${PORT}`);
  console.log(`[Server] Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('[Server] Shutting down...');
  
  if (whatsappClient) {
    try {
      await whatsappClient.destroy();
      console.log('[WhatsApp] Client destroyed');
    } catch (error) {
      console.error('[WhatsApp] Error during shutdown:', error);
    }
  }
  
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('[Server] Received SIGTERM');
  
  if (whatsappClient) {
    try {
      await whatsappClient.destroy();
      console.log('[WhatsApp] Client destroyed');
    } catch (error) {
      console.error('[WhatsApp] Error during shutdown:', error);
    }
  }
  
  process.exit(0);
});
