// import React, { useState } from "react";

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const handleSend = () => {
//     if (input.trim()) {
//       setMessages([...messages, { text: input, sender: "user" }]);
//       setInput("");
      
//       // Simulate server response
//       setTimeout(() => {
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { text: input, sender: "server" },
//         ]);
//       }, 500);
//     }
//   };

//   return (
//     <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
//       <div className="w-full max-w-md border border-gray-700 rounded-lg overflow-hidden shadow-lg">
//         <div className="h-64 overflow-y-auto p-4 bg-gray-800">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`mb-2 p-2 rounded-lg ${
//                 msg.sender === "user"
//                   ? "bg-blue-500 text-right"
//                   : "bg-green-500 text-left"
//               }`}
//             >
//               {msg.text}
//             </div>
//           ))}
//         </div>
//         <div className="flex p-2 bg-gray-700">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             className="flex-1 p-2 rounded-lg bg-gray-600 text-white focus:outline-none"
//             placeholder="Type a message..."
//           />
//           <button
//             onClick={handleSend}
//             className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;

import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:1337"); // Connect to the Strapi backend

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, { text: message, sender: "server" }]);
    });

    return () => socket.off("message");
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      socket.emit("message", input); // Send message to server
      setInput("");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md border border-gray-700 rounded-lg overflow-hidden shadow-lg">
        <div className="h-64 overflow-y-auto p-4 bg-gray-800">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-500 text-right"
                  : "bg-green-500 text-left"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex p-2 bg-gray-700">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 rounded-lg bg-gray-600 text-white focus:outline-none"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
