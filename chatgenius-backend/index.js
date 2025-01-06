import express from 'express'; // framework to create server
import http from 'http'; // module to create HTTP server (for Socket.IO)
import {Server as socketIoServer } from 'socket.io'; // for real-time communication

const app = express(); // create express app
const server = http.createServer(app); // create HTTP server
// Create HTTP server using our Express app
// CORS = Cross-Origin Resource Sharing
//  It allows your React app (running on localhost:3000) to connect 
// to your backend server (running on localhost:4000). Without this, 
// the browser would block the connection due to security restrictions.
const io = new socketIoServer(server, {
  cors: {
    origin: "http://localhost:3000", // Allow your React app to connect
    methods: ["GET", "POST"]
  }
});

const port = 4000; // port to listen on

// Listen for new connections from clients and log them
io.on('connection', (socket) => {
  console.log('New client connected');

  // Listen for disconnection event and log it  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server and listen on the specified port
server.listen(port, () => console.log(`Listening on port ${port}`));
