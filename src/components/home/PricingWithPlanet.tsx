import React from 'react';

const PricingWithPlanet = () => {
  const pricingPlans = [
    {
      name: "Starter",
      price: "$10",
      icon: "/images/pricing/pricing-icon-01.svg",
      features: [
        "Subscription with levels",
        "Advanced features included",
        "Shared workspaces & tools",
        "Premium versions functionality",
        "Customizing the outputs",
        "Priority customer support",
      ],
    },
    {
      name: "Medium",
      price: "$59",
      icon: "/images/pricing/pricing-icon-02.svg",
      features: [
        "Subscription with levels",
        "Advanced features included",
        "Shared workspaces & tools",
        "Premium versions functionality",
        "Customizing the outputs",
        "Priority customer support",
      ],
    },
    {
      name: "Business",
      price: "$289",
      icon: "/images/pricing/pricing-icon-03.svg",
      features: [
        "Subscription with levels",
        "Advanced features included",
        "Shared workspaces & tools",
        "Premium versions functionality",
        "Customizing the outputs",
        "Priority customer support",
      ],
    },
  ];

  return (
    <section 
      id="pricing"
      className="relative py-32 lg:py-40 xl:py-48 overflow-hidden min-h-[1200px] flex items-center scroll-mt-17"
    >
      {/* Background stars */}
      <div className="absolute inset-0 -z-10">
        <div className="max-w-[600px] w-full h-60 overflow-hidden absolute top-20 left-1/2 -translate-x-1/2">
          <div className="stars"></div>
          <div className="stars2"></div>
        </div>
      </div>

      {/* Blur effects - concentrated in center */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Center concentrated light - MAXIMUM BRIGHTNESS */}
        {/* Multiple layers for extreme intensity */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-15.svg" alt="blur" className="max-w-none scale-[1] opacity-100" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-15.svg" alt="blur" className="max-w-none scale-[1.2] opacity-100" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-14.svg" alt="blur" className="max-w-none scale-[1.5] opacity-100" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-14.svg" alt="blur" className="max-w-none scale-[1.8] opacity-100" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <div className="relative">
            <img src="/images/blur/blur-13.svg" alt="blur" className="max-w-none scale-[2] opacity-100" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-13.svg" alt="blur" className="max-w-none scale-[2.2] opacity-100" />
        </div>
        {/* Extra glow layers for powerful effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-14.svg" alt="blur" className="max-w-none scale-[2.5] opacity-95" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-13.svg" alt="blur" className="max-w-none scale-[3] opacity-90" />
        </div>
        {/* Radial fade overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent via-[#030014]/10 to-[#030014]/80"></div>
      </div>

      {/* Giant planet circle - positioned at bottom */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-[1400px] h-[1400px] rounded-full bg-dark pricing-circle"></div>
      
      {/* Sunrise effect - VERY rapid fade from bright center to dark */}
      <div className="absolute inset-x-0 bottom-0 h-[1000px] bg-gradient-to-b from-transparent from-0% via-transparent via-20% via-[#030014]/70 via-30% via-[#030014]/95 via-40% to-[#030014] to-45% pointer-events-none"></div>

      {/* Content on top of planet */}
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 relative z-10 w-full">
        <div className="flex flex-col items-center gap-12 text-center">
          {/* Get access button */}
          <button className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-all flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            Get access
          </button>

          {/* Title */}
          <h2 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-[900px]">
            Our Pricing Plan
          </h2>
          
          {/* Description */}
          <p className="text-slate-300 text-lg sm:text-xl max-w-[800px] font-medium leading-relaxed">
            Our AI writing tool is designed to empower you with exceptional writing capabilities, 
            making the writing process more efficient, accurate, and enjoyable.
          </p>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5 w-full mt-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="rounded-3xl bg-dark relative z-20 overflow-hidden pt-12.5 pb-10 px-8 xl:px-10 pricing-item-border"
              >
                <span className="absolute right-9 top-9">
                  <img src={plan.icon} alt="icon" />
                </span>

                <h3 className="font-semibold text-heading-6 text-white mb-5.5">{plan.name}</h3>

                <div className="flex items-center gap-3.5">
                  <h2 className="font-bold text-custom-1 pricing-gradient-text">{plan.price}</h2>
                  <p className="font-medium">
                    /month <br />
                    (billed annually)
                  </p>
                </div>

                <div className="my-10 w-full h-[1px] pricing-gradient-divider"></div>

                <ul className="flex flex-col gap-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-5">
                      <img src="/images/pricing/pricing-icon-04.svg" alt="icon" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/#"
                  className="mt-11 flex items-center justify-center gap-1.5 font-medium text-white p-3 rounded-lg transition-all ease-in-out duration-300 relative pricing-button-gradient hover:shadow-button"
                >
                  Get the plan
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.8992 7.5999L9.72422 2.3499C9.49922 2.1249 9.14922 2.1249 8.92422 2.3499C8.69922 2.5749 8.69922 2.9249 8.92422 3.1499L13.1242 7.4249H2.49922C2.19922 7.4249 1.94922 7.6749 1.94922 7.9749C1.94922 8.2749 2.19922 8.5499 2.49922 8.5499H13.1742L8.92422 12.8749C8.69922 13.0999 8.69922 13.4499 8.92422 13.6749C9.02422 13.7749 9.17422 13.8249 9.32422 13.8249C9.47422 13.8249 9.62422 13.7749 9.72422 13.6499L14.8992 8.3999C15.1242 8.1749 15.1242 7.8249 14.8992 7.5999Z" fill="white"/>
                  </svg>
                </a>

                <p className="mt-4 text-sm text-center">No extra hidden charge</p>

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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingWithPlanet;
