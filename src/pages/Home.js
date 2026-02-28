import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { 
  ArrowLeft, 
  Bell, 
  IndianRupee, 
  MapPin, 
  MessageCircle, 
  User, 
  HandHeart,
  ShieldCheck 
} from "lucide-react";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { ScrollArea } from "../components/ui/scroll-area";
import { 
  mockRequests, 
  mockHelpers, 
  mockUser, 
  mockProfileStats, 
  mockEarnings, 
  mockCoinWallet,
  mockNotifications,
  mockReviews,
  mockTransactions,
  mockImpact,
  mockEscrow
} from "../mock";

const Home = () => {
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCoinsOpen, setIsCoinsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [locationRequest, setLocationRequest] = useState(null);
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
  const [selectedHelper, setSelectedHelper] = useState(null);
  const [showConnectedBanner, setShowConnectedBanner] = useState(false);
  const [wallet, setWallet] = useState({
    totalCoins: mockCoinWallet.totalCoins,
    availableCoins: mockCoinWallet.availableCoins,
    coinsInUse: mockCoinWallet.coinsInUse,
  });

  const handleNeedHelp = () => {
    navigate("/request");
  };

  const handleBeHelper = () => {
    navigate("/helper");
  };

  const handleNotifications = () => {
    setIsNotificationsOpen(true);
  };

  const handleOpenProfile = () => {
    setIsProfileOpen(true);
  };

  const handleViewLocation = (request) => {
    setLocationRequest(request);
    setIsLocationDialogOpen(true);
  };

  const handleConnectHelper = (helper) => {
    setSelectedHelper(helper);
    setIsConnectDialogOpen(true);
  };

  const handleConfirmConnect = () => {
    setIsConnectDialogOpen(false);
    setShowConnectedBanner(true);
    setWallet(prev => ({
      ...prev,
      availableCoins: Math.max(prev.availableCoins - 1, 0),
      coinsInUse: prev.coinsInUse + 1,
      totalCoins: prev.totalCoins,
    }));
    setTimeout(() => {
      setShowConnectedBanner(false);
    }, 3000);
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Connected banner */}
      {showConnectedBanner && (
        <div className="fixed top-16 inset-x-0 z-40 flex justify-center">
          <div className="bg-slate-900 text-white text-sm px-4 py-2 rounded-full shadow-lg">
            Connected successfully! 1 coin has been debited from your account.
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          {/* Profile trigger */}
          <button
            type="button"
            onClick={handleOpenProfile}
            className="flex items-center focus:outline-none"
          >
            <Avatar className="w-10 h-10">
              <AvatarFallback className="text-sm font-semibold bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                {mockUser.initials}
              </AvatarFallback>
            </Avatar>
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_helpnet-mobile/artifacts/6ph4t7za_logoimage.jpeg"
              alt="GetInTouch Logo" 
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-xl font-bold text-slate-800">GetInTouch</h1>
          </div>
          
          {/* Notifications + Coins */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleNotifications}
              className="relative"
            >
              <Bell className="w-6 h-6 text-slate-700" />
              {mockNotifications.some(n => n.isNew) && (
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCoinsOpen(true)}
              className="flex items-center bg-yellow-400 hover:bg-yellow-300 rounded-full px-3 py-1"
            >
              <IndianRupee className="w-4 h-4 text-yellow-900" />
              <span className="text-sm font-semibold text-yellow-900 ml-1">
                {wallet.totalCoins}
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Need Help Card */}
          <Card 
            className="border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors"
            onClick={handleNeedHelp}
          >
            <CardContent className="p-6 text-center">
              <User className="w-16 h-16 mx-auto mb-4 text-slate-700" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Need Help</h3>
              <p className="text-slate-600">Request assistance from local helpers</p>
            </CardContent>
          </Card>

          {/* Be a Helper Card */}
          <Card 
            className="border-2 border-green-200 bg-green-50 hover:bg-green-100 cursor-pointer transition-colors"
            onClick={handleBeHelper}
          >
            <CardContent className="p-6 text-center">
              <HandHeart className="w-16 h-16 mx-auto mb-4 text-slate-700" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Be a Helper</h3>
              <p className="text-slate-600">Help people in your community</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Requests Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-800">Recent Requests</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockRequests.slice(0, 2).map((request) => (
              <Card key={request.id} className="border border-slate-200 bg-white shadow-sm">
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-slate-800">{request.type}</h4>
                    <Badge
                      className={
                        request.urgency === "high"
                          ? "bg-red-100 text-red-800"
                          : request.urgency === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }
                    >
                      {request.urgency.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{request.location}</span>
                  </div>
                  <p className="text-sm text-slate-600">₹{request.cost}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(request.timestamp).toLocaleDateString()}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleViewLocation(request)}
                    className="text-xs text-blue-600 mt-1 underline"
                  >
                    Click to view location
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Helpers Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-800">Available Helpers</h2>
          <div className="space-y-3">
            {mockHelpers.map((helper, index) => (
              <Card
                key={helper.id}
                className={`border-0 shadow-md bg-gradient-to-r ${
                  index === 0
                    ? "from-cyan-500/10 to-indigo-500/10"
                    : index === 1
                    ? "from-purple-500/10 to-pink-500/10"
                    : "from-slate-500/10 to-slate-500/5"
                }`}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback
                        className={`text-sm font-semibold text-white ${
                          index === 0
                            ? "bg-gradient-to-br from-cyan-500 to-indigo-500"
                            : index === 1
                            ? "bg-gradient-to-br from-purple-500 to-pink-500"
                            : "bg-slate-800"
                        }`}
                      >
                        {helper.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-slate-800">{helper.name}</p>
                      <div className="flex items-center text-xs text-slate-600 space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{helper.location}</span>
                        <span>• {helper.distance}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        ⭐ {helper.rating.toFixed(1)}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleConnectHelper(helper)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Impact Section */}
        <div className="space-y-3 pb-6">
          <h2 className="text-2xl font-semibold text-slate-800">
            Community Impact
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <Card className="shadow-sm bg-blue-50">
              <CardContent className="p-3 text-center">
                <p className="text-[11px] text-slate-600 mb-1">
                  Requests completed
                </p>
                <p className="text-xl font-bold text-slate-800">
                  {mockImpact.totalJobsCompleted}
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-sm bg-emerald-50">
              <CardContent className="p-3 text-center">
                <p className="text-[11px] text-slate-600 mb-1">
                  Earned by helpers
                </p>
                <p className="text-xl font-bold text-slate-800">
                  ₹{mockImpact.totalEarningsCommunity}
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-sm bg-rose-50">
              <CardContent className="p-3 text-center">
                <p className="text-[11px] text-slate-600 mb-1">
                  Emergency transports
                </p>
                <p className="text-xl font-bold text-slate-800">
                  {mockImpact.emergencyCasesSupported}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Profile Sheet */}
      <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <SheetContent side="right" className="w-full sm:max-w-sm">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-xl font-semibold text-slate-800">
              My Profile
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-full pr-4">
            <div className="space-y-6 pb-6">
              {/* User Card */}
              <Card className="shadow-sm">
                <CardContent className="p-4 flex space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="text-sm font-semibold bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                      {mockUser.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-slate-800">
                        {mockUser.name}
                      </h3>
                      {mockUser.isVerified && (
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                          <ShieldCheck className="w-3 h-3 mr-1" />
                          Verified helper
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">
                      Member since {mockUser.memberSince}
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      Completed jobs:{" "}
                      <span className="font-semibold">
                        {mockUser.completedJobs}
                      </span>
                    </p>
                    <div className="mt-2 space-y-1 text-xs text-slate-600">
                      <p>{mockUser.mobile}</p>
                      <p>{mockUser.email}</p>
                      <p>{mockUser.addressLine1}</p>
                      <p>{mockUser.addressLine2}</p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {mockUser.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Coins & Rating */}
              <div className="grid grid-cols-2 gap-3">
                <Card className="shadow-sm">
                  <CardContent className="p-3 text-center">
                    <p className="text-xs text-slate-500 mb-1">Total Coins</p>
                    <p className="text-xl font-bold text-slate-800">
                      {mockProfileStats.totalCoins}
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm">
                  <CardContent className="p-3 text-center">
                    <p className="text-xs text-slate-500 mb-1">Ratings</p>
                    <p className="text-xl font-bold text-slate-800">
                      {mockProfileStats.rating.toFixed(1)}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {mockProfileStats.totalRatings} Ratings
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Earnings */}
              <Card className="shadow-sm bg-gradient-to-br from-emerald-50 to-slate-50">
                <CardContent className="p-4 space-y-3">
                  <h4 className="font-semibold text-slate-800">My Earnings</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p>
                      Available Balance{" "}
                      <span className="font-semibold text-emerald-700">
                        {mockEarnings.availableBalanceCoins}
                      </span>
                    </p>
                    <p>
                      Total Coins{" "}
                      <span className="font-semibold">
                        {mockEarnings.totalCoins}
                      </span>
                    </p>
                    <p>
                      Total Earnings{" "}
                      <span className="font-semibold text-slate-800">
                        ₹{mockEarnings.totalEarningsInRupees}
                      </span>
                    </p>
                  </div>
                  <Button variant="outline" className="w-full text-sm">
                    View Transaction History
                  </Button>
                </CardContent>
              </Card>

              {/* Ratings & Reviews */}
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-800">
                  My Ratings &amp; Reviews
                </h4>
                <Card className="shadow-sm">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-yellow-500">
                        {mockProfileStats.rating.toFixed(1)}
                      </span>
                      <p className="text-xs text-slate-500">
                        {mockProfileStats.totalRatings} people have rated you
                      </p>
                    </div>
                    <div className="space-y-3">
                      {mockReviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-t pt-3 first:border-t-0 first:pt-0"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-semibold text-slate-800">
                              {review.reviewerName}
                            </p>
                            <p className="text-xs text-yellow-500">
                              {"⭐".repeat(review.rating)}
                            </p>
                          </div>
                          <p className="text-xs text-slate-600 mb-1">
                            {review.comment}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {review.date}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Transaction History */}
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-800">
                  Transaction History
                </h4>
                <Card className="shadow-sm">
                  <CardContent className="p-4 space-y-2">
                    {mockTransactions.map((txn) => (
                      <div
                        key={txn.id}
                        className="flex items-center justify-between py-1"
                      >
                        <div>
                          <p className="text-xs font-medium text-slate-800">
                            {txn.description}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {txn.date}
                          </p>
                        </div>
                        <p
                          className={`text-sm font-semibold ${
                            txn.amountCoins > 0
                              ? "text-emerald-600"
                              : "text-red-600"
                          }`}
                        >
                          {txn.amountCoins > 0 ? "+" : ""}
                          {txn.amountCoins}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Logout */}
              <Button
                variant="destructive"
                className="w-full mt-2"
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Coins Dialog */}
      <Dialog open={isCoinsOpen} onOpenChange={setIsCoinsOpen}>
        <DialogContent className="max-w-sm w-[90%]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              My Coins
            </DialogTitle>
            <DialogDescription className="sr-only">
              Overview of your available coins and their value
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
                <IndianRupee className="w-8 h-8 text-yellow-600" />
              </div>
              <p className="text-sm text-slate-500">Total Coins</p>
              <p className="text-3xl font-bold text-slate-800">
                {wallet.totalCoins}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-xs text-slate-500 mb-1">Available</p>
                  <p className="text-lg font-semibold text-emerald-700">
                    {wallet.availableCoins}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-xs text-slate-500 mb-1">In Use</p>
                  <p className="text-lg font-semibold text-slate-700">
                    {wallet.coinsInUse}
                  </p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardContent className="p-3 flex items-center justify-between text-sm">
                <p className="text-slate-600">
                  Coin Value <span className="text-xs">(1 Coin = ₹1)</span>
                </p>
                <p className="font-semibold text-slate-800">
                  ₹{wallet.totalCoins * mockCoinWallet.coinValueInRupees}
                </p>
              </CardContent>
            </Card>
            {mockEscrow.jobsInEscrow.length > 0 && (
              <Card className="border-blue-100 bg-blue-50">
                <CardContent className="p-3 text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-800">
                    Payments in escrow
                  </p>
                  {mockEscrow.jobsInEscrow.map((job) => {
                    const commission = (job.amount * job.commissionPercent) / 100;
                    const helperGets = job.amount - commission;
                    return (
                      <div key={job.id} className="space-y-0.5">
                        <p>
                          Request #{job.requestId}: ₹{job.amount} on hold
                        </p>
                        <p>
                          Platform fee ({job.commissionPercent}%): ₹{commission}
                        </p>
                        <p className="font-medium">
                          Helper will receive: ₹{helperGets} after completion
                        </p>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              Add Coins
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsCoinsOpen(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notifications Dialog */}
      <Dialog open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
        <DialogContent className="max-w-sm w-[90%]">
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[380px] pr-3">
            <div className="space-y-3">
              {mockNotifications.map((notif) => (
                <Card key={notif.id} className="shadow-sm">
                  <CardContent className="p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-800">
                        {notif.title}
                      </p>
                      {notif.isNew && (
                        <Badge className="bg-blue-100 text-blue-700 text-[10px]">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-600">
                      {notif.description}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {new Date(notif.timestamp).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Location Access Dialog */}
      <Dialog
        open={isLocationDialogOpen}
        onOpenChange={setIsLocationDialogOpen}
      >
        <DialogContent className="max-w-sm w-[90%]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-slate-700" />
              <span>Enable Location Access</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              To see help requests near you and show your location to help
              seekers, please enable location access.
            </p>
            {locationRequest && (
              <Card className="bg-slate-50">
                <CardContent className="p-3">
                  <p className="text-sm font-semibold text-slate-800">
                    {locationRequest.type}
                  </p>
                  <p className="text-xs text-slate-600">
                    {locationRequest.location}
                  </p>
                </CardContent>
              </Card>
            )}
            <div className="flex space-x-3">
              <Button
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white"
                onClick={() => setIsLocationDialogOpen(false)}
              >
                Enable Location
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsLocationDialogOpen(false)}
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Connection Fee Dialog */}
      <Dialog
        open={isConnectDialogOpen}
        onOpenChange={setIsConnectDialogOpen}
      >
        <DialogContent className="max-w-sm w-[90%]">
          <DialogHeader>
            <DialogTitle>
              {selectedHelper ? `Connect with ${selectedHelper.name}` : "Connect"}
            </DialogTitle>
          </DialogHeader>
          {selectedHelper && (
            <div className="space-y-4">
              <Card className="bg-slate-50">
                <CardContent className="p-3 flex items-center space-x-3">
                  <Avatar className="w-10 h-10 bg-slate-800 text-white">
                    <AvatarFallback>
                      {selectedHelper.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {selectedHelper.name}
                    </p>
                    <p className="text-xs text-slate-600">
                      {selectedHelper.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-yellow-50 border-yellow-100">
                <CardContent className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Connection Fee
                    </p>
                    <p className="text-[11px] text-slate-600">
                      A small fee will be charged to start the conversation
                    </p>
                  </div>
                  <p className="text-sm font-bold text-yellow-700">1 coin</p>
                </CardContent>
              </Card>
              <Button
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                onClick={handleConfirmConnect}
              >
                Connecting...
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;