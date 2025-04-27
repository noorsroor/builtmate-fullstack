import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';

const ProJoinForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const user= useSelector((state) => state.auth.user);
  const loggedInUserId= user._id;

  console.log(loggedInUserId)
  const [formData, setFormData] = useState({
    profession: 'Interior Designer',
    experience: 5,
    location: 'Amman, Jordan',
    pricePerHour: 20,
    isOrganization: false,
    bio: '',
    portfolio: [],
    certifications: [],
    backgroundImage: '',
    linkedShops: [],
    paymentInfo: {
      method: 'stripe',
      payoutEmail: '',
      stripeAccountId: '',
      country: ''
    }
  });

  useEffect(() => {
    if (user?.professionalId) {
      setCurrentStep(4);
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      const form = new FormData();
      form.append("userId", loggedInUserId);
      form.append("profession", formData.profession);
      form.append("experience", formData.experience);
      form.append("location", formData.location);
      form.append("pricePerHour", formData.pricePerHour);
      form.append("isOrganization", formData.isOrganization ? "organization" : "individual");
      form.append("bio", formData.bio);
      form.append("portfolio", JSON.stringify(formData.portfolio));
      form.append("certifications", JSON.stringify(formData.certifications));
      form.append("paymentInfo", JSON.stringify(formData.paymentInfo));
      form.append("backgroundImage", formData.backgroundImage); // Must be a File object
  
      const res = await axios.post("http://localhost:5000/api/professionals/create", form, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
  
      alert("Professional profile created!");
      setCurrentStep(currentStep + 1);
      console.log(res.data.professional);
    } catch (err) {
      console.error("Submission error:", err.response?.data || err.message);
      alert("Failed to create profile");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handler for changing payment method
const handlePaymentMethodChange = (method) => {
  setFormData({
    ...formData,
    paymentInfo: {
      ...formData.paymentInfo,
      method: method
    }
  });
};

// Handler for changing payment info fields
const handlePaymentInfoChange = (field, value) => {
  setFormData({
    ...formData,
    paymentInfo: {
      ...formData.paymentInfo,
      [field]: value
    }
  });
};
 console.log(formData)
  const handleToggle = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };



  const handleFileUpload = (field, files) => {
    // For demonstration purposes only, in a real app you'd handle file uploads differently
    if (field === 'portfolio' || field === 'certifications') {
      // For multiple files
      const fileArray = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData({
        ...formData,
        [field]: [...formData[field], ...fileArray]
      });
    } else {
      // For single file (background image)
      setFormData({
        ...formData,
        [field]: URL.createObjectURL(files[0])
      });
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (currentStep === 3) {
      handleSubmit(); // Call submit when user clicks next on step 3
    } else {
    console.log('Form data for step', currentStep, ':', formData);
    setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderProfessionalInfo();
      case 2:
        return renderProfileDetails();
      case 3:
        return renderPaymentInfo();
      case 4:
        return renderCompleted();
      default:
        return renderProfessionalInfo();
    }
  };

  
  const renderProfessionalInfo = () => {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm flex-1 mb-6 md:mb-0">
        <h2 className="font-medium text-lg mb-6">Professional Information</h2>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2 text-sm">Profession</label>
          <div className="relative">
            <select 
              className="appearance-none border rounded-md px-4 py-2 w-full bg-white"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
            >
              <option>Interior Designer</option>
              <option>General Contractor</option>
              {/* <option >Plumbing Service</option>
              <option>Electrician</option> */}
              <option>Architects & Building</option>
              {/* <option>Home Builder</option>
              <option>Pool Builder</option>
              <option>Painters</option>
              <option>Landscape Contractor</option>
              <option>Architect</option>
              <option>Door Dealer</option> */}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2 text-sm">Experience</label>
          <div className="relative">
            <select 
              className="appearance-none border rounded-md px-4 py-2 w-full bg-white"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
            >
              <option>Less than 1 year</option>
              <option>1-3 years</option>
              <option>3-5 years</option>
              <option>5 years</option>
              <option>5-10 years</option>
              <option>10+ years</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2 text-sm">Location</label>
          <div className="relative">
            <select 
              className="appearance-none border rounded-md px-4 py-2 w-full bg-white"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            >
              <option>Amman, Jordan</option>
              <option>Zarqa, Jordan</option>
              <option>Irbid, Jordan</option>
              <option>Aqaba, Jordan</option>
              <option>Ajloun, Jordan</option>
              <option>Madaba, Jordan</option>
              <option>Ma'an, Jordan</option>
              <option>Jerash, Jordan</option>
              <option>Balqa, Jordan</option>
              <option>Mafraq, Jordan</option>
              <option>Tafilah, Jordan</option>
              <option>Karak, Jordan</option>
              
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2 text-sm">Price Per Hour JD</label>
          <input 
            type="number" 
            required
            name="pricePerHour"
            value={formData.pricePerHour}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
            min="0"
            step="5"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2 text-sm">Are You</label>
          <div className="flex gap-4">
            <button 
              type="button"
              onClick={() => handleToggle('isorganization', "organization")}
              className={`px-4 py-2 cursor-pointer rounded-md border ${formData.isorganization ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'border-gray-200'}`}
            >
              Organization
            </button>
            <button 
              type="button"
              onClick={() => handleToggle('isorganization', "individual")}
              className={`px-4 py-2 cursor-pointer rounded-md border ${!formData.isorganization ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'border-gray-200'}`}
            >
              Individual
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderProfileDetails = () => {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm flex-1 mb-6 md:mb-0">
        <h2 className="font-medium text-lg mb-6">Profile Details</h2>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2 text-sm">Bio</label>
          <textarea 
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full h-32"
            placeholder="Tell clients about your experience, skills, and expertise..."
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2 text-sm">Portfolio</label>
          <div className="flex flex-col gap-3">
            <div className="border-dashed border-2 border-gray-300 rounded-md p-6 text-center">
              <input 
                type="file" 
                id="portfolio" 
                className="hidden"
                multiple
                onChange={(e) => handleFileUpload('portfolio', e.target.files)} 
              />
              <label htmlFor="portfolio" className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">Click to upload files or add links to showcase your work</p>
              </label>
            </div>
            {formData.portfolio.length > 0 && (
              <div className="mt-2">
                <p className="font-medium text-sm mb-2">Uploaded Items ({formData.portfolio.length})</p>
                <div className="flex flex-wrap gap-2">
                  {formData.portfolio.map((item, index) => (
                    <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      File {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-3">
              <input 
                type="text" 
                className="border rounded-md px-4 py-2 w-full"
                placeholder="Or paste a link to your work (e.g., website)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value) {
                    setFormData({
                      ...formData,
                      portfolio: [...formData.portfolio, e.target.value]
                    });
                    e.target.value = '';
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2 text-sm">Certifications</label>
          <div className="border-dashed border-2 border-gray-300 rounded-md p-6 text-center">
            <input 
              type="file" 
              id="certifications" 
              className="hidden"
              multiple
              onChange={(e) => handleFileUpload('certifications', e.target.files)} 
            />
            <label htmlFor="certifications" className="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">Upload certifications (optional)</p>
            </label>
          </div>
          {formData.certifications.length > 0 && (
            <div className="mt-2">
              <p className="font-medium text-sm mb-2">Uploaded Certifications ({formData.certifications.length})</p>
              <div className="flex flex-wrap gap-2">
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    Certificate {index + 1}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2 text-sm">Background Image</label>
          <div className="border-dashed border-2 border-gray-300 rounded-md p-6 text-center">
                      <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, backgroundImage: e.target.files[0] })
              }
            />
            <label htmlFor="backgroundImage" className="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">Upload a background image for your profile</p>
            </label>
          </div>
          {formData.backgroundImage && (
            <div className="mt-4">
              <p className="font-medium text-sm mb-2">Preview:</p>
              <div className="h-32 bg-cover bg-center rounded-md" style={{ backgroundImage: `url(${formData.backgroundImage})` }}></div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPaymentInfo = () => {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm flex-1 mb-6 md:mb-0">
        <h2 className="font-medium text-lg mb-6">Payment Information</h2>
        
        <div className="mb-6">
          <label className="block text-gray-600 mb-2 text-sm">Payment Method</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handlePaymentMethodChange('stripe')}
              className={`px-4 py-2 rounded-md border ${formData.paymentInfo.method === 'stripe' ? 'bg-yellow-500 text-white' : ''}`}
            >
              Stripe
            </button>
            <button
              type="button"
              onClick={() => handlePaymentMethodChange('paypal')}
              className={`px-4 py-2 rounded-md border ${formData.paymentInfo.method === 'paypal' ? 'bg-yellow-500 text-white' : ''}`}
            >
              PayPal
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Select your preferred payment method</p>
        </div>
        
        {/* Common fields for both payment methods */}
        {formData.paymentInfo.method === 'paypal' && (
        <div className="mb-6">
          <label className="block text-gray-600 mb-2 text-sm">Payout Email</label>
          <input
            type="email"
            name="payoutEmail"
            value={formData.paymentInfo.payoutEmail}
            onChange={(e) => handlePaymentInfoChange('payoutEmail', e.target.value)}
            className="border rounded-md px-4 py-2 w-full"
            placeholder="Enter your payout email address"
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.paymentInfo.method === 'paypal' 
              ? 'PayPal email address where you will receive payments' 
              : 'Email address associated with your Stripe account'}
          </p>
        </div>
        )}

        {/* Stripe-specific field */}
        {formData.paymentInfo.method === 'stripe' && (
          <div className="mb-6">
            <label className="block text-gray-600 mb-2 text-sm">Stripe Account ID</label>
            <input
              type="text"
              name="stripeAccountId"
              value={formData.paymentInfo.stripeAccountId}
              onChange={(e) => handlePaymentInfoChange('stripeAccountId', e.target.value)}
              className="border rounded-md px-4 py-2 w-full"
              placeholder="Enter your Stripe account ID"
            />
            <p className="text-xs text-gray-500 mt-1">Your Stripe Connect account ID (starts with acct_)</p>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-600 mb-2 text-sm">Country</label>
          <input
            type="text"
            name="country"
            value={formData.paymentInfo.country}
            onChange={(e) => handlePaymentInfoChange('country', e.target.value)}
            className="border rounded-md px-4 py-2 w-full"
            placeholder="Enter your country"
          />
          <p className="text-xs text-gray-500 mt-1">Country where your payment account is registered</p>
        </div>
        
        
        
        {/* PayPal-specific information */}
        {formData.paymentInfo.method === 'paypal' && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
            <p className="text-sm text-blue-700">
              <span className="font-medium">Note:</span> Make sure your PayPal account is verified and can receive payments internationally.
            </p>
          </div>
        )}
      </div>
    );
  };
  const renderCompleted = () => {
    console.log(formData);
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm flex-1 mb-6 md:mb-0 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-2xl font-medium mb-4">Registration Complete</h2>
        <p className="text-gray-600 mb-6">Your professional profile has been submitted successfully!</p>
        <p className="text-gray-600 mb-8">You will receive an email when your profile is approved.</p>
        
        <div className="max-w-sm mx-auto">
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-yellow-600 cursor-pointer text-white px-8 py-2 rounded-md font-medium shadow-sm w-full"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {/* Progress Steps */}
      <div className="max-w-6xl mx-auto mb-8 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`${currentStep >= 1 ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-500'} rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold`}>
              1
            </div>
            <span className={`ml-2 text-sm ${currentStep >= 1 ? 'font-bold' : 'text-gray-500'}`}>Professional Info</span>
          </div>
          
          <div className="border-t border-gray-300 flex-grow mx-2"></div>
          
          <div className="flex items-center">
            <div className={`${currentStep >= 2 ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-500'} rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold`}>
              2
            </div>
            <span className={`ml-2 text-sm ${currentStep >= 2 ? 'font-bold' : 'text-gray-500'}`}>Profile Details</span>
          </div>
          
          <div className="border-t border-gray-300 flex-grow mx-2"></div>
          
          <div className="flex items-center">
            <div className={`${currentStep >= 3 ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-500'} rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold`}>
              3
            </div>
            <span className={`ml-2 text-sm ${currentStep >= 3 ? 'font-bold' : 'text-gray-500'}`}>Services & Preferences</span>
          </div>
          
          <div className="border-t border-gray-300 flex-grow mx-2"></div>
          
          <div className="flex items-center">
            <div className={`${currentStep >= 4 ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-500'} rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold`}>
              4
            </div>
            <span className={`ml-2 text-sm ${currentStep >= 4 ? 'font-bold' : 'text-gray-500'}`}>Completed</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row">
        {/* Left Section - Form */}
        {renderStepContent()}

        {/* Right Section - About */}
        {currentStep < 4 && (
          <div className="ml-0 md:ml-6 md:w-1/3">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              {currentStep === 1 && (
                <>
                  <h2 className="text-2xl font-medium mb-4">Professional Info</h2>
                  <p className="text-gray-600 mb-8">Tell us about your professional background.</p>
                </>
              )}
              
              {currentStep === 2 && (
                <>
                  <h2 className="text-2xl font-medium mb-4">Profile Details</h2>
                  <p className="text-gray-600 mb-8">Share more about yourself and your past work to attract potential clients.</p>
                </>
              )}
              
              {currentStep === 3 && (
                <>
                  <h2 className="text-2xl font-medium mb-4">Services & Preferences</h2>
                  <p className="text-gray-600 mb-8">Let us know what services you provide and your preferences for bookings.</p>
                </>
              )}
              
              <div className="flex justify-center">
                <img src="/api/placeholder/320/240" alt="Pro registration illustration" className="w-full max-w-xs" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      {currentStep < 4 && (
        <div className="max-w-6xl mx-auto flex justify-between mt-4">
          {currentStep > 1 ? (
            <button 
              onClick={handleBack}
              className="bg-white cursor-pointer border border-gray-300 text-gray-700 px-8 py-2 rounded-md font-medium shadow-sm flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </button>
          ) : (
            <div></div>
          )}
          
          <button 
            onClick={handleContinue}
            className="bg-yellow-600 cursor-pointer text-white px-8 py-2 rounded-md font-medium shadow-sm flex items-center"
          >
            {currentStep === 3 ? 'Submit' : 'Continue'}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProJoinForm;