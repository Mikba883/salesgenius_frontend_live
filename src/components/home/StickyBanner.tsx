import React, { useState, useEffect } from 'react';

const StickyBanner = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Get or set deadline
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

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const formatTime = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/95 via-purple-800/95 to-purple-900/95 backdrop-blur-sm border-b border-purple-500/20">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Left side: Badge + Copy */}
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold uppercase">
              ⚡ Early Adopter
            </span>
            <p className="text-white text-sm sm:text-base font-medium text-center sm:text-left">
              Lock in <span className="font-bold text-pink-300">$11.70/month</span> before price goes up
            </p>
          </div>

          {/* Right side: Timer + CTA */}
          <div className="flex items-center gap-4">
            {/* Countdown Timer */}
            <div className="flex items-center gap-2">
              <span className="text-white/80 text-sm">⏰</span>
              <div className="font-mono font-bold text-white text-lg">
                {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={scrollToPricing}
              className="px-5 py-2 rounded-lg bg-white text-purple-900 font-semibold text-sm hover:bg-pink-100 transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              Claim Deal →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyBanner;
