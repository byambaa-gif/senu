import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './config/db.js';
import { handleMessage } from './controllers/chatController.js';
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

connectDB();
app.use('/', (req, res) => res.send('Chat API Running'));

io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);
  socket.on('chat message', async (msg) => {
    const aiReply = await handleMessage(msg);
    socket.emit('chat reply', aiReply);
  });
  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
