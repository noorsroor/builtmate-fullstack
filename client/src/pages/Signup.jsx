import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../redux/languageSlice';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [accountType, setAccountType] = useState('homeowner');
  const [showPassword, setShowPassword] = useState(false);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLang = useSelector((state) => state.language.language);
  const [isOpen, setIsOpen] = useState(false);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };


  useEffect(() => {
    i18n.changeLanguage(currentLang);
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang, i18n]);

  const handleLanguageChange = (lang) => {
    dispatch(setLanguage(lang));
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Left Side - Video Background */}
      <div className="relative w-full md:w-2/5 flex flex-col justify-center p-8 text-center md:text-left">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video 
            className="absolute inset-0 w-full h-full object-cover "
            autoPlay 
            muted 
            loop
          >
            <source src="https://videos.pexels.com/video-files/7646445/7646445-uhd_1440_2560_25fps.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            Start your journey to building your dream home with <span className="font-script">Build<span className="text-yellow-500">Mate</span></span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mt-12 text-slate-800">Join us today!</h2>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-3/5 flex items-center justify-center rounded-l-lg p-6">
       {/* LOGIN FORM */}
       <div className={`${isLogin ? 'block' : 'hidden'} transition-opacity duration-500 ${isLogin ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Welcome back</h2>
            </div>

            <div className="mb-6">
              <p className="text-gray-600">Don't have an account? <button onClick={toggleAuthMode} className="text-yellow-500 font-bold">Sign up</button></p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-600 mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-600 mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <a href="#" className="text-sm text-yellow-500">Forgot password?</a>
              </div>
            </div>

            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg mb-6">
              Login
            </button>

            <div className="flex items-center justify-between my-4">
              <hr className="w-full border-gray-300" />
              <span className="px-4 text-gray-500 bg-white">OR</span>
              <hr className="w-full border-gray-300" />
            </div>

            <button className="w-full flex items-center justify-center border border-gray-300 rounded-full py-3 px-4 hover:bg-gray-50">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          {/* SIGNUP FORM */}
          <div className={`${!isLogin ? 'block' : 'hidden'} transition-opacity duration-500 ${!isLogin ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full h-full max-w-lg">
        <div className="flex justify-between items-center mb-20">
        <Link
                to="/"
                class="bg-white text-center w-48 rounded-2xl h-10 relative text-black text-md font-semibold group"
                type="button"
              >
                <div
                  class="bg-yellow-400 rounded-xl h-10 w-1/3 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[130px] z-10 duration-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    height="25px"
                    width="25px"
                  >
                    <path
                      d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                      fill="#000000"
                    ></path>
                    <path
                      d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                      fill="#000000"
                    ></path>
                  </svg>
                </div>
                <p class="mt-3 ml-1 translate-x-2">Go Back</p>
              </Link>
            <div className="relative">
                <button
                  className="py-2 px-5 rounded-full"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {currentLang.toUpperCase()}▾
                </button>
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-35 bg-white border rounded shadow-md">
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className="w-full text-left px-4 py-2 hover:bg-yellow-100"
                    >
                      English (UK)
                    </button>
                    <button
                      onClick={() => handleLanguageChange('ar')}
                      className="w-full text-left px-4 py-2 hover:bg-yellow-100"
                    >
                      Arabic (AR)
                    </button>
                  </div>
                )}
              </div>
          </div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Create your account with us below</h2>
          </div>

          <div className="mb-6">
          <p className="text-gray-600">Already have an account? <button onClick={toggleAuthMode} className="text-yellow-500 font-bold">Login</button></p>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 mb-2">You're creating an account as?</p>
            <div className="flex gap-4">
              <div 
                className={`flex-1 border rounded-lg p-4 cursor-pointer flex items-center ${
                  accountType === 'homeowner' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300'
                }`}
                onClick={() => setAccountType('homeowner')}
              >
                <div className={`h-5 w-5 rounded-full border mr-2 flex items-center justify-center ${
                  accountType === 'homeowner' ? 'border-yellow-500' : 'border-gray-300'
                }`}>
                  {accountType === 'homeowner' && (
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  )}
                </div>
                <span className="font-medium">As Home Owner</span>
              </div>
              
              <div 
                className={`flex-1 border rounded-lg p-4 cursor-pointer flex items-center ${
                  accountType === 'professional' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300'
                }`}
                onClick={() => setAccountType('professional')}
              >
                <div className={`h-5 w-5 rounded-full border mr-2 flex items-center justify-center ${
                  accountType === 'professional' ? 'border-yellow-500' : 'border-gray-300'
                }`}>
                  {accountType === 'professional' && (
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  )}
                </div>
                <span className="font-medium">As a Professional</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 mb-2">Full Name</label>
            <input 
              type="text" 
              placeholder="David Goliath" 
              className="w-full px-4 py-3  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Create your password" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Only show these fields if accountType is 'professional' */}
{accountType === 'professional' && (
  <>
    <div className="mb-6">
      <label className="block text-gray-600 mb-2">Profession / Category</label>
      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white">
        <option value="" disabled selected>Select your profession</option>
        <option value="carpenter">Carpenter</option>
        <option value="plumber">Plumber</option>
        <option value="architect">Architect</option>
        <option value="electrician">Electrician</option>
        <option value="painter">Painter</option>
        <option value="interior-designer">Interior Designer</option>
        <option value="landscaper">Landscaper</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div className="mb-6">
      <label className="block text-gray-600 mb-2">Years of Experience</label>
      <input 
        type="number" 
        min="0"
        placeholder="Enter years of experience" 
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
    </div>

    <div className="mb-6">
      <label className="block text-gray-600 mb-2">About Me / Short Bio</label>
      <textarea
        rows="4"
        placeholder="Tell potential clients about yourself and your services..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
      ></textarea>
    </div>

    <div className="mb-6">
      <label className="block text-gray-600 mb-2">Portfolio Upload</label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          id="portfolio-upload"
        />
        <label htmlFor="portfolio-upload" className="cursor-pointer">
          <div className="flex flex-col items-center">
            <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="mt-2 text-gray-600">Upload images/videos of your past work</span>
            <span className="mt-1 text-sm text-gray-500">Drag and drop or click to browse</span>
          </div>
        </label>
      </div>
    </div>

    <div className="mb-6">
      <label className="block text-gray-600 mb-2">Upload Government ID / Business License</label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          id="license-upload"
        />
        <label htmlFor="license-upload" className="cursor-pointer">
          <div className="flex flex-col items-center">
            <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="mt-2 text-gray-600">Upload your ID or business license</span>
            <span className="mt-1 text-sm text-gray-500">Required for approval process</span>
          </div>
        </label>
      </div>
    </div>

    <div className="mb-6">
      <label className="block text-gray-600 mb-2">Service Areas</label>
      <input 
        type="text" 
        placeholder="Enter cities or areas where you provide services" 
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
    </div>

    <div className="mb-6">
      <label className="block text-gray-600 mb-2">Availability</label>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Working Days</label>
          <div className="flex flex-wrap gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <label key={day} className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-yellow-500" />
                <span className="ml-1 text-sm">{day}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Working Hours</label>
          <div className="flex items-center">
            <select className="w-full px-2 py-1 border border-gray-300 rounded-lg mr-2">
              <option>08:00 AM</option>
              <option>09:00 AM</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
            </select>
            <span className="mx-2">to</span>
            <select className="w-full px-2 py-1 border border-gray-300 rounded-lg">
              <option>04:00 PM</option>
              <option>05:00 PM</option>
              <option>06:00 PM</option>
              <option>07:00 PM</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </>
)}

{/* Terms & Conditions (show for both user types) */}
<div className="mb-6">
  <label className="inline-flex items-center">
    <input type="checkbox" className="form-checkbox h-4 w-4 text-yellow-500" />
    <span className="ml-2 text-gray-600">
      I agree to the <a href="#" className="text-yellow-500">Terms and Conditions</a>
    </span>
  </label>
</div>

          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg mb-6">
            Create Account
          </button>

          <div className="flex items-center justify-between my-4">
            <hr className="w-full border-gray-300" />
            <span className="px-4 text-gray-500 bg-white">OR</span>
            <hr className="w-full border-gray-300" />
          </div>

          <button className="w-full flex items-center justify-center border border-gray-300 rounded-full py-3 px-4 hover:bg-gray-50">
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Signup;