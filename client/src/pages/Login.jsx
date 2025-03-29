
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Globe } from "lucide-react";
import logo from "../assets/images/logo.png";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordVisible: false
  });
  const [error, setError] = useState(null);
  const [forgotPasswordStage, setForgotPasswordStage] = useState(0); // 0: login, 1: forgot password, 2: reset code, 3: new password
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const languageOptions = [
    { code: 'EN', name: 'English' },
    { code: 'AR', name: 'Arabic' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setFormData(prev => ({
      ...prev,
      passwordVisible: !prev.passwordVisible
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login", 
        { email: formData.email, password: formData.password }, 
        { withCredentials: true }
      );
      dispatch(loginSuccess(data.user));
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        confirmButtonColor: "#E7A624",
        confirmButtonText: "Go to Home",
      }).then(() => {
        navigate("/");
      });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      // This would typically be an API call to send reset instructions
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email: resetEmail });
      setError(null);
      setForgotPasswordStage(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset instructions");
    }
  };

  const handleResetCodeSubmit = async  (e) => {
    e.preventDefault();
  try {
      await axios.post("http://localhost:5000/api/auth/verify-otp", {
      email: resetEmail,
      otp: resetCode.join("")
    });
    setError(null);
    setForgotPasswordStage(3); // Move to new password input
  } catch (err) {
    setError(err.response?.data?.message || "Invalid or expired OTP");
  }
  };

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to reset password
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        email: resetEmail,
        newPassword: newPassword
      });
      Swal.fire({
        icon: "success",
        title: "Password Reset Successful",
        confirmButtonColor: "#E7A624",
        confirmButtonText: "Go To Login",
      }).then(() => {
        setError(null);
        setForgotPasswordStage(0);
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    }
  };

  const renderLoginForm = () => {
    return (
      <div className="max-w-md mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back</h1>
          <p className="text-gray-600">Log in to your BuiltMate account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Google Login Button */}
        <button className="cursor-pointer w-full flex items-center justify-center border border-gray-300 rounded-lg py-3 mb-4 hover:bg-gray-50 transition">
          <FcGoogle className="mr-2 w-6 h-6" />
          Login with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email*</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Password*</label>
              <div className="relative">
                <input 
                  type={formData.passwordVisible ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
                <button 
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 px-3 flex items-center cursor-pointer"
                >
                  {formData.passwordVisible ? <EyeOff className="text-gray-500" /> : <Eye className="text-gray-500" />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button 
                type="button" 
                onClick={() => setForgotPasswordStage(1)}
                className="text-yellow-600 text-sm hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
            >
              Log In
            </button>
          </div>
        </form>

        {/* Signup Link */}
        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <a href="/signup" className="text-yellow-600 font-medium hover:underline cursor-pointer">
            Sign up
          </a>
        </div>
      </div>
    );
  };

  const renderForgotPasswordForm = () => {
    return (
      <div className="max-w-md mx-auto w-full text-center">
        {/* Fingerprint icon */}
      <div className="mb-8 flex justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="border border-gray-300 rounded-[15px] shadow-md p-3 h-15 w-15 text-gray-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" 
          />
        </svg>
      </div>
  
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot password?</h1>
          <p className="text-gray-600">No worries, we'll send you reset instructions.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
  
        <form onSubmit={handleForgotPasswordSubmit}>
          <div className="space-y-4">
            <input 
              type="email" 
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
  
            <button 
              type="submit" 
              className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition cursor-pointer"
            >
              Reset password
            </button>
          </div>
        </form>
  
        <div className="mt-4 text-center">
          <button 
            onClick={() => setForgotPasswordStage(0)}
            className="text-yellow-600 text-sm hover:underline cursor-pointer"
          >
            ← Back to log in
          </button>
        </div>
      </div>
    );
  };


  const renderResetCodeForm = () => {
    return (
      <div className="max-w-md mx-auto w-full">
        {/* Email icon at the top */}
        <div className="mb-8 flex justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="border border-gray-300 rounded-[15px] shadow-md p-3 h-15 w-15 text-gray-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
            />
          </svg>
        </div>
  
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Password reset</h1>
          <p className="text-gray-600">We sent a code to {resetEmail}</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
  
        <form onSubmit={handleResetCodeSubmit}>
          <div className="space-y-6">
            <div className="flex justify-center space-x-4">
              {['', '','',''].map((_, index) => (
                <input 
                  key={index}
                  type="text" 
                  maxLength="1"
                  value={resetCode[index] || ''}
                  onChange={(e) => {
                    const newCode = [...resetCode];
                    newCode[index] = e.target.value;
                    setResetCode(newCode);
                    // Auto-focus to next input
                    if (e.target.value && e.target.nextSibling) {
                      e.target.nextSibling.focus();
                    }
                  }}
                  className="w-16 h-16 text-center text-3xl font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              ))}
            </div>
  
            <button 
              type="submit" 
              className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition font-medium cursor-pointer"
            >
              Continue
            </button>
          </div>
        </form>
  
        <div className="mt-6 text-center space-y-2">
          <button 
            className="text-yellow-600 text-sm hover:underline cursor-pointer"
          >
            Didn't receive the email? Click to resend
          </button>
          <div className="mt-4 text-center">
          <button 
            onClick={() => setForgotPasswordStage(0)}
            className="text-yellow-600 text-sm hover:underline cursor-pointer"
          >
            ← Back to log in
          </button>
        </div>
        </div>
      </div>
    );
  };

  const renderNewPasswordForm = () => {
    return (
      <div className="max-w-md mx-auto w-full px-4">
        {/* Key icon at the top */}
        <div className="mb-6 flex justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="border border-gray-300 rounded-[15px] shadow-md p-3 h-15 w-15 text-gray-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" 
            />
          </svg>
        </div>
  
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Set new password</h1>
          <p className="text-gray-500">Must be at least 8 characters.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
  
        <form onSubmit={handleNewPasswordSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Password</label>
            <input 
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
              minLength="8"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Confirm password</label>
            <input 
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
              minLength="8"
            />
          </div>
  
          <button 
            type="submit" 
            className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition font-medium shadow-sm cursor-pointer"
          >
            Reset password
          </button>
        </form>
  
        <div className="mt-4 text-center">
          <button 
            onClick={() => setForgotPasswordStage(0)}
            className="text-yellow-600 text-sm hover:underline cursor-pointer"
          >
            ← Back to log in
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src={logo} 
            alt="BuiltMate Logo" 
            className="w-10 h-10 mr-2"
          />
          <span className="text-xl font-bold text-gray-800">BuiltMate</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select 
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
      </div>

      {/* Login Form Section */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center mt-16">
        {forgotPasswordStage === 0 && renderLoginForm()}
        {forgotPasswordStage === 1 && renderForgotPasswordForm()}
        {forgotPasswordStage === 2 && renderResetCodeForm()}
        {forgotPasswordStage === 3 && renderNewPasswordForm()}
      </div>

      {/* Image Section */}
      <div className="hidden md:block md:w-1/2 relative bg-gray-100">
        <div className="absolute inset-0 bg-cover bg-center bg-white"></div>
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

export default Login;