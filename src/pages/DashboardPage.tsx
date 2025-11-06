import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';

const DashboardPage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/signin');
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/signin');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
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

            <button
              onClick={handleSignOut}
              className="inline-flex py-3 font-medium text-white duration-300 ease-in rounded-lg bg-red-500/80 hover:bg-red-500 px-8"
            >
              Sign Out
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DashboardPage;
