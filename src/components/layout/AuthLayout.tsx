import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-dark relative">
      {/* Background blur effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2">
          <img src="/images/blur/blur-02.svg" alt="blur" className="max-w-none opacity-50" />
        </div>
      </div>

      {/* Back arrow */}
      <div className="absolute top-8 left-8 z-20">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
