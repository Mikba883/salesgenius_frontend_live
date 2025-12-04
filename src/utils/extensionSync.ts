import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// ⚠️ ID ESTENSIONE CHROME (da variabile d'ambiente)
const EXTENSION_ID = import.meta.env.VITE_CHROME_EXTENSION_ID;

// 🆔 DEBUG: Verifica ID caricato all'avvio
console.log('[Extension Sync] 🆔 EXTENSION_ID caricato:', EXTENSION_ID || 'NON CONFIGURATO');

/**
 * Sincronizza la sessione Supabase con l'estensione Chrome inviando access_token, refresh_token e expires_at
 * per permettere all'estensione di ottenere nuovi token quando necessario
 * @param session - La sessione Supabase completa (deve contenere access_token e refresh_token)
 * @returns Promise che si risolve se l'invio ha successo
 */
export const syncSessionWithExtension = async (session: Session | null): Promise<void> => {
  // 1. Verifica ID configurato
  if (!EXTENSION_ID) {
    console.warn('[Extension Sync] ⚠️ VITE_CHROME_EXTENSION_ID non configurato nel file .env');
    return;
  }

  // 2. Verifica sessione valida
  if (!session || !session.access_token || !session.refresh_token) {
    console.error('[Extension Sync] ❌ Sessione incompleta - manca access_token o refresh_token');
    return;
  }

  // 3. Verifica ambiente Chrome disponibile
  if (typeof chrome === 'undefined' || !chrome.runtime || !chrome.runtime.sendMessage) {
    console.info('[Extension Sync] ℹ️ Ambiente Chrome non disponibile (estensione non installata?)');
    return;
  }

  console.log('[Extension Sync] 🔄 Avvio sincronizzazione in background...');

  try {
    // 4. Usa direttamente il token Supabase (NON creare JWT custom)
    const supabaseToken = session.access_token;

    // Verifica che sia un token Supabase valido (solo in development)
    if (import.meta.env.DEV) {
      try {
        const parts = supabaseToken.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          
          if (payload.role !== 'authenticated') {
            console.error('[Extension Sync] ❌ WRONG TOKEN TYPE! Expected Supabase token with role="authenticated"', payload);
            return;
          }
          
          console.log('[Extension Sync] ✅ Token verificato come token Supabase valido', {
            role: payload.role,
            aud: payload.aud,
            hasEmail: !!payload.email,
          });
        }
      } catch (e) {
        console.error('[Extension Sync] ❌ Errore decodifica token:', e);
        return;
      }
    }

    console.log('[Extension Sync] ✅ Sessione Supabase ottenuta:', {
      userId: session.user.id,
      email: session.user.email,
      accessTokenPreview: supabaseToken.substring(0, 30) + '...',
      hasRefreshToken: !!session.refresh_token,
      expiresAt: session.expires_at ? new Date(session.expires_at * 1000).toISOString() : 'unknown',
      expiresIn: session.expires_at ? `${Math.round((session.expires_at * 1000 - Date.now()) / 1000 / 60)} minuti` : 'unknown',
    });

    // 5. Prepara il messaggio nel formato che l'estensione si aspetta (type: 'setTokens')
    const message = {
      type: 'setTokens',              // ✅ Tipo corretto per l'estensione
      accessToken: session.access_token,
      refreshToken: session.refresh_token,  // ✅ CRITICO: necessario per il refresh
      expiresAt: session.expires_at,        // ✅ Timestamp di scadenza
      userId: session.user.id,
      userEmail: session.user.email
    };

    console.log('[Extension Sync] 📦 Messaggio sessione preparato:', {
      type: message.type,
      hasAccessToken: !!message.accessToken,
      hasRefreshToken: !!message.refreshToken,
      expiresAt: message.expiresAt ? new Date(message.expiresAt * 1000).toISOString() : 'unknown',
      targetExtensionId: EXTENSION_ID,
    });

    // 6. Funzione di invio ROBUSTA con retry
    const sendMessageWithRetry = (retryCount = 0): void => {
      try {
        console.log(`[Extension Sync] 📤 Tentativo ${retryCount + 1}/2 - Invio a ID: ${EXTENSION_ID}`);
        
        chrome.runtime.sendMessage(EXTENSION_ID, message, (response) => {
          // Gestione errore Chrome runtime
          if (chrome.runtime.lastError) {
            const errorMsg = chrome.runtime.lastError.message;
            
            // Errore specifico: ID invalido o estensione non trovata
            if (errorMsg.includes('Invalid extension id') || errorMsg.includes('Could not establish connection')) {
              console.warn(
                `[Extension Sync] ⚠️ Estensione non trovata (tentativo ${retryCount + 1}/2)`,
                `\n→ ID cercato: ${EXTENSION_ID}`,
                `\n→ Errore: ${errorMsg}`,
                `\n→ Verifica che l'estensione sia installata e attiva su chrome://extensions/`
              );
            } else {
              console.warn(`[Extension Sync] ⚠️ Errore generico (tentativo ${retryCount + 1}/2):`, errorMsg);
            }

            // Retry dopo 1000ms (aumentato per dare più tempo all'estensione)
            if (retryCount === 0) {
              console.log('[Extension Sync] 🔄 Riprovo tra 1 secondo...');
              setTimeout(() => sendMessageWithRetry(1), 1000);
            } else {
              console.info(
                '[Extension Sync] ℹ️ Estensione non raggiungibile dopo 2 tentativi.',
                '\nQuesto è normale se l\'estensione non è installata o è disabilitata.'
              );
            }
            return;
          }

          // SUCCESSO!
          console.log('[Extension Sync] ✅ Sessione completa inviata con successo all\'estensione!', {
            response,
            timestamp: new Date().toISOString(),
          });
        });
      } catch (error: any) {
        // Gestione eccezioni (es. estensione ricaricata durante l'invio)
        console.warn('[Extension Sync] ⚠️ Eccezione durante l\'invio:', error.message || error);
        
        // Retry dopo 1000ms se è il primo tentativo
        if (retryCount === 0) {
          console.log('[Extension Sync] 🔄 Riprovo tra 1 secondo dopo eccezione...');
          setTimeout(() => sendMessageWithRetry(1), 1000);
        } else {
          console.info('[Extension Sync] ℹ️ Impossibile connettersi all\'estensione dopo 2 tentativi.');
        }
      }
    };

    // 7. Avvia l'invio con retry automatico
    sendMessageWithRetry();

  } catch (error) {
    // Gestione errori globali (es. Edge Function non disponibile)
    console.info('[Extension Sync] ℹ️ Sync non disponibile:', error);
  }
};

