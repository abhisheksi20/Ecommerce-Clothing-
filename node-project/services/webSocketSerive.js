// websocketService.js

const WebSocket = require('ws');


// Create a WebSocket server
const wss = new WebSocket.Server({ port:8500 });

// Handle incoming connections
wss.on('connection', (socket) => {
  console.log('Client connected');

  // Handle incoming messages from clients
  socket.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      console.log(parsedMessage);

      
    } catch (error) {
      console.error("Error processing WebSocket message:", error);
    }
  });

  // Handle client disconnections
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

module.exports = wss;
