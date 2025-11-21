import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StickyBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // Check if banner should be visible on mount
  useEffect(() => {
    const deadline = localStorage.getItem('earlyAdopterDeadline');
    if (deadline) {
      const now = new Date();
      const diff = new Date(deadline).getTime() - now.getTime();
      if (diff <= 0) {
        // Countdown expired - hide forever
        setIsVisible(false);
        return;
      }
    }

    // Countdown not expired - always show
    setIsVisible(true);
  }, []);

  // Manage body padding based on banner visibility
  useEffect(() => {
    if (isVisible) {
      document.body.style.paddingTop = '70px';
    } else {
      document.body.style.paddingTop = '0px';
    }

    return () => {
      document.body.style.paddingTop = '0px';
    };
  }, [isVisible]);

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
        setIsVisible(false);
        // Only save dismissed when countdown reaches 0
        localStorage.setItem('earlyAdopterBannerDismissed', 'true');
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

  const handleDismiss = () => {
    // Only hide visually, don't save to localStorage
    // Banner will reappear on page reload until countdown reaches 0
    setIsVisible(false);
  };

  const formatTime = (num: number) => String(num).padStart(2, '0');

  return (
    <div className={`fixed top-0 left-0 right-0 z-[10000] bg-gradient-to-r from-purple-900/95 via-purple-800/95 to-purple-900/95 backdrop-blur-sm border-b border-purple-500/20 transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 py-4 relative">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-8 text-white/60 hover:text-white transition-colors p-1"
          aria-label="Close banner"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pr-8">
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
          <div className="flex items-center gap-6">
            {/* Countdown Timer */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-white/60 text-xs uppercase tracking-wide">Time Remaining</span>
              <div className="font-mono font-bold text-white text-3xl sm:text-4xl">
                {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
              </div>
            </div>

            {/* CTA Button */}
            <Link
              to="/signup"
              className="px-6 py-3 rounded-lg bg-white text-purple-900 font-semibold text-base hover:bg-pink-100 transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              Claim Deal →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyBanner;
