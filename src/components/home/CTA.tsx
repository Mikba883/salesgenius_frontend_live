import React from 'react';

const CTA = () => {
  return (
    <section className="py-20 lg:py-25">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="cta-box-gradient bg-dark rounded-[30px] relative overflow-hidden px-4 py-20 lg:py-25 z-999">
          {/* bg shapes */}
          <span className="absolute bottom-0 left-0 -z-1">
            <img src="/images/cta/grid.svg" alt="grid" />
          </span>
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <span className="absolute bottom-0 right-0 -z-1">
              <img src="/images/blur/blur-22.svg" alt="blur-sm" className="max-w-none" />
            </span>
            <span className="absolute bottom-0 right-0 -z-1">
              <img src="/images/blur/blur-23.svg" alt="blur-sm" className="max-w-none" />
            </span>
            <span className="absolute bottom-0 right-0 -z-1">
              <img src="/images/blur/blur-24.svg" alt="blur-sm" className="max-w-none" />
            </span>
          </div>

          {/* content */}
          <div className="relative z-10 max-w-[530px] w-full mx-auto text-center">
            <span className="hero-subtitle-gradient relative mb-4 font-medium text-sm inline-flex items-center gap-2 py-2 px-4.5 rounded-full">
              <img src="/images/hero/icon-title.svg" alt="icon" />
              <span className="hero-subtitle-text">Get Started Today</span>
            </span>
            <h2 className="text-white mb-4.5 text-2xl font-extrabold sm:text-4xl xl:text-heading-2">
              Start Creating Engaging Content
            </h2>
            <p className="mb-9 font-medium">
              Our AI writing tool is designed to empower you with exceptional writing capabilities, 
              making the writing process more efficient, accurate, and enjoyable.
            </p>
            <a
              href="#"
              className="inline-flex py-3 font-medium text-white duration-300 ease-in rounded-lg hero-button-gradient px-7 hover:opacity-80"
            >
              Get Started for Free
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
