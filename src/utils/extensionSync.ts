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
  console.log('[Extension Sync] 🔄 Avvio sincronizzazione...', {
    hasSession: !!session,
    timestamp: new Date().toISOString(),
  });

  // 1. Verifica che ci sia una sessione valida
  if (!session) {
    console.warn('[Extension Sync] ❌ No session to sync');
    return;
  }

  // 2. Verifica che siamo in un ambiente Chrome
  if (typeof chrome === 'undefined' || !chrome.runtime) {
    console.log('[Extension Sync] ℹ️ Not in Chrome environment, skipping sync');
    return;
  }

  console.log('[Extension Sync] ✅ Chrome environment detected, Extension ID:', EXTENSION_ID);

  // 3. Verifica pre-invio: controlla che tutti i dati necessari siano presenti
  const hasAccessToken = !!session.access_token && session.access_token.length > 0;
  const hasRefreshToken = !!session.refresh_token && session.refresh_token.length > 0;
  const hasExpiresAt = typeof session.expires_at === 'number' && session.expires_at > 0;
  const hasUser = !!session.user;

  console.log('[Extension Sync] 📋 Verifica dati sessione:', {
    hasAccessToken,
    hasRefreshToken,
    hasExpiresAt,
    hasUser,
    accessTokenLength: session.access_token?.length || 0,
    refreshTokenLength: session.refresh_token?.length || 0,
    expiresAt: session.expires_at,
    userId: session.user?.id,
  });

  if (!hasAccessToken || !hasRefreshToken) {
    console.error('[Extension Sync] ❌ Token mancanti! Non posso sincronizzare.', {
      hasAccessToken,
      hasRefreshToken,
    });
    return;
  }

  // 4. Prepara il messaggio con TUTTI i dati necessari
  const message: ExtensionMessage = {
    type: 'save_session',
    session: {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_at: session.expires_at || 0,
      user: session.user,
    },
  };

  console.log('[Extension Sync] 📦 Messaggio preparato:', {
    type: message.type,
    sessionKeys: Object.keys(message.session),
    accessTokenPreview: message.session.access_token.substring(0, 20) + '...',
    refreshTokenPreview: message.session.refresh_token.substring(0, 20) + '...',
  });

  // 5. Funzione per inviare il messaggio con retry
  const sendMessageWithRetry = (retryCount = 0): void => {
    try {
      console.log(`[Extension Sync] 📤 Invio messaggio all'estensione (tentativo ${retryCount + 1})...`);
      
      chrome.runtime.sendMessage(EXTENSION_ID, message, (response) => {
        if (chrome.runtime.lastError) {
          console.warn(
            `[Extension Sync] ⚠️ Errore durante l'invio (tentativo ${retryCount + 1}):`,
            chrome.runtime.lastError.message
          );

          // Retry dopo 500ms se è il primo tentativo
          if (retryCount === 0) {
            console.log('[Extension Sync] 🔄 Riprovo tra 500ms...');
            setTimeout(() => sendMessageWithRetry(1), 500);
          } else {
            console.error('[Extension Sync] ❌ Fallito dopo 2 tentativi. Estensione non disponibile.');
          }
          return;
        }

        console.log('[Extension Sync] ✅ Sessione sincronizzata con successo!', {
          response,
          timestamp: new Date().toISOString(),
        });
      });
    } catch (error) {
      console.error('[Extension Sync] ❌ Eccezione durante l\'invio:', error);
      
      // Retry dopo 500ms se è il primo tentativo
      if (retryCount === 0) {
        console.log('[Extension Sync] 🔄 Riprovo tra 500ms dopo eccezione...');
        setTimeout(() => sendMessageWithRetry(1), 500);
      }
    }
  };

  // 6. Avvia l'invio con possibilità di retry
  sendMessageWithRetry();
};

/**
 * Verifica se l'estensione è disponibile
 */
export const isExtensionAvailable = (): boolean => {
  return typeof chrome !== 'undefined' && !!chrome.runtime;
};
