import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) console.error('Error:', error);
  };

  return (
    <Layout>
      <section className="pt-17.5 pb-17.5 lg:pb-22.5 xl:pb-27.5">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="rounded-3xl bg-white/[0.05]">
            <div className="flex">
              <div className="w-full lg:w-1/2">
                <div className="py-8 sm:py-20 pl-8 sm:pl-21 pr-8 sm:pr-20">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-white/[0.12] bg-transparent rounded-lg focus:border-purple pl-14.5 pr-4 py-3.5 font-medium outline-hidden focus-visible:shadow-none text-white"
                      />
                    </div>

                    <div className="mb-5 relative">
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-white/[0.12] bg-transparent rounded-lg focus:border-purple pl-14.5 pr-4 py-3.5 font-medium outline-hidden focus-visible:shadow-none text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="hero-button-gradient flex justify-center w-full rounded-lg py-3 px-7 text-white font-medium ease-in duration-300 hover:opacity-80"
                    >
                      Sign up
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SignUpPage;
