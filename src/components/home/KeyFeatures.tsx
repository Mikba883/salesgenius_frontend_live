import React from 'react';

const KeyFeatures = () => {
  const features = [
    {
      emoji: '🤝',
      themeColor: '#38bdf8',
      category: 'Rapport',
      title: 'Build Instant Trust',
      description: 'Forget awkward silences. Get personalized icebreakers to connect like a human, not a bot.'
    },
    {
      emoji: '🧭',
      themeColor: '#a78bfa',
      category: 'Discovery',
      title: 'Uncover Real Pain',
      description: 'Don\'t stay on the surface. Ask the deep questions that reveal hidden budgets and urgent needs.'
    },
    {
      emoji: '💎',
      themeColor: '#34d399',
      category: 'Value',
      title: 'Be the Authority',
      description: 'Tough technical question? Get the perfect answer instantly. No more "I\'ll get back to you".'
    },
    {
      emoji: '⚖️',
      themeColor: '#fb923c',
      category: 'Objection',
      title: 'Crush Every "No"',
      description: '"Too expensive"? Get real-time rebuttals to flip pricing objections into closed deals.'
    },
    {
      emoji: '✅',
      themeColor: '#facc15',
      category: 'Closing',
      title: 'Seal the Deal',
      description: 'Spot buying signals instantly. Get the exact line to ask for the signature without hesitation.'
    }
  ];

  return (
    <section className="overflow-hidden py-20 lg:py-28 xl:py-32">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="hero-subtitle-gradient relative mb-4 font-medium text-sm inline-flex items-center gap-2 py-2 px-6 rounded-full">
            <img src="/images/hero/icon-title.svg" alt="icon" />
            <span className="hero-subtitle-text">Unfair Advantage</span>
          </span>
          <h2 className="text-white mb-6 text-3xl font-extrabold sm:text-4xl xl:text-heading-2">
            Never Be Lost for Words Again
          </h2>
          <p className="max-w-[714px] mx-auto font-medium text-lg text-gray-400">
            Maps every objection, build instant trust, and secure the signature with the confidence of a top 1% performer.
          </p>
        </div>

        {/* Features Grid - Bento Style */}
        <div className="grid grid-cols-12 gap-4">
          {/* Rapport - 4 cols */}
          <div className="col-span-12 md:col-span-4">
            <div 
              className="group bg-white/5 border-2 rounded-2xl p-6 h-full flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              style={{ 
                borderColor: 'rgba(255,255,255,0.1)',
                '--hover-color': features[0].themeColor
              } as React.CSSProperties & { '--hover-color': string }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = features[0].themeColor;
                e.currentTarget.style.boxShadow = `0 10px 30px -10px ${features[0].themeColor}80`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${features[0].themeColor}20` }}
              >
                {features[0].emoji}
              </div>
              <div className="flex flex-col">
                <span 
                  className="text-sm font-bold mb-2 uppercase tracking-wider"
                  style={{ color: features[0].themeColor }}
                >
                  {features[0].category}
                </span>
                <h3 className="text-white mb-3 font-bold text-xl">
                  {features[0].title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {features[0].description}
                </p>
              </div>
            </div>
          </div>

          {/* Discovery - 4 cols */}
          <div className="col-span-12 md:col-span-4">
            <div 
              className="group bg-white/5 border-2 rounded-2xl p-6 h-full flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              style={{ 
                borderColor: 'rgba(255,255,255,0.1)',
                '--hover-color': features[1].themeColor
              } as React.CSSProperties & { '--hover-color': string }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = features[1].themeColor;
                e.currentTarget.style.boxShadow = `0 10px 30px -10px ${features[1].themeColor}80`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${features[1].themeColor}20` }}
              >
                {features[1].emoji}
              </div>
              <div className="flex flex-col">
                <span 
                  className="text-sm font-bold mb-2 uppercase tracking-wider"
                  style={{ color: features[1].themeColor }}
                >
                  {features[1].category}
                </span>
                <h3 className="text-white mb-3 font-bold text-xl">
                  {features[1].title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {features[1].description}
                </p>
              </div>
            </div>
          </div>

          {/* Value - 4 cols */}
          <div className="col-span-12 md:col-span-4">
            <div 
              className="group bg-white/5 border-2 rounded-2xl p-6 h-full flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              style={{ 
                borderColor: 'rgba(255,255,255,0.1)',
                '--hover-color': features[2].themeColor
              } as React.CSSProperties & { '--hover-color': string }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = features[2].themeColor;
                e.currentTarget.style.boxShadow = `0 10px 30px -10px ${features[2].themeColor}80`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${features[2].themeColor}20` }}
              >
                {features[2].emoji}
              </div>
              <div className="flex flex-col">
                <span 
                  className="text-sm font-bold mb-2 uppercase tracking-wider"
                  style={{ color: features[2].themeColor }}
                >
                  {features[2].category}
                </span>
                <h3 className="text-white mb-3 font-bold text-xl">
                  {features[2].title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {features[2].description}
                </p>
              </div>
            </div>
          </div>

          {/* Objection - 6 cols */}
          <div className="col-span-12 md:col-span-6">
            <div 
              className="group bg-white/5 border-2 rounded-2xl p-6 h-full flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              style={{ 
                borderColor: 'rgba(255,255,255,0.1)',
                '--hover-color': features[3].themeColor
              } as React.CSSProperties & { '--hover-color': string }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = features[3].themeColor;
                e.currentTarget.style.boxShadow = `0 10px 30px -10px ${features[3].themeColor}80`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${features[3].themeColor}20` }}
              >
                {features[3].emoji}
              </div>
              <div className="flex flex-col">
                <span 
                  className="text-sm font-bold mb-2 uppercase tracking-wider"
                  style={{ color: features[3].themeColor }}
                >
                  {features[3].category}
                </span>
                <h3 className="text-white mb-3 font-bold text-xl">
                  {features[3].title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {features[3].description}
                </p>
              </div>
            </div>
          </div>

          {/* Closing - 6 cols */}
          <div className="col-span-12 md:col-span-6">
            <div 
              className="group bg-white/5 border-2 rounded-2xl p-6 h-full flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              style={{ 
                borderColor: 'rgba(255,255,255,0.1)',
                '--hover-color': features[4].themeColor
              } as React.CSSProperties & { '--hover-color': string }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = features[4].themeColor;
                e.currentTarget.style.boxShadow = `0 10px 30px -10px ${features[4].themeColor}80`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${features[4].themeColor}20` }}
              >
                {features[4].emoji}
              </div>
              <div className="flex flex-col">
                <span 
                  className="text-sm font-bold mb-2 uppercase tracking-wider"
                  style={{ color: features[4].themeColor }}
                >
                  {features[4].category}
                </span>
                <h3 className="text-white mb-3 font-bold text-xl">
                  {features[4].title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {features[4].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
