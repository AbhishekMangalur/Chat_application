import { Server } from 'socket.io';
import { createServer } from 'http';

export default ({ env }) => {
  const host = env('HOST', '0.0.0.0');
  const port = env.int('PORT', 1337);

  return {
    host,
    port,
    app: {
      keys: env.array('APP_KEYS'),
    },
    afterStartup: async ({ strapi }) => {
      // Create a new HTTP server with the existing Strapi server
      const httpServer = createServer(strapi.server.http);
      
      // Initialize Socket.IO
      const io = new Server(httpServer, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
        },
      });

      // Handle WebSocket connections
      io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        // Handle new messages from the client
        socket.on('newMessage', async (message) => {
          console.log('Broadcasting new message:', message);
          
          // Emit the message to all connected clients
          io.emit('messageBroadcast', message);

          // Optional: Save the message in your Strapi database (if needed)
          try {
            await strapi.query('api::message.message').create({
              data: { content: message.content, createdAt: new Date() },
            });
          } catch (err) {
            console.error('Failed to save message:', err);
          }
        });

        socket.on('disconnect', () => {
          console.log('Client disconnected:', socket.id);
        });
      });

      // Start the HTTP server
      httpServer.listen(port, () => {
        console.log(`WebSocket server running on http://${host}:${port}`);
      });
    },
  };
};
