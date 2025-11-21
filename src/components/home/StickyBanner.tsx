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
      // Responsive padding: smaller on mobile
      const updatePadding = () => {
        if (window.innerWidth < 640) {
          document.body.style.paddingTop = '80px';
        } else {
          document.body.style.paddingTop = '70px';
        }
      };
      
      updatePadding();
      window.addEventListener('resize', updatePadding);
      
      return () => {
        window.removeEventListener('resize', updatePadding);
        document.body.style.paddingTop = '0px';
      };
    } else {
      document.body.style.paddingTop = '0px';
    }
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
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 py-3 sm:py-4 relative">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2 sm:top-3 right-2 sm:right-0 text-white/60 hover:text-white transition-colors p-1 z-10"
          aria-label="Close banner"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 w-full sm:pr-12">
          {/* Left side: Badge + Copy - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold uppercase">
              ⚡ Early Adopter
            </span>
            <p className="text-white text-sm font-medium">
              Lock in <span className="font-bold text-pink-300">$11.70/month</span> before price goes up
            </p>
          </div>

          {/* Center: Timer */}
          <div className="flex-1 flex justify-center">
            <div className="flex flex-col items-center gap-0.5 sm:gap-1">
              <span className="text-white/60 text-[10px] sm:text-xs uppercase tracking-wide">Time Remaining</span>
              <div className="font-mono font-bold text-white text-xl sm:text-2xl lg:text-3xl">
                {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
              </div>
            </div>
          </div>

          {/* Right side: CTA */}
          <div className="w-full sm:w-auto sm:flex-shrink-0">
            <Link
              to="/signup"
              className="w-full sm:w-auto text-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-white text-purple-900 font-semibold text-sm sm:text-base hover:bg-pink-100 transition-all duration-300 hover:scale-105"
            >
              Claim Deal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyBanner;
