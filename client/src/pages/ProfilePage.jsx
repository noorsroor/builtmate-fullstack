import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { MapPin,PencilLine } from 'lucide-react';
import PaymentModal from "../components/PaymentModal";
import BookingDetailsModal from "../components/BookingDetailsModal";
import PaymentModalWrapper from "../components/PaymentModal";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("info");
  const [userData, setUserData] = useState(null);
  const [bookmarks, setBookmarks] = useState({ projects: [], professionals: [] });
  const [editMode, setEditMode] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const proId = user.professionalId;
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [mybookings, setMyBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  

  const [selectedBookingReq, setselectedBookingReq] = useState(null);

  // Handle viewing booking details
  const handleViewDetails = (booking) => {
    setselectedBookingReq(booking);
  };

  // Close the details modal
  const handleCloseDetails = () => {
    setselectedBookingReq(null);
  };

  // ✅ Fetch user bookings from backend
  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/bookings/user/${user._id}`);
      setMyBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchBookings();
    }
  }, [user]);

  const handlePaymentSuccess = () => {
    setSelectedBooking(null);
    fetchBookings(); // Refresh list after payment
  };

  useEffect(() => {
    fetchBookings();
  }, [page]);


  useEffect(() => {
    const fetchBookings = async () => {
      const res = await axios.get(`http://localhost:5000/api/bookings/pro/${proId}`);
      setBookings(res.data);
    };
    fetchBookings();
  }, [proId]);

  const handleQuoteSubmit = async (bookingId, price) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/quote/${bookingId}`, {
        quotePrice: price,
      });
      alert("Quote submitted!");
      // Refresh
      const res = await axios.get(`http://localhost:5000/api/bookings/pro/${proId}`);
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to submit quote");
    }
  };
  
  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${user._id}`)
      .then(res => setUserData(res.data))
      .catch(err => console.error(err));

    axios.get(`http://localhost:5000/api/users/bookmarks/${user._id}`)
      .then(res => setBookmarks(res.data))
      .catch(err => console.error(err));
  }, [user._id]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    const formData = new FormData();
  
    // Append user data fields
    formData.append("firstname", userData.firstname);
    formData.append("lastname", userData.lastname);
    formData.append("phone", userData.phone);
    formData.append("address", userData.address);
  
    // Append image if selected
    if (imageFile) {
      formData.append("profileImage", imageFile);
    }
  
    // Send PUT request with FormData
    axios
      .put(`http://localhost:5000/api/users/${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert("Profile updated successfully");
        setUserData(res.data); // Update the local user state
        setEditMode(false);
        setImageFile(null);
      })
      .catch((err) => {
        console.error("Profile update failed:", err);
        alert("Failed to update profile");
      });
  };
  

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (activeTab !== "info") {
      setActiveTab("info");
    }
  };

  const getInitial = () => {
    if (userData && userData.firstname) {
      return userData.firstname.charAt(0).toUpperCase()+userData.lastname.charAt(0).toUpperCase();
    }
    return "U";
  };

  console.log(bookings)

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100">
      {/* Back Button */}
      <div className="bg-[#B3AFA8] text-white p-4 px-10">
        <button 
          onClick={() => navigate(-1)} 
          className="cursor-pointer flex items-center text-white"
        >
          <span className="mr-1">&#10094;</span> Back
        </button>
      </div>
      
      {/* Profile Header */}
      <div className="bg-[#B3AFA8] text-white p-6 px-20 flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Profile Image */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 bg-yellow-600 flex items-center justify-center text-6xl text-white font-bold rounded-sm overflow-hidden">
          {imagePreview ? (
            <img 
              src={imagePreview} 
              alt="Profile Preview" 
              className="w-full h-full object-cover"
            />
          ) : userData?.profilePicture ? (
            <img 
              src={userData.profilePicture} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{getInitial()}</span>
          )}
          
          {/* Image upload overlay (only shown in edit mode) */}
          {editMode && (
            <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer">
              <span className="text-white text-sm">Change</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="hidden" 
              />
            </label>
          )}
        </div>
        
        {/* Profile Info */}
        <div className="flex-grow">
          <h1 className="text-3xl font-bold mb-2">
            {userData ? userData.firstname.toLowerCase()+" "+userData.lastname.toLowerCase() : 'user'}
          </h1>
          <div className="flex items-center">
            <span className="mr-2"><MapPin color="#ffffff" /></span>
            <span>{userData?.address || 'Ramillies (Belgium)'}</span>
          </div>
        </div>
        
        {/* Edit Button */}
        <button 
          onClick={toggleEditMode}
          className={`bg-opacity-20  cursor-pointer rounded-full px-4 py-2 flex items-center ${editMode  ? "bg-black text-white" : "text-black bg-white"}`}
        >
          <span className="mr-2"><PencilLine /></span> {editMode ? "CANCEL EDIT" : "EDIT PROFILE"}
        </button>
      </div>
      
      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-300" >
        <button 
          onClick={() => setActiveTab("info")}
          className={`flex-1 cursor-pointer py-3 px-6 text-center ${activeTab === "info" ? "bg-white border-t-4 border-yellow-500" : "bg-gray-200"}`}
        >
          Info
        </button>
        <button 
          onClick={() => setActiveTab("bookmarks")}
          className={`flex-1 cursor-pointer py-3 px-6 text-center ${activeTab === "bookmarks" ? "bg-white border-t-4 border-yellow-500" : "bg-gray-200"}`}
          disabled={editMode}
        >
          BookMarks
        </button>
        <button 
          onClick={() => setActiveTab("appointments")}
          className={`flex-1 cursor-pointer py-3 px-6 text-center ${activeTab === "appointments" ? "bg-white border-t-4 border-yellow-500" : "bg-gray-200"}`}
          disabled={editMode}
        >
          Appointments
        </button>
        {userData?.role === "pro" &&(
          <button 
          onClick={() => setActiveTab("bookingRequests")}
          className={`flex-1 cursor-pointer py-3 px-6 text-center ${activeTab === "bookingRequests" ? "bg-white border-t-4 border-yellow-500" : "bg-gray-200"}`}
          disabled={editMode}
        >
          Booking Requests
        </button>
        )}
      </div>
      
      {/* Content */}
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/5 bg-white p-6 border-r border-gray-300 hidden md:block">
          <div className="mb-6">
            <div className="font-semibold text-gray-700 mb-2">Role:</div>
            <div className="ml-6">{userData?.role || 'User'}</div>
          </div>
          
          <div className="mb-6">
            <div className="font-semibold text-gray-700 mb-2">Next rank:</div>
            <div className="relative w-48 h-48 mx-auto">
              {/* Circle progress bar */}
              <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
              <div 
                className="absolute inset-0 rounded-full border-8 border-yellow-600" 
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 100% 10%, 0 10%)',
                  transform: 'rotate(45deg)'
                }}
              ></div>
              
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="bg-yellow-500 rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold mb-2">
                  1
                </div>
                <div className="text-gray-800 font-bold">Doctor</div>
                <div className="text-xs text-gray-600">Get 7.5k xp to level up!</div>
              </div>
            </div>
          </div>
          
          <div className="mb-2">
            <div className="font-semibold text-gray-700">Joined</div>
            <div className="ml-6">{userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : '16 Apr 2025'}</div>
          </div>
          
          <div>
            <div className="font-semibold text-gray-700">Badges</div>
            <div className="ml-6">0</div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-6 bg-[#F3F3F3]">

          {activeTab === "info" && userData && (
            <div>
              <h2 className="text-xl font-medium mb-6">User Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    name="firstname" 
                    value={userData.firstname || ''} 
                    onChange={handleChange}
                    className={`w-full border border-gray-300 rounded p-2 ${!editMode && 'bg-gray-100'}`}
                    readOnly={!editMode}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="lastname" 
                    value={userData.lastname || ''} 
                    onChange={handleChange}
                    className={`w-full border border-gray-300 rounded p-2 ${!editMode && 'bg-gray-100'}`}
                    readOnly={!editMode}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Phone</label>
                  <input 
                    type="text" 
                    name="phone" 
                    value={userData.phone || ''} 
                    onChange={handleChange}
                    className={`w-full border border-gray-300 rounded p-2 ${!editMode && 'bg-gray-100'}`}
                    readOnly={!editMode}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Address</label>
                  <input 
                    type="text" 
                    name="address" 
                    value={userData.address || ''} 
                    onChange={handleChange}
                    className={`w-full border border-gray-300 rounded p-2 ${!editMode && 'bg-gray-100'}`}
                    readOnly={!editMode}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    value={userData.email || ''} 
                    readOnly
                    className="w-full border border-gray-300 rounded p-2 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Profile Picture URL</label>
                  <input 
                    type="text" 
                    name="profilePicture" 
                    value={userData.profilePicture || ''} 
                    onChange={handleChange}
                    className={`w-full border border-gray-300 rounded p-2 ${!editMode && 'bg-gray-100'}`}
                    readOnly={!editMode}
                  />
                </div>
              </div>
              {editMode && (
                <button 
                  onClick={handleUpdate}
                  className="cursor-pointer mt-6 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-purple-800 transition-colors"
                >
                  Update Info
                </button>
              )}
            </div>
          )}

          {activeTab === "bookmarks" && (
            <div>
              <h2 className="text-xl font-medium mb-6">Bookmarked Professionals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {bookmarks?.professionals && bookmarks.professionals.length > 0 ? (
                  bookmarks.professionals.map(pro => (
                    <div
                      key={pro._id}
                      className="border p-4 rounded bg-white shadow cursor-pointer hover:bg-gray-100"
                      onClick={() => navigate(`/proDetails/${pro._id}`)}
                    >
                      <p className="font-semibold">{pro.firstname}</p>
                      <p className="text-gray-600 text-sm">{pro.specialty || 'Professional'}</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-gray-500 mb-4">You don't have any bookmarked professionals yet.</p>
                    <button 
                      onClick={() => navigate('/findPro')} 
                      className="bg-black cursor-pointer text-white px-6 py-2 rounded hover:bg-yellow-600 transition-colors"
                    >
                      Browse Professionals
                    </button>
                  </div>
                )}
              </div>

              <h2 className="text-xl font-medium mb-6">Bookmarked Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookmarks?.projects && bookmarks.projects.length > 0 ? (
                  bookmarks.projects.map(project => (
                    <div
                      key={project._id}
                      className="border p-4 rounded bg-white shadow cursor-pointer hover:bg-gray-100"
                      onClick={() => navigate(`/ideas/${project._id}`)}
                    >
                      <p className="font-semibold">{project.title}</p>
                      <p className="text-gray-600 text-sm">{project.category || 'Project'}</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-gray-500 mb-4">You don't have any bookmarked projects yet.</p>
                    <button 
                      onClick={() => navigate('/ideas')} 
                      className="bg-black cursor-pointer text-white px-6 py-2 rounded hover:bg-yellow-600 transition-colors"
                    >
                      Browse Ideas
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "appointments" && (
            <div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

                {mybookings.length === 0 ? (
                  <p>No bookings yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mybookings.map((booking) => (
                      <div 
                        key={booking._id} 
                        className={`rounded-2xl shadow-md overflow-hidden ${
                          booking.status === "pending" ? "bg-gradient-to-b from-yellow-300 via-white to-white" : 
                          booking.status === "quoted" ? "bg-gradient-to-b from-blue-500 via-white to-white" : 
                          booking.isPaid ? "bg-gradient-to-b from-green-500 via-white to-white" : ""
                        }`}
                      >
                        {/* White content area */}
                        <div className="bg-white m-2 rounded-xl p-6">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-xl font-bold">{booking.proName || "Pro name"}</h3>
                              <p className="text-gray-700">{booking.type || "Category"}</p>
                            </div>
                            <span className="text-gray-400 text-sm">
                              {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : "Create date"}
                            </span>
                          </div>

                          {/* Status specific content */}
                          {booking.status === "pending" && (
                            <div className="mt-6">
                              <p className="text-gray-400 mb-8">
                                Your Qoute request has been send, you will recive an email when the pro Qoute a price
                              </p>
                              <div className="flex justify-end">
                                <span className="bg-yellow-200 text-yellow-700 px-6 py-2 rounded-md">
                                  pending
                                </span>
                              </div>
                            </div>
                          )}

                          {booking.status === "quoted" && !booking.isPaid && (
                            <div className="mt-6">
                              <p className="text-gray-400 mb-4">
                                Your price Qoute request has been decided from the pro, pay now!
                              </p>
                              <p className="text-xl font-bold mb-4">
                                Qouted price: {booking.quotePrice || 450}$
                              </p>
                              <div className="flex justify-between">
                                <button
                                  className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
                                  onClick={() => setSelectedBooking(booking)}
                                >
                                  Pay Now
                                </button>
                                <span className="bg-blue-200 text-blue-700 px-6 py-3 rounded-md">
                                  Qouted
                                </span>
                              </div>
                            </div>
                          )}

                          {booking.isPaid && (
                            <div className="mt-6">
                              <p className="text-gray-400 mb-8">
                                Your payment has been done successfully, contact with pro to stay updated
                              </p>
                              <div className="flex justify-between">
                                <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
                                  Contact Pro
                                </button>
                                <span className="bg-green-200 text-green-700 px-6 py-3 rounded-md">
                                  Paied
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedBooking && (
                  <PaymentModalWrapper
                    booking={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                    onPaymentSuccess={handlePaymentSuccess}
                  />
                )}
              </div>
            </div>
          )}

          {activeTab === "bookingRequests" && (
                  <div>
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold mb-2">Incoming Booking Requests</h2>
                      {bookings.length === 0 ? (
                        <p>No bookings yet.</p>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {bookings.map((booking) => (
                            <div 
                              key={booking._id} 
                              className="bg-white rounded-xl shadow-md p-4 relative"
                            >
                              {/* Status Circle and Label */}
                              <div className="flex items-center mb-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-white ${
                                  booking.status === "pending" ? "bg-yellow-400" : 
                                  booking.status === "quoted" ? "bg-blue-500" : 
                                  booking.status === "paid" ? "bg-green-500" : ""
                                }`}>
                                </div>
                                <span className={`ml-2 text-base font-medium ${
                                  booking.status === "pending" ? "text-yellow-400" : 
                                  booking.status === "quoted" ? "text-blue-500" : 
                                  booking.status === "paid" ? "text-green-500" : ""
                                }`}>
                                  {booking.status === "pending" ? "pending" :
                                  booking.status === "quoted" ? "Qouted" :
                                  booking.status === "paid" ? "Paied" : booking.status}
                                </span>
                                <span className="text-gray-400 text-xs ml-auto">Date ago</span>
                              </div>

                              {/* User and Type Info */}
                              <h3 className="text-base font-bold">{booking.user?.name || "User name"}</h3>
                              <p className="text-sm mb-2">{booking.formData?.type || "Type"}</p>

                              {/* Tags */}
                              <div className="flex gap-2 mb-4 flex-wrap">
                                <span className="bg-gray-200 px-2 py-0.5 rounded-full text-xs text-gray-700">
                                  {booking.formData?.location || "location"}
                                </span>
                                <span className="bg-gray-200 px-2 py-0.5 rounded-full text-xs text-gray-700">
                                  {booking.formData?.style || "style"}
                                </span>
                              </div>

                              {/* Details Button */}
                              <div className="flex justify-end border-b pb-4 mb-4">
                                <button 
                                  onClick={() => handleViewDetails(booking)} 
                                  className="flex items-center text-black text-sm font-medium"
                                >
                                  Details
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>

                              {/* Conditional Bottom Section */}
                              {booking.status === "pending" && (
                                <div className="mt-2 flex gap-1">
                                  <div className="relative flex-grow">
                                    <input
                                      type="number"
                                      placeholder="Enter quote price"
                                      onChange={(e) => booking.quotePrice = e.target.value}
                                      className="w-full border rounded-md py-1 px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                      <span className="text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                      </span>
                                    </div>
                                  </div>
                                  <button 
                                    onClick={() => handleQuoteSubmit(booking._id, booking.quotePrice)}
                                    className="bg-black text-white px-3 py-1 rounded-md text-xs whitespace-nowrap"
                                  >
                                    Submit Quote
                                  </button>
                                </div>
                              )}

                              {booking.status === "quoted" && (
                                <div className="mt-2 text-center text-sm font-medium">
                                  Quote Sent: {booking.quotePrice}$
                                </div>
                              )}

                              {booking.status === "paid" && (
                                <div className="mt-2 text-center text-sm font-medium">
                                  Paied Amount: {booking.quotePrice}$
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Pagination Controls */}
                      <div className="flex justify-center gap-3 mt-6">
                        <button
                          disabled={page === 1}
                          onClick={() => setPage((prev) => prev - 1)}
                          className="px-2 py-1 bg-gray-200 rounded text-sm disabled:opacity-50"
                        >
                          Prev
                        </button>

                        <span className="px-2 py-1 text-sm">Page {page} of {totalPages}</span>

                        <button
                          disabled={page === totalPages}
                          onClick={() => setPage((prev) => prev + 1)}
                          className="px-2 py-1 bg-gray-200 rounded text-sm disabled:opacity-50"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
          )}
      {/* Render the details modal when a booking is selected */}
      {selectedBookingReq && (
        <BookingDetailsModal 
          booking={selectedBookingReq} 
          onClose={handleCloseDetails} 
        />
      )}
        </div>
      </div>

      {/* Mobile view for sidebar info */}
      <div className="md:hidden bg-white p-4 border-t border-gray-300">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold text-gray-700">Role:</div>
            <div>{userData?.role || 'User'}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-700">Joined:</div>
            <div>{userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : '16 Apr 2025'}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-700">Badges:</div>
            <div>0</div>
          </div>
        </div>
      </div>
    </div>
  );
}