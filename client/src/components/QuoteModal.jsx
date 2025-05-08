import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, FileUp, Home, Building2, Map, ClipboardList } from 'lucide-react';
import {Zap, Ruler, MapPin, Clipboard, Building, DollarSign, Layers, PenTool } from 'lucide-react';

const QuoteModal = ({ onClose, professional, userId }) => {
  const [formData, setFormData] = useState({});
  const [category, setCategory] = useState('');
  const [otherValues, setOtherValues] = useState({});
  const [errors, setErrors] = useState({});

  // Track which fields have "other" selected
  const [otherSelected, setOtherSelected] = useState({});

  useEffect(() => {
    if (professional) {
      if(professional.profession){
      setCategory(professional.profession.toLowerCase());
      }else {
        setCategory(professional.packageType.toLowerCase());
      }
    }
  }, [professional]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      
      // If this is a select field and value is "other", track it
      if (value === 'other') {
        setOtherSelected(prev => ({ ...prev, [name]: true }));
      } else {
        // If value is not "other" anymore, unset it
        setOtherSelected(prev => ({ ...prev, [name]: false }));
      }
    }
  };

  const handleOtherChange = (e, field) => {
    const value = e.target.value;
    setOtherValues(prev => ({ ...prev, [field]: value }));
    setFormData(prev => ({ ...prev, [field]: `other: ${value}` }));
  };

  const handleSubmit = async () => {
    
    const requiredFields = {
      'general contractor': ['projectType', 'areaSize', 'startDate', 'location'],
      'architects & building': ['type', 'landSize', 'floors', 'budget', 'location'],
      'interior designer': ['rooms', 'style', 'budget', 'measurements'],
      'pre-fabricated home': ['location', 'size', 'rooms', 'materials', 'options', 'date'],
    };
  
    const currentFields = requiredFields[category] || [];
    const newErrors = {};
    console.log(currentFields)
    // Validate required fields
    currentFields.forEach((field) => {
      const isOther = formData[field]?.startsWith('other:');
      const value = isOther ? otherValues[field] : formData[field];
      if (!value || value.trim() === '') {
        newErrors[field] = 'This field is required';
      }
    });
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      
      await axios.post('http://localhost:5000/api/bookings', {
        user: userId,
        professional: professional._id,
        type: category,
        formData,
      });
  
      alert('Quote request sent!');
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to send request');
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.files,
    }));
  };
  

  // Updated styles to match the image
  const inputStyle = 'w-full px-4 py-2 border border-gray-300 rounded-md ';
  const labelStyle = 'block mb-1 text-gray-600';
  const selectStyle = 'w-full px-4 py-2 border border-gray-300 rounded-md  appearance-none bg-white';
  const textareaStyle = 'w-full px-4 py-2 border border-gray-300 rounded-md ';

  const renderFields = () => {
    switch (category) {
      case 'general contractor':
        return (
          <div >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Zap className="mr-2 text-purple-600" />
              General Contractor Request
            </h2>
            
            <div className="space-y-6">
              <div className="relative">
                <div className="flex items-center mb-2">
                  <Building className="w-4 h-4 text-purple-600 mr-2" />
                  <label className="font-medium text-gray-700">Project Type</label>
                </div>
                <select 
                  name="projectType" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none bg-white transition-colors" 
                  onChange={handleChange} 
                  value={formData.projectType || ''}
                  required
                >
                  <option value="">Select project type</option>
                  <option value="home">Home</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none mt-8">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {otherSelected.projectType && (
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 mt-2 transition-colors"
                    placeholder="Please specify project type"
                    onChange={(e) => handleOtherChange(e, 'projectType')}
                    value={otherValues.projectType || ''}
                    required
                  />
                )}
              </div>

              <div className="relative">
                <div className="flex items-center mb-2">
                  <Ruler className="w-4 h-4 text-purple-600 mr-2" />
                  <label className="font-medium text-gray-700">Area Size (sqm)</label>
                </div>
                <input 
                  type="number" 
                  name="areaSize" 
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 transition-colors ${errors.areaSize ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-purple-500'}`}
                  placeholder="e.g. 120"
                  onChange={handleChange} 
                  value={formData.areaSize || ''} 
                  required
                />
                {errors.areaSize && (
                  <p className="text-red-500 text-sm mt-1">{errors.areaSize}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-4 h-4 text-purple-600 mr-2" />
                    <label className="font-medium text-gray-700">Preferred Start Date</label>
                  </div>
                  <input 
                    type="date" 
                    name="startDate" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors" 
                    onChange={handleChange} 
                    value={formData.startDate || ''} 
                    required
                  />
                </div>

                <div className="relative">
                  <div className="flex items-center mb-2">
                    <MapPin className="w-4 h-4 text-purple-600 mr-2" />
                    <label className="font-medium text-gray-700">Location</label>
                  </div>
                  <input 
                    type="text" 
                    name="location" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors" 
                    placeholder="Project location address"
                    onChange={handleChange} 
                    value={formData.location || ''} 
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center mb-2">
                  <Clipboard className="w-4 h-4 text-purple-600 mr-2" />
                  <label className="font-medium text-gray-700">Additional Notes</label>
                </div>
                <textarea 
                  name="notes" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors" 
                  rows="3"
                  placeholder="Your notes help us understand your project better"
                  onChange={handleChange}
                  value={formData.notes || ''}
                ></textarea>
              </div>

              <div className="relative">
                <div className="flex items-center mb-2">
                  <FileUp className="w-4 h-4 text-purple-600 mr-2" />
                  <label className="font-medium text-gray-700">Upload Reference Images (optional)</label>
                </div>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG, or PDF files</p>
                    </div>
                    <input 
                      type="file" 
                      name="images" 
                      className="hidden" 
                      onChange={handleFileChange} 
                      multiple
                    />
                  </label>
                </div>
              </div>
              
             
            </div>
          </div>
        );

      case 'architects & building':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <PenTool className="mr-2 text-orange-600" />
              Architects & Building Request
            </h2>
            
            <div className="space-y-6">
              <div className="relative">
                <div className="flex items-center mb-2">
                  <Building className="w-4 h-4 text-orange-600 mr-2" />
                  <label className="font-medium text-gray-700">Project Type</label>
                </div>
                <select 
                  name="type" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white transition-colors" 
                  onChange={handleChange} 
                  value={formData.type || ''} 
                  required
                >
                  <option value="">Select project type</option>
                  <option value="new build">New Build</option>
                  <option value="renovation">Renovation</option>
                  <option value="layout planning">Layout Planning</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none mt-8">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {otherSelected.type && (
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 mt-2 transition-colors"
                    placeholder="Please specify project type"
                    onChange={(e) => handleOtherChange(e, 'type')}
                    value={otherValues.type || ''}
                    required
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <div className="flex items-center mb-2">
                    <Ruler className="w-4 h-4 text-orange-600 mr-2" />
                    <label className="font-medium text-gray-700">Land Size (sqm)</label>
                  </div>
                  <input 
                    type="number" 
                    name="landSize" 
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 transition-colors ${errors.landSize ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                    placeholder="e.g. 500"
                    onChange={handleChange} 
                    value={formData.landSize || ''} 
                    required
                  />
                  {errors.landSize && (
                    <p className="text-red-500 text-sm mt-1">{errors.landSize}</p>
                  )}
                </div>

                <div className="relative">
                  <div className="flex items-center mb-2">
                    <Layers className="w-4 h-4 text-orange-600 mr-2" />
                    <label className="font-medium text-gray-700">Number of Floors</label>
                  </div>
                  <input 
                    type="number" 
                    name="floors" 
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 transition-colors ${errors.floors ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                    placeholder="e.g. 2"
                    onChange={handleChange} 
                    value={formData.floors || ''} 
                    required
                  />
                  {errors.floors && (
                    <p className="text-red-500 text-sm mt-1">{errors.floors}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <div className="flex items-center mb-2">
                    <svg className="w-4 h-4 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <label className="font-medium text-gray-700">Style Preferences</label>
                  </div>
                  <select 
                    name="style" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white transition-colors" 
                    onChange={handleChange} 
                    value={formData.style || ''} 
                    required
                  >
                    <option value="">Select style</option>
                    <option value="modern">Modern</option>
                    <option value="traditional">Traditional</option>
                    <option value="contemporary">Contemporary</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none mt-8">
                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  {otherSelected.style && (
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 mt-2 transition-colors"
                      placeholder="Please specify style preference"
                      onChange={(e) => handleOtherChange(e, 'style')}
                      value={otherValues.style || ''}
                      required
                    />
                  )}
                </div>

                <div className="relative">
                  <div className="flex items-center mb-2">
                    <DollarSign className="w-4 h-4 text-orange-600 mr-2" />
                    <label className="font-medium text-gray-700">Budget</label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input 
                      type="number" 
                      name="budget" 
                      className={`w-full pl-8 px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 transition-colors ${errors.budget ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                      placeholder="e.g. 150000"
                      onChange={handleChange} 
                      value={formData.budget || ''} 
                      required
                    />
                  </div>
                  {errors.budget && (
                    <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
                  )}
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 text-orange-600 mr-2" />
                  <label className="font-medium text-gray-700">Location</label>
                </div>
                <input 
                  type="text" 
                  name="location" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors" 
                  placeholder="Project location address"
                  onChange={handleChange} 
                  value={formData.location || ''} 
                  required
                />
              </div>

              <div className="relative">
                <div className="flex items-center mb-2">
                  <FileUp className="w-4 h-4 text-orange-600 mr-2" />
                  <label className="font-medium text-gray-700">Upload Site Photos / Sketches (optional)</label>
                </div>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG, or PDF files</p>
                    </div>
                    <input 
                      type="file" 
                      name="images" 
                      className="hidden" 
                      onChange={handleFileChange} 
                      multiple
                    />
                  </label>
                </div>
              </div>
              
            </div>
          </div>
        );
        case 'interior designer':
          return (
            <div className="grid grid-cols-1  gap-4">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Rooms Field - Enhanced with icons and multiselect */}
                <div className="mb-4">
                  <label className={labelStyle}>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Rooms <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="relative">
                    <select 
                      name="rooms" 
                      className={`${selectStyle} pl-10`} 
                      onChange={handleChange} 
                      value={formData.rooms || ''}
                      required
                    >
                      <option value="">Select Room Type</option>
                      <option value="kitchen">Kitchen</option>
                      <option value="living room">Living Room</option>
                      <option value="dining room">Dining Room</option>
                      <option value="bedroom">Bedroom</option>
                      <option value="bathroom">Bathroom</option>
                      <option value="home office">Home Office</option>
                      <option value="outdoor space">Outdoor Space</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {otherSelected.rooms && (
                    <input
                      type="text"
                      className={`${inputStyle} mt-2`}
                      placeholder="Please specify room type"
                      onChange={(e) => handleOtherChange(e, 'rooms')}
                      value={otherValues.rooms || ''}
                      required
                    />
                  )}
                </div>
        
                {/* Design Style Field - Enhanced with color indicators */}
                <div className="mb-4">
                  <label className={labelStyle}>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                      Design Style <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {[
                      { value: 'boho', label: 'Boho', color: 'bg-amber-100' },
                      { value: 'scandinavian', label: 'Scandinavian', color: 'bg-blue-50' },
                      { value: 'minimal', label: 'Minimal', color: 'bg-gray-100' },
                      { value: 'classic', label: 'Classic', color: 'bg-emerald-100' },
                      { value: 'industrial', label: 'Industrial', color: 'bg-zinc-100' },
                      { value: 'mid-century', label: 'Mid-Century', color: 'bg-orange-100' },
                      { value: 'coastal', label: 'Coastal', color: 'bg-sky-100' },
                      { value: 'other', label: 'Other', color: 'bg-purple-100' }
                    ].map(style => (
                      <button
                        key={style.value}
                        type="button"
                        className={`${style.color} border rounded-md p-2 text-sm flex items-center justify-center
                          ${formData.style === style.value ? 'ring-2 ring-blue-500 font-semibold' : 'hover:ring-1 hover:ring-blue-300'}`}
                        onClick={() => {
                          setFormData({...formData, style: style.value});
                          setOtherSelected({...otherSelected, style: style.value === 'other'});
                        }}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                  {otherSelected.style && (
                    <input
                      type="text"
                      className={`${inputStyle} mt-2`}
                      placeholder="Please specify your design style"
                      onChange={(e) => handleOtherChange(e, 'style')}
                      value={otherValues.style || ''}
                      required
                    />
                  )}
                </div>
        
                {/* Budget Field - Enhanced with slider and budget range */}
                <div className="mb-4">
                  <label className={labelStyle}>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Budget <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">$</span>
                    <input
                      required
                      type="number"
                      name="budget"
                      min="0"
                      className={`${inputStyle} ${errors.budget ? 'border-red-500' : ''}`}
                      onChange={handleChange}
                      value={formData.budget || ''}
                      placeholder="Enter your budget"
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      type="range"
                      min="1000"
                      max="50000"
                      step="1000"
                      value={formData.budget || 10000}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>$1,000</span>
                      <span>$25,000</span>
                      <span>$50,000</span>
                    </div>
                  </div>
                  {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
                </div>
              </div>
        
              {/* Right Column */}
              <div className="space-y-4">
                {/* Measurements Field - Enhanced with unit selection */}
                <div className="mb-4">
                  <label className={labelStyle}>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Room Measurements <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <button
                      type="button"
                      className={`px-3 py-1 rounded-md text-sm ${formData.measurementUnit === 'feet' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                      onClick={() => setFormData({...formData, measurementUnit: 'feet'})}
                    >
                      Feet
                    </button>
                    <button
                      type="button"
                      className={`px-3 py-1 rounded-md text-sm ${formData.measurementUnit === 'meters' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                      onClick={() => setFormData({...formData, measurementUnit: 'meters'})}
                    >
                      Meters
                    </button>
                  </div>
                  <textarea 
                    name="measurements" 
                    className={`${textareaStyle} ${errors.measurements ? 'border-red-500' : ''}`}
                    rows="3" 
                    placeholder={`Enter room dimensions (e.g., Length: 12 ${formData.measurementUnit || 'feet'}, Width: 10 ${formData.measurementUnit || 'feet'}, Height: 8 ${formData.measurementUnit || 'feet'})`}
                    onChange={handleChange}
                    value={formData.measurements || ''}
                    required
                  ></textarea>
                  {errors.measurements && <p className="text-red-500 text-sm mt-1">{errors.measurements}</p>}
                </div>
        
                {/* Upload Mood Board - Enhanced with preview */}
                <div className="mb-4">
                  <label className={labelStyle}>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Upload Mood Board / Inspirations
                    </span>
                  </label>
                  <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-500 mb-4">Drag & drop files here or click to browse</p>
                    <input 
                      type="file" 
                      name="moodBoard" 
                      multiple 
                      accept="image/*"
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                      onChange={(e) => {
                        handleChange(e);
                        // Preview logic would be implemented here
                      }} 
                    />
                    <button
                      type="button"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
                    >
                      Browse Files
                    </button>
                    <p className="text-xs text-gray-500 mt-2">Supports: JPG, PNG, GIF (Max 5MB each)</p>
                  </div>
                  {formData.moodBoard && formData.moodBoard.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {/* Image preview would render here */}
                      <div className="bg-gray-100 rounded-md p-2 text-sm">
                        {Array.from(formData.moodBoard).length} file(s) selected
                      </div>
                    </div>
                  )}
                </div>
        
                {/* Additional Notes - Enhanced with character count */}
                <div className="mb-4">
                  <label className={labelStyle}>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Additional Notes
                    </span>
                  </label>
                  <textarea 
                    name="notes" 
                    className={textareaStyle} 
                    rows="4" 
                    placeholder="Tell us about your preferences, existing furniture to keep, color schemes, lifestyle needs, etc."
                    onChange={handleChange}
                    value={formData.notes || ''}
                    maxLength="500"
                  ></textarea>
                  <div className="flex justify-end">
                    <span className="text-xs text-gray-500">
                      {formData.notes ? formData.notes.length : 0}/500 characters
                    </span>
                  </div>
                </div>
        
                {/* Timeline preference - New field */}
                <div className="mb-4">
                  <label className={labelStyle}>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Project Timeline <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Urgent (1-2 weeks)', 'Standard (1-2 months)', 'Flexible (3+ months)'].map((timeline) => (
                      <button
                        key={timeline}
                        type="button"
                        className={`border rounded-md p-2 text-sm
                          ${formData.timeline === timeline ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white hover:bg-gray-50'}`}
                        onClick={() => setFormData({...formData, timeline})}
                      >
                        {timeline}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );

        case "full construction package":
          return (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Building2 className="mr-2 text-blue-600" />
                Full Construction Package
              </h2>
              
              <div className="space-y-6">
                <div className="relative">
                  <div className="flex items-center mb-2">
                    <Map className="w-4 h-4 text-blue-600 mr-2" />
                    <label className="font-medium text-gray-700">Project Location</label>
                  </div>
                  <input 
                    type="text" 
                    name="location" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                    placeholder="Enter address or coordinates"
                    onChange={handleChange} 
                    required 
                  />
                </div>
  
                <div className="relative">
                  <div className="flex items-center mb-2">
                    <Building2 className="w-4 h-4 text-blue-600 mr-2" />
                    <label className="font-medium text-gray-700">Property Type</label>
                  </div>
                  <select 
                    name="propertyType" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-colors" 
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Select property type</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none mt-8">
                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <div className="flex items-center mb-2">
                      <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      <label className="font-medium text-gray-700">Total Area (sqm)</label>
                    </div>
                    <input 
                      type="number" 
                      name="areaSize" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                      placeholder="e.g. 150"
                      onChange={handleChange} 
                      required 
                    />
                  </div>
  
                  <div className="relative">
                    <div className="flex items-center mb-2">
                      <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <label className="font-medium text-gray-700">Number of Floors</label>
                    </div>
                    <input 
                      type="number" 
                      name="floors" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                      placeholder="e.g. 2"
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
  
                <div className="relative">
                  <div className="flex items-center mb-2">
                    <FileUp className="w-4 h-4 text-blue-600 mr-2" />
                    <label className="font-medium text-gray-700">Blueprints / Plans (Optional)</label>
                  </div>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">PDF, CAD, or image files</p>
                      </div>
                      <input 
                        type="file" 
                        name="blueprints" 
                        className="hidden" 
                        onChange={handleFileChange} 
                        multiple
                      />
                    </label>
                  </div>
                </div>
  
                <div className="relative">
                  <div className="flex items-center mb-2">
                    <ClipboardList className="w-4 h-4 text-blue-600 mr-2" />
                    <label className="font-medium text-gray-700">Special Requirements</label>
                  </div>
                  <textarea 
                    name="specialRequirements" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                    rows="3"
                    placeholder="Describe any special requirements for your project"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
          );
  
        case "pre-fabricated home":
          return (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Home className="mr-2 text-green-600" />
                Pre-Fabricated Home
              </h2>
              
              <div className="space-y-6">
                <div className="relative">
                  <div className="flex items-center mb-2">
                    <Map className="w-4 h-4 text-green-600 mr-2" />
                    <label className="font-medium text-gray-700">Project Location</label>
                  </div>
                  <input 
                    type="text" 
                    name="location" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                    placeholder="Where will the home be installed?"
                    onChange={handleChange} 
                    required 
                    value={formData.location || ''}
                  />
                </div>
  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <div className="flex items-center mb-2">
                      <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      <label className="font-medium text-gray-700">Home Size (sqm)</label>
                    </div>
                    <input 
                      type="number" 
                      name="size" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                      placeholder="e.g. 80"
                      onChange={handleChange} 
                      required 
                      value={formData.size }
                    />
                  </div>
  
                  <div className="relative">
                    <div className="flex items-center mb-2">
                      <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <label className="font-medium text-gray-700">Number of Rooms</label>
                    </div>
                    <input 
                      type="number" 
                      name="rooms" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                      placeholder="e.g. 3"
                      onChange={handleChange} 
                      required 
                      value={formData.rooms || ''}
                    />
                  </div>
                </div>
  
                <div className="relative">
                  <div className="flex items-center mb-2">
                    <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <label className="font-medium text-gray-700">Materials & Finish</label>
                  </div>
                  <select 
                    name="materials" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white transition-colors" 
                    onChange={handleChange} 
                    required
                    value={formData.materials || ''}
                  >
                    <option value="">Select materials</option>
                    <option value="Standard">Standard (Steel + Concrete)</option>
                    <option value="Wooden">Wooden</option>
                    <option value="Eco-Friendly">Eco-Friendly</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none mt-8">
                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
  
                <div className="relative">
                  <div className="flex items-center mb-2">
                    <ClipboardList className="w-4 h-4 text-green-600 mr-2" />
                    <label className="font-medium text-gray-700">Customization Options</label>
                  </div>
                  <textarea 
                    name="options" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                    rows="3"
                    placeholder="Describe any customizations you'd like for your pre-fabricated home"
                    onChange={handleChange}
                    value={formData.options}
                  ></textarea>
                </div>
  
                <div className="relative">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-4 h-4 text-green-600 mr-2" />
                    <label className="font-medium text-gray-700">Expected Delivery Date</label>
                  </div>
                  <input 
                    type="date" 
                    value={formData.date}
                    name="date" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
              </div>
            </div>
          );


      default:
        return <p>No form available for this profession.</p>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Request A Qoute</h2>

        <div className="space-y-4">

          {renderFields()}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-black hover:bg-white hover:text-black hover:border text-white px-5 py-2 rounded transition"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;