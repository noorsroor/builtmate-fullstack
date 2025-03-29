// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     phone: "",
//   });

//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//          await axios.post("http://localhost:5000/api/auth/register", formData, {
//         withCredentials: true,
//       });
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.message || "Signup failed!");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Sign Up</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//         <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
//         <button type="submit">Sign Up</button>
//       </form>
//       <p>Already have an account? <a href="/login">Login</a></p>
//     </div>
//   );
// };

// export default Signup;


// import React, { useEffect,useState } from 'react';
// import { ChevronDown, Eye, EyeOff, Globe } from 'lucide-react';
// import logo from "../assets/images/logo.png";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { useDispatch, useSelector } from 'react-redux';
// import { setLanguage } from '../redux/languageSlice';

// const Signup = () => {
//   const { t, i18n } = useTranslation();
//   const dispatch = useDispatch();
//   const currentLang = useSelector((state) => state.language.language);

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     rePassword: '',
//     phoneNumber: '',
//     address: '',
//     passwordVisible: false,
//     rePasswordVisible: false,
//     termsAgreed: false
//   });

//   useEffect(() => {
//     i18n.changeLanguage(currentLang);
//     document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
//   }, [currentLang, i18n]);

//   const handleLanguageChange = (lang) => {
//     dispatch(setLanguage(lang));
//   };

 

//   const [formErrors, setFormErrors] = useState({});
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const languageOptions = [
//     { code: 'EN', name: 'English' },
//     { code: 'AR', name: 'Arabic' }
//   ];

//   const jordanAddresses = [
//     'Amman', 'Zarqa', 'Irbid', 'Aqaba', 'Mafraq', 
//     'Jerash', 'Madaba', 'Salt', 'Karak', 'Tafila', 
//     'Maan', 'Ajloun'
//   ];

//   const validateField = (name, value) => {
//     switch(name) {
//       case 'email':
//         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
//       case 'password':
//         return value.length >= 8;
//       case 'phoneNumber':
//         return /^(07\d{8})$/.test(value);
//       case 'firstName':
//       case 'lastName':
//         return value.trim().length > 1;
//       case 'rePassword':
//         return value === formData.password;
//       default:
//         return true;
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
    
//     // Update form data
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: type === 'checkbox' ? checked : value
//     }));

//     // Validate field
//     const isValid = validateField(name, value);
//     setFormErrors(prevErrors => ({
//       ...prevErrors,
//       [name]: !isValid
//     }));
//   };

//   const togglePasswordVisibility = (field) => {
//     setFormData(prevState => ({
//       ...prevState,
//       [`${field}Visible`]: !prevState[`${field}Visible`]
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate all fields
//     const errors = {};
//     Object.keys(formData).forEach(key => {
//       if (['passwordVisible', 'rePasswordVisible', 'language'].includes(key)) return;
//       const isValid = validateField(key, formData[key]);
//       if (!isValid) errors[key] = true;
//     });

//     setFormErrors(errors);

//     // Submit if no errors
//     if (Object.keys(errors).length === 0) {
//       try {
//         // Prepare data for server
//         const signupData = {
//           firstname: formData.firstName,
//           lastname: formData.lastName,
//           email: formData.email,
//           password: formData.password,
//           phone: formData.phoneNumber,
//           address: formData.address,
//         };
//         console.log(signupData);
//         await axios.post("http://localhost:5000/api/auth/register", signupData, {
//           withCredentials: true
//         });
        
//         // Redirect to login page after successful signup
//         navigate("/login");
//       } catch (err) {
//         setError(err.response?.data?.message || "Signup failed!");
//       }
//     }
//   };

//   // Rest of your component remains the same...
//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">
//       {/* Header */}
//       <div className="absolute top-0 left-0 right-0 p-4 flex gab-20 items-center">
//         <div className="flex items-center">
//           <img 
//             src={logo} 
//             alt="Corals Logo" 
//             className="w-10 h-10 mr-2"
//           />
//           <span className="text-xl font-bold text-gray-800">BuiltMate</span>
//         </div>
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <select 
//               value={formData.language}
//               onChange={(e) => handleInputChange(e)}
//               name="language"
//               className="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               {languageOptions.map((lang) => (
//                 <option key={lang.code} value={lang.code}>
//                   {lang.name}
//                 </option>
//               ))}
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//               <Globe className="w-5 h-5" />
//             </div>
//           </div>
//         </div>
//       </div>
import React, { useEffect, useState } from 'react';
import { ChevronDown, Eye, EyeOff, Globe,Check } from 'lucide-react';
import logo from "../assets/images/logo.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../redux/languageSlice';
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";


const Signup = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLang = useSelector((state) => state.language.language);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',
    phoneNumber: '',
    address: '',
    passwordVisible: false,
    rePasswordVisible: false,
    termsAgreed: false
  });

  const [fieldTouched, setFieldTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    rePassword: false,
    phoneNumber: false,
    address: false,
    termsAgreed: false
  });

  const jordanAddresses = [
    'Amman', 'Zarqa', 'Irbid', 'Aqaba', 'Mafraq', 
    'Jerash', 'Madaba', 'Salt', 'Karak', 'Tafila', 
    'Maan', 'Ajloun'
  ];

  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' }
  ];

  useEffect(() => {
    i18n.changeLanguage(currentLang);
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang, i18n]);

  const validateField = (name, value) => {
    const errors = { ...formErrors };
    const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^07[7-9]\d{7}$/;

    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          errors.firstName = 'First name is required';
        } else if (!nameRegex.test(value)) {
          errors.firstName = 'Invalid first name';
        } else {
          delete errors.firstName;
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          errors.lastName = 'Last name is required';
        } else if (!nameRegex.test(value)) {
          errors.lastName = 'Invalid last name';
        } else {
          delete errors.lastName;
        }
        break;
      case 'email':
        if (!value) {
          errors.email = 'Email is required';
        } else if (!emailRegex.test(value)) {
          errors.email = 'Invalid email format';
        } else {
          delete errors.email;
        }
        break;
      case 'password':
        if (!value) {
          errors.password = 'Password is required';
        } else if (value.length < 8) {
          errors.password = 'Password must be at least 8 characters';
        } else {
          delete errors.password;
          // Validate password confirmation if it exists
          if (formData.rePassword && value !== formData.rePassword) {
            errors.rePassword = 'Passwords do not match';
          } else if (formErrors.rePassword) {
            delete errors.rePassword;
          }
        }
        break;
      case 'rePassword':
        if (!value) {
          errors.rePassword = 'Please confirm your password';
        } else if (value !== formData.password) {
          errors.rePassword = 'Passwords do not match';
        } else {
          delete errors.rePassword;
        }
        break;
      case 'phoneNumber':
        if (!value) {
          errors.phoneNumber = 'Phone number is required';
        } else if (!phoneRegex.test(value)) {
          errors.phoneNumber = 'Invalid phone number (07XXXXXXXX)';
        } else {
          delete errors.phoneNumber;
        }
        break;
      case 'address':
        if (!value) {
          errors.address = 'Address is required';
        } else {
          delete errors.address;
        }
        break;
      case 'termsAgreed':
        if (!value) {
          errors.termsAgreed = 'You must agree to the terms';
        } else {
          delete errors.termsAgreed;
        }
        break;
      default:
        break;
    }

    setFormErrors(errors);
  };

  const handleLanguageChange = (lang) => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));

    // Validate field as user types if it's been touched
    if (fieldTouched[name]) {
      validateField(name, newValue);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setFieldTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field when it loses focus
    validateField(name, value);
  };

  const togglePasswordVisibility = (field) => {
    setFormData(prevState => ({
      ...prevState,
      [`${field}Visible`]: !prevState[`${field}Visible`]
    }));
  };

  const validateForm = () => {
    // Mark all fields as touched to show all errors
    const touchedFields = {};
    Object.keys(fieldTouched).forEach(key => {
      touchedFields[key] = true;
    });
    setFieldTouched(touchedFields);

    // Validate all fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key in fieldTouched) {
        validateField(key, value);
      }
    });

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isValid = validateForm();
    if (!isValid) return;

    try {
      const signupData = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phoneNumber,
        address: formData.address,
      };

      const res=await axios.post("http://localhost:5000/api/auth/register", signupData, {
        withCredentials: true
      });
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: res.data.message,
        confirmButtonColor: "#E7A624",
        confirmButtonText: "Go to Login",
      }).then(() => {
        navigate("/login");
      });
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed!");
     
    }
  };

  const renderInputWithValidation = (name, label, type, placeholder, additionalProps = {}) => {
    const isPasswordField = type === 'password';
    const isValid = fieldTouched[name] && !formErrors[name];
    
    return (
      <div>
        <label className="block text-gray-700 font-medium mb-2">{label}*</label>
        <div className="relative">
          <input 
            type={isPasswordField 
              ? (formData[`${name}Visible`] ? "text" : "password") 
              : type
            }
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 
              ${formErrors[name] 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-yellow-500'}
              ${isValid ? 'pr-10' : ''}`}
            required
            {...additionalProps}
          />
          {isPasswordField && (
            <button 
              type="button"
              onClick={() => togglePasswordVisibility(name)}
              className="absolute inset-y-0 right-0 px-3 flex items-center cursor-pointer"
            >
              {formData[`${name}Visible`] ? <EyeOff className="text-gray-500" /> : <Eye className="text-gray-500" />}
            </button>
          )}
          {isValid && (
            <div className="absolute inset-y-0 right-0 px-3 flex items-center">
              <Check className="text-green-500 w-5 h-5" />
            </div>
          )}
        </div>
        {fieldTouched[name] && formErrors[name] && (
          <p className="text-red-500 text-sm mt-1">{formErrors[name]}</p>
        )}
      </div>
    );
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center ">
        <div className="flex items-center">
          <img src={logo} alt="BuiltMate Logo" className="w-10 h-10 mr-2" />
          <span className="text-xl font-bold text-gray-800">BuiltMate</span>
        </div>

        {/* Language Selector */}
        <div className="relative">
          <select 
            value={currentLang} 
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {languageOptions.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <Globe className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Signup Form Section */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center mt-16">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create your account</h1>
            <p className="text-gray-600">Let's get started with your 30 days free trial</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Google Login Button */}
          <button className="cursor-pointer w-full flex items-center justify-center border border-gray-300 rounded-lg py-3 mb-4 hover:bg-gray-50 transition">
  <FcGoogle className="mr-2 w-6 h-6" />
  Sign up with Google
</button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Name Fields */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  {renderInputWithValidation(
                    'firstName', 
                    'First Name', 
                    'text', 
                    'First Name'
                  )}
                </div>
                <div className="w-1/2">
                  {renderInputWithValidation(
                    'lastName', 
                    'Last Name', 
                    'text', 
                    'Last Name'
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                {renderInputWithValidation(
                  'email', 
                  'Email', 
                  'email', 
                  'Enter your email'
                )}
              </div>

              {/* Password Fields */}
              <div className="space-y-4">
                <div>
                  {renderInputWithValidation(
                    'password', 
                    'Password', 
                    'password', 
                    'Enter your password'
                  )}
                </div>

                <div>
                  {renderInputWithValidation(
                    'rePassword', 
                    'Confirm Password', 
                    'password', 
                    'Confirm your password'
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div>
                {renderInputWithValidation(
                  'phoneNumber', 
                  'Phone Number', 
                  'tel', 
                  '07XXXXXXXX'
                )}
              </div>

              {/* Address Dropdown */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Choose Address*</label>
                <div className="relative">
                  <select
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border rounded-lg appearance-none focus:outline-none focus:ring-2 
                      ${formErrors.address 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-yellow-500'}
                      ${fieldTouched.address && !formErrors.address ? 'pr-10' : ''}`}
                    required
                  >
                    <option value="">Select Address</option>
                    {jordanAddresses.map((address) => (
                      <option key={address} value={address}>
                        {address}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                  {fieldTouched.address && !formErrors.address && (
                    <div className="absolute inset-y-0 right-10 flex items-center">
                      <Check className="text-green-500 w-5 h-5" />
                    </div>
                  )}
                </div>
                {fieldTouched.address && formErrors.address && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  name="termsAgreed"
                  checked={formData.termsAgreed}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="mt-1 mr-2 rounded text-yellow-600 focus:ring-yellow-500 cursor-pointer"
                  required
                />
                <label className="text-gray-700">
                  I agree to all Term, Privacy Policy and Fees
                  {fieldTouched.termsAgreed && formErrors.termsAgreed && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.termsAgreed}</p>
                  )}
                </label>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-4 text-center">
            <span className="text-gray-600">Already have an account? </span>
            <a href="/login" className="text-yellow-600 font-medium hover:underline">Log in</a>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden md:block md:w-1/2 relative bg-gray-100">
        <div className="absolute inset-0 bg-cover bg-center bg-white" ></div>
        <div className="absolute rounded-[20px] mt-5 mb-5 mr-5 inset-0 bg-opacity-20" style={{
          backgroundImage: 'url("https://i.pinimg.com/736x/fb/b0/ab/fbb0ab89fe63dee3639f2dad1059860f.jpg")',
          backgroundPosition: 'center'
        }}></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Discovering the Best Furniture for Your Home</h2>
          <p className="mb-6">Our practice is Designing Complete Environments exceptional buildings communities and place in special situations</p>
          
          <div className="flex space-x-4">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              100% Guarantee
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Free delivery London area
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;