import React from 'react';

const BookingDetailsModal = ({ booking, onClose }) => {
  // Only render if there's a booking to show
  if (!booking) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-5 max-w-md w-full max-h-[80vh] overflow-y-auto">
        {/* Header with title and close button */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Booking Details</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Booking details content */}
        <div className="space-y-3">
          {/* Status indicator */}
          <div className="flex items-center">
            <div className={`w-5 h-5 rounded-full mr-2 ${
              booking.status === "pending" ? "bg-yellow-400" : 
              booking.status === "quoted" ? "bg-blue-500" : 
              booking.status === "paid" ? "bg-green-500" : ""
            }`}></div>
            <p className="font-medium">Status: {booking.status}</p>
          </div>
          
          {/* User information */}
          <p><span className="font-medium">User:</span> {booking.user?.name}</p>
          
          {/* Display all form data from the database */}
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="font-medium mb-2">Form Data:</h4>
            {Object.entries(booking.formData || {}).map(([key, value]) => (
              <p key={key} className="text-sm mb-1">
                <span className="font-medium capitalize">{key}:</span> {typeof value === "string" || typeof value === "number" ? value : String(value)}
              </p>
            ))}
          </div>
          
          {/* Show price information based on status */}
          {booking.status === "quoted" && (
            <p><span className="font-medium">Quote Price:</span> ${booking.quotePrice}</p>
          )}
          
          {booking.status === "paid" && (
            <p><span className="font-medium">Paid Amount:</span> ${booking.quotePrice}</p>
          )}
          
          {/* Show timestamps if available */}
          {booking.createdAt && (
            <p className="text-xs text-gray-500">Created: {new Date(booking.createdAt).toLocaleString()}</p>
          )}
          {booking.updatedAt && (
            <p className="text-xs text-gray-500">Last Updated: {new Date(booking.updatedAt).toLocaleString()}</p>
          )}
        </div>
        
        {/* Footer with action buttons */}
        <div className="mt-5 flex justify-end gap-2">
          {booking.status === "pending" && (
            <button 
              onClick={() => {
                // Handle quote functionality if needed
                onClose();
              }} 
              className="bg-blue-500 text-white px-3 py-1.5 rounded-md text-sm"
            >
              Create Quote
            </button>
          )}
          <button 
            onClick={onClose} 
            className="bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;