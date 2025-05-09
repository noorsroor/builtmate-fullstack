import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const SuccessProjects = () => {
  const navigate = useNavigate();
  const [idea, setIdea] = useState(null);
  const [pro, setPro] = useState({});
  const id = "681e1d1c0b838bd7dc7d0e64";

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/${id}`);
        setIdea(res.data);
        setPro(res.data.professional.userId);
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };

    fetchProject();
  }, []);

  return (
    <section className="w-full px-15 bg-[#E9E2D2] py-12">
      <div className="container mx-auto flex flex-col lg:flex-row px-4 lg:px-8 items-center">
        {/* Left side - Image */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <div className="rounded-lg overflow-hidden">
            <img
              src={idea?.images?.[14] || "/placeholder-building.jpg"}
              alt="Luxury apartment building with green spaces"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="w-full lg:w-1/2 lg:pl-16">
          <div className="text-gray-500 uppercase tracking-wide font-medium text-sm mb-2">{idea?.title}</div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Full Construction <span className="text-yellow-500">Building<br /> Package</span>
          </h2>
          
          <p className="text-black mb-8 text-lg">
          Our Full Construction Package offers a comprehensive solution for your construction needs, covering every stage of the building process from start to finish.
          </p>
          
          {/* Feature list in two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 mb-8">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-black">Architectural Design & Planning</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-black">Structural Engineering & Permits</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-black">Site Preparation & Excavation</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-black">Electrical & Plumbing Installation</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-black">Masonry & Carpentry Work</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-black">Roofing & Waterproofing</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-black">Interior Finishing & Design</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-black">Exterior Landscaping & Hardscaping</span>
            </div>
          </div>
          
          {/* Read More Button */}
          <button 
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-8 rounded-full transition-all"
            onClick={() => navigate(`/ideas/${idea?._id}`)}
          >
            Read more
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuccessProjects;