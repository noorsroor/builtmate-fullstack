import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ProDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const reviewsRef = useRef(null);
  const [pro, setPro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullBio, setShowFullBio] = useState(false);
  // const [isSaving, setIsSaving] = useState(false); // To disable button while saving
  const user = useSelector((state) => state.auth.user); // Get current user from Redux



  // In your ProDetails.jsx component
useEffect(() => {
  const fetchProDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/professionals/${id}`);
      
      // Transform data to match expected frontend structure
      const transformedData = {
        ...response.data,
        name: response.data.user?.name || 'Professional',
        profileImage: response.data.user?.profileImage,
        // Projects transformation
        projects: response.data.projects?.map(project => ({
          _id: project._id,
          name: project.name,
          image: project.image,
          category: project.category,
          rating: project.rating
        })) || [],
        // Reviews transformation
        reviews: response.data.reviews?.map(review => ({
          _id: review._id,
          rating: review.rating,
          content: review.content,
          user: {
            name: review.user?.name,
            profileImage: review.user?.profileImage
          },
          date: review.date
        })) || []
      };

      setPro(transformedData);
    } catch (error) {
      console.error("Error fetching pro details:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProDetails();
}, [id]);

// const handleSaveProfessional = async () => {
//   if (!user) {
//     alert("You must be logged in to save a professional.");
//     return;
//   }

//   setIsSaving(true);

//   try {
//     const response = await axios.post(
//       `http://localhost:5000/api/bookmarks/toggle`,
//       { proId: id },
//       { withCredentials: true } // Ensure cookies (JWT) are sent
//     );

//     setPro((prevPro) => ({
//       ...prevPro,
//       isSaved: response.data.isSaved, // Toggle saved state
//     }));
//   } catch (error) {
//     console.error("Error saving professional:", error);
//   } finally {
//     setIsSaving(false);
//   }
// };

  const scrollToSection = (ref) => {
    if (ref.current) {
      const stickyNavHeight = 60;
      const elementPosition = ref.current.offsetTop - stickyNavHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  if (loading) {
    return <div className="text-center my-10">Loading...</div>;
  }

  if (!pro) {
    return <p className="text-center my-10 text-red-500">Professional not found.</p>;
  }




  return (
    <div className="flex flex-col col-span-12 row-start-2">
      {/* Professional Card */}
      <div className="flex flex-col md:flex-row overflow-hidden mx-4 md:mx-[100px] mt-16 mb-10">
        {/* Background Image with Profile Image */}
        <div className="w-full md:w-[465px] h-[325px] rounded-xl relative">
          <img 
            src={pro.backgroundImage} 
            alt="Professional Background" 
            className="w-full h-full object-cover rounded-xl" 
          />
        </div>

        {/* Professional Details */}
        <div className="max-w-[700px] p-5 flex-1 mt-16 md:mt-0 md:ml-12">
        {/* <div className="">
            <img 
              src={pro.profileImage} 
              alt={pro.name} 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover"
            />
          </div> */}
          <h2 className="text-2xl font-semibold mb-2.5">{pro.name}</h2>
          <div className="flex items-center mb-2.5">
            <span className="text-2xl text-[#efa700] mr-2.5">{pro.rate.average } ★</span>
            <p className="m-0 text-sm text-gray-600">{pro.rate.totalReviews} Reviews</p>
          </div>
          <p className="font-bold text-gray-600 mb-2.5">{pro.profession}</p>
          <p className="text-lg text-gray-700 mb-5 mt-2.5">{pro.shortBio}</p>
          <div className="flex gap-5 mt-7">
            <button className="h-10 w-[260px] flex items-center justify-center gap-2.5 text-sm font-semibold bg-white text-black px-3.5 py-2.5 border border-black rounded-lg overflow-hidden transition-all duration-200 cursor-pointer shadow-[0_0_5px_#ffb520] hover:shadow-[0_0_15px_#ffb520]">
              <i className='bx bxs-envelope text-lg'></i>
              <span className="block ml-0.5 transition-all duration-700 ease-in-out">Send Message</span>
            </button>
            <button
              // onClick={handleSaveProfessional}
              className={`px-3.5 py-2.5 rounded-md flex items-center ${
                pro?.isSaved ? "bg-gray-500" : "bg-[#f4b400] hover:bg-[#d69500]"
              } text-white`}
              // disabled={isSaving} // Disable button while saving
            >save
              <i className={pro?.isSaved ? "bx bxs-bookmark" : "bx bx-bookmark"}></i>
              <span className="ml-2">
                {/* {isSaving ? "Processing..." : pro?.isSaved ? "Saved" : "Save"} */}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-22 z-[1000] bg-white border-b-2 border-gray-200">
        <div className="flex px-5 mx-4 md:mx-[150px]">
          <button 
            onClick={() => scrollToSection(aboutRef)}
            className=" cursor-pointer mr-5 text-sm py-2.5 pb-5 border-b-2 border-black font-bold"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection(projectsRef)}
            className="cursor-pointer mr-5 text-sm py-2.5 pb-5 border-b-2 border-transparent hover:border-gray-400"
          >
            Projects
          </button>
          <button 
            onClick={() => scrollToSection(reviewsRef)}
            className=" cursor-pointer mr-5 text-sm py-2.5 pb-5 border-b-2 border-transparent hover:border-gray-400"
          >
            Reviews
          </button>
        </div>
      </div>

      {/* About Section */}
      <div ref={aboutRef} className="pt-16 -mt-16 mx-4 md:mx-[150px]">
        <div className="p-5 bg-white mb-2.5 rounded-md border-b border-gray-200">
          <h2 className="text-xl font-bold mb-3">About</h2>
          <p className="text-lg">
            {showFullBio ? pro.bio : `${pro.bio.substring(0, 250)}${pro.bio.length > 250 ? '' : ''}`}
          </p>
          {pro.bio.length > 250 && (
            <button 
              onClick={() => setShowFullBio(!showFullBio)}
              className="text-black font-bold text-sm cursor-pointer mt-2"
            >
              {showFullBio ? 'Read Less ▲' : 'Read More ▼'}
            </button>
          )}
        </div>
      </div>

      {/* Projects Section */}
      <div ref={projectsRef} className=" mx-4 md:mx-[150px]">
        <div className="p-5 bg-white mb-2.5 rounded-md border-b border-gray-200">
          <h2 className="text-2xl font-bold mb-5">Projects</h2>
          {pro.projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {pro.projects.slice(0, 6).map((project) => (
                <div 
                  key={project._id} 
                  onClick={() => handleProjectClick(project._id)}
                  className="bg-gray-100 rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <img 
                    src={project.image || "https://via.placeholder.com/400x300"} 
                    alt={project.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{project.name || "Untitled Project"}</h3>
                    <p className="text-gray-600">{project.category || "No category"}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-yellow-500">{project.rating || "★★★☆☆"}</span>
                      <button 
                        className="text-gray-500 hover:text-black"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle save project
                        }}
                      >
                        <i className='bx bx-bookmark'></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No projects published yet.</p>
          )}
          {pro.projects.length > 8 && (
            <button className="block mx-auto my-5 px-5 py-2.5 font-semibold text-sm bg-gray-200 border border-black rounded-md cursor-pointer hover:bg-black hover:text-white">
              Load Next Projects
            </button>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div ref={reviewsRef} className="mx-4 md:mx-[150px]">
        <div className="p-5 bg-white mb-2.5 rounded-md border-b border-gray-200 relative">
          <h2 className="text-2xl font-bold mb-5">{pro.rate.totalReviews} Reviews for {pro.name}</h2>
          {user && (
            <button className="absolute top-5 right-5 px-5 py-2.5 font-semibold text-sm bg-gray-200 border border-black rounded-md cursor-pointer hover:bg-black hover:text-white">
              Write a Review
            </button>
          )}
          {pro.reviews.length > 0 ? (
            pro.reviews.map((review) => (
              <div key={review._id} className="border-t border-gray-200 py-5">
                <div className="flex items-center gap-4">
                  <img 
                    src={review.user?.profileImage || "https://via.placeholder.com/50"} 
                    alt={review.user?.name || "Anonymous"} 
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-base font-bold">{review.user?.name || "Anonymous"}</h3>
                    <p className="text-yellow-500">{review.rating} ★</p>
                  </div>
                </div>
                <p className="mt-2 text-gray-700">{review.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(review.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProDetails;