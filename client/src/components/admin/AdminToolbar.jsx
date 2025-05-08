// src/components/admin/AdminToolbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { useSelector ,useDispatch} from "react-redux"; // assuming you use Redux for auth
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaBars } from "react-icons/fa";
import icon from "../../assets/images/account.png"
import { logout } from '../../redux/authSlice'; // Assuming you have a logout action

const AdminToolbar = ({ title, toggleSidebar }) => {
  const user = useSelector((state) => state.auth.user); // adjust based on your store
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [screenSize, setScreenSize] = useState(getScreenSize());
  const dispatch = useDispatch();
  
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
  
  const handleLogout = () => {
        dispatch(logout());
        navigate('/');
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Adjust title size based on screen size
  let titleSize, iconSize, dropdownWidth;
  
  switch (screenSize) {
    case 'xs-mobile':
      titleSize = 'text-base';
      iconSize = 16;
      dropdownWidth = 'w-40';
      break;
    case 'm-mobile':
      titleSize = 'text-lg';
      iconSize = 16;
      dropdownWidth = 'w-44';
      break;
    case 'l-mobile':
      titleSize = 'text-lg';
      iconSize = 18;
      dropdownWidth = 'w-48';
      break;
    case 'tablet':
      titleSize = 'text-xl';
      iconSize = 20;
      dropdownWidth = 'w-48';
      break;
    default:
      titleSize = 'text-xl';
      iconSize = 20;
      dropdownWidth = 'w-48';
      break;
  }

  return (
    <header className="flex items-center h-[60px] justify-between px-3 sm:px-4 md:px-6 py-2 md:py-3 bg-white shadow-sm">
      <div className="flex items-center">
        {/* Mobile sidebar toggle */}
        <button 
          onClick={toggleSidebar}
          className="mr-2 sm:mr-3 text-gray-600 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <FaBars size={iconSize} />
        </button>
        
        <h1 className={`${titleSize} font-semibold text-gray-700 truncate`}>
          {title || "Admin Panel"}
        </h1>
      </div>
      
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-1 sm:gap-2 py-1 px-1 sm:px-2 rounded-md hover:bg-gray-100"
        >
          <img
            src={user?.profileImage || icon}
            alt="admin"
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
          />
          <span className="text-xs sm:text-sm font-medium text-gray-700  xs:block">
            {user?.firstname+ " "+ user?.lastname || "nnnn"}
          </span>
        </button>
        
        {/* Dropdown menu */}
        {dropdownOpen && (
          <div className={`absolute right-0 mt-1 sm:mt-2 ${dropdownWidth} bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200`}>
            <button
              onClick={() => {
                navigate("/profile");
                setDropdownOpen(false);
              }}
              className="flex items-center w-full px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
            >
              <FaUserCircle className="mr-2" size={iconSize - 2} />
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-xs sm:text-sm text-red-600 hover:bg-gray-100"
            >
              <FaSignOutAlt className="mr-2" size={iconSize - 2} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminToolbar;