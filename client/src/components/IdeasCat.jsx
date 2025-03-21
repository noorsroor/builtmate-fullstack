// import React, { useState, useRef, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useSelector } from "react-redux";
// const IdeasCat = () => {
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const [maxScroll, setMaxScroll] = useState(0);
//   const ideasRef = useRef(null);
//   const sectionRef = useRef(null);
//   const currentLang = useSelector((state) => state.language.language);
//   const isRTL = currentLang === "ar";

//   const { t } = useTranslation();

//   const roomCategories = [
//     { name: t("categories.kitchen"), image: "https://i.pinimg.com/736x/ed/5f/66/ed5f66356a6cd5ad16b3de0ad045a8d9.jpg" },
//     { name: t("categories.bedroom"), image: "https://i.pinimg.com/550x/35/f8/22/35f822383ee356f874507e5eb2aabe0f.jpg" },
//     { name: t("categories.bathroom"), image: "https://i.pinimg.com/200x/e1/9b/ff/e19bff27af760a088a597bed7df635ac.jpg" },
//     { name: t("categories.living_room"), image: "https://vorlane.com/wp-content/uploads/2024/11/Cozy-living-room-with-fireplace-and-soft-neutral-colors.webp" },
//     { name: t("categories.dining"), image: "https://i.pinimg.com/736x/a5/db/fa/a5dbfa839f1ebd6e8207d5df9f4f1fe6.jpg" },
//     { name: t("categories.outdoor"), image: "https://i.pinimg.com/736x/44/a5/e3/44a5e3dd7284dd53b699c6ce5d985517.jpg" },
//     { name: t("categories.baby_kids"), image: "https://i.pinimg.com/736x/c1/31/a3/c131a3b96ef1a1b39b915d5a6ca838df.jpg" },
//     { name: t("categories.home_office"), image: "https://i.pinimg.com/736x/09/60/64/09606403872c72c86be0c8e382ff2fe5.jpg" },
//     { name: t("categories.storage_closet"), image: "https://i.pinimg.com/736x/9e/f9/d9/9ef9d97990ba650e845e61fc83d8d8bd.jpg" },
//     { name: t("categories.laundry"), image: "https://i.pinimg.com/736x/66/c4/c6/66c4c6dedcfe6c1dd2dbc5fe662d9cae.jpg" }
//   ];

