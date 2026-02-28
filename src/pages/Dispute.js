import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent } from "../components/ui/card";
import { ArrowLeft, AlertTriangle } from "lucide-react";

const Dispute = () => {
  const [issue, setIssue] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachmentName(e.target.files[0].name);
    }
  };

  const handleSubmit = () => {
    if (!issue.trim()) return;
    alert(
      "Dispute submitted.\n\nIn a full version this would go to an admin review dashboard with refund / penalty decisions."
    );
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center p-4">
          <ArrowLeft
            className="w-8 h-8 text-slate-600 cursor-pointer hover:text-slate-800 mr-4"
            onClick={() => navigate(-1)}
          />
          <div className="flex items-center space-x-3">
            <img
              src="https://customer-assets.emergentagent.com/job_helpnet-mobile/artifacts/6ph4t7za_logoimage.jpeg"
              alt="GetInTouch Logo"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-xl font-bold text-slate-800">Report an Issue</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-6 max-w-md mx-auto">
        <Card>
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <p className="text-sm text-slate-700">
                Tell us what went wrong with this service. Your payment is held
                in escrow until the dispute is resolved.
              </p>
            </div>

            <div>
              <Label htmlFor="issue">Describe the issue *</Label>
              <Textarea
                id="issue"
                placeholder="Explain what happened, including dates, promises, and what resolution you expect"
                className="mt-2 min-h-[120px]"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="attachment">Upload proof (optional)</Label>
              <Input
                id="attachment"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2"
              />
              {attachmentName && (
                <p className="mt-1 text-[11px] text-slate-500">
                  Attached: {attachmentName}
                </p>
              )}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!issue.trim()}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white mt-2"
            >
              Submit Dispute
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dispute;

