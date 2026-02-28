import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ArrowLeft, Bell, Star, Wallet } from "lucide-react";
import { mockHelpers } from "../mock";

const Accept = () => {
  const navigate = useNavigate();
  
  // Get the first helper as example (in real app, this would come from props/state)
  const helper = mockHelpers[2]; // Raghu
  const serviceAmount = 500;
  const commissionPercent = 5;
  const commissionAmount = (serviceAmount * commissionPercent) / 100;
  const helperReceives = serviceAmount - commissionAmount;

  const handleConnect = () => {
    navigate("/chat");
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`w-6 h-6 ${i < fullStars ? 'text-yellow-400 fill-current' : 'text-slate-300'}`} 
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <ArrowLeft 
            className="w-8 h-8 text-slate-600 cursor-pointer hover:text-slate-800" 
            onClick={() => navigate("/home")}
          />
          
          <div className="flex items-center space-x-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_helpnet-mobile/artifacts/6ph4t7za_logoimage.jpeg"
              alt="GetInTouch Logo" 
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-xl font-bold text-slate-800">GetInTouch</h1>
          </div>
          
          <Button variant="ghost" size="sm">
            <Bell className="w-6 h-6 text-slate-700" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-8">Request Accepted</h2>
        
        {/* Escrow banner */}
        <div className="mb-4 rounded-lg bg-blue-50 border border-blue-100 px-4 py-3 flex items-start space-x-3">
          <Wallet className="w-5 h-5 text-blue-700 mt-0.5" />
          <div className="text-xs text-slate-700">
            <p className="font-semibold text-slate-800 mb-1">
              Payment held safely in escrow
            </p>
            <p>
              ₹{serviceAmount} has been reserved in your wallet. It will be
              released to {helper.name} after you mark the service as completed
              or a dispute is resolved.
            </p>
          </div>
        </div>
        
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            {/* Helper Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Name: {helper.name}</h3>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-slate-700 mb-1">Location</h4>
                <p className="text-slate-600">{helper.location}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-slate-700 mb-1">Service</h4>
                <p className="text-slate-600">Medical Assistance</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-slate-700 mb-1">Payment</h4>
                <div className="text-sm text-slate-600 space-y-1">
                  <p>Service amount: ₹{serviceAmount}</p>
                  <p>Platform fee (5%): ₹{commissionAmount}</p>
                  <p className="font-semibold text-slate-800">
                    Helper receives: ₹{helperReceives}
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-slate-700 mb-2">Rating</h4>
                <div className="flex items-center space-x-1">
                  {renderStars(helper.rating)}
                  <span className="ml-2 text-slate-600 font-medium">({helper.rating})</span>
                </div>
              </div>

              {/* Helper Contact Info */}
              <div className="border-t pt-4 mt-4">
                <h4 className="text-lg font-semibold text-slate-700 mb-1">Contact</h4>
                <p className="text-slate-600">{helper.mobile}</p>
                <p className="text-sm text-slate-500 mt-1">Distance: {helper.distance}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connect Button */}
        <Button 
          onClick={handleConnect}
          className="w-full bg-slate-800 hover:bg-slate-700 text-white mt-6 py-3 text-lg"
        >
          Connect
        </Button>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-slate-500 text-sm">
            📞 You can now communicate directly with your helper
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accept;