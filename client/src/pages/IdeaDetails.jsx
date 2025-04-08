import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProDetails = () => {
  const { id } = useParams();
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const reviewsRef = useRef(null);
  const [pro, setPro] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/professionals/${id}`);
        setPro(response.data);
      } catch (error) {
        console.error("Error fetching pro details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center my-10">Loading...</p>;
  }

  if (!pro) {
    return <p className="text-center my-10 text-red-500">Professional not found.</p>;
  }

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col col-span-12 row-start-2">
      {/* Background Image */}
      <div
        className="w-full h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${pro.backgroundImage})` }}
      ></div>

      {/* Professional Card */}
      <div className="flex flex-col md:flex-row overflow-hidden mx-4 md:mx-[100px] mt-10 mb-10">
        {/* Profile Image */}
        <div className="w-full md:w-[180px] h-[180px] rounded-full overflow-hidden border-4 border-white -mt-16 mx-auto md:mx-0">
          <img src={pro.profileImage} alt={pro.name} className="w-full h-full object-cover" />
        </div>

        {/* Professional Details */}
        <div className="max-w-[700px] p-5 flex-1 mt-4 md:mt-0 md:ml-12 text-center md:text-left">
          <h2 className="text-2xl font-semibold">{pro.name}</h2>
          <div className="flex items-center justify-center md:justify-start mt-2">
            <span className="text-xl text-yellow-500">{pro.rating ? Number(pro.rating).toFixed(1) : "N/A"} ★</span>
            <p className="ml-2 text-gray-600">({pro.reviewCount} Reviews)</p>
          </div>
          <p className="font-bold text-gray-600 mt-2">{pro.profession}</p>
          <p className="text-lg text-gray-700 mt-2">{pro.shortBio}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-22 z-[1000] bg-white border-b-2 border-gray-200">
        <div className="flex px-5 mx-4 md:mx-[150px]">
          <button onClick={() => scrollToSection(aboutRef)} className="mr-5 text-sm py-2.5 border-b-2 border-black font-bold">
            About
          </button>
          <button onClick={() => scrollToSection(projectsRef)} className="mr-5 text-sm py-2.5 border-b-2 border-transparent hover:border-gray-400">
            Projects
          </button>
          <button onClick={() => scrollToSection(reviewsRef)} className="mr-5 text-sm py-2.5 border-b-2 border-transparent hover:border-gray-400">
            Reviews
          </button>
        </div>
      </div>

      {/* About Section */}
      <div ref={aboutRef} className="p-5 bg-white mb-2.5 rounded-md border-b border-gray-200 mx-4 md:mx-[150px]">
        <h2 className="text-xl font-bold mb-3">About</h2>
        <p className="text-lg">{pro.bio}</p>
      </div>

      {/* Projects Section */}
      <div ref={projectsRef} className="p-5 bg-white mb-2.5 rounded-md border-b border-gray-200 mx-4 md:mx-[150px]">
        <h2 className="text-2xl font-bold mb-5">Projects</h2>
        {pro.projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {pro.projects.map((project) => (
              <div key={project._id} className="bg-gray-100 rounded-xl overflow-hidden shadow-md">
                <img src={project.image} alt={project.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p className="text-gray-600">{project.category}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No projects published yet.</p>
        )}
      </div>

      {/* Reviews Section */}
      <div ref={reviewsRef} className="p-5 bg-white mb-2.5 rounded-md border-b border-gray-200 mx-4 md:mx-[150px]">
        <h2 className="text-2xl font-bold mb-5">{pro.reviewCount} Reviews</h2>
        {pro.reviews.length > 0 ? (
          pro.reviews.map((review) => (
            <div key={review._id} className="border-t border-gray-200 py-5">
              <div className="flex items-center gap-4">
                <img src={review.user.profileImage} alt={review.user.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="text-base font-bold">{review.user.name}</h3>
                  <p className="text-yellow-500">{review.rating} ★</p>
                </div>
              </div>
              <p className="mt-2 text-gray-700">{review.content}</p>
              <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProDetails;