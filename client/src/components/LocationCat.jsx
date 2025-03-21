import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const LocationCat = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const locationsRef = useRef(null);
  const sectionRef = useRef(null);
  const currentLang = useSelector((state) => state.language.language);
  const isRTL = currentLang === "ar";

  const { t } = useTranslation();

  // Data for location categories in Jordan
  const locations = [
    { name: t("locations.amman"), image: "https://i.pinimg.com/736x/b4/af/c8/b4afc8cc7f3e360e70ae933701935c60.jpg" },
    { name: t("locations.zarqa"), image: "https://upload.wikimedia.org/wikipedia/commons/7/77/%D8%A7%D9%84%D8%B2%D8%B1%D9%82%D8%A7%D8%A1_%D8%AE%D9%84%D8%A7%D9%84_%D8%AD%D8%B8%D8%B1_%D8%A7%D9%84%D8%AA%D8%AC%D9%88%D9%84_%D9%86%D9%8A%D8%B3%D8%A7%D9%86_%D9%A2%D9%A0%D9%A2%D9%A1.jpg" },
    { name: t("locations.ajloun"), image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWFXDqB6z2PuEdHMDZVYgP70F7OCGU88WneQ&s" },
    { name: t("locations.aqaba"), image: "https://www.dive-inaqaba.com/wp-content/uploads/aqaba.webp" },
    { name: t("locations.madaba"), image: "https://www.luxorandaswan.com/images/15974403581Madaba-6-600x450.jpg" },
    { name: t("locations.jerash"), image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCeY1t7fUHm-IuLHvevqXO4QHlS6GQMmaWiQ&s" },
    { name: t("locations.karak"), image: "https://museums.visitjordan.com/uploads/museums/images/d9d07801-d7d7-4045-bf5e-0f6c03259f4c.jpg" },
    { name: t("locations.irbid"), image: "https://iresizer.devops.arabiaweather.com/resize?url=http://adminassets.devops.arabiaweather.com/sites/default/files/field/image/irbid-4-4-2024-arabiaweather.png&size=650x450" },
    { name: t("locations.maan"), image: "https://alrai.com/uploads/images/2018/03/19/94509.jpg" },
    { name: t("locations.mafraq"), image: "https://cdn.alweb.com/thumbs/jordanencyclopedia/article/fit710x532/%D9%85%D8%AD%D8%A7%D9%81%D8%B8%D8%A9-%D8%A7%D9%84%D9%85%D9%81%D8%B1%D9%82-%D9%83%D9%84-%D9%85%D8%A7-%D9%8A%D9%87%D9%85%D9%83-%D9%85%D8%B9%D8%B1%D9%81%D8%AA%D9%87.jpg" }
  ];

  useEffect(() => {
    // Animation effect on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (sectionRef.current) {
              sectionRef.current.style.opacity = "1";
              sectionRef.current.style.transform = "translateY(0)";
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Calculate max scroll amount
    if (locationsRef.current) {
      const containerWidth = locationsRef.current.parentElement.clientWidth;
      const totalWidth = locationsRef.current.scrollWidth;
      setMaxScroll(totalWidth - containerWidth);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
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

    if (locationsRef.current) {
      locationsRef.current.style.transform = `translateX(${isRTL ? newPosition : -newPosition}px)`;
    }
  };

  // Animation style for the section
  const animationStyle = {
    opacity: 0,
    transform: "translateY(50px)",
    transition: "opacity 2.5s ease-out, transform 2.5s ease-out",
  };

  return (
    <section
      ref={sectionRef}
      className="col-span-12 flex flex-col items-center justify-center my-8 mx-4 md:mx-16 lg:mx-24 relative"
      style={animationStyle}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="self-start text-2xl md:text-3xl font-bold text-secondary mb-4">
        {t("locations.title")}
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
              ref={locationsRef}
              className="flex gap-5 transition-transform duration-500 ease-in-out h-72 my-5"
              style={{ transform: `translateX(${isRTL ? scrollPosition : -scrollPosition}px)` }}
            >
              {locations.map((location, index) => (
                <article
                  key={index}
                  className="w-48 sm:w-52 md:w-59 h-56 sm:h-70 rounded-xl flex flex-col items-center justify-center shadow-md hover:drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] cursor-pointer"
                  style={{ backgroundColor: "#F3F3F3" }}
                >
                  <img
                    src={location.image}
                    alt={location.name}
                    className="h-40 sm:h-48 md:h-55 w-40 md:w-50 rounded-xl object-cover"
                  />
                  <div className="text-base font-bold mt-3 text-center px-2 truncate">{location.name}</div>
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

export default LocationCat;