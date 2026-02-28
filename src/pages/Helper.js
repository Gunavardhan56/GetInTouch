import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, User, MapPin, AlertTriangle } from "lucide-react";
import { mockRequests, mockHelpers } from "../mock";

const Helper = () => {
  const navigate = useNavigate();

  const findBestHelperForRequest = (request) => {
    // Simple AI-style scoring: distance + rating + success + skill match + urgency weight
    const urgencyWeight =
      request.urgency === "high" || request.urgency === "emergency" ? 1.2 : 1;

    const typeLower = request.type.toLowerCase();

    const scored = mockHelpers.map((helper) => {
      const distanceScore = 1 / (1 + helper.distanceKm);
      const ratingScore = helper.rating / 5;
      const successScore = helper.successRate;
      const skillMatch = helper.skills.some((s) =>
        typeLower.includes(s.toLowerCase().split(" ")[0])
      )
        ? 1
        : 0.5;

      const rawScore =
        (distanceScore * 0.2 +
          ratingScore * 0.3 +
          successScore * 0.3 +
          skillMatch * 0.2) *
        urgencyWeight;

      return { helper, score: rawScore };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored[0];
  };

  const handleAcceptRequest = (requestId) => {
    // In a real app we would pass selected helper and request id
    navigate("/accept");
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'emergency':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'urgent':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getBgColor = (index) => {
    return index === 0 ? 'bg-indigo-100' : 'bg-purple-100';
  };

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
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">Nearby Requests</h2>
        
        <div className="space-y-4">
          {mockRequests.filter(request => request.status === 'pending').map((request, index) => {
            const best = findBestHelperForRequest(request);
            const scorePercent = Math.round(best.score * 100);
            return (
            <Card 
              key={request.id} 
              className={`${getBgColor(index)} border border-slate-300 hover:shadow-lg transition-shadow cursor-pointer`}
              onClick={() => handleAcceptRequest(request.id)}
            >
              <CardContent className="p-6">
                {/* User Info */}
                <div className="flex items-center mb-4">
                  <User className="w-8 h-8 text-slate-700 mr-3" />
                  <h3 className="text-xl font-bold text-slate-800">{request.userName}</h3>
                </div>

                {/* Request Details */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-lg font-semibold text-slate-800 mb-1">
                        Need: {request.type}
                      </p>
                      <div className="flex items-center text-slate-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{request.location}</span>
                      </div>
                    </div>
                    <div className="text-right text-xs text-slate-700">
                      <p className="font-semibold">
                        Match score: {scorePercent}%
                      </p>
                      <p className="text-[11px] text-slate-600">
                        Suggested helper: {best.helper.name}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-sm">{request.description}</p>

                  {/* Urgency and Cost */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-slate-600" />
                      <Badge className={getUrgencyColor(request.urgency)}>
                        Urgency: {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-lg font-bold text-slate-800">
                      Cost: ₹{request.cost}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Factors: rating · skills · distance · urgency
                    </p>
                  </div>
                </div>

                {/* Accept Button */}
                <Button 
                  className="w-full mt-4 bg-slate-800 hover:bg-slate-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAcceptRequest(request.id);
                  }}
                >
                  Accept Request
                </Button>
              </CardContent>
            </Card>
          )})}
        </div>

        {/* Empty State */}
        {mockRequests.filter(request => request.status === 'pending').length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No nearby requests at the moment</p>
            <p className="text-slate-400 text-sm mt-2">Check back later for new help requests</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Helper;