import React, { useState, useRef } from 'react';

const AddProjectForm = () => {
  const [dataForm, setDataForm] = useState({
    title: '',
    description: '',
    images: [],
    category: '',
    tags: []
  });
  
  const [currentTag, setCurrentTag] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  // Categories for the dropdown
  const categories = [
    'Interior Design',
    'Construction',
    'Architecture',
    'Landscape Design',
    'Industrial Design',
    'Renovation'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setDataForm({
      ...dataForm,
      images: [...dataForm.images, ...files]
    });
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!dataForm.tags.includes(currentTag.trim())) {
        setDataForm({
          ...dataForm,
          tags: [...dataForm.tags, currentTag.trim()]
        });
      }
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setDataForm({
      ...dataForm,
      tags: dataForm.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const removeImage = (indexToRemove) => {
    setDataForm({
      ...dataForm,
      images: dataForm.images.filter((_, index) => index !== indexToRemove)
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    
    if (files.some(file => !file.type.includes('image/'))) {
      alert('Please upload image files only');
      return;
    }
    
    setDataForm({
      ...dataForm,
      images: [...dataForm.images, ...files]
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', dataForm);
    setSubmitted(true);
    
    // In a real application, you would send this data to your backend
    setTimeout(() => {
      setSubmitted(false);
      alert('Project saved successfully!');
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Project</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title of the project</label>
            <div className="relative">
              <input
                type="text"
                name="title"
                value={dataForm.title}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                required
              />
              {dataForm.title && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="bg-yellow-500 rounded-full w-5 h-5 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">A detailed description of the project</label>
            <textarea
              name="description"
              value={dataForm.description}
              onChange={handleInputChange}
              rows="5"
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select a predefined category</label>
            <div className="relative">
              <select
                name="category"
                value={dataForm.category}
                onChange={handleInputChange}
                className="w-full p-3 bg-white border border-gray-200 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-300"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
              {dataForm.category && (
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                  <div className="bg-yellow-500 rounded-full w-5 h-5 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Add multiple tags (press Enter after each tag)</label>
            <div className="relative">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                placeholder="Modern, Minimalist, etc"
              />
            </div>
            <div className="flex flex-wrap mt-2">
              {dataForm.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-yellow-100 text-yellow-700 rounded-full px-3 py-1 text-sm mr-2 mb-2 flex items-center"
                >
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => removeTag(tag)} 
                    className="ml-1 text-yellow-700 hover:text-yellow-900"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`px-6 py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${submitted ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={submitted}
            >
              {submitted ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving Project...
                </span>
              ) : 'Save Project'}
            </button>
          </div>
        </div>

        {/* Right Side - Drop Zone and Image Preview */}
        <div className="space-y-6">
          <div 
            className="border-2 border-dashed border-yellow-400 rounded-lg p-6 flex flex-col items-center justify-center min-h-64 cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/*"
              className="hidden"
            />
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
              </div>
              <p className="text-gray-600 mb-1">Upload multiple project images</p>
              <p className="text-sm text-gray-400">Drag & Drop or <span className="text-yellow-500">Browse</span></p>
              <p className="text-xs text-gray-400 mt-2">We support JPG and PNG files. Maximum size 500kb per image.</p>
            </div>
          </div>

          {/* Image Previews */}
          {dataForm.images.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images ({dataForm.images.length})</h3>
              <div className="grid grid-cols-2 gap-2">
                {dataForm.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="border rounded-md p-2 bg-white h-32 flex items-center justify-center overflow-hidden">
                      {image.type?.includes('image/') ? (
                        <img 
                          src={URL.createObjectURL(image)} 
                          alt={`Project image ${index + 1}`} 
                          className="max-h-full object-contain"
                        />
                      ) : (
                        <div className="text-sm text-gray-500">Not an image file</div>
                      )}
                    </div>
                    <button 
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                    <p className="text-xs text-gray-500 truncate mt-1">{image.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Form Data Preview (for demonstration) */}
          <div className="bg-white border rounded-md p-4 mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Form Data Preview:</h3>
            <pre className="text-xs text-gray-600 overflow-auto max-h-40">
              {JSON.stringify({
                ...dataForm,
                images: dataForm.images.map(img => ({
                  name: img.name,
                  size: img.size,
                  type: img.type
                }))
              }, null, 2)}
            </pre>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProjectForm;