import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/layout/AuthLayout';
import { supabase } from '@/integrations/supabase/client';
import { Mail } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
    } else {
      navigate('/check-email');
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[520px]">
        <div className="rounded-3xl bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Forgot Password?</h2>
          
          <p className="text-white/60 text-center mb-8">
            Enter your email and we'll send you a link to reset your password
          </p>

          <form onSubmit={handleResetPassword} className="space-y-5">
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
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <p className="mt-6 text-center text-white/60 text-sm">
            Remember your password?{' '}
            <a href="/login" className="text-purple hover:text-purple-light transition-colors">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
