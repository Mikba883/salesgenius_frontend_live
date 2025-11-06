import React from 'react';
import AuthLayout from '@/components/layout/AuthLayout';
import { Mail } from 'lucide-react';

const CheckEmailPage = () => {
  return (
    <AuthLayout>
      <div className="w-full max-w-[520px]">
        <div className="rounded-3xl bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] p-8 sm:p-12 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-purple/10 flex items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-purple" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">Check your email</h2>
          
          <p className="text-white/60 mb-8">
            We've sent a verification link to your email address. 
            Please check your inbox and click the link to continue.
          </p>
          
          <a
            href="/signin"
            className="inline-flex py-3 px-8 font-medium text-white duration-300 ease-in rounded-lg hero-button-gradient hover:opacity-80"
          >
            Back to Sign In
          </a>
        </div>
      </div>
    </AuthLayout>
  );
};

export default CheckEmailPage;
