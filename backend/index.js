const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Create app and HTTP server
const app = express();
const server = http.createServer(app);

// Enable CORS for Expo (adjust origin if needed)
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: '*', // or specific IP: http://192.168.X.X:8081
    methods: ['GET', 'POST'],
  },
});

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log(`🟢 User connected: ${socket.id}`);

  socket.on('send_message', (data) => {
    console.log(`📨 Message from ${socket.id}:`, data);
    // Broadcast to everyone except sender
    socket.broadcast.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log(`🔴 User disconnected: ${socket.id}`);
  });
});
const userMap = {};

io.on('connection', (socket) => {
  console.log(`🟢 User connected: ${socket.id}`);

  socket.on('set_username', (username) => {
    userMap[socket.id] = username;
    console.log(`👤 User ${socket.id} set name to ${username}`);
  });

  socket.on('send_message', (message) => {
    const sender = userMap[socket.id] || 'Anonymous';
    const payload = {
      username: sender,
      text: message,
    };
    socket.broadcast.emit('receive_message', payload);
  });

  socket.on('disconnect', () => {
    console.log(`🔴 ${socket.id} disconnected`);
    delete userMap[socket.id];
  });
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Socket.IO server running on http://localhost:${PORT}`);
});
