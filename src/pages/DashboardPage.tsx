import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import { syncSessionWithExtension, notifyExtensionLogout } from '@/utils/extensionSync';

const DashboardPage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [debugResult, setDebugResult] = useState<any>(null);
  const [isDebugLoading, setIsDebugLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
      } else {
        setUser(session.user);
        setLoading(false);
        
        // Sincronizza in background DOPO che il dashboard è caricato
        syncSessionWithExtension(session).catch(err => {
          console.info('[Dashboard] ℹ️ Sync estensione fallita (tutto OK):', err);
        });
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          navigate('/login');
        } else {
          setUser(session.user);
          
          // Sincronizza in background quando la sessione viene aggiornata
          if (event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') {
            syncSessionWithExtension(session).catch(err => {
              console.info('[Dashboard] ℹ️ Sync estensione fallita (tutto OK):', err);
            });
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    // 1. Notifica l'estensione Chrome PRIMA di fare logout
    //    (così l'estensione può cancellare i token mentre la sessione è ancora valida)
    notifyExtensionLogout().catch(err => {
      console.info('[Dashboard] ℹ️ Notifica logout estensione fallita (normale se non installata):', err);
    });
    
    // 2. Esegui logout da Supabase
    await supabase.auth.signOut();
    
    // 3. Redirect alla homepage
    navigate('/');
  };

  const handleDebugToken = async () => {
    setIsDebugLoading(true);
    setDebugResult(null);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        setDebugResult({ error: 'No active session found' });
        return;
      }

      console.log('[Debug] Testing token with backend...');
      
      const response = await fetch('https://salesgenius-backend.onrender.com/debug-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: session.access_token })
      });
      
      const result = await response.json();
      console.log('[Debug] Backend response:', result);
      setDebugResult(result);
      
    } catch (error: any) {
      console.error('[Debug] Error:', error);
      setDebugResult({ 
        error: 'Network error', 
        details: error.message 
      });
    } finally {
      setIsDebugLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-white">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative z-10 overflow-hidden pt-35 md:pt-40 xl:pt-45 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 -mx-28">
            <div className="absolute -z-1 -top-[128%] sm:-top-[107%] xl:-top-[73%] left-1/2 -translate-x-1/2 -u-z-10 hero-circle-gradient w-full h-[1282px] rounded-full max-w-[1282px]"></div>
          </div>
        </div>

        <div className="mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0 relative z-1">
          <div className="text-center">
            <h1 className="mb-6 text-3xl font-extrabold text-white sm:text-5xl xl:text-heading-1">
              Welcome to Your Dashboard
            </h1>
            
            {user && (
              <div className="mb-8">
                <p className="text-xl text-white/80 mb-2">
                  Logged in as: <span className="font-semibold text-purple">{user.email}</span>
                </p>
                {user.user_metadata?.name && (
                  <p className="text-lg text-white/60">
                    Name: {user.user_metadata.name}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleDebugToken}
                disabled={isDebugLoading}
                className="inline-flex py-3 font-medium text-white duration-300 ease-in rounded-lg bg-purple/80 hover:bg-purple px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDebugLoading ? 'Testing Token...' : '🔍 Debug Token'}
              </button>
              
              <button
                onClick={handleSignOut}
                className="inline-flex py-3 font-medium text-white duration-300 ease-in rounded-lg bg-red-500/80 hover:bg-red-500 px-8"
              >
                Sign Out
              </button>
            </div>

            {debugResult && (
              <div className="mt-8 max-w-2xl mx-auto">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    🔍 Debug Result:
                  </h3>
                  <pre className="text-left text-sm text-white/80 overflow-auto max-h-96 bg-black/30 p-4 rounded">
                    {JSON.stringify(debugResult, null, 2)}
                  </pre>
                  {debugResult.valid === true && (
                    <p className="mt-4 text-green-400 font-semibold">
                      ✅ Token is VALID - Backend can decode it successfully!
                    </p>
                  )}
                  {debugResult.valid === false && (
                    <p className="mt-4 text-red-400 font-semibold">
                      ❌ Token is INVALID - Check the error details above
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DashboardPage;
