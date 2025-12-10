import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { requestExtensionOnboarding } from '@/utils/extensionSync';
import { trackGA4Event, trackFBEvent } from '@/utils/analytics';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [user, setUser] = useState<User | null>(null);

  const checkSubscription = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return false;
      }

      const { data, error: funcError } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (funcError) {
        console.error('[Onboarding] Error checking subscription:', funcError);
        throw funcError;
      }

      console.log('[Onboarding] Subscription check result:', data);

      if (data.subscribed) {
        // Track purchase completion with debug logging
        trackFBEvent('Purchase', { value: 11.70, currency: 'USD' });
        trackGA4Event('purchase', { value: 11.70, currency: 'USD', transaction_id: `sub_${Date.now()}` });
        
        setIsPremium(true);
        setLoading(false);
        return true;
      }

      return false;
    } catch (err) {
      console.error('[Onboarding] Failed to check subscription:', err);
      setError('Errore durante la verifica del pagamento');
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    let pollInterval: NodeJS.Timeout;
    let maxAttempts = 4;

    const init = async () => {
      // Fetch user first
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }
      setUser(user);

      // Check is_premium directly from database first
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('is_premium')
        .eq('user_id', user.id)
        .maybeSingle();

      // If already premium, show onboarding immediately without polling
      if (profile?.is_premium) {
        console.log('[Onboarding] User already premium, skipping verification');
        setIsPremium(true);
        setLoading(false);
        return;
      }

      // Only if NOT premium: start polling Stripe (for post-payment scenario)
      console.log('[Onboarding] User not premium yet, starting subscription polling');
      
      const startPolling = async () => {
        const isActive = await checkSubscription();
        
        if (isActive) {
          return;
        }

        pollInterval = setInterval(async () => {
          setAttempts(prev => prev + 1);

          if (attempts >= maxAttempts) {
            clearInterval(pollInterval);
            setLoading(false);
            setError('Il pagamento sta richiedendo più tempo del previsto. Prova a ricaricare la pagina tra qualche minuto.');
            return;
          }

          const isActive = await checkSubscription();
          
          if (isActive) {
            clearInterval(pollInterval);
          }
        }, 3000);
      };

      startPolling();
    };

    init();

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setAttempts(0);
    checkSubscription();
  };

  const steps = [
    {
      title: "Install Sales Genius Extension",
      subtitle: "Add our Chrome extension to get real-time sales suggestions during your calls",
      cta: "Download Extension",
      ctaAction: () => window.open('https://chromewebstore.google.com/detail/salesgenius-real-time-ai/hcbaejkdphoiigkdpjcngocecnoipnpj', '_blank'),
      gif: "/images/video/gif1.gif"
    },
    {
      title: "Enable Permissions",
      subtitle: "Accept terms and allow microphone access so we can listen to your calls",
      cta: "Open Extension Settings",
      ctaAction: async () => {
        await requestExtensionOnboarding();
      },
      gif: "/images/video/gif2.gif"
    },
    {
      title: "You're Ready!",
      subtitle: "Here's how to activate Sales Genius during your video calls",
      cta: "Go to Dashboard",
      ctaAction: () => navigate('/dashboard'),
      gif: "/images/video/gif3.gif"
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark">
        {user && <DashboardHeader user={user} />}
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <h2 className="text-2xl font-semibold text-white mb-2">Stiamo verificando il tuo pagamento...</h2>
            <p className="text-white/60">Attendere qualche secondo ⏳</p>
            {attempts > 0 && (
              <p className="text-sm text-white/40 mt-2">
                Tentativo {attempts} di 4...
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark">
        {user && <DashboardHeader user={user} />}
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-semibold text-white mb-4">{error}</h2>
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-gradient-to-r from-purple to-blue text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Riprova
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isPremium && user) {
    return (
      <div className="min-h-screen bg-dark relative">
        <DashboardHeader user={user} />
        
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Progress indicators */}
            <div className="flex justify-center gap-2 mb-12">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentStep 
                      ? 'bg-gradient-to-r from-purple to-blue w-8' 
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                />
              ))}
            </div>

            {/* Step card */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black/60 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm"
                >
                  {/* Title and subtitle */}
                  <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                      {steps[currentStep].title}
                    </h1>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto">
                      {steps[currentStep].subtitle}
                    </p>
                  </div>

                  {/* GIF demo */}
                  <div className="mb-8 flex justify-center">
                    <img 
                      src={steps[currentStep].gif} 
                      alt="Demo" 
                      className="max-w-full md:max-w-2xl rounded-xl border-2 border-white/10 shadow-2xl"
                    />
                  </div>

                  {/* CTA button */}
                  <div className="flex justify-center">
                    <button
                      onClick={steps[currentStep].ctaAction}
                      className="px-14 py-6 hero-button-gradient text-white rounded-lg font-bold hover:opacity-90 transition-all duration-300 text-xl shadow-lg hover:shadow-purple/30"
                    >
                      {steps[currentStep].cta}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows - OUTSIDE card, below */}
              <div className="flex justify-center items-center gap-8 mt-8">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`p-4 rounded-full transition-all ${
                    currentStep === 0 
                      ? 'opacity-0 pointer-events-none' 
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  <ChevronLeft className="w-10 h-10" />
                </button>

                <button
                  onClick={nextStep}
                  disabled={currentStep === steps.length - 1}
                  className={`p-4 rounded-full transition-all ${
                    currentStep === steps.length - 1 
                      ? 'opacity-0 pointer-events-none' 
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  <ChevronRight className="w-10 h-10" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
