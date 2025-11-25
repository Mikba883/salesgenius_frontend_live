import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { notifyExtensionLogout } from '@/utils/extensionSync';
import { User } from '@supabase/supabase-js';

interface DashboardHeaderProps {
  user: User;
}

const DashboardHeader = ({ user }: DashboardHeaderProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleManageSubscription = async () => {
    setLoading(true);
    setDropdownOpen(false);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: { Authorization: `Bearer ${session.access_token}` }
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setDropdownOpen(false);
    
    notifyExtensionLogout().catch(err => {
      console.info('[Dashboard] Extension logout notification failed (normal if not installed):', err);
    });
    
    await supabase.auth.signOut();
    navigate('/');
  };

  const getInitials = () => {
    if (user.user_metadata?.name) {
      return user.user_metadata.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return user.email?.slice(0, 2).toUpperCase() || 'U';
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <p className="text-white/60">Welcome back, {user.user_metadata?.name || user.email}</p>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-purple to-blue flex items-center justify-center text-white font-semibold hover:shadow-lg transition-shadow"
        >
          {getInitials()}
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-dark border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
            <button
              onClick={handleManageSubscription}
              disabled={loading}
              className="w-full px-4 py-3 text-left text-white hover:bg-white/5 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Manage Subscription
            </button>
            
            <div className="border-t border-white/10"></div>
            
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-3 text-left text-red-400 hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
