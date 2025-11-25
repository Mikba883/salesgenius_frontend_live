import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardActivity from '@/components/dashboard/DashboardActivity';

interface DashboardData {
  totalMinutes: number;
  totalSuggestions: number;
  categoryBreakdown: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
  calls: Array<{
    meetingId: string;
    date: string;
    duration: number;
    suggestionsCount: number;
    suggestions: Array<{
      category: string;
      text: string;
      timestamp: string;
    }>;
  }>;
}

const DashboardPage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }

      setUser(session.user);
      
      // Check premium status
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('is_premium')
        .eq('user_id', session.user.id)
        .single();
      
      if (!profileData?.is_premium) {
        navigate('/pricing');
        return;
      }

      // Fetch dashboard data
      try {
        const { data, error } = await supabase.functions.invoke('dashboard-stats', {
          headers: { Authorization: `Bearer ${session.access_token}` }
        });

        if (error) throw error;
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          navigate('/login');
        } else {
          setUser(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading || !user || !dashboardData) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/60">Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative z-10 overflow-hidden pt-35 md:pt-40 xl:pt-45 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 xl:px-0">
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 -mx-28">
            <div className="absolute -z-1 -top-[128%] sm:-top-[107%] xl:-top-[73%] left-1/2 -translate-x-1/2 hero-circle-gradient w-full h-[1282px] rounded-full max-w-[1282px]"></div>
          </div>

          <DashboardHeader user={user} />
          
          <DashboardStats 
            totalMinutes={dashboardData.totalMinutes}
            totalSuggestions={dashboardData.totalSuggestions}
            categoryBreakdown={dashboardData.categoryBreakdown}
          />

          <DashboardActivity calls={dashboardData.calls} />

          {/* Onboarding Card */}
          <div className="mt-8 bg-gradient-to-br from-purple/20 to-blue/20 border border-purple/30 rounded-xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-purple/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Inizia con SalesGenius</h3>
                </div>
                <p className="text-white/70">
                  Scopri come installare e usare l'estensione Chrome per ottenere suggerimenti AI in tempo reale durante le tue chiamate di vendita.
                </p>
              </div>
              <Link
                to="/onboarding"
                className="inline-flex items-center gap-2 px-8 py-3 bg-purple hover:bg-purple/80 text-white font-medium rounded-lg transition-colors"
              >
                Guida Completa
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DashboardPage;
