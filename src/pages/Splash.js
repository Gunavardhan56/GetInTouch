import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto navigate to login after 3 seconds
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-md mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <img 
            src="https://customer-assets.emergentagent.com/job_helpnet-mobile/artifacts/6ph4t7za_logoimage.jpeg"
            alt="GetInTouch Logo" 
            className="w-32 h-32 mx-auto mb-4 rounded-full shadow-lg"
          />
        </div>

        {/* App Name */}
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          GetInTouch
        </h1>

        {/* Tagline */}
        <p className="text-xl text-blue-600 mb-12 font-medium">
          Local Help, Anytime, Anywhere
        </p>

        {/* CTA Button */}
        <Button 
          onClick={handleGetStarted}
          className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 text-lg rounded-lg shadow-lg transform transition hover:scale-105"
        >
          Get Started
        </Button>

        {/* Description */}
        <p className="text-slate-600 mt-8 text-sm">
          Connect with helpers in your local community
        </p>
      </div>

      {/* Auto navigation indicator */}
      <div className="absolute bottom-8">
        <p className="text-slate-400 text-xs">Automatically redirecting in 3 seconds...</p>
      </div>
    </div>
  );
};

export default Splash;