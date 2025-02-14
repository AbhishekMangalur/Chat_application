import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ChatApp from "./ChatApp"; // Import ChatApp component
import Signup from "./components/Signup"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<ChatApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
