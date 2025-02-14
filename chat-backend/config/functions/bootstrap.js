const io = require('socket.io');

module.exports = async () => {
  const socket = io(strapi.server, {
    cors: { origin: '*' }
  });

  socket.on('connection', (client) => {
    console.log('Client connected:', client.id);

    client.on('message', (data) => {
      console.log('Received message:', data);
      client.emit('message', data);  // Echo back the same message
    });

    client.on('disconnect', () => {
      console.log('Client disconnected:', client.id);
    });
  });
};