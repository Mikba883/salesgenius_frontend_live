import React from 'react';

const VisualEffect = () => {
  return (
    <section className="py-20 lg:py-25 overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-col items-center gap-8">
          {/* Visual Effect copiato dal Pricing */}
          <div className="relative w-full max-w-[900px] h-[400px] md:h-[500px]">
            {/* bg circles - effetto originale */}
            <div className="relative top-18">
              <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 -my-55">
                <div className="absolute top-0 -translate-x-1/2 left-1/2">
                  <img src="/images/blur/blur-13.svg" alt="blur" className="max-w-none" />
                </div>
                <div className="absolute top-0 -translate-x-1/2 left-1/2">
                  <img src="/images/blur/blur-14.svg" alt="blur" className="max-w-none" />
                </div>
                <div className="absolute top-0 -translate-x-1/2 left-1/2">
                  <img src="/images/blur/blur-15.svg" alt="blur" className="max-w-none" />
                </div>
              </div>
              <div className="max-w-[830px] w-full h-[830px] rounded-full bg-dark absolute left-1/2 -translate-x-1/2 top-0 pricing-circle"></div>

              <div className="max-w-[482px] w-full h-60 overflow-hidden absolute -z-1 -top-30 left-1/2 -translate-x-1/2">
                <div className="stars"></div>
                <div className="stars2"></div>
              </div>
            </div>
            
            {/* grid row - linee verticali luminose */}
            <div className="flex justify-center gap-7.5 relative -z-1">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="max-w-[50px] w-full h-[250px] relative pricing-grid pricing-grid-border"></div>
              ))}
            </div>
          </div>
          
          {/* Titolo sotto - mantenuto */}
          <h3 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl text-center max-w-[700px] px-4">
            Powered by Advanced AI Technology
          </h3>
          
          <p className="text-slate-400 text-center max-w-[600px] px-4 font-medium">
            Our cutting-edge artificial intelligence analyzes every conversation in real-time, 
            providing you with instant insights and suggestions to close more deals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisualEffect;
