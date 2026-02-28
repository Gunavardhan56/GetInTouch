import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { ArrowLeft, MapPin } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { urgencyColors } from "../mock";

const Request = () => {
  const [formData, setFormData] = useState({
    location: "",
    description: "",
    urgency: "",
    cost: "",
    femaleOnly: false,
    emergencyContactName: "",
    emergencyContactPhone: "",
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

  const handleUseGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Mock location name based on coordinates
          handleInputChange("location", "Current Location (GPS)");
          toast({
            title: "Location Updated",
            description: "Your current location has been set",
          });
        },
        (error) => {
          toast({
            title: "Location Error", 
            description: "Unable to get your location. Please enter manually.",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "GPS Not Supported",
        description: "Please enter your location manually",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.location || !formData.description || !formData.urgency) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/confirm");
    }, 2000);
  };

  const urgencyOptions = [
    { value: "emergency", label: "Emergency", color: "bg-red-500 hover:bg-red-600" },
    { value: "urgent", label: "Urgent", color: "bg-orange-500 hover:bg-orange-600" },
    { value: "normal", label: "Normal", color: "bg-green-500 hover:bg-green-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center p-4">
          <ArrowLeft 
            className="w-8 h-8 text-slate-600 cursor-pointer hover:text-slate-800 mr-4" 
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
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-8">Raise a Request</h2>

        <div className="space-y-6">
          {/* Location Input */}
          <div>
            <Label htmlFor="location">Location *</Label>
            <div className="relative mt-2">
              <Input
                id="location"
                type="text"
                placeholder="Enter your location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="pr-20"
              />
              <Button
                type="button"
                onClick={handleUseGPS}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-3 bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm"
              >
                <MapPin className="w-4 h-4 mr-1" />
                GPS
              </Button>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description of Help *</Label>
            <Textarea
              id="description"
              placeholder="Describe what kind of help you need"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="mt-2 min-h-[120px]"
            />
          </div>

          {/* Estimated Cost */}
          <div>
            <Label htmlFor="cost">Estimated Cost (₹)</Label>
            <Input
              id="cost"
              type="number"
              placeholder="Enter estimated cost"
              value={formData.cost}
              onChange={(e) => handleInputChange("cost", e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Urgency Level */}
          <div>
            <Label>Urgency Level *</Label>
            <div className="flex gap-2 mt-2">
              {urgencyOptions.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  onClick={() => handleInputChange("urgency", option.value)}
                  className={`flex-1 text-white ${
                    formData.urgency === option.value 
                      ? option.color 
                      : "bg-slate-300 hover:bg-slate-400 text-slate-700"
                  }`}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Safety preferences */}
          <div className="space-y-3 pt-2">
            <p className="text-sm font-semibold text-slate-800">
              Safety preferences
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-700">Female helper only</span>
              <Button
                type="button"
                variant={formData.femaleOnly ? "default" : "outline"}
                className={`h-7 px-3 text-xs ${
                  formData.femaleOnly
                    ? "bg-slate-800 hover:bg-slate-700 text-white"
                    : ""
                }`}
                onClick={() =>
                  handleInputChange("femaleOnly", !formData.femaleOnly)
                }
              >
                {formData.femaleOnly ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <Label htmlFor="emergencyName">Emergency contact name</Label>
                <Input
                  id="emergencyName"
                  type="text"
                  placeholder="Person to alert in an emergency"
                  value={formData.emergencyContactName}
                  onChange={(e) =>
                    handleInputChange("emergencyContactName", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="emergencyPhone">Emergency contact number</Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  placeholder="Mobile number of emergency contact"
                  value={formData.emergencyContactPhone}
                  onChange={(e) =>
                    handleInputChange("emergencyContactPhone", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white mt-8 py-3 text-lg"
          >
            {isLoading ? "Submitting..." : "Submit Request"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Request;