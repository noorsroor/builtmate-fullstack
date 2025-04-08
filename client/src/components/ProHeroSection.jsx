import React from 'react';

const ProHeroSection = () => {
  return (
    <div className='w-full flex justify-center'>
      <div className="relative mt-5 w-350 h-100 flex overflow-hidden rounded-[30px]">
        {/* Background Video */}
        <video 
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
        >
          <source src="https://videos.pexels.com/video-files/8471078/8471078-hd_1920_1080_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Light overlay for entire video */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/10 z-10"></div>
        
        {/* Bottom gradient overlay - black to transparent */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>

        {/* Content Container - Positioned at bottom */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 lg:p-12 z-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
           {/* Main Heading */}
            <div>
            <h1 className="text-4xl md:text-5xl lg:text-5xl  font-light text-white leading-tight">
                Connecting You with <br />
                Trusted Construction Experts
            </h1>
            </div>

            <div className="mt-6 lg:mt-0 lg:ml-4 flex flex-col items-start lg:items-end">
            {/* Small Description - Right-aligned on larger screens */}
            <p className="text-sm md:text-base text-white/90 max-w-xs mb-4 lg:text-left">
                Need a skilled professional for your next project? Browse and hire top-rated 
                engineers, carpenters, and more – all in one place.
            </p>

            {/* CTA Button */}
            <button className="bg-white cursor-pointer hover:bg-gray-100 text-gray-800 font-normal text-sm py-2 px-6 rounded-md transition duration-300 whitespace-nowrap mr-30">
                Browse a Professional
            </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProHeroSection;