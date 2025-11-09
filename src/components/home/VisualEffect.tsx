import React from 'react';

const VisualEffect = () => {
  return (
    <section className="relative py-32 lg:py-40 xl:py-48 overflow-hidden min-h-[900px] lg:min-h-[1000px] flex items-center">
      {/* Background stars */}
      <div className="absolute inset-0 -z-10">
        <div className="max-w-[600px] w-full h-60 overflow-hidden absolute top-20 left-1/2 -translate-x-1/2">
          <div className="stars"></div>
          <div className="stars2"></div>
        </div>
      </div>

      {/* Blur effects - concentrated in center */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Center concentrated light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <div className="relative">
            <img src="/images/blur/blur-13.svg" alt="blur" className="max-w-none scale-[2] opacity-90" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-14.svg" alt="blur" className="max-w-none scale-[1.8] opacity-95" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-15.svg" alt="blur" className="max-w-none scale-[1.5] opacity-80" />
        </div>
        {/* Extra center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-14.svg" alt="blur" className="max-w-none scale-[2.5] opacity-50" />
        </div>
        {/* Radial fade overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0f172a]"></div>
      </div>

      {/* Giant planet circle - positioned at bottom */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-[1400px] h-[1400px] rounded-full bg-dark pricing-circle"></div>
      
      {/* Extended seamless gradient overlay to blend with next section */}
      <div className="absolute inset-x-0 bottom-0 h-[500px] bg-gradient-to-b from-transparent from-0% via-transparent via-30% via-[#0f172a]/30 via-60% via-[#0f172a]/70 via-80% to-[#0f172a] to-100% pointer-events-none"></div>

      {/* Content on top of planet */}
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 relative z-10 w-full">
        <div className="flex flex-col items-center gap-8 text-center">
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
        </div>
      </div>
    </section>
  );
};

export default VisualEffect;
