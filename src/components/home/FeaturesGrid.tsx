import React from 'react';

const FeaturesGrid = () => {
  const features = [
    {
      icon: "/images/features/icon-01.svg",
      title: "Intelligent Writing Assistance",
      description: "Our AI writing tool analyzes your content, suggests improvements,",
    },
    {
      icon: "/images/features/icon-02.svg",
      title: "Grammar and Spell Check",
      description: "Say goodbye to embarrassing typos and grammar mistakes",
    },
    {
      icon: "/images/features/icon-03.svg",
      title: "Plagiarism Detection",
      description: "Originality is key, and our AI writing tool helps you maintain it",
    },
    {
      icon: "/images/features/icon-04.svg",
      title: "Voice to Text Conversion",
      description: "Transform your spoken words into written text easily & effortlessly",
      rotated: true,
    },
    {
      icon: "/images/features/icon-05.svg",
      title: "Style and Tone Adaptation",
      description: "Whether you need a professional, or positive tone it has everyone",
      rotated: true,
    },
    {
      icon: "/images/features/icon-06.svg",
      title: "Content Generation",
      description: "Need inspiration or assistance with generating content?",
      rotated: true,
    },
  ];

  return (
    <section
      id="features"
      className="overflow-hidden pt-17.5 lg:pt-22.5 xl:pt-27.5 scroll-mt-17"
    >
      <div className="max-w-[1222px] mx-auto px-4 sm:px-8 xl:px-0">
        {/* Section Title */}
        <div className="text-center">
          <span className="hero-subtitle-gradient relative mb-4 font-medium text-sm inline-flex items-center gap-2 py-2 px-4.5 rounded-full">
            <img src="/images/hero/icon-title.svg" alt="icon" />
            <span className="hero-subtitle-text">Some of Main Features</span>
          </span>
          <h2 className="text-white mb-4.5 text-2xl font-extrabold sm:text-4xl xl:text-heading-2">
            Key Features of Our Tool
          </h2>
          <p className="max-w-[714px] mx-auto mb-5 font-medium">
            Our AI writing tool is designed to empower you with exceptional writing capabilities, 
            making the writing process more efficient, accurate, and enjoyable.
          </p>
        </div>

        <div className="relative">
          <div className="features-row-border rotate-90 w-1/2 h-[1px] absolute top-1/2 left-1/2 -translate-y-1/2 lg:-translate-x-1/3 lg:left-1/4 hidden lg:block"></div>
          <div className="features-row-border rotate-90 w-1/2 h-[1px] absolute top-1/2 right-1/2 -translate-y-1/2 lg:right-[8.3%] hidden lg:block"></div>

          {/* First Row */}
          <div className="flex flex-wrap justify-center">
            {features.slice(0, 3).map((feature, index) => (
              <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
                <div className="relative px-4 py-8 overflow-hidden text-center group sm:py-10 xl:py-15 lg:px-8 xl:px-13">
                  <span className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 features-bg -z-1"></span>
                  <span className="icon-border relative max-w-[80px] w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto">
                    <img src={feature.icon} alt="icon" />
                  </span>
                  <h4 className="mb-4 text-lg font-semibold text-white">{feature.title}</h4>
                  <p className="font-medium">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="features-row-border w-full h-[1px]"></div>

          {/* Second Row */}
          <div className="flex flex-wrap justify-center">
            {features.slice(3, 6).map((feature, index) => (
              <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
                <div className="relative px-4 py-8 overflow-hidden text-center group sm:py-10 xl:py-15 lg:px-8 xl:px-13">
                  <span className="absolute top-0 left-0 w-full h-full rotate-180 opacity-0 group-hover:opacity-100 features-bg -z-1"></span>
                  <span className="icon-border relative max-w-[80px] w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto">
                    <img src={feature.icon} alt="icon" />
                  </span>
                  <h4 className="mb-4 text-lg font-semibold text-white">{feature.title}</h4>
                  <p className="font-medium">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
