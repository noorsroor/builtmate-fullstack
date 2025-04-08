import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

const ProfessionalCategorySlider = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('Select All');
  const [startIndex, setStartIndex] = useState(0);
  const { t } = useTranslation();
  const categories = [
    { id:1, name: t("professionals.interior_designers"), image: "https://i.pinimg.com/736x/e7/02/7d/e7027defe58d7d363d8b260a6cf20e6c.jpg" },
    { id:2, name: t("professionals.general_contractors"), image: "https://i.pinimg.com/736x/d4/0d/a8/d40da859cac1fb563844ac8efc83a4b7.jpg" },
    { id:3, name: t("professionals.plumbing_services"), image: "https://i.pinimg.com/736x/c9/ca/23/c9ca23330fd66eef3cc6003d2d7a4af5.jpg" },
    { id:4, name: t("professionals.electrical"), image: "https://i.pinimg.com/736x/8d/f3/68/8df368bf2471b787f4ae68639016d9aa.jpg" },
    { id:5, name: t("professionals.architects_building"), image: "https://i.pinimg.com/736x/1d/89/23/1d8923047edf67493152e909bd4baed1.jpg" },
    { id:6, name: t("professionals.home_builders"), image: "https://i.pinimg.com/736x/b6/d8/28/b6d82870d22546dff034d28dd93c762a.jpg" },
    { id:7, name: t("professionals.pool_builders"), image: "https://i.pinimg.com/736x/06/a1/54/06a15408967fe2af8c18413fe232301f.jpg" },
    { id:8, name: t("professionals.painters"), image: "https://i.pinimg.com/736x/bc/d3/9a/bcd39a2ee9a9af16a764d4fec0c5b8f7.jpg" },
    { id:9, name: t("professionals.landscape_contractors"), image: "https://i.pinimg.com/736x/0c/4a/d7/0c4ad7807356102e08b2a5731d4355d0.jpg" },
    { id:10, name: t("professionals.door_dealers"), image: "https://i.pinimg.com/736x/15/10/d5/1510d5372d995b6c52d8ccee3676a3dd.jpg" }
  ];
  
  // Calculate visible categories based on screen size
  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 2; // SmSelect All screens
      if (window.innerWidth < 1024) return 3; // Medium screens
      return 5; // Large screens
    }
    return 5; // Default for SSR
  };
  
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const visibleCategories = categories.slice(startIndex, startIndex + visibleCount);
  
  // Update visible count on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };
  
  const handleNext = () => {
    if (startIndex < categories.length - visibleCount) {
      setStartIndex(startIndex + 1);
    }
  };
  
  const handleCategorySelect = (categoryName) => {
     if(categoryName == selectedCategory){ setSelectedCategory("Select All"); onCategoryChange("Select All"); }else{ setSelectedCategory(categoryName); onCategoryChange(categoryName)};
    console.log('Selected category:', selectedCategory);
  };
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 my-8 sm:my-15">
      <h1 className="text-2xl sm:text-3xl font-bold text-left mb-6 sm:mb-8">Select The Type of Professional</h1>
      
      <div className="relative">
        <div className="flex items-stretch space-x-6 sm:space-x-8 md:space-x-6 overflow-x-auto pb-6 sm:overflow-visible scrollbar-hide">
          {visibleCategories.map((category) => (
            <article
              key={category.id}
              style={{ backgroundColor: "#F3F3F3" }}
              className={`
                overflow-hidden cursor-pointer transition-Select All duration-300
                hover:shadow-lg flex-shrink-0 w-40 sm:w-52 md:w-55 h-56 sm:h-64 md:h-72 rounded-xl 
                flex flex-col items-center justify-center shadow-md 
                ${selectedCategory === category.name 
                  ? 'ring-2 ring-yellow-400 drop-shadow-[0_4px_10px_rgba(231,166,36,0.5)]' 
                  : 'ring-1 ring-gray-200'
                }
              `}
              onClick={() => handleCategorySelect(category.name)}
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-36 sm:h-44 md:h-56 w-36 sm:w-44 md:w-52 px-1 rounded-[20px] object-cover"
              />
              <div className="text-sm sm:text-base font-bold mt-3 text-center px-2 max-w-full truncate">
                {category.name}
              </div>
            </article>
          ))}
        </div>
        
        {startIndex > 0 && (
          <button 
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 cursor-pointer -translate-y-1/2 -ml-15 bg-white rounded-full p-2 shadow-md z-10 hidden sm:block"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
        
        {startIndex < categories.length - visibleCount && (
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 cursor-pointer -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-md z-10 hidden sm:block"
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Mobile pagination indicators */}
      <div className="flex justify-center mt-4 sm:hidden">
        {Array.from({ length: Math.ceil(categories.length / visibleCount) }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 mx-1 rounded-full ${startIndex / visibleCount === index ? 'bg-yellow-400' : 'bg-gray-300'}`}
            onClick={() => setStartIndex(index * visibleCount)}
            aria-label={`Page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfessionalCategorySlider;