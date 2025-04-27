import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../redux/languageSlice';
import { logout } from '../redux/authSlice'; // Assuming you have a logout action
import logo from '../assets/images/logo.png';
import { PiToolboxFill } from "react-icons/pi";
import { IoNotifications } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentLang = useSelector((state) => state.language.language);
  const user = useSelector((state) => state.auth.user); // Get current user from Redux
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
console.log(user)
  useEffect(() => {
    i18n.changeLanguage(currentLang);
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang, i18n]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuRef]);



  const handleLanguageChange = (lang) => {
    dispatch(setLanguage(lang));
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setUserMenuOpen(false);
    navigate('/');
  };

  const handleJoinClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      user.subscription ? navigate("/joinform") : navigate("/plans");
    }
  };

  const handleGoBookmark= () => {
    navigate(`/profile`);
  };

  const getInitial = () => {
    if (user && user.firstname) {
      return user.firstname.charAt(0).toUpperCase()+user.lastname.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <>
      <nav className="bg-white shadow-md backdrop-blur-md bg-white/95 sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-8xl ml-10 mr-10 mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between h-22">
            <div className="flex items-center">
              <img src={logo} alt="BuildMate Logo" className="h-10 w-10 mr-2" />
              <h1 className="text-2xl font-bold">
                <span className="text-black text-[36px]" style={{fontFamily:`"Caveat"`}}>Build</span>
                <span className="text-[#E7A624]" style={{fontFamily:`"Caveat"`}}>Mate</span>
              </h1>
            </div>

            {/* Toggle Button for Mobile */}
            <div className="flex md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-500 hover:text-yellow-600 focus:outline-none"
              >
                {menuOpen ? '✖' : '☰'}
              </button>
            </div>

            {/* Links for Desktop */}
            <div className="hidden md:flex items-center space-x-8 ">
      {["/", "/ideas", "/findPro", "/shops"].map((path, index) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `font-semibold px-4 py-1 rounded-md transition duration-300 ${
              isActive
                ? "bg-white text-black ring-1 ring-[#E7A624]"
                : "text-black hover:bg-gray-100"
            }`
          }
        >
          {t(["nav.home", "nav.ideas", "nav.findPro", "nav.shops"][index])}
        </NavLink>
      ))}

      {/* Conditionally Render "Join as Pro" or "Add Project" */}
      {user?.role === "pro" ? (
        <NavLink
          to="/add-project"
          className="bg-gray-900  text-white font-semibold text-[14px] px-4 py-2 rounded-md hover:bg-gray-300 hover:text-black transition duration-300"
        >
          Add Project
        </NavLink>
      ) : (
        <button
          onClick={handleJoinClick}
          className="bg-gray-900 flex gap-2  text-white cursor-pointer text-[14px] font-semibold px-4 py-2 rounded-md hover:bg-gray-300 hover:text-black  transition duration-300"
        >
          <PiToolboxFill className=' text-[20px]'/> Join as Pro
        </button>
      )}
    </div>

            <div className='hidden md:flex items-center space-x-4'>
              <div className="relative">
                <button
                  className="py-2 px-5 rounded-full"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {currentLang.toUpperCase()}▾
                </button>
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-md">
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      EN
                    </button>
                    <button
                      onClick={() => handleLanguageChange('ar')}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      AR
                    </button>
                  </div>
                )}
              </div>

              {/* Conditional rendering based on user authentication status */}
              {user ? (
                <div className="flex items-center space-x-4">
                  {/* Bookmark icon */}
                  <button onClick={() => handleGoBookmark()} className="text-black cursor-pointer hover:text-yellow-500 text-[16px] focus:outline-none">
                   <FaBookmark/>
                  </button>
                  
                  {/* Notification bell */}
                  {/* <button className="text-black cursor-pointer hover:text-yellow-500 text-[20px]  focus:outline-none">
                    <IoNotifications/>
                  </button> */}
                  
                  {/* User dropdown */}
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center space-x-2 focus:outline-none"
                    >
                      
                      {/* User avatar */}
                      {user?.profilePicture ?(
                      <img 
                    className="w-10 h-10 rounded-full bg-gray-300 filter grayscale" 
                    src={user?.profilePicture || './assets/images/user.png'} 
                    alt="profile image"
                  />
                      ):(
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 filter grayscale">
                        <span>{getInitial()}</span>
                        </div>
                      )}
                      
                      <span className="font-medium">{user.firstname +" "+ user.lastname || 'username'}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-1 z-[500]">
                        <Link 
                          to="/profile" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          {t('user.profile') || 'Profile'}
                        </Link>
                        {/* <Link 
                          to="/settings" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          {t('user.settings') || 'Settings'}
                        </Link> */}
                        <div className="border-t border-gray-200 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          {t('user.logout') || 'Logout'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-[#E7A624] font-bold flex items-center text-black py-2 text-[12px] px-5 rounded-full shadow-md transition duration-300 hover:bg-yellow-600 hover:shadow-lg"
                  style={{ boxShadow: '0 0 10px rgba(234, 179, 8, 0.5)' }}
                >
                  {t('nav.login')}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['/', '/ideas', '/findPro', '/shops'].map((path, index) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                      isActive ? 'bg-yellow-500 text-white' : 'text-black hover:bg-gray-100'
                    }`
                  }
                  onClick={closeMenu}
                >
                  {t(['nav.home', 'nav.ideas', 'nav.findPro', 'nav.shops'][index])}
                </NavLink>
              ))}
            </div>
            <div className='md:hidden px-3 py-2'>
              <div className="flex justify-center mt-2">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className="px-4 py-2 text-sm hover:bg-gray-100"
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange('ar')}
                  className="px-4 py-2 text-sm hover:bg-gray-100"
                >
                  AR
                </button>
              </div>

              {/* Conditional rendering for mobile */}
              {user ? (
                <div className="mt-3 border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center px-3 mb-3">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center text-white mr-2"></div>
                      <span className="font-medium">{user.username || 'username'}</span>
                    </div>
                    <div className="flex space-x-4">
                      <button className="text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                      <button className="text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    {t('user.profile') || 'Profile'}
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    {t('user.settings') || 'Settings'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-100"
                  >
                    {t('user.logout') || 'Logout'}
                  </button>
                </div>
              ) : (
                <Link
                  to="/signup"
                  className="block text-center bg-[#E7A624] text-white py-2 mt-2 text-[12px] rounded-full shadow-md transition duration-300 hover:bg-yellow-700 hover:shadow-lg"
                  style={{ boxShadow: '0 0 10px rgba(234, 179, 8, 0.5)' }}
                  onClick={closeMenu}
                >
                  {t('nav.signUp')}
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export { Navbar };