import React, { useState, useEffect } from 'react';

const CTA = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Get or set deadline (same as StickyBanner)
    const getDeadline = () => {
      const saved = localStorage.getItem('earlyAdopterDeadline');
      if (saved) return new Date(saved);
      
      const now = new Date();
      now.setHours(now.getHours() + 22);
      now.setMinutes(now.getMinutes() + 40);
      localStorage.setItem('earlyAdopterDeadline', now.toISOString());
      return now;
    };

    const deadline = getDeadline();

    const updateTimer = () => {
      const now = new Date();
      const diff = deadline.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (num: number) => String(num).padStart(2, '0');
  return (
    <section className="pt-12 pb-20 lg:pt-16 lg:pb-25">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="cta-box-gradient bg-dark rounded-[30px] relative overflow-hidden px-4 pt-12 pb-20 lg:pt-16 lg:pb-25 z-999">
          {/* bg shapes */}
          <span className="absolute bottom-0 left-0 -z-1">
            <img src="/images/cta/grid.svg" alt="grid" />
          </span>

          {/* Stars Effect - Above Grid */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-60 overflow-hidden pointer-events-none z-10">
            <div className="stars"></div>
            <div className="stars2"></div>
          </div>

          {/* Title Section - Moved Up */}
          <div className="relative z-10 text-center mb-10">
            <span className="hero-subtitle-gradient relative mb-4 font-medium text-sm inline-flex items-center gap-2 py-2 px-6 rounded-full">
              <img src="/images/hero/icon-title.svg" alt="icon" />
              <span className="hero-subtitle-text">Get Started Today</span>
            </span>
            <h2 className="text-white mb-4.5 text-2xl font-extrabold sm:text-4xl xl:text-heading-2">
              Lock the Most Advanced AI Sales Coach
            </h2>
            <p className="max-w-[530px] mx-auto font-medium">
              Stop losing deals today. Get real-time guidance to handle objections and close more sales instantly.
            </p>
          </div>

          {/* content */}
          <div className="relative z-10 max-w-[700px] w-full mx-auto">
            {/* Pricing Card */}
            <div className="w-full rounded-3xl bg-black/80 border border-white/10 relative overflow-hidden pt-16 pb-14 px-8 xl:px-10 pricing-item-border shadow-[0_0_60px_rgba(139,92,246,0.4)]">
              {/* Early Adopter Badge - Top Right */}
              <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold uppercase animate-pulse">
                ⚡ 70% OFF
              </span>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-2xl font-bold text-white/50 line-through">$39</span>
                  <h2 className="font-extrabold text-6xl pricing-gradient-text" style={{ textShadow: '0 0 30px rgba(139,92,246,0.5)' }}>
                    $11.70
                  </h2>
                </div>
                <p className="font-medium text-gray-400 mb-4">/month</p>
                
                {/* Savings Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400 font-semibold text-sm">
                  💰 You save $27.30/month
                </div>
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
              </ul>

              {/* CTA Button */}
              <a
                href="/#"
                className="w-full flex items-center justify-center gap-2 font-bold text-white text-lg py-4 px-12 rounded-lg transition-all ease-in-out duration-300 relative pricing-button-gradient hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-105"
              >
                LOCK IN $11.70 PRICE
              </a>

              {/* Countdown Timer - Red Elegant */}
              <div className="mt-6 flex flex-col items-center gap-1">
                <span className="text-red-400/80 text-xs uppercase tracking-wide font-medium">Offer Ends In</span>
                <div className="font-mono font-bold text-red-500 text-3xl">
                  {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
                </div>
              </div>

              {/* bg shapes */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <span className="absolute bottom-0 left-0 -z-1">
                  <img src="/images/blur/blur-16.svg" alt="blur-sm" className="max-w-none" />
                </span>
                <span className="absolute top-0 left-0 -z-1">
                  <img src="/images/blur/blur-17.svg" alt="blur-sm" className="max-w-none" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
