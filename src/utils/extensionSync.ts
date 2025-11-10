import type { Session } from '@supabase/supabase-js';

// ⚠️ SOSTITUISCI CON IL TUO EXTENSION ID
const EXTENSION_ID = 'cbhfaanckjinaephabmpojmlfbghkoml';

interface ExtensionMessage {
  type: 'save_session';
  session: {
    access_token: string;
    refresh_token: string;
    expires_at: number;
    user: any;
  };
}

/**
 * Sincronizza la sessione Supabase con l'estensione Chrome
 * @param session - La sessione Supabase completa da inviare all'estensione
 * @returns Promise che si risolve se l'invio ha successo, si rigetta se fallisce
 */
export const syncSessionWithExtension = async (session: Session | null): Promise<void> => {
  // 1. Verifica che ci sia una sessione valida
  if (!session) {
    console.warn('[Extension Sync] No session to sync');
    return;
  }

  // 2. Verifica che siamo in un ambiente Chrome
  if (typeof chrome === 'undefined' || !chrome.runtime) {
    console.log('[Extension Sync] Not in Chrome environment, skipping sync');
    return;
  }

  // 3. Prepara il messaggio con TUTTI i dati necessari
  const message: ExtensionMessage = {
    type: 'save_session',
    session: {
      access_token: session.access_token,
      refresh_token: session.refresh_token, // ⚠️ ESSENZIALE per mantenere utente loggato
      expires_at: session.expires_at || 0,
      user: session.user,
    },
  };

  // 4. Invia il messaggio all'estensione
  try {
    chrome.runtime.sendMessage(EXTENSION_ID, message, (response) => {
      if (chrome.runtime.lastError) {
        // Estensione non installata o non risponde
        console.warn(
          '[Extension Sync] Extension not available:',
          chrome.runtime.lastError.message
        );
        return;
      }

      console.log('[Extension Sync] Session synced successfully:', response);
    });
  } catch (error) {
    // Non bloccare il flusso se l'estensione non risponde
    console.warn('[Extension Sync] Failed to sync with extension:', error);
  }
};

/**
 * Verifica se l'estensione è disponibile
 */
export const isExtensionAvailable = (): boolean => {
  return typeof chrome !== 'undefined' && !!chrome.runtime;
};
