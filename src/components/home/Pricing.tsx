import React from 'react';

const Pricing = () => {
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
      className="relative py-32 lg:py-40 xl:py-48 overflow-hidden min-h-[1800px] flex items-end scroll-mt-17"
    >
      {/* Background stars */}
      <div className="absolute inset-0 -z-10">
        <div className="max-w-[600px] w-full h-60 overflow-hidden absolute top-20 left-1/2 -translate-x-1/2">
          <div className="stars"></div>
          <div className="stars2"></div>
        </div>
      </div>

      {/* Blur effects - Layer 1 (base) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none">
        <img src="/images/blur/blur-13.svg" alt="blur" className="max-w-none opacity-90" style={{ transform: 'scale(1)' }} />
      </div>
      
      {/* Blur effects - Layer 2 */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none">
        <img src="/images/blur/blur-14.svg" alt="blur" className="max-w-none opacity-95" style={{ transform: 'scale(1.2)' }} />
      </div>
      
      {/* Blur effects - Layer 3 */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none">
        <img src="/images/blur/blur-15.svg" alt="blur" className="max-w-none opacity-100" style={{ transform: 'scale(1.5)' }} />
      </div>
      
      {/* Blur effects - Layer 4 */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none">
        <img src="/images/blur/blur-13.svg" alt="blur" className="max-w-none opacity-95" style={{ transform: 'scale(1.8)' }} />
      </div>
      
      {/* Blur effects - Layer 5 */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none">
        <img src="/images/blur/blur-14.svg" alt="blur" className="max-w-none opacity-100" style={{ transform: 'scale(2)' }} />
      </div>
      
      {/* Blur effects - Layer 6 */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none">
        <img src="/images/blur/blur-15.svg" alt="blur" className="max-w-none opacity-100" style={{ transform: 'scale(2.2)' }} />
      </div>
      
      {/* Blur effects - Layer 7 */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none">
        <img src="/images/blur/blur-13.svg" alt="blur" className="max-w-none opacity-100" style={{ transform: 'scale(2.5)' }} />
      </div>
      
      {/* Blur effects - Layer 8 (most intense) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none">
        <img src="/images/blur/blur-14.svg" alt="blur" className="max-w-none opacity-100" style={{ transform: 'scale(3)' }} />
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_20%,#030014_80%)] pointer-events-none"></div>

      {/* Giant planet circle */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-[1400px] h-[1400px] rounded-full bg-dark pricing-circle"></div>

      {/* Sunrise gradient */}
      <div className="absolute inset-x-0 bottom-0 h-[1000px] bg-gradient-to-b from-transparent from-0% via-transparent via-20% via-[#030014]/70 via-30% via-[#030014]/95 via-40% to-[#030014] to-45% pointer-events-none"></div>

      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 relative z-10 w-full pt-[350px]">

        {/* section title */}
        <div className="mb-17.5 text-center z-10 relative">
          <span className="hero-subtitle-gradient relative mb-4 font-medium text-sm inline-flex items-center gap-2 py-2 px-6 rounded-full">
            <img src="/images/hero/icon-title.svg" alt="icon" />
            <span className="hero-subtitle-text">Get access</span>
          </span>
          <h2 className="text-white mb-4.5 text-2xl font-extrabold sm:text-4xl xl:text-heading-2">
            Our Pricing Plan
          </h2>
          <p className="max-w-[714px] mx-auto font-medium">
            Our AI writing tool is designed to empower you with exceptional writing capabilities, 
            making the writing process more efficient, accurate, and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5">
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
    </section>
  );
};

export default Pricing;
