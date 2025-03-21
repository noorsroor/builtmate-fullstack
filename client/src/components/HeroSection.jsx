import React from "react";
import heroImage from "../assets/images/hero.png";
import heroBackground from "../assets/images/hero-back.jpg";
import { FaSearch, FaPaperPlane } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import img1 from "../assets/images/hero.png";
import img2 from "../assets/images/hero2.png";
import img3 from "../assets/images/hero3.png";

const HeroSection = () => {
  const currentLang = useSelector((state) => state.language.language);
  const isRTL = currentLang === "ar";

  const { t } = useTranslation();

  return (
    <section
      className={`flex flex-col ${
        isRTL ? "md:flex-row text-right" : "md:flex-row text-left"
      } items-center justify-between bg-white p-6`}
      style={{
        backgroundImage: `linear-gradient(${
          isRTL ? "to left" : "to right"
        }, #FFFFFF 0%, #d7d7d7bc 25%, rgba(255, 255, 255, 0) 100%), url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Text Section */}
      <div
        className={`${
          isRTL ? "md:mr-30 md:text-right" : "md:ml-30 md:text-left"
        } w-full md:w-auto text-center `}
      >
        <div className={`${isRTL ? "md:ml-20" : "md:mr-20"} w-full md:w-[500px]`}>
          <div className="text-[28px] md:text-[38px] font-bold mb-4 text-black">
            {t("hero.titlePart1")}{" "}
            <span className="font-semibold" style={{ fontFamily: `"Caveat"` }}>
              {t("hero.titlePart2")}
            </span>
            <span className="text-[#E7A624]" style={{ fontFamily: `"Caveat"` }}>
              {t("hero.titlePart3")}
            </span>
          </div>
          <div className="text-[28px] md:text-[38px] font-bold mb-4 text-black leading-[1.2] md:leading-[47px]">
            {t("hero.subtitle")}
          </div>
          <div className="text-[16px] md:text-[18px] text-gray-800 mb-6">
            {t("hero.description")}
          </div>
        </div>

        {/* Search Form */}
        <form className="flex items-center bg-white rounded-full px-5 py-2 shadow-lg border-2 border-[#947253] max-w-md mx-auto md:mx-0 mb-12 h-13">
          <button type="button" className="text-gray-500">
            <FaSearch size={20} />
          </button>
          <input
            type="text"
            placeholder={t("hero.searchPlaceholder")}
            required
            className="flex-grow bg-transparent border-none focus:outline-none px-2 text-sm text-gray-700"
          />
          <button type="button" className="text-gray-500">
            <FaPaperPlane size={20} />
          </button>
        </form>

        {/* Button */}
        <div className={`${
          isRTL ? " md:text-right" : " md:text-left"
        } text-center`}>
          <a
            href="../htmlPages/shop.html"
            className="inline-block bg-black text-white text-center py-2 px-8 rounded-lg hover:scale-105 transition-transform"
          >
            {t("hero.getStarted")}
          </a>
        </div>
      </div>

      {/* Image Slider */}
      <div
        className={`${
          isRTL ? "md:ml-20" : "md:mr-20"
        } w-full md:w-[590px] h-[300px] md:h-[590px] mt-8 md:mt-0`}
      >
        <Swiper
          dir="ltr"
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          className="w-full h-full"
        >
          <SwiperSlide>
            <img
              src={img1}
              alt="hero1"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={img2}
              alt="hero2"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={img3}
              alt="hero3"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default HeroSection;