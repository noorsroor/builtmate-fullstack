import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { BsEnvelopeFill } from 'react-icons/bs';
import { PiSealCheckFill } from "react-icons/pi";
import { useSelector } from 'react-redux';
import QuoteModal from "./QuoteModal";

const ProList = ({ location, category, searchQuery }) => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);  // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const navigate = useNavigate();
  const [premiumPros, setPremiumPros] = useState();
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [pro, setPro] = useState("");


  const checkIsPremium = async (proId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/subscriptions/is-premium/${proId}`);
      return res.data.isPremium;
    } catch (err) {
      console.error("Error checking premium status:", err);
      return false;
    }
  };
  // Fetch professionals with filters and pagination
  const fetchProfessionals = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/professionals', {
        params: { 
          page, 
          category, 
          searchQuery, 
          location 
        }
      });
      setProfessionals(response.data.professionals);
      setTotalPages(response.data.totalPages);  // Get the total pages from response
      setLoading(false);

      const newStatus = {};

    await Promise.all(
      professionals.map(async (pro) => {
        const isPremium = await checkIsPremium(pro._id);
        newStatus[pro._id] = isPremium;
      })
    );

    setPremiumPros(newStatus);


    } catch (err) {
      setError('Failed to load professionals');
      setLoading(false);
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, [page, category, searchQuery, location]);  // Fetch on filter or page change

  
  const handleReadMore = (id) => {
    navigate(`/proDetails/${id}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">★</span>);
      }
    }

    return stars;
  };

  if (loading) return <div className="w-screen h-screen flex items-center mb-30 justify-center"> <div className="relative w-12 h-12 rounded-full bg-transparent border-4 border-gray-200 border-t-amber-500 animate-spin"></div></div>;;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  
    const getInitial = (user) => {
    if (user && user.firstname) {
      return user.firstname.charAt(0).toUpperCase()+user.lastname.charAt(0).toUpperCase();
    }
    return "U";
  };
  return (
    <div className="mx-4 lg:mx-32 md:mx-16 my-12">
      {professionals.map((pro) => (
        <React.Fragment key={pro._id}>
          <div className="flex flex-col lg:flex-row bg-[#F3F3F3] rounded-2xl shadow-sm p-5 md:p-5 md:pr-10">
            {/* Card Image */}
            <img 
              src={pro.backgroundImage || 'https://i.pinimg.com/736x/cf/6d/0d/cf6d0d9ccc92297739236f35ec3c7a5e.jpg'} 
              alt="Interior Design" 
              className="w-full lg:w-80 h-64 object-cover rounded-lg"
            />
            
            {/* Card Content */}
            <div className="flex-1 flex flex-col ml-0 md:ml-8 mt-4 md:mt-0 relative">
              <div className="flex flex-col lg:flex-row">
                {/* Profile info */}
                <div className="flex items-start gap-3">
                  {pro.userId?.profilePicture? (
                  <img 
                    className="w-12 h-12 rounded-full bg-gray-300 filter grayscale" 
                    src={pro.userId?.profilePicture || './assets/images/user.png'} 
                    alt="profile image"
                  />
                  ):(
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 filter grayscale">
                        <span>{getInitial(pro.userId)}</span>
                        </div>
                  )}
                  <div className="mt-0 md:mt-0">
                    <p className="flex text-base font-bold mb-0">{pro.userId?.firstname || 'Leen Haddad'}{premiumPros[pro._id] && (<PiSealCheckFill className='text-blue-400 mt-1 ml-2' />)}</p>
                    <div className="flex items-center">
                      {renderStars(pro.rating.average)} {/* Updated from `rating` to `rate` */}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card Actions */}
              <div className="md:absolute md:right-0 md:top-8 flex flex-col items-center gap-5 mt-5 md:mt-0">
                {/* Send Message Button */}
                <button  onClick={() =>{user? setShowQuoteModal(true):  navigate("/login") ; setPro(pro)}}
                  className="group cursor-pointer flex items-center justify-center gap-2 bg-white border border-gray-300 py-2 px-4 rounded-lg transition-all duration-300 w-full md:w-60 overflow-hidden hover:shadow-sm"
                >
                  <div className="transition-transform duration-300 group-hover:translate-x-16 group-hover:scale-150">
                    <BsEnvelopeFill className="text-lg" />
                  </div>
                  <span className="font-semibold text-sm transition-transform duration-300 group-hover:translate-x-52">Request a Quote</span>
                </button>
                
                {/* Location */}
                <p className="flex items-center left-10 text-gray-500 text-sm font-medium">
                  <FaMapMarkerAlt className="ml-25 mr-1" />
                  {pro.location || 'Amman, Jordan'}
                </p>
              </div>
              
              {/* Job Title */}
              <p className="text-base font-bold lg:mt-20 md:mt-10 sm:mt-10">{pro.profession || pro.packageType}</p>
              
              {/* Job Description */}
              <p className="text-gray-600 text-base mt-2 md:mr-24 line-clamp-3">
                {pro.bio || 'Leen specializes in creating elegant, modern living spaces that reflect her clients\' personalities. With over 8 years of experience, she has completed over 50 high-end projects across Amman.'}
              </p>
              
              {/* Read More Link */}
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  handleReadMore(pro._id);
                }}
                className="text-sm font-bold self-end md:mr-24 mt-4 hover:text-blue-600 hover:underline transition-colors"
              >
                Read More »
              </a>
            </div>
          </div>
          
          {/* Separator Line */}
          <div className="border-t my-5 border-gray-300  w-full"></div>
        </React.Fragment>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-8">
        <button 
          className="py-2 px-4 bg-gray-300 text-sm rounded-md"
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <button 
          className="py-2 px-4 bg-gray-300 text-sm rounded-md"
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      {showQuoteModal && (
  <QuoteModal
    onClose={() => setShowQuoteModal(false)}
    professional={pro} // the professional data
    userId={userId}
  />
)}
    </div>
  );
};

export default ProList;
