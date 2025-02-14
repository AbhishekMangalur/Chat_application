import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:1337", {
  transports: ["websocket"],
});

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/messages");
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        setMessages(data.data || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Unable to load messages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    socket.on("messageBroadcast", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    return () => {
      socket.off("messageBroadcast");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await fetch("http://localhost:1337/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { content: newMessage } }),
      });

      if (response.ok) {
        const newMessageData = await response.json();
        setMessages((prevMessages) => [...prevMessages, newMessageData.data]);
        setNewMessage("");
        socket.emit("newMessage", newMessageData.data);
        scrollToBottom();
      }
    } catch (error) {
      console.error("Error posting message:", error);
      setError("Failed to send message. Please try again.");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    // Clear session data or token if applicable
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-2xl p-6 bg-gray-800 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-green-500">Chat Messages</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 rounded-md text-white hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="h-64 overflow-y-scroll border border-gray-700 rounded-md p-4 bg-gray-700">
          {loading ? (
            <p>Loading messages...</p>
          ) : messages.length > 0 ? (
            messages.map((message) => (
              <div
                key={message.id}
                className="p-2 mb-2 bg-gray-600 rounded-md shadow-sm"
              >
                {message.content || "No message content available"}
              </div>
            ))
          ) : (
            <p className="text-red-500">No messages available</p>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enter a new message"
            required
            className="flex-1 p-2 rounded-md border border-gray-600 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 rounded-md text-white hover:bg-green-600 transition duration-200"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatApp;