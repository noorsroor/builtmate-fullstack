/// src/components/IdeasSection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const IdeasSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/home-projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Custom layout grid to match the images[0]
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Created by Our Professionals</h2>
        <p className="text-center text-gray-500 max-w-3xl mx-auto mb-10">
        Explore creative home designing & building ideas from our professionals
        </p>
        
        <div className="grid grid-cols-4 gap-10">
          {/* This complex grid layout matches the specific layout in the images[0] */}
          
          {/* First column */}
          <div className="col-span-4 md:col-span-1 flex flex-col gap-10">
            {/* Backyard with pool */}
            <div className="relative rounded-[24px] overflow-hidden aspect-square">
              <img 
                src={projects[0]?.images[0]} 
                alt={projects[0]?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 left-0 p-4 text-white">
                <h3 className="font-medium text-lg">{projects[0]?.title}</h3>
                <p className="text-sm">{projects[0]?.category}</p>
              </div>
            </div>
            
            {/* Studio */}
            <div className="relative rounded-[24px] md:h-96 overflow-hidden aspect-square">
              <img 
                src={projects[4]?.images[0]} 
                alt={projects[4]?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 left-0 p-4 text-white">
                <h3 className="font-medium text-lg">{projects[4]?.title}</h3>
                <p className="text-sm">{projects[4]?.category}</p>
              </div>
            </div>
            
            {/* Living Room */}
            <div className="relative rounded-[24px] md:md:h-[200px] overflow-hidden aspect-square">
              <img 
                src={projects[8]?.images[0]} 
                alt={projects[8]?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 left-0 p-4 text-white">
                <h3 className="font-medium text-lg">{projects[8]?.title}</h3>
                <p className="text-sm">{projects[8]?.category}</p>
              </div>
            </div>
          </div>
          
          {/* Second column */}
          <div className="col-span-4 md:col-span-1 flex flex-col gap-10">
            {/* Home office */}
            <div className="relative rounded-[24px] overflow-hidden aspect-square md:h-96">
              <img 
                src={projects[1]?.images[0]} 
                alt={projects[1]?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 left-0 p-4 text-white">
                <h3 className="font-medium text-lg">{projects[1]?.title}</h3>
                <p className="text-sm">{projects[1]?.category}</p>
              </div>
            </div>
            
            {/* Bedroom */}
            <div className="relative rounded-[24px] md:h-[200px] overflow-hidden aspect-square">
              <img 
                src={projects[5]?.images[0]} 
                alt={projects[5]?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 left-0 p-4 text-white">
                <h3 className="font-medium text-lg">{projects[5]?.title}</h3>
                <p className="text-sm">{projects[5]?.category}</p>
              </div>
            </div>
            
            {/* Bathroom */}
            <div className="relative rounded-[24px] overflow-hidden aspect-square">
              <img 
                src={projects[9]?.images[0]} 
                alt={projects[9]?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 left-0 p-4 text-white">
                <h3 className="font-medium text-lg">{projects[9]?.title}</h3>
                <p className="text-sm">{projects[9]?.category}</p>
              </div>
            </div>
          </div>
          
          {/* Third column */}
          <div className="col-span-4 md:col-span-1 flex flex-col gap-10">
            {/* Kitchen */}
            <div className="relative rounded-[24px] md:h-[200px] overflow-hidden aspect-square">
              <img 
                src={projects[2]?.images[0]} 
                alt={projects[2]?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 left-0 p-4 text-white">
                <h3 className="font-medium text-lg">{projects[2]?.title}</h3>
                <p className="text-sm">{projects[2]?.category}</p>
              </div>
            </div>
            
            {/* Kidsroom */}
            <div className="relative rounded-[24px] overflow-hidden aspect-square">
              <img 
                src={projects[6]?.images[0]} 
                alt={projects[6]?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 left-0 p-4 text-white">
                <h3 className="font-medium text-lg">{projects[6]?.title}</h3>
                <p className="text-sm">{projects[6]?.category}</p>
              </div>
            </div>
            
            {/* Home office 2 */}
            <div className="relative rounded-[24px] md:h-96 overflow-hidden aspect-square">
              <img 
                src={projects[10]?.images[0]} 
                alt={projects[10]?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 left-0 p-4 text-white">
                <h3 className="font-medium text-lg">{projects[10]?.title}</h3>
                <p className="text-sm">{projects[10]?.category}</p>
              </div>
            </div>
          </div>
          
          {/* Fourth column */}
          <div className="col-span-4 md:col-span-1 flex flex-col gap-10">
            {/* Bedroom */}
            <div className="relative rounded-[24px] md:md:h-[200px] overflow-hidden aspect-square">
              <img 
                src={projects[3]?.images[0]} 
                alt={projects[3]?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 left-0 p-4 text-white">
                <h3 className="font-medium text-lg">{projects[3]?.title}</h3>
                <p className="text-sm">{projects[3]?.category}</p>
              </div>
            </div>
            
            {/* Bathroom */}
            <div className="relative rounded-[24px] overflow-hidden aspect-square md:h-96">
              <img 
                src={projects[7]?.images[0]} 
                alt={projects[7]?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 left-0 p-4 text-white">
                <h3 className="font-medium text-lg">{projects[7]?.title}</h3>
                <p className="text-sm">{projects[7]?.category}</p>
              </div>
            </div>
            
            {/* Teenager playroom */}
            <div className="relative rounded-[24px] overflow-hidden aspect-square">
              <img 
                src={projects[11]?.images[0]} 
                alt={projects[11]?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 left-0 p-4 text-white">
                <h3 className="font-medium text-lg">{projects[11]?.title}</h3>
                <p className="text-sm">{projects[11]?.category}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdeasSection;