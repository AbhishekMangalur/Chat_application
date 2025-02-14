// src/index.ts
import { Server } from "socket.io";

export default async ({ strapi }) => {
  const io = new Server(strapi.server.httpServer, {
    cors: {
      origin: "http://localhost:3000", // Allow requests from your React app
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`New WebSocket connection: ${socket.id}`);
    
    socket.on("newMessage", (message) => {
      console.log("New message received:", message);
      socket.broadcast.emit("messageBroadcast", message);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  strapi.io = io;
  console.log("Socket.IO server initialized");
};
