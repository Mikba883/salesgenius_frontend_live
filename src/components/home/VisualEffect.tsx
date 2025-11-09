import React from 'react';

const VisualEffect = () => {
  return (
    <section className="relative py-32 lg:py-40 xl:py-48 overflow-hidden min-h-[900px] lg:min-h-[1000px] flex items-center">
      {/* Background stars */}
      <div className="absolute inset-0 -z-10">
        <div className="max-w-[600px] w-full h-60 overflow-hidden absolute top-20 left-1/2 -translate-x-1/2">
          <div className="stars"></div>
          <div className="stars2"></div>
        </div>
      </div>

      {/* Blur effects - concentrated in center */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Center concentrated light - MAXIMUM BRIGHTNESS */}
        {/* Multiple layers for extreme intensity */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-15.svg" alt="blur" className="max-w-none scale-[1] opacity-100" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-15.svg" alt="blur" className="max-w-none scale-[1.2] opacity-100" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-14.svg" alt="blur" className="max-w-none scale-[1.5] opacity-100" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-14.svg" alt="blur" className="max-w-none scale-[1.8] opacity-100" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <div className="relative">
            <img src="/images/blur/blur-13.svg" alt="blur" className="max-w-none scale-[2] opacity-100" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-13.svg" alt="blur" className="max-w-none scale-[2.2] opacity-100" />
        </div>
        {/* Extra glow layers for powerful effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-14.svg" alt="blur" className="max-w-none scale-[2.5] opacity-95" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <img src="/images/blur/blur-13.svg" alt="blur" className="max-w-none scale-[3] opacity-90" />
        </div>
        {/* Radial fade overlay - molto più debole per lasciare passare la luce */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent via-[#030014]/10 to-[#030014]/80"></div>
      </div>

      {/* Giant planet circle - positioned at bottom */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-[1400px] h-[1400px] rounded-full bg-dark pricing-circle"></div>
      
      {/* Sunrise effect - VERY rapid fade from bright center to dark */}
      <div className="absolute inset-x-0 bottom-0 h-[1000px] bg-gradient-to-b from-transparent from-0% via-transparent via-20% via-[#030014]/70 via-30% via-[#030014]/95 via-40% to-[#030014] to-45% pointer-events-none"></div>

      {/* Content on top of planet */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0 relative z-10 w-full">
        <div className="flex flex-col items-center gap-12 text-center">
          {/* Title */}
          <h2 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-[1000px]">
            Why SalesGenius Beats Generic AI
          </h2>
          
          {/* Comparison Table */}
          <div className="w-full max-w-[1100px] mt-8">
            {/* Desktop Table View */}
            <div className="hidden lg:block">
              <div className="rounded-2xl border border-white/10 bg-dark/40 backdrop-blur-sm overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-3 gap-px bg-white/5">
                  <div className="bg-dark/60 px-6 py-5">
                    <h3 className="text-white/60 font-semibold text-sm uppercase tracking-wider">Feature</h3>
                  </div>
                  <div className="bg-gradient-to-br from-purple/20 to-pink/20 px-6 py-5 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple/10 to-pink/10 opacity-50"></div>
                    <h3 className="relative bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent font-bold text-base uppercase tracking-wider">SalesGenius</h3>
                  </div>
                  <div className="bg-dark/60 px-6 py-5">
                    <h3 className="text-white/60 font-semibold text-sm uppercase tracking-wider">Generic AI Tools</h3>
                  </div>
                </div>
                
                {/* Table Rows */}
                <div className="divide-y divide-white/5">
                  {/* Row 1 */}
                  <div className="grid grid-cols-3 gap-px bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="bg-dark/40 px-6 py-5">
                      <p className="text-white font-semibold">Built for Sales Calls</p>
                    </div>
                    <div className="bg-dark/40 px-6 py-5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple/5 to-pink/5"></div>
                      <p className="relative text-white/90 leading-relaxed">Speaks the language of persuasion — trained on real negotiations and deal-closing moments.</p>
                    </div>
                    <div className="bg-dark/40 px-6 py-5">
                      <p className="text-white/50 leading-relaxed">Generic assistant, not optimized for sales.</p>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-3 gap-px bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="bg-dark/40 px-6 py-5">
                      <p className="text-white font-semibold">Live Coaching While You Speak</p>
                    </div>
                    <div className="bg-dark/40 px-6 py-5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple/5 to-pink/5"></div>
                      <p className="relative text-white/90 leading-relaxed">Listens to your pitch and gives instant cues to say the right line at the right time.</p>
                    </div>
                    <div className="bg-dark/40 px-6 py-5">
                      <p className="text-white/50 leading-relaxed">You must type to get help — too slow for real calls.</p>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-3 gap-px bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="bg-dark/40 px-6 py-5">
                      <p className="text-white font-semibold">Understands the Whole Conversation</p>
                    </div>
                    <div className="bg-dark/40 px-6 py-5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple/5 to-pink/5"></div>
                      <p className="relative text-white/90 leading-relaxed">Gets the full context — tone, client intent, and negotiation phase. Knows what's happening and what's next.</p>
                    </div>
                    <div className="bg-dark/40 px-6 py-5">
                      <p className="text-white/50 leading-relaxed">Reacts only to isolated prompts, missing the flow of the meeting.</p>
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="grid grid-cols-3 gap-px bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="bg-dark/40 px-6 py-5">
                      <p className="text-white font-semibold">Privacy First</p>
                    </div>
                    <div className="bg-dark/40 px-6 py-5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple/5 to-pink/5"></div>
                      <p className="relative text-white/90 leading-relaxed">Audio stays on your device — nothing sent to the cloud, nothing recorded.</p>
                    </div>
                    <div className="bg-dark/40 px-6 py-5">
                      <p className="text-white/50 leading-relaxed">Often processed externally with unclear data use.</p>
                    </div>
                  </div>

                  {/* Row 5 */}
                  <div className="grid grid-cols-3 gap-px bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="bg-dark/40 px-6 py-5">
                      <p className="text-white font-semibold">Works Seamlessly Anywhere</p>
                    </div>
                    <div className="bg-dark/40 px-6 py-5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple/5 to-pink/5"></div>
                      <p className="relative text-white/90 leading-relaxed">Integrates instantly with Zoom, Meet, or Teams — no setup needed.</p>
                    </div>
                    <div className="bg-dark/40 px-6 py-5">
                      <p className="text-white/50 leading-relaxed">Generic AI can't join your calls.</p>
                    </div>
                  </div>

                  {/* Row 6 */}
                  <div className="grid grid-cols-3 gap-px bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="bg-dark/40 px-6 py-5">
                      <p className="text-white font-semibold">Built by Sales Pros</p>
                    </div>
                    <div className="bg-dark/40 px-6 py-5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple/5 to-pink/5"></div>
                      <p className="relative text-white/90 leading-relaxed">Created with top sales coaches and AI engineers for real-world performance.</p>
                    </div>
                    <div className="bg-dark/40 px-6 py-5">
                      <p className="text-white/50 leading-relaxed">Designed for everyone, fine for no one.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-6">
              {/* Feature 1 */}
              <div className="rounded-xl border border-white/10 bg-dark/40 backdrop-blur-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-white/10">
                  <h3 className="text-white font-bold text-lg">Built for Sales Calls</h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="rounded-lg bg-gradient-to-br from-purple/10 to-pink/10 p-4 border border-purple/20">
                    <p className="text-xs text-purple font-semibold mb-2 uppercase tracking-wider">SalesGenius</p>
                    <p className="text-white/90 text-sm leading-relaxed">Speaks the language of persuasion — trained on real negotiations and deal-closing moments.</p>
                  </div>
                  <div className="rounded-lg bg-dark/60 p-4 border border-white/5">
                    <p className="text-xs text-white/40 font-semibold mb-2 uppercase tracking-wider">Generic AI</p>
                    <p className="text-white/50 text-sm leading-relaxed">Generic assistant, not optimized for sales.</p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="rounded-xl border border-white/10 bg-dark/40 backdrop-blur-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-white/10">
                  <h3 className="text-white font-bold text-lg">Live Coaching While You Speak</h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="rounded-lg bg-gradient-to-br from-purple/10 to-pink/10 p-4 border border-purple/20">
                    <p className="text-xs text-purple font-semibold mb-2 uppercase tracking-wider">SalesGenius</p>
                    <p className="text-white/90 text-sm leading-relaxed">Listens to your pitch and gives instant cues to say the right line at the right time.</p>
                  </div>
                  <div className="rounded-lg bg-dark/60 p-4 border border-white/5">
                    <p className="text-xs text-white/40 font-semibold mb-2 uppercase tracking-wider">Generic AI</p>
                    <p className="text-white/50 text-sm leading-relaxed">You must type to get help — too slow for real calls.</p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="rounded-xl border border-white/10 bg-dark/40 backdrop-blur-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-white/10">
                  <h3 className="text-white font-bold text-lg">Understands the Whole Conversation</h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="rounded-lg bg-gradient-to-br from-purple/10 to-pink/10 p-4 border border-purple/20">
                    <p className="text-xs text-purple font-semibold mb-2 uppercase tracking-wider">SalesGenius</p>
                    <p className="text-white/90 text-sm leading-relaxed">Gets the full context — tone, client intent, and negotiation phase. Knows what's happening and what's next.</p>
                  </div>
                  <div className="rounded-lg bg-dark/60 p-4 border border-white/5">
                    <p className="text-xs text-white/40 font-semibold mb-2 uppercase tracking-wider">Generic AI</p>
                    <p className="text-white/50 text-sm leading-relaxed">Reacts only to isolated prompts, missing the flow of the meeting.</p>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="rounded-xl border border-white/10 bg-dark/40 backdrop-blur-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-white/10">
                  <h3 className="text-white font-bold text-lg">Privacy First</h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="rounded-lg bg-gradient-to-br from-purple/10 to-pink/10 p-4 border border-purple/20">
                    <p className="text-xs text-purple font-semibold mb-2 uppercase tracking-wider">SalesGenius</p>
                    <p className="text-white/90 text-sm leading-relaxed">Audio stays on your device — nothing sent to the cloud, nothing recorded.</p>
                  </div>
                  <div className="rounded-lg bg-dark/60 p-4 border border-white/5">
                    <p className="text-xs text-white/40 font-semibold mb-2 uppercase tracking-wider">Generic AI</p>
                    <p className="text-white/50 text-sm leading-relaxed">Often processed externally with unclear data use.</p>
                  </div>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="rounded-xl border border-white/10 bg-dark/40 backdrop-blur-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-white/10">
                  <h3 className="text-white font-bold text-lg">Works Seamlessly Anywhere</h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="rounded-lg bg-gradient-to-br from-purple/10 to-pink/10 p-4 border border-purple/20">
                    <p className="text-xs text-purple font-semibold mb-2 uppercase tracking-wider">SalesGenius</p>
                    <p className="text-white/90 text-sm leading-relaxed">Integrates instantly with Zoom, Meet, or Teams — no setup needed.</p>
                  </div>
                  <div className="rounded-lg bg-dark/60 p-4 border border-white/5">
                    <p className="text-xs text-white/40 font-semibold mb-2 uppercase tracking-wider">Generic AI</p>
                    <p className="text-white/50 text-sm leading-relaxed">Generic AI can't join your calls.</p>
                  </div>
                </div>
              </div>

              {/* Feature 6 */}
              <div className="rounded-xl border border-white/10 bg-dark/40 backdrop-blur-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-white/10">
                  <h3 className="text-white font-bold text-lg">Built by Sales Pros</h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="rounded-lg bg-gradient-to-br from-purple/10 to-pink/10 p-4 border border-purple/20">
                    <p className="text-xs text-purple font-semibold mb-2 uppercase tracking-wider">SalesGenius</p>
                    <p className="text-white/90 text-sm leading-relaxed">Created with top sales coaches and AI engineers for real-world performance.</p>
                  </div>
                  <div className="rounded-lg bg-dark/60 p-4 border border-white/5">
                    <p className="text-xs text-white/40 font-semibold mb-2 uppercase tracking-wider">Generic AI</p>
                    <p className="text-white/50 text-sm leading-relaxed">Designed for everyone, fine for no one.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualEffect;
