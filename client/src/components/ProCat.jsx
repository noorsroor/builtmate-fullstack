import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const ProCat = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const prosRef = useRef(null);
  const sectionRef = useRef(null);
  const currentLang = useSelector((state) => state.language.language);
  const isRTL = currentLang === "ar";

  const { t } = useTranslation();

  // Data for professional categories
  const professionals = [
    { name: t("professionals.interior_designers"), image: "https://i.pinimg.com/736x/e7/02/7d/e7027defe58d7d363d8b260a6cf20e6c.jpg" },
    { name: t("professionals.general_contractors"), image: "https://i.pinimg.com/736x/d4/0d/a8/d40da859cac1fb563844ac8efc83a4b7.jpg" },
    { name: t("professionals.plumbing_services"), image: "https://i.pinimg.com/736x/c9/ca/23/c9ca23330fd66eef3cc6003d2d7a4af5.jpg" },
    { name: t("professionals.electrical"), image: "https://i.pinimg.com/736x/8d/f3/68/8df368bf2471b787f4ae68639016d9aa.jpg" },
    { name: t("professionals.architects_building"), image: "https://i.pinimg.com/736x/1d/89/23/1d8923047edf67493152e909bd4baed1.jpg" },
    { name: t("professionals.home_builders"), image: "https://i.pinimg.com/736x/b6/d8/28/b6d82870d22546dff034d28dd93c762a.jpg" },
    { name: t("professionals.pool_builders"), image: "https://i.pinimg.com/736x/06/a1/54/06a15408967fe2af8c18413fe232301f.jpg" },
    { name: t("professionals.painters"), image: "https://i.pinimg.com/736x/bc/d3/9a/bcd39a2ee9a9af16a764d4fec0c5b8f7.jpg" },
    { name: t("professionals.landscape_contractors"), image: "https://i.pinimg.com/736x/0c/4a/d7/0c4ad7807356102e08b2a5731d4355d0.jpg" },
    { name: t("professionals.door_dealers"), image: "https://i.pinimg.com/736x/15/10/d5/1510d5372d995b6c52d8ccee3676a3dd.jpg" }
  ];

  useEffect(() => {
    // Calculate max scroll amount
    if (prosRef.current) {
      const containerWidth = prosRef.current.parentElement.clientWidth;
      const totalWidth = prosRef.current.scrollWidth;
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

    if (prosRef.current) {
      prosRef.current.style.transform = `translateX(${isRTL ? newPosition : -newPosition}px)`;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="col-span-12 flex flex-col items-center justify-center my-8 mx-4 md:mx-16 lg:mx-24 relative"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="self-start text-2xl md:text-3xl font-bold text-secondary mb-4">
        {t("professionals.title")}
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
              ref={prosRef}
              className="flex gap-5 transition-transform duration-500 ease-in-out h-72 my-5"
              style={{ transform: `translateX(${isRTL ? scrollPosition : -scrollPosition}px)` }}
            >
              {professionals.map((pro, index) => (
                <article
                  key={index}
                  className="w-48 sm:w-52 md:w-59 h-56 sm:h-70 rounded-xl flex flex-col items-center justify-center shadow-md hover:drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] cursor-pointer"
                  style={{ backgroundColor: "#F3F3F3" }}
                >
                  <img
                    src={pro.image}
                    alt={pro.name}
                    className="h-40 sm:h-48 md:h-55 w-40 md:w-50 rounded-xl object-cover"
                    />
                    <div className="text-base font-bold mt-3 text-center px-2 truncate">{pro.name}</div>
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

export default ProCat;