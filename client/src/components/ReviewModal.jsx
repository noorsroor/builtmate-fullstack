import { useState } from 'react';

export default function ReviewModal({ isOpen, onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [displayMode, setDisplayMode] = useState('name'); // 'name' or 'anonymous'
  
  const handleSubmit = () => {
    // Validate and submit the review data
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    
    if (comment.trim() === '') {
      alert('Please write a review');
      return;
    }
    
    // Send the data to the parent component
    onSubmit({
      rating,
      comment,
      isAnonymous: displayMode === 'anonymous'
    });
    
    // Reset form and close modal
    setRating(0);
    setComment('');
    setDisplayMode('name');
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-1000"  style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
      <div className="bg-white rounded-lg w-full max-w-md p-5 flex flex-col gap-4">
        <h2 className="text-center text-xl font-medium text-gray-700">Leave a Review</h2>
        
        {/* Star Rating */}
        <div className="flex justify-center gap-2 my-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button 
              key={star} 
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              <svg 
                className="w-8 h-8 cursor-pointer"
                fill={star <= rating ? "#FFB800" : "#E2E2E2"}
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </button>
          ))}
        </div>
        
        {/* Review Text */}
        <div className="border border-amber-200 rounded-lg p-3">
          <textarea 
            className="w-full resize-none focus:outline-none h-24 text-gray-700"
            placeholder="Your Review helps other decide on the write pro for them, please share you experinces with this pro. "
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        
        {/* Display Options */}
        <button 
          className={`flex items-center gap-3 border rounded-lg p-3 ${displayMode === 'name' ? 'border-amber-400' : 'border-gray-200'}`}
          onClick={() => setDisplayMode('name')}
        >
          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${displayMode === 'name' ? 'bg-amber-400' : 'border border-gray-300'}`}>
            {displayMode === 'name' && <span className="text-white text-xs">✓</span>}
          </div>
          <span className="text-gray-700">Display With Your Name</span>
        </button>
        
        <button 
          className={`flex items-center gap-3 border rounded-lg p-3 ${displayMode === 'anonymous' ? 'border-amber-400' : 'border-gray-200'}`}
          onClick={() => setDisplayMode('anonymous')}
        >
          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${displayMode === 'anonymous' ? 'bg-amber-400' : 'border border-gray-300'}`}>
            {displayMode === 'anonymous' && <span className="text-white text-xs">✓</span>}
          </div>
          <span className="text-gray-700">Display Anonymously</span>
        </button>
        
        {/* Submit Button */}
        <button 
          className=" cursor-pointer bg-amber-400 hover:bg-amber-500 text-gray-800 font-medium py-3 px-4 rounded-lg mt-2"
          onClick={handleSubmit}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}