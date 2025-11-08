import React, { useRef, forwardRef } from 'react';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import { StaticBeam } from '@/components/ui/static-beam';
import { Mic, Brain, MessageSquare, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-slate-900/80 backdrop-blur-sm p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

const FeaturesGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const node1Ref = useRef<HTMLDivElement>(null);
  const node2Ref = useRef<HTMLDivElement>(null);
  const node3Ref = useRef<HTMLDivElement>(null);
  const node4Ref = useRef<HTMLDivElement>(null);
  const node5Ref = useRef<HTMLDivElement>(null);
  const node6Ref = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);

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
        <div className="relative w-full max-w-[1000px] mx-auto min-h-[500px] flex items-center justify-center" ref={containerRef}>
          <div className="relative w-full h-[500px]">
            {/* Static Beams - Path curve statiche sotto i raggi (z-1) */}
            <StaticBeam
              containerRef={containerRef}
              fromRef={node1Ref}
              toRef={aiRef}
              className="z-[1]"
            />
            <StaticBeam
              containerRef={containerRef}
              fromRef={node2Ref}
              toRef={aiRef}
              className="z-[1]"
            />
            <StaticBeam
              containerRef={containerRef}
              fromRef={node3Ref}
              toRef={aiRef}
              className="z-[1]"
              endXOffset={-40}
            />
            <StaticBeam
              containerRef={containerRef}
              fromRef={node4Ref}
              toRef={aiRef}
              className="z-[1]"
              endXOffset={40}
            />
            <StaticBeam
              containerRef={containerRef}
              fromRef={node5Ref}
              toRef={aiRef}
              className="z-[1]"
            />
            <StaticBeam
              containerRef={containerRef}
              fromRef={node6Ref}
              toRef={aiRef}
              className="z-[1]"
            />

            {/* Center - AI Brain (z-20 per stare sopra tutto) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-20">
              <Circle ref={aiRef} className="size-20 border-primary/50">
                <img src="/images/features/ai-brain.svg" alt="AI Brain" className="size-16" />
              </Circle>
            </div>

            {/* Top Left - Audio Input */}
            <div className="absolute left-[10%] top-[10%] flex flex-col items-center gap-2">
              <Circle ref={node1Ref} className="size-16 border-slate-700">
                <img src="/images/features/node-audio.svg" alt="Audio Input" className="size-10" />
              </Circle>
              <p className="text-xs font-medium text-white/80">Audio Input</p>
            </div>

            {/* Top Right - Suggestions */}
            <div className="absolute right-[10%] top-[10%] flex flex-col items-center gap-2">
              <Circle ref={node2Ref} className="size-16 border-slate-700">
                <img src="/images/features/node-suggestions.svg" alt="Suggestions" className="size-10" />
              </Circle>
              <p className="text-xs font-medium text-white/80">Suggestions</p>
            </div>

            {/* Middle Left - Tone Analysis */}
            <div className="absolute left-[5%] top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
              <Circle ref={node3Ref} className="size-16 border-slate-700">
                <img src="/images/features/node-tone.svg" alt="Tone Analysis" className="size-10" />
              </Circle>
              <p className="text-xs font-medium text-white/80">Tone Analysis</p>
            </div>

            {/* Middle Right - Win Rate */}
            <div className="absolute right-[5%] top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
              <Circle ref={node4Ref} className="size-16 border-slate-700">
                <img src="/images/features/node-tracking.svg" alt="Win Rate" className="size-10" />
              </Circle>
              <p className="text-xs font-medium text-white/80">Win Rate</p>
            </div>

            {/* Bottom Left - Real-time */}
            <div className="absolute left-[10%] bottom-[10%] flex flex-col items-center gap-2">
              <Circle ref={node5Ref} className="size-16 border-slate-700">
                <img src="/images/features/node-insights.svg" alt="Real-time" className="size-10" />
              </Circle>
              <p className="text-xs font-medium text-white/80">Real-time</p>
            </div>

            {/* Bottom Right - AI Analysis */}
            <div className="absolute right-[10%] bottom-[10%] flex flex-col items-center gap-2">
              <Circle ref={node6Ref} className="size-16 border-slate-700">
                <img src="/images/features/node-analysis.svg" alt="AI Analysis" className="size-10" />
              </Circle>
              <p className="text-xs font-medium text-white/80">AI Analysis</p>
            </div>

            {/* Animated Beams - lampi animati sopra le linee fisse (z-5) */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={node1Ref}
              toRef={aiRef}
              className="z-[5]"
              pathColor="transparent"
              pathWidth={2}
              gradientStartColor="#3b82f6"
              gradientStopColor="#8b5cf6"
              duration={3}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={node2Ref}
              toRef={aiRef}
              className="z-[5]"
              pathColor="transparent"
              pathWidth={2}
              gradientStartColor="#3b82f6"
              gradientStopColor="#8b5cf6"
              duration={3}
              delay={0.5}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={node3Ref}
              toRef={aiRef}
              className="z-[5]"
              pathColor="transparent"
              pathWidth={2}
              gradientStartColor="#8b5cf6"
              gradientStopColor="#ec4899"
              duration={3}
              delay={1}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={node4Ref}
              toRef={aiRef}
              className="z-[5]"
              pathColor="transparent"
              pathWidth={2}
              gradientStartColor="#f97316"
              gradientStopColor="#eab308"
              duration={3}
              delay={1.5}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={node5Ref}
              toRef={aiRef}
              className="z-[5]"
              pathColor="transparent"
              pathWidth={2}
              gradientStartColor="#10b981"
              gradientStopColor="#06b6d4"
              duration={3}
              delay={2}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={node6Ref}
              toRef={aiRef}
              className="z-[5]"
              pathColor="transparent"
              pathWidth={2}
              gradientStartColor="#ec4899"
              gradientStopColor="#f43f5e"
              duration={3}
              delay={2.5}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturesGrid;
