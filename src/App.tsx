import React, { useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { Routes, Route } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { syncSessionWithExtension } from '@/utils/extensionSync';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import CheckEmailPage from './pages/CheckEmailPage';
import DashboardPage from './pages/DashboardPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import ErrorFallback from './components/ErrorFallback';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

function App() {
  // 🔄 LISTENER GLOBALE per sincronizzazione token con estensione Chrome
  useEffect(() => {
    console.log('[App] 🎯 Inizializzazione listener globale TOKEN_REFRESHED');
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Sincronizza solo quando il token viene rinfrescato
        if (event === 'TOKEN_REFRESHED' && session) {
          console.log('[App] 🔄 TOKEN_REFRESHED rilevato - Sincronizzazione con estensione Chrome');
          
          // Sincronizza in background senza bloccare l'app
          syncSessionWithExtension(session).catch(err => {
            console.info('[App] ℹ️ Sync estensione fallita (normale se estensione non installata):', err);
          });
        }
        
        // Log degli altri eventi per debug
        if (event !== 'TOKEN_REFRESHED') {
          console.log(`[App] Auth event: ${event}`);
        }
      }
    );

    // Cleanup al dismount dell'app
    return () => {
      console.log('[App] 🧹 Pulizia listener globale TOKEN_REFRESHED');
      subscription.unsubscribe();
    };
  }, []); // Array vuoto = esegue solo al mount

  // ✨ SINCRONIZZAZIONE PROATTIVA al caricamento della pagina
  useEffect(() => {
    console.log('[App] 🔍 Controllo sessione esistente al caricamento...');
    
    // Controlla se c'è una sessione attiva
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log('[App] ✅ Sessione trovata - Tentativo sincronizzazione proattiva con estensione');
        
        // Sincronizza in background senza bloccare l'app
        syncSessionWithExtension(session).catch(err => {
          console.info('[App] ℹ️ Sync proattiva estensione fallita (normale se estensione non installata):', err);
        });
      } else {
        console.log('[App] ℹ️ Nessuna sessione attiva al caricamento');
      }
    });
  }, []); // Esegue solo al mount dell'app

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/check-email" element={<CheckEmailPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
