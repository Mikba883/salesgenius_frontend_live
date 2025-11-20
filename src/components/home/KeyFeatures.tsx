import React from 'react';

const KeyFeatures = () => {
  const features = [
    {
      icon: '/images/features/icon-01.svg',
      title: 'Real-Time Speech Recognition',
      description: 'Instant transcription of your conversations with high accuracy, powered by advanced AI technology.'
    },
    {
      icon: '/images/features/icon-02.svg',
      title: 'Intent & Tone Analysis',
      description: 'Understand customer sentiment and intent in real-time to adapt your approach instantly.'
    },
    {
      icon: '/images/features/icon-03.svg',
      title: 'Smart Suggestions',
      description: 'Get contextual recommendations for your next best line during live sales calls.'
    },
    {
      icon: '/images/features/icon-04.svg',
      title: 'Multi-Language Support',
      description: 'Work seamlessly across different languages and regional dialects.'
    },
    {
      icon: '/images/features/icon-05.svg',
      title: 'Privacy First',
      description: 'Your data is encrypted and protected with enterprise-grade security standards.'
    }
  ];

  return (
    <section className="overflow-hidden pt-17.5 lg:pt-22.5 xl:pt-27.5">
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative rounded-3xl features-box-border group"
            >
              <div className="relative overflow-hidden rounded-3xl p-10 box-hover">
                <div className="relative z-20 text-center">
                  <div className="icon-border relative max-w-[80px] w-full h-20 rounded-full inline-flex items-center justify-center mb-10 mx-auto">
                    <img src={feature.icon} alt="icon" />
                  </div>
                  <h3 className="text-white mb-5 font-bold text-xl">
                    {feature.title}
                  </h3>
                  <p className="font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* bg shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                  <span className="absolute bottom-0 left-0">
                    <img src="/images/features/shape-04.svg" alt="shape" />
                  </span>
                  <span className="absolute top-0 right-0">
                    <img src="/images/features/shape-05.svg" alt="shape" />
                  </span>
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
