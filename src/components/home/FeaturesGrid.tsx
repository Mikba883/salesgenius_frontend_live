import React, { useRef } from 'react';
import { AnimatedBeam, Circle } from '@/components/ui/animated-beam';
import { Mic, Brain, MessageSquare, TrendingUp } from 'lucide-react';

const FeaturesGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const micRef = useRef<HTMLDivElement>(null);
  const toneRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

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
            <span className="hero-subtitle-text">How It Works</span>
          </span>
          <h2 className="text-white mb-4.5 text-2xl font-extrabold sm:text-4xl xl:text-heading-2">
            Key Features of Our Tool
          </h2>
          <p className="max-w-[714px] mx-auto mb-12 font-medium">
            SalesGenius analyzes your conversations in real-time, providing AI-powered suggestions to help you close more deals.
          </p>
        </div>

        {/* Animated Beam Diagram */}
        <div className="relative w-full max-w-[800px] mx-auto" ref={containerRef}>
          <div className="flex items-center justify-center gap-8 py-20 md:py-32">
            {/* Left Column - Inputs */}
            <div className="flex flex-col gap-12">
              <div className="flex flex-col items-center gap-3">
                <Circle ref={micRef} className="size-16 border-primary/20 bg-primary/10">
                  <Mic className="size-6 text-primary" />
                </Circle>
                <p className="text-sm font-medium text-white">Audio Input</p>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <Circle ref={toneRef} className="size-16 border-primary/20 bg-primary/10">
                  <TrendingUp className="size-6 text-primary" />
                </Circle>
                <p className="text-sm font-medium text-white">Tone Analysis</p>
              </div>
            </div>

            {/* Center - AI Brain */}
            <div className="flex flex-col items-center gap-3">
              <Circle ref={aiRef} className="size-24 border-primary bg-primary/20">
                <Brain className="size-10 text-primary" />
              </Circle>
              <p className="text-sm font-bold text-white">AI Engine</p>
            </div>

            {/* Right Column - Outputs */}
            <div className="flex flex-col gap-12">
              <div className="flex flex-col items-center gap-3">
                <Circle ref={outputRef} className="size-16 border-primary/20 bg-primary/10">
                  <MessageSquare className="size-6 text-primary" />
                </Circle>
                <p className="text-sm font-medium text-white">Suggestions</p>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <Circle ref={resultsRef} className="size-16 border-primary/20 bg-primary/10">
                  <TrendingUp className="size-6 text-primary" />
                </Circle>
                <p className="text-sm font-medium text-white">Win Rate</p>
              </div>
            </div>
          </div>

          {/* Animated Beams */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={micRef}
            toRef={aiRef}
            curvature={20}
            gradientStartColor="hsl(var(--primary))"
            gradientStopColor="hsl(var(--primary))"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={toneRef}
            toRef={aiRef}
            curvature={-20}
            gradientStartColor="hsl(var(--primary))"
            gradientStopColor="hsl(var(--primary))"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={aiRef}
            toRef={outputRef}
            curvature={20}
            reverse={true}
            gradientStartColor="hsl(var(--primary))"
            gradientStopColor="hsl(var(--primary))"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={aiRef}
            toRef={resultsRef}
            curvature={-20}
            reverse={true}
            gradientStartColor="hsl(var(--primary))"
            gradientStopColor="hsl(var(--primary))"
          />
        </div>

        {/* Feature Highlights Below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-[900px] mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mic className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-white font-semibold mb-2">Real-Time Listening</h3>
            <p className="text-sm opacity-80">Captures every word during your sales calls</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-white font-semibold mb-2">AI Analysis</h3>
            <p className="text-sm opacity-80">Analyzes tone, intent, and context instantly</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-white font-semibold mb-2">Smart Suggestions</h3>
            <p className="text-sm opacity-80">Whispers your next best line in real-time</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
