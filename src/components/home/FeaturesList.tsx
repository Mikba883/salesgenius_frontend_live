const FeaturesList = () => {
  return (
    <section className="pt-12.5">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="grid sm:grid-cols-12 gap-7.5">
          {/* Large Feature */}
          <div className="sm:col-span-12">
            <div className="relative rounded-3xl features-box-border">
              <div className="relative p-10 overflow-hidden rounded-3xl xl:p-15 box-hover">
                <div className="relative z-20 flex items-center justify-between">
                  <div className="max-w-[477px] w-full">
                    <span className="hero-subtitle-gradient relative mb-4 font-medium text-sm inline-flex items-center gap-2 py-2 px-4.5 rounded-full">
                      <img src="/images/hero/icon-title.svg" alt="icon" />
                      <span className="hero-subtitle-text">AI-Powered Writing Tool</span>
                    </span>
                    <h3 className="text-white mb-4.5 font-bold text-heading-4">
                      Intelligent Writing Assistance
                    </h3>
                    <p className="mb-10 font-medium">
                      Our AI writing tool is designed to empower you with exceptional writing capabilities, 
                      making the writing process...
                    </p>
                    <a href="#" className="features-button-gradient relative inline-flex items-center gap-1.5 rounded-full py-3 px-6 text-white text-sm ease-in duration-300 hover:shadow-button">
                      Learn more
                      <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3992 5.60002L8.22422 0.350024C7.99922 0.125024 7.64922 0.125024 7.42422 0.350024C7.19922 0.575024 7.19922 0.925025 7.42422 1.15002L11.6242 5.42503H0.999219C0.699219 5.42503 0.449219 5.67502 0.449219 5.97502C0.449219 6.27502 0.699219 6.55003 0.999219 6.55003H11.6742L7.42422 10.875C7.19922 11.1 7.19922 11.45 7.42422 11.675C7.52422 11.775 7.67422 11.825 7.82422 11.825C7.97422 11.825 8.12422 11.775 8.22422 11.65L13.3992 6.40002C13.6242 6.17502 13.6242 5.82502 13.3992 5.60002Z" fill="white"/>
                      </svg>
                    </a>
                  </div>

                  <div className="max-w-[428px] w-full hidden sm:block">
                    <img src="/images/features/big-icon.svg" alt="icon" />
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
            <div className="relative rounded-3xl features-box-border">
              <div className="relative overflow-hidden rounded-3xl px-11 pt-12.5 pb-14 box-hover box-hover-small">
                <div className="relative z-20">
                  <span className="icon-border relative max-w-[80px] w-full h-20 rounded-full inline-flex items-center justify-center mb-13.5 mx-auto">
                    <img src="/images/features/icon-05.svg" alt="icon" />
                  </span>

                  <h3 className="text-white mb-4.5 font-semibold text-heading-6">
                    Empowering Writing Excellence
                  </h3>
                  <p className="font-medium">
                    Our AI writing tool is designed to empower you with exceptional writing capabilities, 
                    making the writing process...
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
            <div className="relative rounded-3xl features-box-border">
              <div className="relative overflow-hidden rounded-3xl px-11 pt-12.5 pb-14 box-hover box-hover-small">
                <div className="relative z-20">
                  <span className="icon-border relative max-w-[80px] w-full h-20 rounded-full inline-flex items-center justify-center mb-13.5 mx-auto">
                    <img src="/images/features/icon-07.svg" alt="icon" />
                  </span>

                  <h3 className="text-white mb-4.5 font-semibold text-heading-6">
                    Grammar and Spell Check
                  </h3>
                  <p className="font-medium">
                    Our AI writing tool is designed to empower you with exceptional writing capabilities.
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
