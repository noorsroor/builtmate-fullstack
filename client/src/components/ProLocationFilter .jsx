import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '../redux/filterSlice'


const ProLocationFilter = ({ location, onLocationChange }) => {
  const [selectedLocation, setSelectedLocation] = useState('Select All');
  const [startIndex, setStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch()
  const sliderRef = useRef(null);

  const jordanGovernorates = [
    'Select All', 'Amman', 'Zarqa', 'Irbid', 'Aqaba', 'Ajloun', 'Madaba', 
    'Ma\'an', 'Jerash', 'Balqa', 'Mafraq', 'Tafilah', 'Karak'
  ];

  // Check if mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Visible locations in slider
  const getVisibleCount = () => {
    if (window.innerWidth < 640) return 3;
    if (window.innerWidth < 1024) return 5;
    return 7;
  };

  const visibleLocations = isMobile 
    ? jordanGovernorates 
    : jordanGovernorates.slice(startIndex, startIndex + getVisibleCount());

  const handleNext = () => {
    if (startIndex < jordanGovernorates.length - getVisibleCount()) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    onLocationChange(location);
    if (isMobile) {
      setShowDropdown(false);
    }
  };
  
  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value))
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 my-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-left mb-6">Select Location</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        {/* Mobile Dropdown */}
        {isMobile && (
          <div className="relative w-full">
            <button 
              className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-full border border-gray-300 text-left"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className={selectedLocation === 'Select All' ? 'font-medium text-yellow-500' : ''}>{selectedLocation}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={showDropdown ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
              </svg>
            </button>
            
            {showDropdown && (
              <div className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto border border-gray-200">
                {jordanGovernorates.map((location) => (
                  <button
                    key={location}
                    className={`block cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedLocation === location ? 'bg-yellow-50 text-yellow-500 font-medium' : ''}`}
                    onClick={() => handleLocationSelect(location)}
                  >
                    {location}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Desktop Slider */}
        {!isMobile && (
          <div className="relative w-full md:w-auto">
            <div className="flex items-center space-x-2 md:space-x-3 overflow-x-auto no-scrollbar" ref={sliderRef}>
              {visibleLocations.map((location) => (
                <button
                  key={location}
                  className={`
                    whitespace-nowrap px-4 py-2 cursor-pointer rounded-full transition-all
                    ${selectedLocation === location 
                      ? 'bg-yellow-500 text-white font-medium' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }
                  `}
                  onClick={() => handleLocationSelect(location)}
                >
                  {location}
                </button>
              ))}
              
              {startIndex + getVisibleCount() < jordanGovernorates.length && (
                <button 
                  onClick={handleNext}
                  className="flex items-center justify-center w-8 h-8 bg-black cursor-pointer text-white rounded-full shadow-md"
                  aria-label="Next"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              )}
            </div>
            
            {startIndex > 0 && (
              <button 
                onClick={handlePrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-8 flex items-center justify-center w-8 h-8 bg-black cursor-pointer text-white text-gray-800 rounded-full shadow-md hidden md:flex"
                aria-label="Previous"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}
          </div>
        )}
        
        {/* Search Bar */}
        <div className="relative w-full md:w-64 lg:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="Search..."
            onChange={handleSearchChange}
          />
        </div>
      </div>
      
      {/* Bottom border */}
      <div className="w-full h-px bg-gray-200 mt-4"></div>
    </div>
  );
};

export default ProLocationFilter;