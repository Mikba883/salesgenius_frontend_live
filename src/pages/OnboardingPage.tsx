import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AuthLayout from '@/components/layout/AuthLayout';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  const checkSubscription = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return false;
      }

      const { data, error: funcError } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (funcError) {
        console.error('[Onboarding] Error checking subscription:', funcError);
        throw funcError;
      }

      console.log('[Onboarding] Subscription check result:', data);

      if (data.subscribed) {
        setIsPremium(true);
        setLoading(false);
        return true;
      }

      return false;
    } catch (err) {
      console.error('[Onboarding] Failed to check subscription:', err);
      setError('Errore durante la verifica del pagamento');
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    let pollInterval: NodeJS.Timeout;
    let maxAttempts = 15; // 15 attempts * 2 seconds = 30 seconds

    const startPolling = async () => {
      // First immediate check
      const isActive = await checkSubscription();
      
      if (isActive) {
        return;
      }

      // Start polling
      pollInterval = setInterval(async () => {
        setAttempts(prev => prev + 1);

        if (attempts >= maxAttempts) {
          clearInterval(pollInterval);
          setLoading(false);
          setError('Il pagamento sta richiedendo più tempo del previsto. Prova a ricaricare la pagina tra qualche minuto.');
          return;
        }

        const isActive = await checkSubscription();
        
        if (isActive) {
          clearInterval(pollInterval);
        }
      }, 2000); // Check every 2 seconds
    };

    startPolling();

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setAttempts(0);
    checkSubscription();
  };

  if (loading) {
    return (
      <AuthLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <h2 className="text-2xl font-semibold mb-2">Stiamo verificando il tuo pagamento...</h2>
            <p className="text-muted-foreground">Attendere qualche secondo ⏳</p>
            {attempts > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                Tentativo {attempts} di 15...
              </p>
            )}
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (error) {
    return (
      <AuthLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-semibold mb-4">{error}</h2>
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Riprova
            </button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (isPremium) {
    return (
      <AuthLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-2xl px-4">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-4xl font-bold mb-4">Benvenuto in Sales Genius Premium!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Il tuo pagamento è stato confermato con successo. Ora hai accesso a tutte le funzionalità premium.
            </p>
            
            <div className="bg-card border border-border rounded-lg p-8 mb-8 text-left">
              <h2 className="text-2xl font-semibold mb-4">Prossimi passi:</h2>
              <ol className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="font-bold text-primary mr-2">1.</span>
                  <span>Installa l'estensione Chrome di Sales Genius</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-primary mr-2">2.</span>
                  <span>Accedi all'estensione con le tue credenziali</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-primary mr-2">3.</span>
                  <span>Inizia la tua prima chiamata e ricevi suggerimenti in tempo reale</span>
                </li>
              </ol>
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Vai alla Dashboard
            </button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return null;
}
