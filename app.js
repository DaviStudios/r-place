const express = require('express');
const socketio = require('socket.io');
const http = require('http');

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Set up Socket.IO
const io = socketio(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Array to store the pixels
let pixels = [];

// Handle client connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Emit all pixels to the client
  socket.emit('initialPixels', pixels);

  // Handle pixel placement from the client
  socket.on('placePixel', (pixelData) => {
    pixels.push(pixelData);
    io.emit('newPixel', pixelData);
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
