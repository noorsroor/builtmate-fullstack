// src/components/admin/Sidebar.jsx
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaTools, FaCalendarAlt, FaLightbulb, FaCog, FaUserCircle, FaTimes } from "react-icons/fa";
import logo from "../../assets/images/adminlogo.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [screenSize, setScreenSize] = useState(getScreenSize());
  const location = useLocation();
  
  // Function to determine screen size
  function getScreenSize() {
    const width = window.innerWidth;
    if (width < 375) return 'xs-mobile'; // 320px
    if (width < 425) return 'm-mobile';  // 375px
    if (width < 768) return 'l-mobile';  // 425px
    if (width < 1024) return 'tablet';   // 768px
    return 'desktop';                    // 1024px and up
  }

  // Update screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Determine if we should use mobile layout
  const isMobileView = ['xs-mobile', 'm-mobile', 'l-mobile', 'tablet'].includes(screenSize);

  const links = [
    { name: "Dashboard", path: "/admin", exact: true, icon: <FaTachometerAlt /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Professionals", path: "/admin/professionals", icon: <FaTools /> },
    { name: "Bookings", path: "/admin/bookings", icon: <FaCalendarAlt /> },
    { name: "Ideas", path: "/admin/ideas", icon: <FaLightbulb /> },
    { name: "Profile", path: "/profile", icon: <FaUserCircle /> },
  ];

  // Adjusting width and text size for different screens
  let sidebarWidth, logoWidth, textSize;
  
  switch (screenSize) {
    case 'xs-mobile':
      sidebarWidth = 'w-64';  // Full width for xs mobile
      logoWidth = 'w-28';
      textSize = 'text-sm';
      break;
    case 'm-mobile':
      sidebarWidth = 'w-64';  // Full width for mobile
      logoWidth = 'w-32';
      textSize = 'text-sm';
      break;
    case 'l-mobile':
      sidebarWidth = 'w-64';  // Slightly larger for l-mobile
      logoWidth = 'w-36';
      textSize = 'text-sm';
      break;
    case 'tablet':
      sidebarWidth = 'w-64';
      logoWidth = 'w-40';
      textSize = 'text-base';
      break;
    default:
      sidebarWidth = 'w-64';
      logoWidth = 'w-44';
      textSize = 'text-base';
      break;
  }

  const sidebarClasses = `
    fixed left-0 top-0 h-screen bg-black text-white flex flex-col py-4 md:py-6 z-40
    ${sidebarWidth} transition-transform duration-300 ease-in-out transform
    ${isMobileView && !isOpen ? '-translate-x-full' : 'translate-x-0'}
  `;

  return (
    <>
      {/* Mobile overlay */}
      {isMobileView && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={toggleSidebar}
        />
      )}
      
      <div className={sidebarClasses}>
        <div className="flex items-center justify-between px-4 mb-6">
          <div className={logoWidth}>
            <img src={logo} alt="Admin Logo" className="w-full" />
          </div>
          
          {/* Close button - only shown on mobile view */}
          {isMobileView && (
            <button 
              onClick={toggleSidebar}
              className="text-white hover:text-gray-300 p-1"
            >
              <FaTimes size={18} />
            </button>
          )}
        </div>
        
        <nav className="flex-1 overflow-y-auto px-2 sm:px-3">
          <div className="flex flex-col space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={isMobileView ? toggleSidebar : undefined}
                className={({ isActive }) => {
                  // For Dashboard, only active when path is exactly "/admin"
                  const isLinkActive = link.exact 
                    ? location.pathname === link.path 
                    : isActive;
                    
                  return `flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors duration-200 
                  hover:bg-[#3F3F3F] ${isLinkActive ? "bg-[#303030] text-yellow-400" : "text-white"}`;
                }}
              >
                <div className="text-lg">{link.icon}</div>
                <span className={`font-medium ${textSize}`}>{link.name}</span>
              </NavLink>
            ))}
          </div>
        </nav>
        
        <div className="px-4 py-3">
          <div className={`text-xs text-gray-400 text-center ${screenSize === 'xs-mobile' ? 'text-xs' : 'text-xs'}`}>
            Admin Panel v1.0
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;