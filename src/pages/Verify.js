import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { CheckCircle2, IdCard, Camera } from "lucide-react";
import { mockUser } from "../mock";

const Verify = () => {
  const [step, setStep] = useState(1);
  const [govIdNumber, setGovIdNumber] = useState("");
  const [selfieFileName, setSelfieFileName] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && !govIdNumber.trim()) return;
    if (step === 2 && !selfieFileName) return;
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate("/home");
    }
  };

  const handleSelfieChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelfieFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center px-6">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md space-y-6">
        <div className="flex items-center justify-center space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="text-sm font-semibold bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
              {mockUser.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs text-slate-500">Verification Center</p>
            <h2 className="text-xl font-bold text-slate-800">
              Secure your profile
            </h2>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className={step >= 1 ? "font-semibold text-slate-800" : ""}>
            1. Government ID
          </span>
          <span className={step >= 2 ? "font-semibold text-slate-800" : ""}>
            2. Selfie
          </span>
          <span className={step >= 3 ? "font-semibold text-slate-800" : ""}>
            3. Review
          </span>
        </div>

        {step === 1 && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center space-x-3">
                <IdCard className="w-6 h-6 text-slate-700" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Government ID verification
                  </p>
                  <p className="text-xs text-slate-500">
                    Enter mock Aadhaar or Driving License number
                  </p>
                </div>
              </div>
              <div>
                <Label htmlFor="govId">Aadhaar / DL Number</Label>
                <Input
                  id="govId"
                  type="text"
                  placeholder="Enter mock ID number"
                  value={govIdNumber}
                  onChange={(e) => setGovIdNumber(e.target.value)}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center space-x-3">
                <Camera className="w-6 h-6 text-slate-700" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Selfie verification
                  </p>
                  <p className="text-xs text-slate-500">
                    Upload a selfie to match with your ID
                  </p>
                </div>
              </div>
              <div>
                <Label htmlFor="selfie">Upload Selfie</Label>
                <Input
                  id="selfie"
                  type="file"
                  accept="image/*"
                  onChange={handleSelfieChange}
                  className="mt-2"
                />
                {selfieFileName && (
                  <p className="mt-1 text-xs text-slate-500">
                    Selected: {selfieFileName}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Verification ready
                  </p>
                  <p className="text-xs text-slate-500">
                    We will mock-approve this instantly for demo.
                  </p>
                </div>
              </div>
              <ul className="text-xs text-slate-600 list-disc list-inside space-y-1">
                <li>Government ID captured: {govIdNumber || "—"}</li>
                <li>Selfie file: {selfieFileName || "—"}</li>
                <li>Your profile will show a blue “Verified helper” badge.</li>
              </ul>
            </CardContent>
          </Card>
        )}

        <Button
          onClick={handleNext}
          className="w-full bg-slate-800 hover:bg-slate-700 text-white mt-2"
        >
          {step < 3 ? "Next" : "Finish & Go Home"}
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate("/home")}
        >
          Skip for now
        </Button>
      </div>
    </div>
  );
};

export default Verify;

