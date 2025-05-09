import { useState } from 'react';

const ServicesSection = () => {
  return (
    <div className="w-full bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Services<br />
            For Your Construction Needs
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Service Card 1 - Individual Services */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Individual Professional<br />
              Services
            </h3>
            <p className="text-gray-600 mb-6">
              Book specialized experts for specific project needs.
            </p>
            
            <div className="h-[200px] bg-gradient-to-r from-yellow-700 via-black to-yellow-600 rounded-lg p-2 mb-6 flex-grow">
              <div className="bg-white h-full rounded-lg flex items-center justify-center">
                <img 
                  src="https://images.pexels.com/photos/8482818/pexels-photo-8482818.jpeg?auto=compress&cs=tinysrgb&w=1260&dpr=2" 
                  alt="Professional Services"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
            
            <p className="text-gray-600 text-sm">
              Includes architects for design planning, general contractors for construction management, and interior designers for space optimization. Perfect for projects needing specific expertise.
            </p>
          </div>
          
          {/* Service Card 2 - Full Packages */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Complete Construction<br />
              Packages
            </h3>
            <p className="text-gray-600 mb-6">
              End-to-end solutions from design to completion.
            </p>
            
            <div className="bg-gradient-to-r h-[200px] from-yellow-700 via-black to-yellow-600 rounded-lg p-2 mb-6 flex-grow">
              <div className="bg-white rounded-lg flex h-full items-center justify-center">
                <img 
                  src="https://images.pexels.com/photos/6615234/pexels-photo-6615234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Construction Package"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
            
            <p className="text-gray-600 text-sm">
              Comprehensive construction services including planning, permits, construction, and finishing. Ideal for clients who want a single point of responsibility for their entire project.
            </p>
          </div>
          
          {/* Service Card 3 - Prefab Homes */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Pre-fabricated<br />
              Home Solutions
            </h3>
            <p className="text-gray-600 mb-6">
              Modern, efficient, and faster construction alternative.
            </p>
            
            <div className="bg-gradient-to-r from-yellow-700 via-black to-yellow-600 rounded-lg p-2 h-[200px] mb-6 flex-grow">
              <div className="bg-white rounded-lg h-full flex items-center justify-center">
                <img 
                  src="https://offsitebuilder.com/wp-content/uploads/2023/06/high-efficiency.png" 
                  alt="Prefab Homes"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
            
            <p className="text-gray-600 text-sm">
              Factory-built modular homes offering superior quality, reduced construction time, and sustainable building practices. Perfect for quick, eco-friendly housing solutions.
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;