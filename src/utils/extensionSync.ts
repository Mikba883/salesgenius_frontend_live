import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// ⚠️ ID ESTENSIONE CHROME
const EXTENSION_ID = 'cbhfaanckjinaephabmpojmlfbgohkoml';

/**
 * Sincronizza la sessione Supabase con l'estensione Chrome generando un JWT custom
 * @param session - La sessione Supabase completa
 * @returns Promise che si risolve se l'invio ha successo
 */
export const syncSessionWithExtension = async (session: Session | null): Promise<void> => {
  console.log('[Extension Sync] 🔄 Avvio sincronizzazione con JWT custom...', {
    hasSession: !!session,
    timestamp: new Date().toISOString(),
  });

  // 1. Verifica che ci sia una sessione valida
  if (!session || !session.access_token) {
    console.warn('[Extension Sync] ❌ No session to sync');
    return;
  }

  // 2. Verifica che siamo in un ambiente Chrome
  if (typeof chrome === 'undefined' || !chrome.runtime) {
    console.log('[Extension Sync] ℹ️ Not in Chrome environment, skipping sync');
    return;
  }

  console.log('[Extension Sync] ✅ Chrome environment detected, Extension ID:', EXTENSION_ID);

  try {
    // 3. Chiama l'Edge Function per generare il JWT custom con claim is_premium
    console.log('[Extension Sync] 📡 Chiamata Edge Function per generare JWT...');
    
    // Timeout ridotto a 5 secondi
    const timeoutPromise = new Promise<{ data: null; error: { message: string } }>((resolve) => 
      setTimeout(() => resolve({ 
        data: null, 
        error: { message: 'Timeout: Edge Function non risponde dopo 5 secondi' }
      }), 5000)
    );
    
    const invokePromise = supabase.functions.invoke('generate-jwt', {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });
    
    const result = await Promise.race([invokePromise, timeoutPromise]);
    const { data, error } = result as any;

    if (error) {
      console.error('[Extension Sync] ❌ Errore generazione JWT:', error);
      throw new Error(error.message || 'Edge Function error');
    }
    
    if (!data || !data.token) {
      console.error('[Extension Sync] ❌ JWT non ricevuto dal backend');
      throw new Error('No JWT token received');
    }

    if (!data || !data.token) {
      console.error('[Extension Sync] ❌ JWT non ricevuto dal backend');
      return;
    }

    console.log('[Extension Sync] ✅ JWT generato con successo:', {
      userId: data.user_id,
      email: data.email,
      isPremium: data.is_premium,
      tokenPreview: data.token.substring(0, 30) + '...',
      expiresAt: new Date(data.expires_at * 1000).toISOString(),
    });

    // 4. Prepara il messaggio per l'estensione (FORMATO SEMPLIFICATO)
    // Il JWT contiene già tutti i claim (user_id, email, is_premium) al suo interno
    const message = {
      type: 'setToken',
      token: data.token,
    };

    console.log('[Extension Sync] 📦 Messaggio preparato per estensione:', {
      type: message.type,
      tokenLength: message.token.length,
    });

    // 5. Funzione per inviare il messaggio con retry
    const sendMessageWithRetry = (retryCount = 0): void => {
      try {
        console.log(`[Extension Sync] 📤 Invio JWT all'estensione (tentativo ${retryCount + 1})...`);
        
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

          console.log('[Extension Sync] ✅ Token JWT inviato con successo all\'estensione!', {
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

  } catch (error) {
    console.error('[Extension Sync] ❌ Errore durante la sincronizzazione:', error);
  }
};

/**
 * Verifica se l'estensione è disponibile
 */
export const isExtensionAvailable = (): boolean => {
  return typeof chrome !== 'undefined' && !!chrome.runtime;
};
