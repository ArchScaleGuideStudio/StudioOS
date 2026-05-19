import React, { useEffect, useState } from 'react';
import { CheckCircle2, QrCode, RefreshCw, RotateCcw, Send, X } from 'lucide-react';
import { WHATSAPP_API_BASE } from '../config/whatsapp';

const WA_BLANK_SLATE_KEY = 'studio-os-whatsapp-blank-slate';

const blankWhatsAppStatus = {
  status: 'disconnected',
  connected: false,
  qrImage: null,
  qr: null,
  account: null,
  desiredPairingNumber: '',
};

const getBlankSlateMode = () => {
  try {
    return window.localStorage.getItem(WA_BLANK_SLATE_KEY) === '1';
  } catch {
    return false;
  }
};

const setBlankSlateMode = (enabled) => {
  try {
    if (enabled) {
      window.localStorage.setItem(WA_BLANK_SLATE_KEY, '1');
    } else {
      window.localStorage.removeItem(WA_BLANK_SLATE_KEY);
    }
  } catch {
    // localStorage can be blocked in private contexts; the backend still clears the session.
  }
};

export default function WhatsAppDashboardCard({ compact = false, onOpenPanel }) {
  const [status, setStatus] = useState({ ...blankWhatsAppStatus, status: 'checking' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [testNumber, setTestNumber] = useState('');
  const [testNumberTouched, setTestNumberTouched] = useState(false);
  const [testMessage, setTestMessage] = useState('Studio/OS WhatsApp test message. Connection is working.');

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${WHATSAPP_API_BASE}/whatsapp/status`);
      if (!response.ok) throw new Error(`Backend returned ${response.status}`);
      const data = await response.json();
      const blankSlate = getBlankSlateMode();
      const nextStatus = blankSlate
        ? { ...blankWhatsAppStatus, status: data.qr || data.qrImage ? 'qr' : 'disconnected' }
        : data;
      setStatus(nextStatus);
      if (!blankSlate && !newNumber && data.desiredPairingNumber) setNewNumber(data.desiredPairingNumber);
      setMessage('');
    } catch (error) {
      setStatus({ status: 'offline', connected: false, qrImage: null, qr: null, error: error.message });
      setMessage(`Backend not reachable at ${WHATSAPP_API_BASE}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const timer = window.setInterval(fetchStatus, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const restartWhatsApp = async () => {
    setLoading(true);
    try {
      setBlankSlateMode(false);
      await fetch(`${WHATSAPP_API_BASE}/whatsapp/restart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ desiredPairingNumber: newNumber }),
      });
      setMessage('QR requested. It will appear here when WhatsApp Web asks for pairing.');
      window.setTimeout(fetchStatus, 1500);
    } catch (error) {
      setMessage(`Could not restart WhatsApp: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWhatsApp = async () => {
    if (!window.confirm('Disconnect the current WhatsApp session? You will need to scan a QR again to pair a number.')) return;
    setLoading(true);
    try {
      const response = await fetch(`${WHATSAPP_API_BASE}/whatsapp/disconnect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ desiredPairingNumber: '', clearSession: true, forgetNumber: true }),
      });
      if (!response.ok) throw new Error(`Backend returned ${response.status}`);
      await response.json();
      setBlankSlateMode(true);
      setNewNumber('');
      setStatus(blankWhatsAppStatus);
      setMessage('Disconnected. Enter the next number, then generate a QR.');
    } catch (error) {
      setMessage(`Could not disconnect WhatsApp: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const sendTestMessage = async () => {
    const recipient = (testNumber || status.account?.number || '').replace(/[^0-9+]/g, '');
    if (!recipient) {
      setMessage('Add a test recipient number first.');
      return;
    }
    if (!testMessage.trim()) {
      setMessage('Add a short test message first.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${WHATSAPP_API_BASE}/send-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: recipient, message: testMessage.trim() }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.success === false) throw new Error(data.details || data.message || data.error || `Backend returned ${response.status}`);
      setMessage(`Test message sent to +${recipient.replace(/^\+/, '')}.`);
    } catch (error) {
      setMessage(`Could not send test message: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const isConnected = status.connected || status.status === 'connected' || status.status === 'ready';
  const qrSrc = status.qrImage || status.qr;
  const connectedNumber = status.account?.number || '';
  const connectedName = status.account?.pushname || '';
  const canPairNew = !isConnected;

  useEffect(() => {
    if (connectedNumber && !testNumberTouched) {
      setTestNumber(connectedNumber);
    }
  }, [connectedNumber, testNumberTouched]);

  return (
    <div className="bg-paper border border-line rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-line bg-bone flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className={`w-9 h-9 rounded flex items-center justify-center shrink-0 ${isConnected ? 'bg-moss-soft text-moss' : 'bg-terra-soft text-terra'}`}>
            {isConnected ? <CheckCircle2 className="w-4 h-4" /> : <QrCode className="w-4 h-4" />}
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-wider ink-faint">WhatsApp Web</div>
            <div className={`text-sm font-semibold truncate ${isConnected ? 'text-moss' : 'text-terra'}`}>
              {isConnected ? (connectedNumber ? `+${connectedNumber}` : 'Connected') : (status.status || 'Waiting for QR')}
            </div>
            {isConnected && connectedName && <div className="text-[10px] ink-soft truncate">{connectedName}</div>}
          </div>
        </div>
        {onOpenPanel && (
          <button onClick={onOpenPanel} className="px-2.5 py-1.5 bg-paper border border-line rounded text-[10px] font-mono uppercase tracking-wider ink-soft hover:ink">
            Open
          </button>
        )}
      </div>

      <div className="p-4">
        {canPairNew && (
          <div className="mb-3">
            <div className="text-[10px] font-mono uppercase tracking-wider ink-faint mb-1">Pair number</div>
            <input
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value.replace(/[^0-9+]/g, ''))}
              placeholder="+919999999999"
              className="input-base text-xs"
            />
          </div>
        )}

        {qrSrc && !isConnected ? (
          <div className="text-center">
            <img src={qrSrc} alt="WhatsApp pairing QR code" className={`${compact ? 'w-40 h-40' : 'w-52 h-52'} mx-auto object-contain bg-white border border-line rounded`} />
            <div className="text-[11px] ink-soft mt-3">Scan from WhatsApp linked devices.</div>
            {newNumber && <div className="text-[10px] font-mono text-terra mt-2">Pairing target: {newNumber}</div>}
          </div>
        ) : (
          <div className="text-center py-3">
            <QrCode className={`mx-auto mb-2 ${isConnected ? 'text-moss' : 'ink-faint'} ${compact ? 'w-7 h-7' : 'w-9 h-9'}`} />
            <div className="text-sm ink font-semibold">{isConnected ? 'Session is active' : 'QR appears here when pairing is needed'}</div>
            <div className="text-[11px] ink-soft mt-1 truncate">{isConnected && connectedNumber ? `Connected: +${connectedNumber}` : WHATSAPP_API_BASE}</div>
          </div>
        )}

        {message && <div className="mt-3 text-[11px] ink-soft bg-bone border border-line-soft rounded p-2">{message}</div>}

        {isConnected && (
          <div className="mt-3 border border-line-soft rounded bg-bone p-3">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider ink-faint">Test message</div>
                <div className="text-[11px] ink-soft">Sends through the connected WhatsApp number.</div>
              </div>
              <button
                onClick={sendTestMessage}
                disabled={loading}
                className="px-2.5 py-1.5 rounded bg-ink text-white text-[10px] font-mono uppercase tracking-wider font-semibold hover:bg-terra disabled:opacity-50 shrink-0"
              >
                <Send className="w-3 h-3 inline mr-1" /> Send Test
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2">
              <input
                value={testNumber}
                onChange={(e) => {
                  setTestNumberTouched(true);
                  setTestNumber(e.target.value.replace(/[^0-9+]/g, ''));
                }}
                placeholder={connectedNumber ? `+${connectedNumber}` : '+919999999999'}
                className="input-base text-xs"
              />
              <input
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                placeholder="Test message"
                className="input-base text-xs"
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-2 mt-3 flex-wrap">
          {isConnected && (
            <button onClick={disconnectWhatsApp} disabled={loading} className="px-2.5 py-1.5 rounded border border-terra text-terra text-[10px] font-mono uppercase tracking-wider hover:bg-terra-soft disabled:opacity-50">
              <X className="w-3 h-3 inline mr-1" /> Disconnect
            </button>
          )}
          <button onClick={fetchStatus} disabled={loading} className="px-2.5 py-1.5 rounded border border-line text-[10px] font-mono uppercase tracking-wider ink-soft hover:ink disabled:opacity-50">
            <RefreshCw className="w-3 h-3 inline mr-1" /> Refresh
          </button>
          <button onClick={restartWhatsApp} disabled={loading} className="px-2.5 py-1.5 rounded bg-ink text-white text-[10px] font-mono uppercase tracking-wider font-semibold hover:bg-terra disabled:opacity-50">
            <RotateCcw className="w-3 h-3 inline mr-1" /> {isConnected ? 'Reconnect' : 'Generate QR'}
          </button>
        </div>
      </div>
    </div>
  );
}
