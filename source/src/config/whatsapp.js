export const WHATSAPP_API_BASE =
  import.meta.env.VITE_WHATSAPP_API_BASE ||
  import.meta.env.VITE_BACKEND_URL ||
  'http://localhost:3001';

export const WHATSAPP_TEST_RECIPIENT =
  import.meta.env.VITE_WHATSAPP_TEST_RECIPIENT || '919372745434';
