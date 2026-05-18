import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEY = 'studio-os-state-khanna-20260508';
const DB_NAME = 'studio-os-local';
const DB_VERSION = 1;
const STORE_NAME = 'workspace_state';
const TABLE_NAME = import.meta.env.VITE_SUPABASE_TABLE || 'studio_workspace';
const ROW_ID = import.meta.env.VITE_SUPABASE_ROW_ID || 'khanna-case-20260508';

function isValidState(parsed) {
  return Boolean(
    parsed &&
      typeof parsed === 'object' &&
      Array.isArray(parsed.projects) &&
      parsed.masters &&
      typeof parsed.masters === 'object'
  );
}

function loadFromLocalStorage() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isValidState(parsed) ? parsed : null;
  } catch (error) {
    console.error('[Studio/OS] Failed to read local workspace state:', error);
    return null;
  }
}

function openWorkspaceDb() {
  if (typeof window === 'undefined' || !window.indexedDB) return Promise.resolve(null);
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function loadFromIndexedDb() {
  const db = await openWorkspaceDb();
  if (!db) return null;
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(STORAGE_KEY);
      request.onsuccess = () => {
        const payload = request.result?.payload;
        resolve(isValidState(payload) ? payload : null);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('[Studio/OS] Failed to read IndexedDB workspace state:', error);
    return null;
  } finally {
    db.close();
  }
}

async function saveToIndexedDb(state) {
  const db = await openWorkspaceDb();
  if (!db) return false;
  try {
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put({ id: STORAGE_KEY, payload: state, updatedAt: new Date().toISOString() });
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
    return true;
  } catch (error) {
    console.error('[Studio/OS] Failed to save IndexedDB workspace state:', error);
    return false;
  } finally {
    db.close();
  }
}

async function clearIndexedDb() {
  const db = await openWorkspaceDb();
  if (!db) return false;
  try {
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete(STORAGE_KEY);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
    return true;
  } catch (error) {
    console.error('[Studio/OS] Failed to clear IndexedDB workspace state:', error);
    return false;
  } finally {
    db.close();
  }
}

function saveToLocalStorage(state) {
  if (typeof window === 'undefined') return false;
  try {
    const json = JSON.stringify(state);
    if (json.length > 3_500_000) return false;
    window.localStorage.setItem(STORAGE_KEY, json);
    return true;
  } catch (error) {
    console.error('[Studio/OS] Failed to save local workspace state:', error);
    return false;
  }
}

function clearLocalStorage() {
  if (typeof window === 'undefined') return false;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('[Studio/OS] Failed to clear local workspace state:', error);
    return false;
  }
}

export async function loadPersistedState() {
  if (!isSupabaseConfigured || !supabase) {
    const indexedState = await loadFromIndexedDb();
    if (indexedState) return indexedState;

    const localState = loadFromLocalStorage();
    if (localState) return localState;

    return null;
  }

  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('payload')
      .eq('id', ROW_ID)
      .maybeSingle();

    if (error) throw error;
    if (!data?.payload) return null;

    const payload = typeof data.payload === 'string' ? JSON.parse(data.payload) : data.payload;
    if (!isValidState(payload)) return null;

    saveToIndexedDb(payload);
    saveToLocalStorage(payload);
    return payload;
  } catch (error) {
    console.error('[Studio/OS] Failed to load Supabase workspace state:', error);
    const indexedState = await loadFromIndexedDb();
    if (indexedState) return indexedState;

    const localState = loadFromLocalStorage();
    if (localState) return localState;

    return null;
  }
}

export async function savePersistedState(state) {
  const indexedOk = await saveToIndexedDb(state);
  const localOk = saveToLocalStorage(state);
  if (!isSupabaseConfigured || !supabase) {
    return {
      ok: indexedOk || localOk,
      remoteOk: null,
      indexedOk,
      localOk,
      mode: indexedOk ? 'indexeddb' : (localOk ? 'localStorage' : 'none'),
    };
  }

  try {
    const { error } = await supabase.from(TABLE_NAME).upsert(
      { id: ROW_ID, payload: state, updated_at: new Date().toISOString() },
      { onConflict: 'id' }
    );
    if (error) throw error;
    return {
      ok: true,
      remoteOk: true,
      indexedOk,
      localOk,
      mode: 'supabase',
    };
  } catch (error) {
    console.error('[Studio/OS] Failed to save Supabase workspace state:', error);
    return {
      ok: indexedOk || localOk,
      remoteOk: false,
      indexedOk,
      localOk,
      mode: indexedOk ? 'indexeddb-fallback' : (localOk ? 'localStorage-fallback' : 'none'),
      error,
    };
  }
}

export async function clearPersistedState() {
  const indexedOk = await clearIndexedDb();
  const localOk = clearLocalStorage();
  if (!isSupabaseConfigured || !supabase) return indexedOk || localOk;

  try {
    const { error } = await supabase.from(TABLE_NAME).delete().eq('id', ROW_ID);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('[Studio/OS] Failed to clear Supabase workspace state:', error);
    return indexedOk || localOk;
  }
}
