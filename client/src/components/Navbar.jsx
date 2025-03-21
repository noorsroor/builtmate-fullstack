import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../redux/languageSlice';
import logo from '../assets/images/logo.png';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLang = useSelector((state) => state.language.language);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // 👉 State for mobile menu

  useEffect(() => {
    i18n.changeLanguage(currentLang);
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang, i18n]);

  const handleLanguageChange = (lang) => {
    dispatch(setLanguage(lang));
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // 👉 Toggle mobile menu
  };

  const closeMenu = () => {
    setMenuOpen(false); // 👉 Close mobile menu on link click
  };

  return (
    <>
      <nav className="bg-white shadow-md backdrop-blur-md bg-white/95 sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-8xl ml-10 mr-10 mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between h-22">
            <div className="flex items-center">
              <img src={logo} alt="BuildMate Logo" className="h-10 w-10 mr-2" />
              <h1 className="text-2xl font-bold">
                <span className="text-black  text-[36px]" style={{fontFamily:`"Caveat"`}}>Build</span>
                <span className="text-[#E7A624]" style={{fontFamily:`"Caveat"`}}>Mate</span>
              </h1>
            </div>

            {/* 🔄 Toggle Button for Mobile */}
            <div className="flex md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-500 hover:text-yellow-600 focus:outline-none"
              >
                {menuOpen ? '✖' : '☰'}
              </button>
            </div>

            {/* 🔄 Links for Desktop */}
            <div className="hidden md:flex items-center space-x-8 flex items-center space-x-8 bg-white rounded-full py-2 px-6 shadow-md" style={{ boxShadow: '0 0 10px rgba(234, 179, 8, 0.5)' }}>
              {['/', '/ideas', '/findPro', '/shops'].map((path, index) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `font-semibold px-4 py-1 rounded-md transition duration-300 ${
                      isActive
                        ? 'bg-[#FFF4DE] text-black ring-1 ring-[#E7A624]'
                        : 'text-black hover:bg-yellow-100'
                    }`
                  }
                >
                  {t(['nav.home', 'nav.ideas', 'nav.findPro', 'nav.shops'][index])}
                </NavLink>
              ))}
            </div>

              <div className='hidden md:flex row'>
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
                      className="w-full text-left px-4 py-2 hover:bg-yellow-100"
                    >
                      EN
                    </button>
                    <button
                      onClick={() => handleLanguageChange('ar')}
                      className="w-full text-left px-4 py-2 hover:bg-yellow-100"
                    >
                      AR
                    </button>
                  </div>
                )}
              </div>

              <Link
                to="/signup"
                className="bg-[#E7A624] font-bold flex items-center text-black py-2 text-[12px] px-5 rounded-full shadow-md transition duration-300 hover:bg-yellow-600 hover:shadow-lg"
                style={{ boxShadow: '0 0 10px rgba(234, 179, 8, 0.5)' }}
              >
                {t('nav.signUp')}
              </Link>
              </div>
          </div>
        </div>

        {/* 🔄 Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['/', '/ideas', '/findPro', '/shops'].map((path, index) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                      isActive ? 'bg-yellow-500 text-white' : 'text-black hover:bg-yellow-100'
                    }`
                  }
                  onClick={closeMenu}
                >
                  {t(['nav.home', 'nav.ideas', 'nav.findPro', 'nav.shops'][index])}
                </NavLink>
              ))}
             </div>
<div className='md:hidden'>
              <div className="flex justify-center mt-2">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className="px-4 py-2 text-sm hover:bg-yellow-100"
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange('ar')}
                  className="px-4 py-2 text-sm hover:bg-yellow-100"
                >
                  AR
                </button>
              </div>

              <Link
                to="/signup"
                className="block text-center bg-[#E7A624] text-white py-2 mt-2 text-[12px] rounded-full shadow-md transition duration-300 hover:bg-yellow-700 hover:shadow-lg"
                style={{ boxShadow: '0 0 10px rgba(234, 179, 8, 0.5)' }}
                onClick={closeMenu}
              >
                {t('nav.signUp')}
              </Link>
              </div>
          
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export { Navbar };
