import React from "react";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-96 lg:h-[500px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url("https://images.pexels.com/photos/4626268/pexels-photo-4626268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-3xl">
        Ready to Make Your Dream Project a Reality?
        </h2>
        
        <p className="text-white text-base md:text-lg mb-10 max-w-2xl">
        Need a skilled professional for your next project? Browse and hire top-rated engineers, carpenters, and more – all in one place.
        </p>
        
        <button
          onClick={() => navigate("/findPro")}
          className="bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-all"
        >
          Find a Pro
        </button>
      </div>
    </section>
  );
};

export default CallToAction;