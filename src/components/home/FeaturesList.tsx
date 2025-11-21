import React from 'react';

const FeaturesList = () => {
  return (
    <section className="pt-12.5">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="grid sm:grid-cols-12 gap-12">
          {/* Large Feature */}
          <div className="sm:col-span-7">
            <div className="relative rounded-3xl features-box-border">
              <div className="relative p-10 rounded-3xl xl:px-15 xl:py-12 box-hover">
                <div className="relative z-20 flex items-center justify-between">
                  <div className="max-w-[477px] w-full">
                    <span className="hero-subtitle-gradient relative mb-4 font-medium text-sm inline-flex items-center gap-2 py-2 px-6 rounded-full">
                      <img src="/images/hero/icon-title.svg" alt="icon" />
                      <span className="hero-subtitle-text">Real-time Magic</span>
                    </span>
                    <h3 className="text-white mb-4.5 font-bold text-heading-4">
                      Don't Analyze the Loss<br />Save the Deal
                    </h3>
                    <p className="mb-10 font-medium">
                      Post-call analytics are autopsies. SalesGenius is surgery. We don't tell you why you lost the deal yesterday; we give you the exact words to win it today, while the client is still listening.
                    </p>
                    <a href="#" className="features-button-gradient relative inline-flex items-center gap-1.5 rounded-full py-3 px-6 text-white text-sm ease-in duration-300 hover:shadow-button">
                      Try it in your next call →
                    </a>
                  </div>

                  <div className="hidden sm:flex flex-1 items-center justify-end">
                    <div className="relative w-[420px] h-[420px] p-4 mt-4 sm:mt-6">
                      <img
                        src="/images/features/big-icon.svg"
                        alt="AI sales assistant icon"
                        className="w-full h-full object-contain opacity-70"
                      />
                    </div>
                  </div>
                </div>

                {/* bg shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 -mx-28">
                  <span className="absolute bottom-0 right-0">
                    <img src="/images/features/shape-01.png" alt="shape" />
                  </span>
                  <span className="absolute top-0 left-0">
                    <img src="/images/features/shape-02.svg" alt="shape" />
                  </span>
                  <span className="absolute bottom-0 -translate-x-1/2 left-1/2">
                    <img src="/images/blur/blur-03.svg" alt="blur-sm" className="max-w-none" />
                  </span>
                  <span className="absolute bottom-0 -translate-x-1/2 left-1/2">
                    <img src="/images/blur/blur-04.svg" alt="blur-sm" className="max-w-none" />
                  </span>
                  <span className="absolute bottom-0 -translate-x-1/2 left-1/2">
                    <img src="/images/blur/blur-05.svg" alt="blur-sm" className="max-w-none" />
                  </span>
                  <span className="absolute top-0 right-0">
                    <img src="/images/features/shape-03.svg" alt="shape" className="max-w-none" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Medium Feature */}
          <div className="sm:col-span-7">
            <div className="relative rounded-3xl features-box-border h-full">
              <div className="relative overflow-hidden rounded-3xl px-11 pt-12 pb-10 box-hover box-hover-small h-full flex flex-col">
                <div className="relative z-20 flex-1 flex flex-col">
                  <span className="icon-border relative max-w-[80px] w-full h-20 rounded-full inline-flex items-center justify-center mb-10 text-4xl bg-dark">
                    🔒
                  </span>

                  <h3 className="text-white mb-4.5 font-semibold text-heading-6">
                    Enterprise-Grade Privacy
                  </h3>
                  <p className="font-medium">
                    Your data is yours. We are fully GDPR & CCPA compliant. We never sell your conversations; we only use them to make your personal AI smarter.
                  </p>
                </div>

                {/* bg shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                  <span className="absolute bottom-0 left-0">
                    <img src="/images/blur/blur-06.svg" alt="blur-sm" className="max-w-none" />
                  </span>
                  <span className="absolute top-0 right-0">
                    <img src="/images/blur/blur-07.svg" alt="blur-sm" className="max-w-none" />
                  </span>
                  <span className="absolute right-[16%] top-[16%]">
                    <img src="/images/features/shape-04.svg" alt="shape" />
                  </span>
                  <span className="absolute bottom-0 left-0">
                    <img src="/images/blur/blur-08.svg" alt="blur-sm" className="max-w-none" />
                  </span>
                  <span className="absolute bottom-0 left-0">
                    <img src="/images/blur/blur-09.svg" alt="blur-sm" className="max-w-none" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Small Feature */}
          <div className="sm:col-span-5">
            <div className="relative rounded-3xl features-box-border h-full">
              <div className="relative overflow-hidden rounded-3xl px-11 pt-12 pb-10 box-hover box-hover-small h-full flex flex-col">
                <div className="relative z-20 flex-1 flex flex-col">
                  <span className="icon-border relative max-w-[80px] w-full h-20 rounded-full inline-flex items-center justify-center mb-10 text-4xl bg-dark">
                    ⚡
                  </span>

                  <h3 className="text-white mb-4.5 font-semibold text-heading-6">
                    Works Where You Work
                  </h3>
                  <p className="font-medium">
                    Zero integration headaches. Launch it instantly on Google Meet, Zoom, and Microsoft Teams with just 2 clicks.
                  </p>
                </div>

                {/* bg shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                  <span className="absolute right-[14%] top-[17%]">
                    <img src="/images/features/shape-05.svg" alt="shape" />
                  </span>
                  <span className="absolute bottom-0 left-0">
                    <img src="/images/blur/blur-10.svg" alt="blur-sm" className="max-w-none" />
                  </span>
                  <span className="absolute top-0 right-0">
                    <img src="/images/blur/blur-11.svg" alt="blur-sm" className="max-w-none" />
                  </span>
                  <span className="absolute top-0 right-0">
                    <img src="/images/blur/blur-12.svg" alt="blur-sm" className="max-w-none" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesList;
