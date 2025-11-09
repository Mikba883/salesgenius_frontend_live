import React from 'react';

const VisualEffect = () => {
  return (
    <section className="py-20 lg:py-25 overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-col items-center gap-8">
          {/* Visual Effect Box */}
          <div className="relative w-full max-w-[900px] h-[400px] md:h-[500px] rounded-[30px] overflow-hidden bg-gradient-to-br from-slate-900/80 via-purple-900/40 to-slate-900/80 backdrop-blur-sm border border-slate-800/50">
            {/* Multiple blur effects to create prominent glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-[400px] h-[400px] bg-purple-600/50 rounded-full blur-[120px] animate-pulse"></div>
              <div className="absolute w-[300px] h-[300px] bg-blue-500/40 rounded-full blur-[100px] -translate-x-20"></div>
              <div className="absolute w-[250px] h-[250px] bg-pink-500/50 rounded-full blur-[90px] translate-x-20"></div>
              <div className="absolute w-[200px] h-[200px] bg-violet-500/40 rounded-full blur-[80px] translate-y-10"></div>
            </div>
            
            {/* Center overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
          </div>
          
          {/* Title below */}
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
