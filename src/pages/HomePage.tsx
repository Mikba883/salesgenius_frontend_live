import React from 'react';
import Layout from '@/components/layout/Layout';
import KeyFeatures from '@/components/home/KeyFeatures';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import FeaturesList from '@/components/home/FeaturesList';
import Testimonials from '@/components/home/Testimonials';
import Clients from '@/components/home/Clients';
import Blog from '@/components/home/Blog';
import CTA from '@/components/home/CTA';
import VisualEffect from '@/components/home/VisualEffect';
import PricingVisualEffect from '@/components/home/PricingVisualEffect';

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section id="home" className="relative z-10 overflow-hidden pt-24 md:pt-40 xl:pt-45">
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
            <a href="/#" className="hero-subtitle-gradient hover:hero-subtitle-hover relative mb-5 font-medium text-sm inline-flex items-center gap-2 py-2 px-8 rounded-full">
              <img src="/images/hero/icon-title.svg" alt="icon" />
              <span className="hero-subtitle-text">The #1 AI Sales Assistant</span>
            </a>
            <h1 className="mb-6 text-3xl font-extrabold text-white sm:text-5xl xl:text-heading-1">
              Get the AI-Powered Line to Win the Call
            </h1>
            <p className="max-w-[600px] mx-auto mb-9 font-medium md:text-lg">
              SalesGenius listens, analyzes tone and intent, and whispers your next best line — live, during the negotiation.
            </p>
            <a href="/signup" className="inline-flex py-3 font-medium text-white duration-300 ease-in rounded-lg hero-button-gradient px-12 min-w-[280px] justify-center hover:opacity-80">
              🚀 Try It in Your Next Call
            </a>
          </div>
        </div>

        <div className="mt-32 sm:mt-40 relative mx-auto max-w-[1170px]">
          {/* GIF con dimensioni corrette */}
          <div className="flex items-center justify-center">
            <img 
              src="/images/video/gif.gif" 
              alt="SalesGenius in action" 
              className="w-full max-w-[900px] h-auto rounded-xl shadow-2xl border-2 border-white/20"
            />
          </div>
          
          {/* Effetti blur/glow sotto la GIF */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 -z-10 pointer-events-none">
            <img src="/images/blur/blur-22.svg" alt="blur" className="max-w-none opacity-25" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-0 -z-10 pointer-events-none">
            <img src="/images/blur/blur-23.svg" alt="blur" className="max-w-none opacity-22" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-20 -z-10 pointer-events-none">
            <img src="/images/blur/blur-24.svg" alt="blur" className="max-w-none opacity-20" />
          </div>
        </div>
      </section>

      {/* All Other Sections */}
      <KeyFeatures />
      <FeaturesGrid />
      <FeaturesList />
      <VisualEffect />
      <Testimonials />
      <Clients />
      <Blog />
      <PricingVisualEffect />
      <CTA />
    </Layout>
  );
};

export default HomePage;
