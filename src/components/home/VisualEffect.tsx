import React from 'react';

const VisualEffect = () => {
  return (
    <section className="py-20 lg:py-25 overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-col items-center gap-8">
          {/* Visual Effect Box con blur reali */}
          <div className="relative w-full max-w-[900px] h-[400px] md:h-[500px] rounded-[30px] overflow-hidden bg-slate-950/90 backdrop-blur-sm border border-slate-800/50">
            {/* Container per effetti blur sovrapposti */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Blur effects dalle immagini reali */}
              <span className="absolute bottom-0 left-0 opacity-80">
                <img src="/images/blur/blur-06.svg" alt="blur" className="max-w-none scale-150" />
              </span>
              <span className="absolute top-0 right-0 opacity-70">
                <img src="/images/blur/blur-07.svg" alt="blur" className="max-w-none scale-150" />
              </span>
              <span className="absolute bottom-0 left-0 opacity-60">
                <img src="/images/blur/blur-08.svg" alt="blur" className="max-w-none scale-125" />
              </span>
              <span className="absolute bottom-0 right-0 opacity-60">
                <img src="/images/blur/blur-09.svg" alt="blur" className="max-w-none scale-125" />
              </span>
              <span className="absolute top-0 left-1/2 -translate-x-1/2 opacity-50">
                <img src="/images/blur/blur-10.svg" alt="blur" className="max-w-none scale-110" />
              </span>
            </div>
            
            {/* Overlay gradient per intensificare l'effetto */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-blue-900/20"></div>
          </div>
          
          {/* Titolo sotto */}
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