/**
 * Notifica l'estensione Chrome che l'utente ha fatto logout
 * L'estensione cancellerà tutti i token salvati in chrome.storage.local
 * @returns Promise che si risolve se l'invio ha successo
 */
export const notifyExtensionLogout = async (): Promise<void> => {
  // 1. Verifica ID configurato
  if (!EXTENSION_ID) {
    console.warn('[Extension Logout] ⚠️ VITE_CHROME_EXTENSION_ID non configurato nel file .env');
    return;
  }

  // 2. Verifica ambiente Chrome disponibile
  if (typeof chrome === 'undefined' || !chrome.runtime || !chrome.runtime.sendMessage) {
    console.info('[Extension Logout] ℹ️ Ambiente Chrome non disponibile (estensione non installata?)');
    return;
  }

  // 3. Prepara messaggio di logout
  const message = {
    type: 'logout'
  };

  console.log('[Extension Logout] 📤 Invio notifica di logout all\'estensione...');

  // 4. Invia messaggio all'estensione
  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage(
        EXTENSION_ID,
        message,
        (response) => {
          if (chrome.runtime.lastError) {
            // Errore comune: estensione non installata o disabilitata
            console.info('[Extension Logout] ℹ️ Impossibile contattare l\'estensione:', chrome.runtime.lastError.message);
            resolve(); // Non blocchiamo il logout se l'estensione non risponde
          } else {
            console.log('[Extension Logout] ✅ Estensione notificata del logout:', response);
            resolve();
          }
        }
      );
    } catch (error) {
      console.warn('[Extension Logout] ⚠️ Errore durante invio messaggio:', error);
      resolve(); // Non blocchiamo il logout in caso di errore
    }
  });
};

/**
 * Verifica se l'estensione è disponibile
 */
export const isExtensionAvailable = (): boolean => {
  return typeof chrome !== 'undefined' && !!chrome.runtime;
};
