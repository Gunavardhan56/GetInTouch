import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ArrowLeft, Phone, Mic, Send, ShieldAlert } from "lucide-react";
import { mockChatMessages } from "../mock";

const Chat = () => {
  const [messages, setMessages] = useState(mockChatMessages);
  const [newMessage, setNewMessage] = useState("");
  const [showEscrowBanner, setShowEscrowBanner] = useState(true);
  const navigate = useNavigate();
  
  const currentUserId = "user_001"; // Mock current user ID

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: `msg_${Date.now()}`,
      senderId: currentUserId,
      senderName: "John Doe",
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleVoiceMessage = () => {
    // Mock voice message functionality
    alert("Voice message feature would be implemented here");
  };

  const handleCall = () => {
    // Mock call functionality
    alert("Calling Raghu...");
  };

  const handleSos = () => {
    alert(
      "SOS triggered.\n\nYour live location and details would be shared with your emergency contact and nearby verified helpers in a real deployment."
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <ArrowLeft 
              className="w-8 h-8 text-slate-600 cursor-pointer hover:text-slate-800 mr-4" 
              onClick={() => navigate("/accept")}
            />
            <h2 className="text-xl font-bold text-slate-800">Raghu</h2>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleCall}
          >
            <Phone className="w-6 h-6 text-slate-700" />
          </Button>
        </div>
      </header>

      {/* Escrow + SOS bar */}
      {showEscrowBanner && (
        <div className="bg-blue-50 border-b border-blue-100 px-4 py-2 text-[11px] text-slate-700 flex items-center justify-between">
          <span>
            Payment for this job is held safely in escrow. It will be released
            after you mark the service as completed or raise a dispute.
          </span>
          <button
            type="button"
            className="ml-3 text-[10px] text-blue-700 underline"
            onClick={() => setShowEscrowBanner(false)}
          >
            Hide
          </button>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.senderId === currentUserId
                  ? 'bg-slate-800 text-white'
                  : 'bg-white text-slate-800 border border-slate-200'
              }`}
            >
              <p className="text-sm">{message.message}</p>
              <p className={`text-xs mt-1 ${
                message.senderId === currentUserId ? 'text-slate-300' : 'text-slate-500'
              }`}>
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}

        {/* Welcome Message */}
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-500">Start a conversation with Raghu</p>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Write a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleVoiceMessage}
          >
            <Mic className="w-5 h-5 text-slate-600" />
          </Button>
          
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-slate-800 hover:bg-slate-700 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Service Completion + SOS */}
      <div className="bg-blue-50 border-t p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-slate-600">Service completed?</p>
            <p className="text-[11px] text-slate-500">
              On completion we release the escrow amount to the helper.
            </p>
          </div>
          <Button
            onClick={() => navigate("/thank")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 text-sm"
          >
            Mark as Complete
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <p className="text-[11px] text-slate-600">
              Feel unsafe? Quickly alert your trusted contacts.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-rose-600 border-rose-200 text-xs px-3 py-1 h-7"
            onClick={handleSos}
          >
            SOS
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-[11px] text-slate-600 px-2 py-1 h-7"
            onClick={() => navigate("/dispute")}
          >
            Report issue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;