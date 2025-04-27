import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

export default function IdeasList({category}) {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [itemId, setItemId] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const user = useSelector((state) => state.auth.user); // Get current user from Redux
  const userId = user._id;
  const type = "project"
  const navigate = useNavigate();

  // For demo purposes if API is not available
  useEffect(() => {
    fetchProjects();
}, [page, category]);

const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects", {
        params: {
          page,
          category: category || undefined,
        },
      });

      setIdeas(res.data.projects);
      setTotal(res.data.total);
      setLoading(false);
      console.log(res.data.total);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  const totalPages = Math.ceil(total / 10);

  const toggleSave = (id) => {
    setIdeas(ideas.map(idea => 
      idea._id === id ? { ...idea, saved: !idea.saved } : idea
    ));
    setItemId(id)
    toggleBookmark();
  };

  const toggleBookmark = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/bookmarks/toggle", {
        userId:user._id,
        itemId:itemId,
        type:"project",
      });
      setBookmarked((prev) => !prev); // Toggle state
    } catch (err) {
      console.error("Bookmark failed:", err);
    }
  };

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/bookmarks/${userId}`);
        const bookmarks = res.data;

        const isSaved = type === "project"
          ? bookmarks.professionals.includes(itemId)
          : bookmarks.projects.includes(itemId);

        setBookmarked(isSaved);
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      }
    };

    fetchBookmarkStatus();
  }, [userId, itemId, type]);

  const handleProjectClick = (projectId) => {
    navigate(`/ideas/${projectId}`);
  };

  if (loading) return <div className="w-screen flex items-center mb-20 justify-center"> <div className="relative w-12 h-12 rounded-full bg-transparent border-4 border-gray-200 border-t-amber-500 animate-spin"></div></div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ideas.map(idea => (
          <div key={idea._id}  className="bg-[#F3F3F3] md:h-100 rounded-lg overflow-hidden shadow-sm">
            <div className="relative pb-[75%]">
              <img 
              onClick={()=> handleProjectClick(idea._id)}
                src={idea.images[0]} 
                alt={idea.title}
                className="absolute cursor-pointer inset-0 w-full h-full object-cover md:h-80"
              />
            </div>
            <div className="p-4 md:mt-23">
              <h3 className="font-medium text-gray-900 mb-1">{idea.title}</h3>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                <p 
                  className="bg-white text-yellow-500 font-bold rounded-full px-3 py-1 text-sm mr-2 mb-2 flex items-center"
                >{idea.category}</p>
                </div>
                <button 
                  onClick={() => toggleSave(idea._id)}
                  className="p-1 focus:outline-none"
                  aria-label={idea.saved ? "Remove from saved" : "Save idea"}
                >
                  <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d={idea.saved 
                        ? "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
                        : "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"}
                      fill={idea.saved ? "currentColor" : "none"}
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {page} of {totalPages} ({total} projects)
        </span>

        <button
          onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}