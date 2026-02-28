// Mock data for Get In Touch app

export const mockUser = {
  id: "user_001",
  name: "John Doe",
  initials: "JD",
  mobile: "+91 9876543210",
  email: "john@example.com",
  gender: "Male",
  addressLine1: "123 Main Street",
  addressLine2: "Mumbai, Maharashtra 400001",
  memberSince: "15 Jan 2024",
  isHelper: true,
  isVerified: true,
  completedJobs: 27,
  skills: ["Form Fill Help", "Medical Assistance", "Technical Support"],
  emergencyContactName: "Anita Doe",
  emergencyContactPhone: "+91 9876543200",
};

export const mockProfileStats = {
  totalCoins: 850,
  rating: 4.7,
  totalRatings: 23,
};

export const mockEarnings = {
  availableBalanceCoins: 650,
  coinsInUse: 200,
  totalCoins: 850,
  totalEarningsInRupees: 2450,
};

export const mockCoinWallet = {
  totalCoins: 850,
  availableCoins: 650,
  coinsInUse: 200,
  coinValueInRupees: 1,
};

export const mockEscrow = {
  jobsInEscrow: [
    {
      id: "escrow_001",
      requestId: "req_002",
      helperId: "helper_003",
      amount: 500,
      commissionPercent: 5,
      status: "in_escrow", // in_escrow | released | disputed | refunded
    },
  ],
};

export const mockImpact = {
  totalJobsCompleted: 127,
  totalEarningsCommunity: 43000,
  emergencyCasesSupported: 18,
};

export const mockNotifications = [
  {
    id: "notif_001",
    title: "Payment Received",
    description: "You received ₹100 for Form Fill Help service",
    timestamp: "2025-01-15T16:00:00Z",
    type: "payment",
    isNew: true,
  },
  {
    id: "notif_002",
    title: "New Rating",
    description: "L Sumathi gave you 5 stars and left a review",
    timestamp: "2025-01-15T15:45:00Z",
    type: "rating",
    isNew: true,
  },
  {
    id: "notif_003",
    title: "New Help Request",
    description: "Someone needs Medical Assistance in Chilakapalem",
    timestamp: "2025-01-15T17:15:00Z",
    type: "request",
    isNew: true,
  },
  {
    id: "notif_004",
    title: "New Message",
    description: "Raghu sent you a message about Technical Support",
    timestamp: "2025-01-14T21:50:00Z",
    type: "message",
    isNew: true,
  },
];

export const mockHelpers = [
  {
    id: "helper_001",
    name: "A Kumar",
    location: "Srikakulam",
    rating: 4.2,
    distanceKm: 2.5,
    distance: "2.5 km",
    mobile: "+91 9876543211",
    isVerified: true,
    completedJobs: 34,
    skills: ["Form Fill Help"],
    successRate: 0.92,
    isFemale: false,
    available: true,
  },
  {
    id: "helper_002", 
    name: "L Sumathi",
    location: "Chilakapalem",
    rating: 4.8,
    distanceKm: 1.2,
    distance: "1.2 km",
    mobile: "+91 9876543212",
    isVerified: true,
    completedJobs: 41,
    skills: ["Medical Assistance", "Emergency Transport"],
    successRate: 0.96,
    isFemale: true,
    available: true,
  },
  {
    id: "helper_003",
    name: "Raghu",
    location: "Srikakulam",
    rating: 4.5,
    distanceKm: 3.1,
    distance: "3.1 km",
    mobile: "+91 9876543213",
    isVerified: false,
    completedJobs: 19,
    skills: ["Technical Support", "Form Fill Help"],
    successRate: 0.88,
    isFemale: false,
    available: true,
  }
];

export const mockRequests = [
  {
    id: "req_001",
    userId: "user_001",
    userName: "A Kumar",
    type: "Form Fill Help",
    description: "Need help with government form filling",
    location: "Srikakulam",
    urgency: "medium",
    cost: 100,
    status: "pending",
    timestamp: "2025-01-15T10:30:00Z"
  },
  {
    id: "req_002",
    userId: "user_002", 
    userName: "L Sumathi",
    type: "Medical Assistance",
    description: "Need help with medical emergency transport",
    location: "Chilakapalem",
    urgency: "high",
    cost: 500,
    status: "pending",
    timestamp: "2025-01-15T11:45:00Z"
  },
  {
    id: "req_003",
    userId: "user_003",
    userName: "Priya Sharma",
    type: "Technical Support", 
    description: "Computer repair assistance needed",
    location: "Visakhapatnam",
    urgency: "normal",
    cost: 200,
    status: "completed",
    timestamp: "2025-01-15T09:15:00Z"
  }
];

export const mockChatMessages = [
  {
    id: "msg_001",
    senderId: "user_001",
    senderName: "John Doe",
    message: "Hi, I need help with form filling",
    timestamp: "2025-01-15T17:00:00Z"
  },
  {
    id: "msg_002",
    senderId: "helper_001", 
    senderName: "A Kumar",
    message: "Hello! I can help you with that. What type of form do you need help with?",
    timestamp: "2025-01-15T17:02:00Z"
  },
  {
    id: "msg_003",
    senderId: "user_001",
    senderName: "John Doe", 
    message: "It's a government application form for passport",
    timestamp: "2025-01-15T17:05:00Z"
  }
];

export const mockReviews = [
  {
    id: "review_001",
    reviewerName: "Priya Sharma",
    rating: 4,
    comment: "Good service but took a bit longer than expected.",
    date: "14 Jan 2025",
  },
  {
    id: "review_002",
    reviewerName: "Amit Singh",
    rating: 5,
    comment: "Amazing helper! Solved my problem quickly and efficiently.",
    date: "14 Jan 2025",
  },
];

export const mockTransactions = [
  {
    id: "txn_001",
    description: "Connect fee - Chat with Raghu",
    amountCoins: -10,
    date: "15 Jan 2025",
  },
  {
    id: "txn_002",
    description: "Payment for Medical Assistance",
    amountCoins: 250,
    date: "14 Jan 2025",
  },
  {
    id: "txn_003",
    description: "Connect fee - Chat with L Sumathi",
    amountCoins: -5,
    date: "14 Jan 2025",
  },
  {
    id: "txn_004",
    description: "Payment for Technical Support",
    amountCoins: 150,
    date: "14 Jan 2025",
  },
];

export const mockDisputes = [
  {
    id: "disp_001",
    requestId: "req_002",
    helperName: "Raghu",
    userName: "John Doe",
    reason: "Helper arrived late to the emergency pickup",
    status: "open", // open | in_review | resolved | refunded
    requestedRefundAmount: 250,
  },
];

export const urgencyColors = {
  emergency: "bg-red-500 hover:bg-red-600",
  urgent: "bg-orange-500 hover:bg-orange-600", 
  normal: "bg-green-500 hover:bg-green-600",
  medium: "bg-yellow-500 hover:bg-yellow-600"
};