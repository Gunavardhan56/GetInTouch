import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { CheckCircle } from "lucide-react";

const Confirm = () => {
  const navigate = useNavigate();

  const handleOk = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center px-6">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <CheckCircle className="w-24 h-24 text-blue-600 mx-auto mb-6" />

        {/* Success Message */}
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Your request
          <br />
          has been raised
        </h2>

        <p className="text-slate-600 mb-8">
          We're notifying nearby helpers about your request. 
          You'll be contacted soon!
        </p>

        {/* OK Button */}
        <Button 
          onClick={handleOk}
          className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 text-lg"
        >
          OK
        </Button>
      </div>

      {/* Additional Info */}
      <div className="mt-6 text-center">
        <p className="text-slate-500 text-sm">
          💡 You'll receive notifications when helpers respond to your request
        </p>
      </div>
    </div>
  );
};

export default Confirm;