//   useEffect(() => {
//     // Animation effect on scroll
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             if (sectionRef.current) {
//               sectionRef.current.style.opacity = '1';
//               sectionRef.current.style.transform = 'translateY(0)';
//             }
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     // Calculate max scroll amount
//     if (ideasRef.current) {
//       const containerWidth = ideasRef.current.parentElement.clientWidth;
//       const totalWidth = ideasRef.current.scrollWidth;
//       setMaxScroll(totalWidth - containerWidth);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   const scroll = (direction) => {
//     const scrollAmount = 240; // Card width + gap
//     let newPosition;

//     if (direction === 'left') {
//       newPosition = Math.max(scrollPosition - scrollAmount, 0);
//     } else {
//       newPosition = Math.min(scrollPosition + scrollAmount, maxScroll);
//     }

//     setScrollPosition(newPosition);
    
//     if (ideasRef.current) {
//       ideasRef.current.style.transform = `translateX(-${newPosition}px)`;
//     }
//   };

//   // Animation style for the section
//   const animationStyle = {
//     opacity: 0,
//     transform: 'translateY(50px)',
//     transition: 'opacity 2.5s ease-out, transform 2.5s ease-out',
//   };

//   return (
//     <section 
//       ref={sectionRef} 
//       className="col-span-12 flex flex-col items-center justify-center my-8 mx-4 md:mx-16 lg:mx-24 relative"
//       style={animationStyle}
//     >
//       <div className="self-start text-2xl md:text-3xl font-bold text-secondary mb-4">
//       {t("categories.title")}
//       </div>
      
//       <div className="relative w-full max-w-7xl">
//         {/* Prev Button */}
//         <button 
//           className={`absolute -left-12 top-1/2 transform -translate-y-1/2 bg-background text-secondary p-2 rounded-md z-10 ${scrollPosition <= 0 ? 'opacity-0 cursor-not-allowed' : ''}`}
//           aria-label="Previous"
//           onClick={() => scroll('left')}
//           disabled={scrollPosition <= 0}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
        
//         {/* Slider Container */}
//         <div className="w-full overflow-hidden">
//           <div className="flex justify-start overflow-hidden">
//             <div 
//               ref={ideasRef}
//               className="flex gap-5 transition-transform duration-500 ease-in-out h-72 my-5"
//             >
//               {roomCategories.map((room, index) => (
//                 <article 
//                   key={index} 
//                   className="w-48 sm:w-52 md:w-59 h-56 sm:h-70 rounded-xl flex flex-col items-center justify-center shadow-md hover:drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] cursor-pointer"
//                   style={{ backgroundColor: "#E9E2D2" }}  
//                 >
//                   <img 
//                     src={room.image} 
//                     alt={room.name} 
//                     className="w-48 h-55 rounded-xl object-cover"
//                   />
//                   <div className="text-base font-bold mt-3">{room.name}</div>
//                 </article>
//               ))}
//             </div>
//           </div>
//         </div>
        
//         {/* Next Button */}
//         <button 
//           className={`absolute -right-12 top-1/2 transform -translate-y-1/2 bg-background text-secondary p-2 rounded-md z-10 ${scrollPosition >= maxScroll ? 'opacity-0 cursor-not-allowed' : ''}`}
//           aria-label="Next"
//           onClick={() => scroll('right')}
//           disabled={scrollPosition >= maxScroll}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       </div>
//     </section>
//   );
// };

// export default IdeasCat;
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const IdeasCat = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const ideasRef = useRef(null);
  const sectionRef = useRef(null);
  const currentLang = useSelector((state) => state.language.language);
  const isRTL = currentLang === "ar";

  const { t } = useTranslation();

  const roomCategories = [
    { name: t("categories.kitchen"), image: "https://i.pinimg.com/736x/ed/5f/66/ed5f66356a6cd5ad16b3de0ad045a8d9.jpg" },
    { name: t("categories.bedroom"), image: "https://i.pinimg.com/550x/35/f8/22/35f822383ee356f874507e5eb2aabe0f.jpg" },
    { name: t("categories.bathroom"), image: "https://i.pinimg.com/200x/e1/9b/ff/e19bff27af760a088a597bed7df635ac.jpg" },
    { name: t("categories.living_room"), image: "https://vorlane.com/wp-content/uploads/2024/11/Cozy-living-room-with-fireplace-and-soft-neutral-colors.webp" },
    { name: t("categories.dining"), image: "https://i.pinimg.com/736x/a5/db/fa/a5dbfa839f1ebd6e8207d5df9f4f1fe6.jpg" },
    { name: t("categories.outdoor"), image: "https://i.pinimg.com/736x/44/a5/e3/44a5e3dd7284dd53b699c6ce5d985517.jpg" },
    { name: t("categories.baby_kids"), image: "https://i.pinimg.com/736x/c1/31/a3/c131a3b96ef1a1b39b915d5a6ca838df.jpg" },
    { name: t("categories.home_office"), image: "https://i.pinimg.com/736x/09/60/64/09606403872c72c86be0c8e382ff2fe5.jpg" },
    { name: t("categories.storage_closet"), image: "https://i.pinimg.com/736x/9e/f9/d9/9ef9d97990ba650e845e61fc83d8d8bd.jpg" },
    { name: t("categories.laundry"), image: "https://i.pinimg.com/736x/66/c4/c6/66c4c6dedcfe6c1dd2dbc5fe662d9cae.jpg" }
  ];

  useEffect(() => {
    if (ideasRef.current) {
      const containerWidth = ideasRef.current.parentElement.clientWidth;
      const totalWidth = ideasRef.current.scrollWidth;
      setMaxScroll(totalWidth - containerWidth);
    }
  }, []);

  const scroll = (direction) => {
    const scrollAmount = 240; // Card width + gap
    let newPosition;

    if (direction === "left") {
      newPosition = Math.max(scrollPosition - scrollAmount, 0);
    } else {
      newPosition = Math.min(scrollPosition + scrollAmount, maxScroll);
    }

    setScrollPosition(newPosition);

    if (ideasRef.current) {
      ideasRef.current.style.transform = `translateX(${isRTL ? newPosition : -newPosition}px)`;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="col-span-12 flex flex-col items-center justify-center my-8 mx-4 md:mx-16 lg:mx-24 relative"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="self-start text-2xl md:text-3xl font-bold text-secondary mb-4">
        {t("categories.title")}
      </div>

      <div className="relative w-full max-w-7xl">
        {/* Prev Button */}
        <button
          className={`absolute ${isRTL ? "-right-12" : "-left-12"} top-1/2 transform -translate-y-1/2 bg-background text-secondary p-2 rounded-md z-10 ${
            scrollPosition <= 0 ? "opacity-0 cursor-not-allowed" : ""
          }`}
          aria-label="Previous"
          onClick={() => scroll("left")}
          disabled={scrollPosition <= 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
            />
          </svg>
        </button>

        {/* Slider Container */}
        <div className="w-full overflow-hidden">
          <div className="flex justify-start overflow-hidden">
            <div
              ref={ideasRef}
              className="flex gap-5 transition-transform duration-500 ease-in-out h-72 my-5"
              style={{ transform: `translateX(${isRTL ? scrollPosition : -scrollPosition}px)` }}
            >
              {roomCategories.map((room, index) => (
                <article
                  key={index}
                  className="w-48 sm:w-52 md:w-59 h-56 sm:h-70 rounded-xl flex flex-col items-center justify-center shadow-md hover:drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] cursor-pointer"
                  style={{ backgroundColor: "#E9E2D2" }}
                >
                  <img
                    src={room.image}
                    alt={room.name}
                    className="h-40 sm:h-48 md:h-55 w-40 md:w-50 rounded-xl object-cover"
                    />
                    <div className="text-base font-bold mt-3 text-center px-2 truncate">
                    {room.name}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          className={`absolute ${isRTL ? "-left-12" : "-right-12"} top-1/2 transform -translate-y-1/2 bg-background text-secondary p-2 rounded-md z-10 ${
            scrollPosition >= maxScroll ? "opacity-0 cursor-not-allowed" : ""
          }`}
          aria-label="Next"
          onClick={() => scroll("right")}
          disabled={scrollPosition >= maxScroll}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default IdeasCat;
