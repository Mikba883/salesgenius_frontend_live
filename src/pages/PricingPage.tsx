import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';

const PricingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId: 'price_1SWyNHGUM0wmwBaNz9XWYcMv' }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(error.message || "Failed to create checkout session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          {/* Title */}
          <div className="text-center mb-16">
            <span className="hero-subtitle-gradient relative mb-4 font-medium text-sm inline-flex items-center gap-2 py-2 px-6 rounded-full">
              <img src="/images/hero/icon-title.svg" alt="icon" />
              <span className="hero-subtitle-text">Pricing</span>
            </span>
            <h1 className="text-white mb-4.5 text-2xl font-extrabold sm:text-4xl xl:text-heading-2">
              Start Closing More Deals Today
            </h1>
            <p className="max-w-[600px] mx-auto font-medium text-lg">
              Stop losing deals today. Get real-time guidance to handle objections and close more sales instantly.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="max-w-[600px] mx-auto">
            <div className="w-full rounded-3xl bg-black/80 border border-white/10 relative overflow-hidden pt-16 pb-14 px-8 xl:px-10 pricing-item-border shadow-[0_0_60px_rgba(139,92,246,0.4)]">
              {/* Early Adopter Badge */}
              <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold uppercase animate-pulse">
                ⚡ 70% OFF - First Month
              </span>

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Premium Subscription</h3>

              {/* Pricing */}
              <div className="mb-6 text-center">
                <div className="flex items-baseline justify-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-white/50 line-through">$39</span>
                  <h2 className="font-extrabold text-6xl pricing-gradient-text" style={{ textShadow: '0 0 30px rgba(139,92,246,0.5)' }}>
                    $11.70
                  </h2>
                </div>
                <p className="font-medium text-gray-400">/month</p>
              </div>

              <div className="my-10 w-full h-[1px] pricing-gradient-divider"></div>

              {/* Features */}
              <ul className="flex flex-col gap-4 mb-10">
                <li className="flex items-center gap-4">
                  <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                  <span className="font-medium text-gray-300">Works with any platform (Zoom, Meet, Teams)</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                  <span className="font-medium text-gray-300">100% Private: No sensitive info leaves your device</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                  <span className="font-medium text-gray-300">Real-time objection & closing guidance</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                  <span className="font-medium text-gray-300">Instant answers (&lt;300ms latency)</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                  <span className="font-medium text-gray-300">Unlimited calls and usage</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                  <span className="font-medium text-gray-300">Full dashboard access</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                  <span className="font-medium text-gray-300">Cancel anytime</span>
                </li>
              </ul>

              {/* CTA Button */}
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 font-bold text-white text-lg py-4 px-12 rounded-lg transition-all ease-in-out duration-300 relative pricing-button-gradient hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Subscribe Now'}
              </button>

              {/* bg shapes */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <span className="absolute bottom-0 left-0 -z-1">
                  <img src="/images/blur/blur-16.svg" alt="blur" className="max-w-none" />
                </span>
                <span className="absolute top-0 left-0 -z-1">
                  <img src="/images/blur/blur-17.svg" alt="blur" className="max-w-none" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PricingPage;
