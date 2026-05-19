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

const { Client, LocalAuth } = pkg;

// Configuration
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
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

// Initialize WhatsApp Client
function initializeWhatsAppClient() {
  console.log('[WhatsApp] Initializing client...');
  
  whatsappClient = new Client({
    authStrategy: new LocalAuth({
      clientId: 'studio-os',
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
        '--single-process',
        '--disable-gpu'
      ]
    }
  });

  // WhatsApp Events
  whatsappClient.on('qr', async (qr) => {
    console.log('[WhatsApp] QR Code received');
    qrCode = qr;
    connectionStatus = 'qr';
    
    // Generate QR code image
    try {
      const qrImage = await qrcode.toDataURL(qr);
      io.emit('whatsapp:qr', { qr, qrImage });
    } catch (error) {
      console.error('[WhatsApp] Failed to generate QR image:', error);
      io.emit('whatsapp:qr', { qr, qrImage: null });
    }
    
    // Display QR in terminal
    qrcodeTerminal.generate(qr, { small: true });
  });

  whatsappClient.on('ready', () => {
    console.log('[WhatsApp] Client is ready!');
    connectionStatus = 'connected';
    qrCode = null;
    io.emit('whatsapp:ready', { status: 'connected' });
  });

  whatsappClient.on('authenticated', () => {
    console.log('[WhatsApp] Client authenticated!');
    connectionStatus = 'authenticated';
    io.emit('whatsapp:authenticated', { status: 'authenticated' });
  });

  whatsappClient.on('auth_failure', (msg) => {
    console.error('[WhatsApp] Authentication failure:', msg);
    connectionStatus = 'auth_failure';
    io.emit('whatsapp:error', { type: 'auth_failure', message: msg });
  });

  whatsappClient.on('disconnected', (reason) => {
    console.log('[WhatsApp] Client disconnected:', reason);
    connectionStatus = 'disconnected';
    qrCode = null;
    io.emit('whatsapp:disconnected', { reason });
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
    io.emit('whatsapp:status', { state });
  });

  // Error handling
  whatsappClient.on('error', (error) => {
    console.error('[WhatsApp] Error:', error);
    connectionStatus = 'error';
    io.emit('whatsapp:error', { type: 'client_error', message: error.message });
  });

  // Initialize client
  whatsappClient.initialize().catch((error) => {
    console.error('[WhatsApp] Failed to initialize:', error);
    connectionStatus = 'error';
    io.emit('whatsapp:error', { type: 'init_error', message: error.message });
  });
}

// Socket.IO Events
io.on('connection', (socket) => {
  console.log('[Socket] Client connected:', socket.id);
  
  // Send current status on connection
  socket.emit('whatsapp:status', { 
    status: connectionStatus, 
    qr: qrCode 
  });
  
  socket.on('disconnect', () => {
    console.log('[Socket] Client disconnected:', socket.id);
  });
});

// API Routes

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    whatsapp: connectionStatus,
    timestamp: new Date().toISOString()
  });
});

// Get WhatsApp status
app.get('/whatsapp/status', (req, res) => {
  res.json({
    status: connectionStatus,
    qr: qrCode,
    connected: connectionStatus === 'connected'
  });
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
    
    if (connectionStatus !== 'connected') {
      return res.status(503).json({ 
        error: 'WhatsApp not connected' 
      });
    }
    
    // Format phone number (remove +, spaces, dashes)
    const formattedNumber = number.replace(/[^\d]/g, '');
    const whatsappNumber = `${formattedNumber}@c.us`;
    
    console.log(`[WhatsApp] Sending message to ${whatsappNumber}: ${message}`);
    
    const response = await whatsappClient.sendMessage(whatsappNumber, message);
    
    res.json({
      success: true,
      messageId: response.id._serialized,
      to: whatsappNumber,
      message: message
    });
    
  } catch (error) {
    console.error('[WhatsApp] Send message error:', error);
    res.status(500).json({ 
      error: 'Failed to send message',
      details: error.message 
    });
  }
});

// Notify designer (approval notification)
app.post('/notify-designer', async (req, res) => {
  try {
    const { designerPhone, projectName, clientName, approvalTitle } = req.body;
    
    if (!designerPhone || !projectName || !clientName) {
      return res.status(400).json({ 
        error: 'Designer phone, project name, and client name are required' 
      });
    }
    
    if (connectionStatus !== 'connected') {
      return res.status(503).json({ 
        error: 'WhatsApp not connected' 
      });
    }
    
    const message = `🎉 Client approved the design.

Project: ${projectName}
Client: ${clientName}
${approvalTitle ? `Approval: ${approvalTitle}` : ''}

Please check dashboard for details.`;
    
    // Format phone number
    const formattedNumber = designerPhone.replace(/[^\d]/g, '');
    const whatsappNumber = `${formattedNumber}@c.us`;
    
    console.log(`[WhatsApp] Sending approval notification to ${whatsappNumber}`);
    
    const response = await whatsappClient.sendMessage(whatsappNumber, message);
    
    res.json({
      success: true,
      messageId: response.id._serialized,
      to: whatsappNumber,
      projectName,
      clientName
    });
    
  } catch (error) {
    console.error('[WhatsApp] Notify designer error:', error);
    res.status(500).json({ 
      error: 'Failed to send approval notification',
      details: error.message 
    });
  }
});

