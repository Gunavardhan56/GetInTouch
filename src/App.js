import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import "./App.css";

// Import all pages
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Request from "./pages/Request";
import Confirm from "./pages/Confirm";
import Helper from "./pages/Helper";
import Accept from "./pages/Accept";
import Chat from "./pages/Chat";
import Thank from "./pages/Thank";
import Verify from "./pages/Verify";
import Dispute from "./pages/Dispute";
import Admin from "./pages/Admin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/request" element={<Request />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/helper" element={<Helper />} />
          <Route path="/accept" element={<Accept />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/thank" element={<Thank />} />
          <Route path="/dispute" element={<Dispute />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;