module.exports = (/* { strapi } */) => {
    const io = require('socket.io')(strapi.server.httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
  
    io.on("connection", (socket) => {
      console.log("A user connected");
  
      socket.on("newMessage", (message) => {
        console.log("New message received:", message);
        io.emit("messageBroadcast", message);
      });
  
      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });
  
    strapi.io = io;  // Make io globally available in Strapi
  };
  