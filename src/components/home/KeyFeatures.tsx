import React from 'react';

const KeyFeatures = () => {
  const features = [
    {
      emoji: '🤝',
      bgColor: '#e0f2fe',
      textColor: '#0c4a6e',
      category: 'Rapport',
      title: 'Build Connection',
      description: 'AI-powered suggestions to establish trust and authentic relationships with prospects during calls.'
    },
    {
      emoji: '🧭',
      bgColor: '#f3e8ff',
      textColor: '#6b21a8',
      category: 'Discovery',
      title: 'Uncover Needs',
      description: 'Real-time prompts to ask the right questions and deeply understand customer pain points.'
    },
    {
      emoji: '💎',
      bgColor: '#dcfce7',
      textColor: '#166534',
      category: 'Value',
      title: 'Demonstrate Worth',
      description: 'Contextual recommendations to showcase your product value aligned with customer needs.'
    },
    {
      emoji: '⚖️',
      bgColor: '#ffedd5',
      textColor: '#9a3412',
      category: 'Objection',
      title: 'Handle Concerns',
      description: 'Smart responses to address objections confidently and turn hesitations into opportunities.'
    },
    {
      emoji: '✅',
      bgColor: '#fef9c3',
      textColor: '#854d0e',
      category: 'Closing',
      title: 'Seal the Deal',
      description: 'Recognize buying signals and get the perfect closing lines to move deals forward.'
    }
  ];

  return (
    <section className="overflow-hidden py-20 lg:py-28 xl:py-32">
      <div className="max-w-[1222px] mx-auto px-4 sm:px-8 xl:px-0">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="hero-subtitle-gradient relative mb-6 font-medium text-sm inline-flex items-center gap-2 py-2 px-6 rounded-full">
            <img src="/images/hero/icon-title.svg" alt="icon" />
            <span className="hero-subtitle-text">Main Features</span>
          </span>
          <h2 className="text-white mb-6 text-2xl font-extrabold sm:text-4xl xl:text-heading-2">
            Key Features of Our Tool
          </h2>
          <p className="max-w-[714px] mx-auto font-medium text-lg">
            Everything you need to close more deals and improve your sales performance
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-12 gap-6">
          {features.slice(0, 3).map((feature, index) => (
            <div
              key={index}
              className="col-span-12 sm:col-span-4"
            >
              <div 
                className="bg-white/5 border border-white/10 rounded-2xl p-5 h-full flex gap-4 items-start hover:bg-white/10 transition-colors duration-300"
              >
                <div 
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: feature.bgColor }}
                >
                  {feature.emoji}
                </div>
                <div className="flex flex-col">
                  <span 
                    className="text-sm font-bold mb-1 capitalize tracking-wide"
                    style={{ color: feature.textColor }}
                  >
                    {feature.category}
                  </span>
                  <h3 className="text-white mb-2 font-bold text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {features.slice(3, 5).map((feature, index) => (
            <div
              key={index + 3}
              className="col-span-12 sm:col-span-6"
            >
              <div 
                className="bg-white/5 border border-white/10 rounded-2xl p-5 h-full flex gap-4 items-start hover:bg-white/10 transition-colors duration-300"
              >
                <div 
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: feature.bgColor }}
                >
                  {feature.emoji}
                </div>
                <div className="flex flex-col">
                  <span 
                    className="text-sm font-bold mb-1 capitalize tracking-wide"
                    style={{ color: feature.textColor }}
                  >
                    {feature.category}
                  </span>
                  <h3 className="text-white mb-2 font-bold text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
