import React from 'react';

const VideoDemo = () => {
  return (
    <section className="overflow-hidden py-17.5 lg:py-22.5 xl:py-27.5">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="relative w-full max-w-[900px] mx-auto">
          {/* Mockup Frame - base layer */}
          <div className="relative z-0">
            <img 
              src="/images/video/mockup-frame.png" 
              alt="Browser mockup frame" 
              className="w-full h-auto"
            />
          </div>
          
          {/* GIF/Video content - positioned on top inside the frame */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pt-[8%] px-[3%]">
            <img 
              src="/images/video/gif.gif" 
              alt="Demo animation" 
              className="w-[94%] h-auto rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoDemo;
