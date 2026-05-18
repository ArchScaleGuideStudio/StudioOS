# Studio/OS WhatsApp Backend

Backend server for WhatsApp Web integration with Studio/OS application.

## Features

- WhatsApp Web client with persistent sessions
- Real-time Socket.IO events
- QR code generation for authentication
- Message sending capabilities
- Approval notifications
- Health monitoring
- Graceful error handling

## Installation

```bash
cd backend
npm install
```

## Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` file as needed:

```env
PORT=3001
FRONTEND_URL=http://localhost:5173
SESSION_PATH=./sessions
LOG_LEVEL=info
```

## Running

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

## API Endpoints

### Health & Status

- `GET /health` - Server health check
- `GET /whatsapp/status` - WhatsApp connection status

### Messaging

- `POST /send-message` - Send message to phone number
- `POST /notify-designer` - Send approval notification
- `GET /messages/recent` - Get recent messages

### Management

- `POST /whatsapp/restart` - Restart WhatsApp client

## Socket.IO Events

### Client → Server
- Connection established automatically

### Server → Client
- `whatsapp:qr` - QR code for authentication
- `whatsapp:ready` - WhatsApp connected and ready
- `whatsapp:authenticated` - Authentication successful
- `whatsapp:disconnected` - WhatsApp disconnected
- `whatsapp:message` - Incoming message
- `whatsapp:message_ack` - Message acknowledgment
- `whatsapp:status` - Connection status update
- `whatsapp:error` - Error events

## Session Persistence

WhatsApp sessions are stored in the `./sessions` directory using LocalAuth strategy. Sessions persist across server restarts.

## Error Handling

The server includes comprehensive error handling for:
- WhatsApp connection failures
- Invalid phone numbers
- Message send failures
- Authentication issues
- Network disconnections

## Environment Variables

- `PORT` - Server port (default: 3001)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:5173)
- `SESSION_PATH` - WhatsApp session storage path (default: ./sessions)
- `NODE_ENV` - Environment (development/production)
- `LOG_LEVEL` - Logging level (default: info)

## Security Notes

- CORS is configured for the frontend URL
- Phone numbers are formatted automatically
- Sessions are stored locally
- No sensitive data is logged

## Troubleshooting

### WhatsApp Not Connecting
1. Check if QR code is displayed in frontend
2. Scan QR code with WhatsApp mobile app
3. Wait for authentication to complete

### Session Issues
1. Delete the `./sessions` directory
2. Restart the server
3. Re-authenticate with QR code

### Message Send Failures
1. Verify WhatsApp is connected
2. Check phone number format
3. Ensure recipient has WhatsApp

## Dependencies

- express - Web server framework
- socket.io - Real-time communication
- whatsapp-web.js - WhatsApp Web API
- qrcode - QR code generation
- qrcode-terminal - Terminal QR display
- dotenv - Environment variables
- cors - Cross-origin resource sharing
- body-parser - Request parsing
- nodemon - Development auto-restart
