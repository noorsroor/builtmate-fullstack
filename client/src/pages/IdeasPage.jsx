import React from 'react'
import img1 from "../assets/images/hero.png";
import IdeaCategorySlider from '../components/IdeaCategorySlider';
import IdeasList from '../components/IdeasList';
import  {useState} from 'react';

function IdeasPage() {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
    <div className="max-w-[1400px] md:mt-14 mx-auto px-4 py-6">
      <div className="relative">
        {/* Main section with rounded corners and gradient */}
        <div className="relative bg-gradient-to-r from-yellow-700 to-yellow-500 rounded-3xl flex flex-col md:flex-row">
          {/* Text Content - now takes full width on mobile */}
          <div className="p-6 sm:p-8 md:p-12 lg:p-16 md:w-1/2 text-white z-10">
            <p className="text-sm text-black-200 mb-2 sm:mb-4">Crafting Tomorrow's Living Spaces:</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight mb-2">
              Set New Standards<br /> 
              in <span className="italic font-light">Modern Home</span><br />
              Construction
            </h1>
          </div>
          
          {/* Image container - hidden on mobile, appears on md and up */}
          <div className="hidden md:block md:w-1/2 relative">
            {/* Empty space to maintain section height */}
            <div className="h-full"></div>
          </div>
        </div>
        
        {/* Absolutely positioned image that extends beyond container - shown on md and up */}
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-105 md:-top-17">
          <img 
            src={img1}
            alt="Modern building architecture" 
            className="hidden md:block object-cover w-full h-full"
          />
        </div>
  
      </div>
    </div>

    <IdeaCategorySlider onCategoryChange={setSelectedCategory}/>
    <IdeasList category={selectedCategory}/>
    </>
  );
}

export default IdeasPage