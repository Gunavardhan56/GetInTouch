import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useToast } from "../hooks/use-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    gender: "",
    email: "",
    address: "",
    upiNumber: "",
    upiId: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSignup = async () => {
    // Validate required fields
    if (
      !formData.fullName ||
      !formData.mobile ||
      !formData.gender ||
      !formData.address ||
      !formData.upiNumber ||
      !formData.upiId
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      });
      return;
    }

    if (formData.mobile.length < 10) {
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
      setIsLoading(false);
      toast({
        title: "Account Created Successfully",
        description: "Welcome to GetInTouch! Please login to continue.",
      });
      navigate("/login");
    }, 2000);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <img 
            src="https://customer-assets.emergentagent.com/job_helpnet-mobile/artifacts/6ph4t7za_logoimage.jpeg"
            alt="GetInTouch Logo" 
            className="w-16 h-16 mx-auto mb-3 rounded-full"
          />
          <h2 className="text-2xl font-bold text-slate-800">GetInTouch</h2>
          <p className="text-lg font-semibold text-slate-700 mt-4">Create Account</p>
        </div>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <Label htmlFor="mobile">Mobile Number *</Label>
            <Input
              id="mobile"
              type="tel"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={(e) => handleInputChange("mobile", e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Gender */}
          <div>
            <Label>Gender *</Label>
            <Select onValueChange={(value) => handleInputChange("gender", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Address / City *</Label>
            <Input
              id="address"
              type="text"
              placeholder="Enter your address or city"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="mt-1"
            />
          </div>

          {/* UPI Number */}
          <div>
            <Label htmlFor="upiNumber">UPI Number *</Label>
            <Input
              id="upiNumber"
              type="tel"
              placeholder="Enter your UPI registered mobile number"
              value={formData.upiNumber}
              onChange={(e) => handleInputChange("upiNumber", e.target.value)}
              className="mt-1"
            />
          </div>

          {/* UPI ID */}
          <div>
            <Label htmlFor="upiId">UPI ID *</Label>
            <Input
              id="upiId"
              type="text"
              placeholder="Enter your UPI ID (e.g., name@paytm)"
              value={formData.upiId}
              onChange={(e) => handleInputChange("upiId", e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Sign Up Button */}
          <Button 
            onClick={handleSignup}
            disabled={isLoading}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white mt-6"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>

          {/* Login Link */}
          <div className="text-center pt-4">
            <p className="text-slate-600 text-sm">
              Already have an account?{" "}
              <Button 
                variant="link" 
                onClick={handleLogin}
                className="text-slate-800 font-semibold p-0 h-auto"
              >
                Log in
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;