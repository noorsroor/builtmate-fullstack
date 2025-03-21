import React, { useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import image1 from "../assets/images/explore-find-idea.jpg"
import image2 from "../assets/images/explore-find-pro.jpg"
import image3 from "../assets/images/explore-shops.jpg"


const CategorySection = () => {
    const sectionRef = useRef(null);
      const { t } = useTranslation();
  
    useEffect(() => {
      // Animation effect on scroll
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (sectionRef.current) {
                sectionRef.current.style.opacity = '1';
                sectionRef.current.style.transform = 'translateY(0)';
              }
            }
          });
        },
        { threshold: 0.1 }
      );
  
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
  
      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, []);
  
    // Define the animation style
    const animationStyle = {
      opacity: 0,
      transform: 'translateY(50px)',
      transition: 'opacity 2.5s ease-out, transform 2.5s ease-out',
    };
  
    // Custom shadow style for cards
    const cardShadowStyle = {
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 6px 12px rgba(159, 128, 105, 0.5)'
    };
  
    return (
      <section 
        ref={sectionRef}
        className=" flex flex-col items-center justify-center my-8 mx-4 md:mx-16 lg:mx-24"
        style={animationStyle}
      >
        <div className="text-2xl md:text-3xl font-bold text-secondary mb-8">
          {t("explore.title")}
        </div>
        
        <div className="flex flex-wrap items-center justify-around gap-8 md:gap-16 lg:gap-24 my-8 cursor-pointer w-full">
          {/* Discover Ideas Card */}
          <div 
            className="relative group duration-500 cursor-pointer group overflow-hidden relative w-full sm:w-80 md:w-96 h-80 md:h-80 rounded-xl overflow-hidden hover:shadow-none hover:border-4 hover:border-[#E7A624] transition-all duration-300"
            style={cardShadowStyle}
          >
            <div className="w-full h-full md:h-full">
              <img 
                src={image1} 
                alt="Find Professionals" 
                className="w-full h-full object-cover"
              />
            </div>
            <div class="absolute bg-gray-50 rounded-[15px]  -bottom-15 w-full p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
                <span class="h-12 flex items-center justify-center text-xl font-medium">{t("explore.Ideas")}</span>
                <p class="text-neutral-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
  
          {/* Find Professionals Card */}
          <div 
            className="relative group duration-500 cursor-pointer group overflow-hidden relative w-full sm:w-80 md:w-96 h-80 md:h-80 rounded-xl overflow-hidden hover:shadow-none hover:border-4 hover:border-[#E7A624] transition-all duration-300"
            style={cardShadowStyle}
          >
           
            <div className="w-full h-full md:h-full">
              <img 
                src={image2} 
                alt="Find Professionals" 
                className="w-full h-full object-cover"
              />
            </div>
            <div class="absolute bg-gray-50 rounded-[15px] -bottom-15 w-full p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
                <span class="h-12 flex items-center justify-center text-xl font-medium">{t("explore.findPro")}</span>
                <p class="text-neutral-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        
  
          {/* Shop Materials Card */}
          <div 
            className="relative group duration-500 cursor-pointer group overflow-hidden relative w-full sm:w-80 md:w-96 h-70 md:h-80 rounded-xl overflow-hidden hover:shadow-none hover:border-4 hover:border-[#E7A624] transition-all duration-300"
            style={cardShadowStyle}
          >
            <div className="w-full h-full md:h-full">
              <img 
                src={image3} 
                alt="Find Professionals" 
                className="w-full h-full object-cover"
              />
            </div>
            <div class="absolute bg-gray-50 rounded-[15px] -bottom-15 w-full p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
                <span class="h-12 flex items-center justify-center text-xl font-medium">{t("explore.shop")}</span>
                <p class="text-neutral-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
  
        {/* CSS module for the slide-up animation */}
        <style jsx>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>
    );
  };
  
  export default CategorySection;