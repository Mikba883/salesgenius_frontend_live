import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// ⚠️ ID ESTENSIONE CHROME (da variabile d'ambiente)
const EXTENSION_ID = import.meta.env.VITE_CHROME_EXTENSION_ID;

/**
 * Sincronizza la sessione Supabase con l'estensione Chrome inviando il session.access_token
 * @param session - La sessione Supabase completa
 * @returns Promise che si risolve se l'invio ha successo
 */
export const syncSessionWithExtension = async (session: Session | null): Promise<void> => {
  // 1. Verifica ID configurato
  if (!EXTENSION_ID) {
    console.warn('[Extension Sync] ⚠️ VITE_CHROME_EXTENSION_ID non configurato nel file .env');
    return;
  }

  // 2. Verifica sessione valida
  if (!session || !session.access_token) {
    console.info('[Extension Sync] ℹ️ Nessuna sessione attiva');
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

    console.log('[Extension Sync] ✅ Token Supabase ottenuto:', {
      userId: session.user.id,
      email: session.user.email,
      tokenPreview: supabaseToken.substring(0, 30) + '...',
      expiresAt: session.expires_at ? new Date(session.expires_at * 1000).toISOString() : 'unknown',
    });

    // 5. Prepara il messaggio per l'estensione
    const message = {
      type: 'setToken',
      token: supabaseToken, // ✅ Token Supabase reale
    };

    console.log('[Extension Sync] 📦 Messaggio preparato:', {
      type: message.type,
      tokenLength: message.token.length,
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
          console.log('[Extension Sync] ✅ Token JWT inviato con successo all\'estensione!', {
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
 * Verifica se l'estensione è disponibile
 */
export const isExtensionAvailable = (): boolean => {
  return typeof chrome !== 'undefined' && !!chrome.runtime;
};