// Restart WhatsApp client
app.post('/whatsapp/restart', async (req, res) => {
  try {
    if (whatsappClient) {
      await whatsappClient.destroy();
    }
    
    connectionStatus = 'restarting';
    io.emit('whatsapp:status', { status: 'restarting' });
    
    // Wait a bit before reinitializing
    setTimeout(() => {
      initializeWhatsAppClient();
    }, 2000);
    
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
  // This would typically fetch from a database
  // For now, return empty array
  res.json({
    messages: [],
    total: 0
  });
});

// Send bulk messages
app.post('/send-bulk-messages', async (req, res) => {
  try {
    const { recipients, message } = req.body;
    
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0 || !message) {
      return res.status(400).json({ 
        error: 'Recipients array and message are required' 
      });
    }
    
    if (connectionStatus !== 'connected') {
      return res.status(503).json({ 
        error: 'WhatsApp not connected' 
      });
    }
    
    const results = [];
    
    for (const recipient of recipients) {
      try {
        const formattedNumber = recipient.replace(/[^\d]/g, '');
        const whatsappNumber = `${formattedNumber}@c.us`;
        
        console.log(`[WhatsApp] Sending bulk message to ${whatsappNumber}`);
        
        const response = await whatsappClient.sendMessage(whatsappNumber, message);
        
        results.push({
          recipient: recipient,
          success: true,
          messageId: response.id._serialized,
          to: whatsappNumber
        });
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`[WhatsApp] Bulk message error for ${recipient}:`, error);
        results.push({
          recipient: recipient,
          success: false,
          error: error.message
        });
      }
    }
    
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    res.json({
      success: true,
      total: recipients.length,
      successful,
      failed,
      results
    });
    
  } catch (error) {
    console.error('[WhatsApp] Bulk send error:', error);
    res.status(500).json({ 
      error: 'Failed to send bulk messages',
      details: error.message 
    });
  }
});

// Get connection status with detailed info
app.get('/whatsapp/status/detailed', (req, res) => {
  const statusInfo = {
    status: connectionStatus,
    qr: qrCode,
    connected: connectionStatus === 'connected',
    authenticated: connectionStatus === 'authenticated',
    timestamp: new Date().toISOString(),
    sessionPath: path.join(__dirname, 'sessions'),
    version: '1.0.0'
  };
  
  res.json(statusInfo);
});

// Clear WhatsApp session
app.post('/whatsapp/clear-session', async (req, res) => {
  try {
    if (whatsappClient) {
      await whatsappClient.logout();
      await whatsappClient.destroy();
    }
    
    // Clear session files
    const fs = await import('fs/promises');
    const sessionPath = path.join(__dirname, 'sessions');
    
    try {
      await fs.rm(sessionPath, { recursive: true, force: true });
      console.log('[WhatsApp] Session cleared successfully');
    } catch (error) {
      console.log('[WhatsApp] Session directory already cleared or not found');
    }
    
    connectionStatus = 'disconnected';
    qrCode = null;
    
    // Reinitialize client
    setTimeout(() => {
      initializeWhatsAppClient();
    }, 2000);
    
    res.json({ 
      success: true, 
      message: 'Session cleared. Please scan QR code again.' 
    });
    
  } catch (error) {
    console.error('[WhatsApp] Clear session error:', error);
    res.status(500).json({ 
      error: 'Failed to clear session',
      details: error.message 
    });
  }
});

// Get session info
app.get('/whatsapp/session-info', async (req, res) => {
  try {
    const fs = await import('fs/promises');
    const sessionPath = path.join(__dirname, 'sessions');
    
    let sessionExists = false;
    let sessionFiles = [];
    
    try {
      const files = await fs.readdir(sessionPath);
      sessionFiles = files;
      sessionExists = files.length > 0;
    } catch (error) {
      // Session directory doesn't exist
    }
    
    res.json({
      sessionExists,
      sessionPath,
      sessionFiles,
      connectionStatus,
      lastConnected: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('[WhatsApp] Session info error:', error);
    res.status(500).json({ 
      error: 'Failed to get session info',
      details: error.message 
    });
  }
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
  
  // 404 handler (must be after all routes)
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: 'The requested endpoint does not exist',
    path: req.path,
    method: req.method
  });
});

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
