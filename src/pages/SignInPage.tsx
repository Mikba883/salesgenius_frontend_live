import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/layout/AuthLayout';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { syncSessionWithExtension } from '@/utils/extensionSync';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Setup del listener per i cambiamenti di autenticazione
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('[SignInPage] Auth event:', event, 'Has session:', !!session);
        
        if (session?.user) {
          // 🔑 CRITICO: Sincronizza token con estensione Chrome PRIMA del redirect
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            console.log('[SignInPage] 🔄 Sincronizzazione token con estensione Chrome...');
            await syncSessionWithExtension(session);
          }
          console.log('[SignInPage] ✅ Login completato, redirect a dashboard');
          navigate('/dashboard');
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
    if (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  const handleLinkedInSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
    if (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
    }
    // ✅ Lascia che onAuthStateChange gestisca la sincronizzazione e il redirect
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[520px]">
        <div className="rounded-3xl bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Sign In</h2>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-lg bg-white/[0.08] border border-white/[0.12] text-white font-medium hover:bg-white/[0.12] transition-colors duration-300 disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>

            <button
              onClick={handleLinkedInSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-lg bg-white/[0.08] border border-white/[0.12] text-white font-medium hover:bg-white/[0.12] transition-colors duration-300 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Sign in with LinkedIn
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.12]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#0B0B1F] text-white/60">Or sign in with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-white/[0.12] bg-transparent rounded-lg pl-12 pr-4 py-3.5 font-medium outline-none focus:border-purple text-white placeholder:text-white/40 transition-colors duration-300"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-white/[0.12] bg-transparent rounded-lg pl-12 pr-12 py-3.5 font-medium outline-none focus:border-purple text-white placeholder:text-white/40 transition-colors duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Remember me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/[0.12] bg-transparent"
                />
                <span className="text-sm text-white/60">Remember me</span>
              </label>
              <a href="/forgot-password" className="text-sm text-purple hover:text-purple-light transition-colors">
                Forgot Password?
              </a>
            </div>

            {message && (
              <p className="text-sm text-center text-red-400">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full hero-button-gradient py-3.5 px-7 text-white font-medium rounded-lg hover:opacity-80 transition-opacity duration-300 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in with AI Tool'}
            </button>
          </form>

          <p className="mt-6 text-center text-white/60 text-sm">
            Don't have an account?{' '}
            <a href="/signup" className="text-purple hover:text-purple-light transition-colors">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignInPage;
