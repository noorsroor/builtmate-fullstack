import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuoteModal = ({ onClose, professional, userId }) => {
  const [formData, setFormData] = useState({});
  const [category, setCategory] = useState('');
  const [otherValues, setOtherValues] = useState({});
  const [errors, setErrors] = useState({});

  // Track which fields have "other" selected
  const [otherSelected, setOtherSelected] = useState({});

  useEffect(() => {
    if (professional) {
      setCategory(professional.profession.toLowerCase());
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
    };
  
    const currentFields = requiredFields[category] || [];
    const newErrors = {};
  
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
  

  // Updated styles to match the image
  const inputStyle = 'w-full px-4 py-2 border border-gray-300 rounded-md ';
  const labelStyle = 'block mb-1 text-gray-600';
  const selectStyle = 'w-full px-4 py-2 border border-gray-300 rounded-md  appearance-none bg-white';
  const textareaStyle = 'w-full px-4 py-2 border border-gray-300 rounded-md ';

  const renderFields = () => {
    switch (category) {
      case 'general contractor':
        return (
          <>
            <div className="mb-4">
              <label className={labelStyle}>Project Type</label>
              <select name="projectType" className={selectStyle} onChange={handleChange} value={formData.projectType || ''}>
                <option value="">Select</option>
                <option value="home">Home</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
                <option value="other">Other</option>
              </select>
              {otherSelected.projectType && (
                <input
                  type="text"
                  className={`${inputStyle} mt-2 ${errors.areaSize ? 'border-red-500' : ''}`}
                  placeholder="Please specify"
                  onChange={(e) => handleOtherChange(e, 'projectType')}
                  value={otherValues.projectType || ''}
                  required
                />
              )}
            </div>

            <div className="mb-4">
              <label className={labelStyle}>Area Size (sqm)</label>
              <input  required type="number" name="areaSize" className={`${inputStyle} ${errors.areaSize ? 'border-red-500' : ''}`} onChange={handleChange} value={formData.areaSize || ''} />
              {errors.areaSize && <p className="text-red-500 text-sm mt-1">{errors.areaSize}</p>}
            </div>

            <div className="mb-4">
              <label className={labelStyle}>Preferred Start Date</label>
              <input required type="date" name="startDate" className={`${inputStyle} ${errors.areaSize ? 'border-red-500' : ''}`} onChange={handleChange} value={formData.startDate || ''} />
              {errors.areaSize && <p className="text-red-500 text-sm mt-1">{errors.areaSize}</p>}
            </div>

            <div className="mb-4">
              <label className={labelStyle}>Location</label>
              <input required type="text" name="location" className={`${inputStyle} ${errors.areaSize ? 'border-red-500' : ''}`} onChange={handleChange} value={formData.location || ''} />
              {errors.areaSize && <p className="text-red-500 text-sm mt-1">{errors.areaSize}</p>}
            </div>

            <div className="mb-4">
              <label className={labelStyle}>Additional Notes</label>
              <textarea 
                name="notes" 
                className={textareaStyle} 
                rows="3" 
                placeholder="Your notes help us understand your project better"
                onChange={handleChange}
                value={formData.notes || ''}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className={labelStyle}>Upload Reference Images (optional)</label>
              <input type="file" name="images" multiple className={inputStyle} onChange={handleChange} />
            </div>
          </>
        );

      case 'architects & building':
        return (
          <>
            <div className="mb-4">
              <label className={labelStyle}>Project Type</label>
              <select name="type" className={selectStyle} onChange={handleChange} value={formData.type || ''}>
                <option value="">Select</option>
                <option value="new build">New Build</option>
                <option value="renovation">Renovation</option>
                <option value="layout planning">Layout Planning</option>
                <option value="other">Other</option>
              </select>
              {otherSelected.type && (
                <input
                required
                  type="text"
                  className={`${inputStyle} mt-2`}
                  placeholder="Please specify"
                  onChange={(e) => handleOtherChange(e, 'type')}
                  value={otherValues.type || ''}
                />
              )}
            </div>

            <div className="mb-4">
              <label className={labelStyle}>Land Size (sqm)</label>
              <input required type="number" name="landSize" className={`${inputStyle} ${errors.areaSize ? 'border-red-500' : ''}`} onChange={handleChange} value={formData.landSize || ''} />
              {errors.areaSize && <p className="text-red-500 text-sm mt-1">{errors.areaSize}</p>}
            </div>

            <div className="mb-4">
              <label className={labelStyle}>Number of Floors</label>
              <input required type="number" name="floors" className={`${inputStyle} ${errors.areaSize ? 'border-red-500' : ''}`} onChange={handleChange} value={formData.floors || ''} />
              {errors.areaSize && <p className="text-red-500 text-sm mt-1">{errors.areaSize}</p>}
            </div>

            <div className="mb-4">
              <label className={labelStyle}>Style Preferences</label>
              <select name="style" className={selectStyle} onChange={handleChange} value={formData.style || ''}>
                <option value="">Select</option>
                <option value="modern">Modern</option>
                <option value="traditional">Traditional</option>
                <option value="contemporary">Contemporary</option>
                <option value="other">Other</option>
              </select>
              {otherSelected.style && (
                <input
                  type="text"
                  className={`${inputStyle} mt-2`}
                  placeholder="Please specify"
                  onChange={(e) => handleOtherChange(e, 'style')}
                  value={otherValues.style || ''}
                />
              )}
            </div>

            <div className="mb-4">
              <label className={labelStyle}>Budget</label>
              <input required type="number" name="budget" className={`${inputStyle} ${errors.areaSize ? 'border-red-500' : ''}`} onChange={handleChange} value={formData.budget || ''} />
              {errors.areaSize && <p className="text-red-500 text-sm mt-1">{errors.areaSize}</p>}
            </div>

            <div className="mb-4">
              <label className={labelStyle}>Location</label>
              <input required type="text" name="location" className={`${inputStyle} ${errors.areaSize ? 'border-red-500' : ''}`} onChange={handleChange} value={formData.location || ''} />
              {errors.areaSize && <p className="text-red-500 text-sm mt-1">{errors.areaSize}</p>}
            </div>

            <div className="mb-4">
              <label className={labelStyle}>Upload Site Photos / Sketches (optional)</label>
              <input type="file" name="images" multiple className={inputStyle} onChange={handleChange} />
              {errors.areaSize && <p className="text-red-500 text-sm mt-1">{errors.areaSize}</p>}
            </div>
          </>
        );

      case 'interior designer':
        return (
          <>
            <div className="mb-4">
              <label className={labelStyle}>Rooms</label>
              <select name="rooms" className={selectStyle} onChange={handleChange} value={formData.rooms || ''}>
                <option value="">Select</option>
                <option value="kitchen">Kitchen</option>
                <option value="living room">Living Room</option>
                <option value="bedroom">Bedroom</option>
                <option value="bathroom">Bathroom</option>
                <option value="other">Other</option>
              </select>
              {otherSelected.rooms && (
                <input
                  type="text"
                  className={`${inputStyle} mt-2`}
                  placeholder="Please specify"
                  onChange={(e) => handleOtherChange(e, 'rooms')}
                  value={otherValues.rooms || ''}
                  required
                />
              )}
            </div>

            <div className="mb-4">
              <label className={labelStyle}>Design Style</label>
              <select name="style" className={selectStyle} onChange={handleChange} value={formData.style || ''}>
                <option value="">Select</option>
                <option value="boho">Boho</option>
                <option value="scandinavian">Scandinavian</option>
                <option value="minimal">Minimal</option>
                <option value="classic">Classic</option>
                <option value="other">Other</option>
              </select>
              {otherSelected.style && (
                <input
                  type="text"
                  className={`${inputStyle} mt-2`}
                  placeholder="Please specify"
                  onChange={(e) => handleOtherChange(e, 'style')}
                  value={otherValues.style || ''}
                  required
                />
              )}
            </div>

            <div className="mb-4">
              <label className={labelStyle}>Budget</label>
              <input required type="number" name="budget" className={`${inputStyle} ${errors.areaSize ? 'border-red-500' : ''}`} onChange={handleChange} value={formData.budget || ''} />
              {errors.areaSize && <p className="text-red-500 text-sm mt-1">{errors.areaSize}</p>}
            </div>

            <div className="mb-4">
              <label className={labelStyle}>Measurements or Upload</label>
              <textarea 
                name="measurements" 
                className={textareaStyle} 
                rows="3" 
                placeholder="Enter your room measurements here"
                onChange={handleChange}
                value={formData.measurements || ''}
                required
              ></textarea>
               {errors.areaSize && <p className="text-red-500 text-sm mt-1">{errors.areaSize}</p>}
            </div>

            <div className="mb-4">
              <label className={labelStyle}>Upload Mood Board / Inspirations (optional)</label>
              <input type="file" name="moodBoard" multiple className={`${inputStyle} ${errors.areaSize ? 'border-red-500' : ''}`} onChange={handleChange} />
              {errors.areaSize && <p className="text-red-500 text-sm mt-1">{errors.areaSize}</p>}
              </div>

            <div className="mb-4">
              <label className={labelStyle}>Additional Notes</label>
              <textarea 
                name="notes" 
                className={textareaStyle} 
                rows="3" 
                placeholder="Any other details that might help the designer"
                onChange={handleChange}
                value={formData.notes || ''}
              ></textarea>
            </div>
          </>
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
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 rounded transition"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;