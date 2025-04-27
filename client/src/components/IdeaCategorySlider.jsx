import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

const IdeaCategorySlider = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const { t } = useTranslation();
  const categories = [
    { 
        id: 1, 
        name: t("categories.kitchen"), 
        image: "https://i.pinimg.com/736x/ed/5f/66/ed5f66356a6cd5ad16b3de0ad045a8d9.jpg" 
    },
    { 
        id: 2, 
        name: t("categories.bedroom"), 
        image: "https://i.pinimg.com/550x/35/f8/22/35f822383ee356f874507e5eb2aabe0f.jpg" 
    },
    { 
        id: 3, 
        name: t("categories.bathroom"), 
        image: "https://i.pinimg.com/200x/e1/9b/ff/e19bff27af760a088a597bed7df635ac.jpg" 
    },
    { 
        id: 4, 
        name: t("categories.living_room"), 
        image: "https://vorlane.com/wp-content/uploads/2024/11/Cozy-living-room-with-fireplace-and-soft-neutral-colors.webp" 
    },
    { 
        id: 5, 
        name: t("categories.dining"), 
        image: "https://i.pinimg.com/736x/a5/db/fa/a5dbfa839f1ebd6e8207d5df9f4f1fe6.jpg" 
    },
    { 
        id: 6, 
        name: t("categories.outdoor"), 
        image: "https://i.pinimg.com/736x/44/a5/e3/44a5e3dd7284dd53b699c6ce5d985517.jpg" 
    },
    { 
        id: 7, 
        name: t("categories.baby_kids"), 
        image: "https://i.pinimg.com/736x/c1/31/a3/c131a3b96ef1a1b39b915d5a6ca838df.jpg" 
    },
    { 
        id: 8, 
        name: t("categories.home_office"), 
        image: "https://i.pinimg.com/736x/09/60/64/09606403872c72c86be0c8e382ff2fe5.jpg" 
    },
    { 
        id: 9, 
        name: t("categories.storage_closet"), 
        image: "https://i.pinimg.com/736x/9e/f9/d9/9ef9d97990ba650e845e61fc83d8d8bd.jpg" 
    },
    { 
        id: 10, 
        name: t("categories.laundry"), 
        image: "https://i.pinimg.com/736x/66/c4/c6/66c4c6dedcfe6c1dd2dbc5fe662d9cae.jpg" 
    }
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
     if(categoryName == selectedCategory){ setSelectedCategory(""); onCategoryChange(""); }else{ setSelectedCategory(categoryName); onCategoryChange(categoryName)};
    console.log('Selected category:', selectedCategory);
  };
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 my-8 sm:my-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-left mb-6 sm:mb-8">Home Design Ideas</h1>
      
      <div className="relative">
        <div className="flex items-stretch space-x-6 sm:space-x-8 md:space-x-6 overflow-x-auto pb-6 sm:overflow-visible scrollbar-hide">
          {visibleCategories.map((category) => (
            <article
              key={category.id}
              style={{ backgroundColor: "#E9E2D2" }}
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

export default IdeaCategorySlider;