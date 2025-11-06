import Layout from '@/components/layout/Layout';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import FeaturesList from '@/components/home/FeaturesList';
import Pricing from '@/components/home/Pricing';
import Testimonials from '@/components/home/Testimonials';
import Clients from '@/components/home/Clients';
import Contact from '@/components/home/Contact';
import Blog from '@/components/home/Blog';
import CTA from '@/components/home/CTA';

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section id="home" className="relative z-10 overflow-hidden pt-35 md:pt-40 xl:pt-45">
        {/* Hero Bg Shapes */}
        <div className="mx-auto max-w-7xl">
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 -mx-28">
            <div className="absolute -z-1 -top-[128%] sm:-top-[107%] xl:-top-[73%] left-1/2 -translate-x-1/2 -u-z-10 hero-circle-gradient w-full h-[1282px] rounded-full max-w-[1282px]"></div>
            <div className="absolute -z-1 -top-[112%] sm:-top-[93%] xl:-top-[62%] left-1/2 -translate-x-1/2 -u-z-10 hero-circle-gradient w-full h-[1046px] rounded-full max-w-[1046px]"></div>
            <div className="absolute top-0 -translate-x-1/2 left-1/2 -u-z-10">
              <img src="/images/blur/blur-02.svg" alt="blur" className="max-w-none" />
            </div>
            <div className="absolute top-0 -translate-x-1/2 left-1/2 -u-z-10">
              <img src="/images/blur/blur-01.svg" alt="blur" className="max-w-none" />
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0 relative z-1">
          <div className="text-center">
            <a href="/#" className="hero-subtitle-gradient hover:hero-subtitle-hover relative mb-5 font-medium text-sm inline-flex items-center gap-2 py-2 px-4.5 rounded-full">
              <img src="/images/hero/icon-title.svg" alt="icon" />
              <span className="hero-subtitle-text">Your Ultimate Creative Companion!</span>
            </a>
            <h1 className="mb-6 text-3xl font-extrabold text-white sm:text-5xl xl:text-heading-1">
              Elevate Your Content with Our AI-Powered Writing Tool
            </h1>
            <p className="max-w-[500px] mx-auto mb-9 font-medium md:text-lg">
              Highly customizable Tailwind CSS template for AI - Tool, Startup, Software, App and Product Sites.
            </p>
            <a href="#" className="inline-flex py-3 font-medium text-white duration-300 ease-in rounded-lg hero-button-gradient px-7 hover:opacity-80">
              Start Your Free Trial
            </a>
          </div>
        </div>

        <div className="mt-17">
          <img className="mx-auto" src="/images/hero/hero.svg" alt="hero" />
        </div>
      </section>

      {/* All Other Sections */}
      <FeaturesGrid />
      <FeaturesList />
      <Pricing />
      <Testimonials />
      <Clients />
      <Contact />
      <Blog />
      <CTA />
    </Layout>
  );
};

export default HomePage;
