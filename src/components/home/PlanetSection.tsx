import React from 'react';

const PlanetSection = () => {
  return (
    <section className="relative overflow-hidden min-h-[800px] flex items-center">
      {/* Background stars */}
      <div className="absolute inset-0 -z-10">
        <div className="max-w-[600px] w-full h-60 overflow-hidden absolute top-20 left-1/2 -translate-x-1/2">
          <div className="stars"></div>
          <div className="stars2"></div>
        </div>
      </div>

      {/* Blur effects - Layer 1 (base) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none">
        <img src="/images/blur/blur-13.svg" alt="blur" className="max-w-none opacity-90" style={{ transform: 'scale(1)' }} />
      </div>
      
      {/* Blur effects - Layer 2 */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none">
        <img src="/images/blur/blur-14.svg" alt="blur" className="max-w-none opacity-95" style={{ transform: 'scale(1.2)' }} />
      </div>
      
      {/* Blur effects - Layer 3 */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none">
        <img src="/images/blur/blur-15.svg" alt="blur" className="max-w-none opacity-100" style={{ transform: 'scale(1.5)' }} />
      </div>
      
      {/* Blur effects - Layer 4 */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none">
        <img src="/images/blur/blur-13.svg" alt="blur" className="max-w-none opacity-95" style={{ transform: 'scale(1.8)' }} />
      </div>
      
      {/* Blur effects - Layer 5 */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none">
        <img src="/images/blur/blur-14.svg" alt="blur" className="max-w-none opacity-100" style={{ transform: 'scale(2)' }} />
      </div>
      
      {/* Blur effects - Layer 6 */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none">
        <img src="/images/blur/blur-15.svg" alt="blur" className="max-w-none opacity-100" style={{ transform: 'scale(2.2)' }} />
      </div>
      
      {/* Blur effects - Layer 7 */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none">
        <img src="/images/blur/blur-13.svg" alt="blur" className="max-w-none opacity-100" style={{ transform: 'scale(2.5)' }} />
      </div>
      
      {/* Blur effects - Layer 8 (most intense) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none">
        <img src="/images/blur/blur-14.svg" alt="blur" className="max-w-none opacity-100" style={{ transform: 'scale(3)' }} />
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_20%,#030014_80%)] pointer-events-none"></div>

      {/* Giant planet circle */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[1400px] h-[1400px] rounded-full bg-dark pricing-circle"></div>

      {/* Sunrise gradient */}
      <div className="absolute inset-x-0 bottom-0 h-[600px] bg-gradient-to-b from-transparent from-0% via-transparent via-20% via-[#030014]/70 via-30% via-[#030014]/95 via-40% to-[#030014] to-45% pointer-events-none"></div>
    </section>
  );
};

export default PlanetSection;
