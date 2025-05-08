import React from "react";
import video from "../assets/notfound.mp4"
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 relative overflow-hidden">
 
      {/* Video at the top - placeholder */}
      <div className="w-full max-w-md mb-6">
        <video 
          autoPlay 
          loop 
          muted 
          className="w-full"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    
      
      {/* Error message */}
      <p className="text-xl text-gray-500 mb-8">
        It seems we couldn't find the page you're looking for.
      </p>
      
      {/* Go Home button */}
      <button
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-medium py-3 px-8 rounded-full corsur-pointer transition-colors duration-300"
        onClick={()=> navigate("/")}
      >
        Go Home !
      </button>
    </div>
  );
};

export default NotFound;