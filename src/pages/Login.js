import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpBanner, setShowOtpBanner] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendOtp = async () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      setShowOtpBanner(true);
      toast({
        title: "OTP Sent",
        description: `OTP has been sent to ${mobileNumber}`,
      });
      setTimeout(() => setShowOtpBanner(false), 4000);
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) {
      toast({
        title: "Invalid OTP", 
        description: "Please enter the 4-digit OTP",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: "Welcome to GetInTouch!",
      });
      navigate("/home");
    }, 1500);
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center px-6">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        {showOtpBanner && (
          <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            <p className="font-semibold">OTP Sent Successfully!</p>
            <p className="mt-1 text-xs">
              OTP has been sent to {mobileNumber}. Please check your SMS.
            </p>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <img 
            src="https://customer-assets.emergentagent.com/job_helpnet-mobile/artifacts/6ph4t7za_logoimage.jpeg"
            alt="GetInTouch Logo" 
            className="w-16 h-16 mx-auto mb-3 rounded-full"
          />
          <h2 className="text-2xl font-bold text-slate-800">GetInTouch</h2>
          <p className="text-slate-600 mt-2">Sign in to your account</p>
        </div>

        <div className="space-y-6">
          {/* Mobile Number Input */}
          <div>
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              type="tel"
              placeholder="Enter your mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="mt-2"
              disabled={otpSent}
            />
          </div>

          {/* Send OTP Button */}
          {!otpSent ? (
            <Button 
              onClick={handleSendOtp}
              disabled={isLoading}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white"
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </Button>
          ) : (
            <>
              {/* OTP Input */}
              <div>
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 4-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-2"
                  maxLength={4}
                />
              </div>

              {/* Verify OTP Button */}
              <Button 
                onClick={handleVerifyOtp}
                disabled={isLoading}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white"
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>

              {/* Resend OTP */}
              <Button 
                onClick={handleSendOtp}
                variant="outline"
                className="w-full"
              >
                Resend OTP
              </Button>
            </>
          )}

          {/* Sign Up Link */}
          <div className="text-center pt-4">
            <p className="text-slate-600 text-sm">
              Don't have an account?{" "}
              <Button 
                variant="link" 
                onClick={handleSignUp}
                className="text-slate-800 font-semibold p-0 h-auto"
              >
                Sign Up
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;