import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Star } from "lucide-react";

const Thank = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const navigate = useNavigate();

  const handleRatingClick = (ratingValue) => {
    setRating(ratingValue);
  };

  const handleSubmitRating = () => {
    if (rating === 0) {
      alert("Please provide a rating before submitting");
      return;
    }
    
    // Mock rating submission
    setTimeout(() => {
      alert(`Thank you for rating ${rating} star${rating > 1 ? 's' : ''}!`);
      navigate("/home");
    }, 1000);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-10 h-10 cursor-pointer transition-colors ${
            i <= (hoveredRating || rating)
              ? 'text-yellow-400 fill-current'
              : 'text-slate-300 hover:text-yellow-300'
          }`}
          onClick={() => handleRatingClick(i)}
          onMouseEnter={() => setHoveredRating(i)}
          onMouseLeave={() => setHoveredRating(0)}
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center px-6">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Header */}
        <div className="mb-8">
          <img 
            src="https://customer-assets.emergentagent.com/job_helpnet-mobile/artifacts/6ph4t7za_logoimage.jpeg"
            alt="GetInTouch Logo" 
            className="w-16 h-16 mx-auto mb-4 rounded-full"
          />
          <h1 className="text-xl font-bold text-slate-800">GetInTouch</h1>
        </div>

        {/* Thank You Message */}
        <h2 className="text-2xl font-bold text-slate-800 mb-8 leading-relaxed">
          Thanks for helping
          <br />
          someone in need!
        </h2>

        {/* Rating Section */}
        <div className="mb-8">
          <p className="text-slate-600 mb-4">Please rate your experience:</p>
          <div className="flex justify-center space-x-2 mb-4">
            {renderStars()}
          </div>
          {rating > 0 && (
            <p className="text-slate-600 text-sm">
              You rated {rating} star{rating > 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Thank You Image */}
        <div className="mb-8">
          <img 
            src="https://customer-assets.emergentagent.com/job_helpnet-mobile/artifacts/4z08apb2_thankingimage.jpeg"
            alt="Thank you illustration" 
            className="w-48 h-48 mx-auto object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleSubmitRating}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3"
          >
            Submit Rating
          </Button>
          
          <Button 
            onClick={() => navigate("/home")}
            variant="outline"
            className="w-full"
          >
            Back to Home
          </Button>
        </div>
      </div>

      {/* Encouraging Message */}
      <div className="mt-6 text-center">
        <p className="text-slate-500 text-sm">
          🎉 You've made a positive impact in your community!
        </p>
      </div>
    </div>
  );
};

export default Thank;