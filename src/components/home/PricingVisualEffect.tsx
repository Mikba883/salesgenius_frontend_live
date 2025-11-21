import React from 'react';

const PricingVisualEffect = () => {
  const premiumFeatures = [
    "Real-time AI suggestions during calls",
    "Advanced tone & intent analysis",
    "Unlimited meetings & recording",
    "Full transcript history & search",
    "Advanced analytics dashboard",
    "Priority customer support",
  ];

  return (
    <section id="pricing" className="relative py-32 lg:py-40 xl:py-48 overflow-hidden min-h-[1600px] flex items-end">
      {/* Background stars */}
      <div className="absolute inset-0 z-10">
        <div className="max-w-[600px] w-full h-60 overflow-hidden absolute top-20 left-1/2 -translate-x-1/2">
          <div className="stars"></div>
          <div className="stars2"></div>
        </div>
      </div>

      {/* Blur effects - concentrated in center */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Center concentrated light - MAXIMUM BRIGHTNESS */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-15.svg" alt="blur" className="max-w-none scale-[1] opacity-70" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-15.svg" alt="blur" className="max-w-none scale-[1.2] opacity-70" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-14.svg" alt="blur" className="max-w-none scale-[1.5] opacity-75" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-14.svg" alt="blur" className="max-w-none scale-[1.8] opacity-75" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <div className="relative">
            <img src="/images/blur/blur-13.svg" alt="blur" className="max-w-none scale-[2] opacity-80" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-13.svg" alt="blur" className="max-w-none scale-[2.2] opacity-80" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-14.svg" alt="blur" className="max-w-none scale-[2.5] opacity-70" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-13.svg" alt="blur" className="max-w-none scale-[3] opacity-65" />
        </div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent via-[#030014]/10 to-[#030014]/80"></div>
      </div>

      {/* Giant planet circle - positioned at bottom */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-[1400px] h-[1400px] rounded-full bg-dark pricing-circle z-5 shadow-[0_0_100px_rgba(139,92,246,0.3)]"></div>
      
      {/* Sunrise effect */}
      <div className="absolute inset-x-0 bottom-0 h-[1000px] bg-gradient-to-b from-transparent from-0% via-transparent via-20% via-[#030014]/70 via-30% via-[#030014]/95 via-40% to-[#030014] to-45% pointer-events-none"></div>

      {/* Content */}
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 relative z-10 w-full pt-[350px]">
        {/* Section title */}
        <div className="mb-17.5 text-center z-10 relative">
          <span className="hero-subtitle-gradient relative mb-4 font-medium text-sm inline-flex items-center gap-2 py-2 px-6 rounded-full">
            <img src="/images/hero/icon-title.svg" alt="icon" />
            <span className="hero-subtitle-text">get access</span>
          </span>
          <h2 className="text-white mb-4.5 text-2xl font-extrabold sm:text-4xl xl:text-heading-2">
            Our Pricing Plan
          </h2>
          <p className="max-w-[714px] mx-auto font-medium text-gray-400">
            Simple, transparent pricing. Start your free trial and lock in Early Adopter pricing.
          </p>
        </div>

        {/* Single Premium Plan - Centered */}
        <div className="flex justify-center">
          <div className="w-full max-w-[600px] rounded-3xl bg-dark relative z-20 overflow-hidden pt-12.5 pb-10 px-8 xl:px-10 pricing-item-border shadow-[0_0_60px_rgba(139,92,246,0.4)]">
            {/* Early Adopter Badge - Top Right */}
            <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold uppercase animate-pulse">
              ⚡ 70% OFF
            </span>

            <h3 className="font-semibold text-heading-6 text-white mb-8">Premium</h3>

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
              {premiumFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-4">
                  <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                  <span className="font-medium text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <a
              href="/#"
              className="w-full flex items-center justify-center gap-2 font-bold text-white text-lg py-4 px-12 rounded-lg transition-all ease-in-out duration-300 relative pricing-button-gradient hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-105"
            >
              🚀 Start Your Free Trial
            </a>

            <p className="mt-6 text-sm text-center text-gray-400 font-medium">
              Lock in Early Adopter pricing now
            </p>

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
    </section>
  );
};

export default PricingVisualEffect;
