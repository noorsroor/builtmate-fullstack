import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import IdeasList from '../components/IdeasList';
import { useNavigate } from 'react-router-dom';

export default function IdeaDetails() {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [pro, setPro]= useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/${id}`);
        setIdea(res.data);
        setPro(res.data.professional)
        setLoading(false);
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };

    fetchProject();
  }, [id]);



  const toggleSaved = async () => {
    try {
      // In a real app, you'd want to call your API to save/unsave
      // await axios.post(`https://api.example.com/ideas/${id}/save`, { saved: !saved });
      setSaved(!saved);
    } catch (err) {
      console.error("Error saving idea:", err);
    }
  };

  const openGallery = () => {
    setShowAllPhotos(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeGallery = () => {
    setShowAllPhotos(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => 
      prevIndex === idea.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => 
      prevIndex === 0 ? idea.images.length - 1 : prevIndex - 1
    );
  };

  const handleShowProfile = (id) => {
    navigate(`/proDetails/${id}`);
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div></div>;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;
  if (!idea) return <div className="text-center p-8">Idea not found</div>;

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Main image with category */}
        <div className="relative rounded-3xl overflow-hidden mb-6">
          <img 
            src={idea.images[0]} 
            alt={idea.title}
            className="w-full h-80 md:h-96 object-cover"
          />
          
          {/* Category label */}
          <div className="absolute bottom-6 left-6 text-white text-3xl md:text-4xl font-medium">
            {idea.category}
          </div>
          
          {/* Tour button */}
          <div className="absolute top-6 left-6">
            <button className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <div className="bg-white rounded-xl p-3 mt-2 shadow-lg">
              <p className="text-sm font-medium text-gray-600">Interested?</p>
              <p className="text-sm text-gray-600">Check out Room tour</p>
            </div>
          </div>
          
          {/* View all photos button */}
          <div className="absolute bottom-6 right-6">
            <button 
              onClick={openGallery}
              className="bg-black cursor-pointer bg-opacity-70 text-white rounded-xl px-4 py-2 text-sm hover:bg-opacity-80 transition-opacity"
            >
              View all {idea.images.length} photos
            </button>
          </div>
        </div>
        
        {/* Content section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - details */}
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{idea.title}</h1>
            </div>
            
            
            {/* Tags */}
            {idea.tags && idea.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {idea.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Description */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2 text-gray-900">Description:</h2>
              <p className="text-gray-700 leading-relaxed">{idea.description}</p>
            </div>
            
            {/* Thumbnail gallery */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {idea.images.slice(1, 5).map((img, index) => (
                <div 
                  key={index} 
                  className="rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => {
                    setCurrentPhotoIndex(index + 1);
                    openGallery();
                  }}
                >
                  <img 
                    src={img} 
                    alt={`${idea.title} - image ${index + 2}`}
                    className="w-full h-24 object-cover hover:opacity-90 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Right column  */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              {/* Owner info */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2 text-gray-900">Pro Information</h3>
                <div className="flex items-center">
                  <div className="mr-3">
                    {pro && pro.userId && pro.userId.profileImage ? (
                      <img 
                        src={pro.userId.profileImage} 
                        alt={idea.pro.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{pro.userId.firstname+" "+pro.userId.lastname || "Not specified"}</p>
                    {/* <p className="text-gray-600">{pro.userId.firstname || "Not specified"}</p> */}
                  </div>
                </div>
              </div>
              
              
              
              {/* Contact button */}
              <button onClick={()=> handleShowProfile(pro._id)} className="w-full cursor-pointer bg-black text-white py-4 rounded-lg font-medium mb-3 flex items-center justify-center hover:bg-gray-900 transition-colors">
                Show Profile
              </button>
              
              {/* Save button */}
              <button 
                onClick={toggleSaved}
                className=" cursor-pointer w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill={saved ? "currentColor" : "none"} 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="1.5" 
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
                  />
                </svg>
                {saved ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery Modal */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 text-white">
              <h3 className="text-xl font-medium">
                {currentPhotoIndex + 1} / {idea.images.length}
              </h3>
              <button 
                onClick={closeGallery}
                className="p-2 mr-20 hover:bg-gray-800 rounded-full cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Main image */}
            <div className="flex-1 flex items-center justify-center p-4">
              <img 
                src={idea.images[currentPhotoIndex]} 
                alt={`${idea.title} - photo ${currentPhotoIndex + 1}`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            
            {/* Controls */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button 
                onClick={prevPhoto}
                className="bg-black bg-opacity-50 p-2 rounded-r-lg hover:bg-opacity-70 transition-opacity"
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button 
                onClick={nextPhoto}
                className="bg-black bg-opacity-50 p-2 rounded-l-lg hover:bg-opacity-70 transition-opacity"
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Thumbnails */}
            <div className="p-4 overflow-x-auto">
              <div className="flex space-x-2">
                {idea.images.map((img, index) => (
                  <div 
                    key={index}
                    onClick={() => setCurrentPhotoIndex(index)}
                    className={`cursor-pointer flex-shrink-0 ${currentPhotoIndex === index ? 'ring-2 ring-white' : ''}`}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${index + 1}`}
                      className="h-16 w-24 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}


          <div className="mt-15 max-w-7xl mx-auto mb-[-20px] px-4">
              <h2 className="text-lg font-medium mb-2 text-gray-900">Similer Ideas</h2>
            </div>
      <IdeasList category={idea.category} />
    </>
  );
}