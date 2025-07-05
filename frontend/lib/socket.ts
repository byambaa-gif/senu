// services/socket.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket;

// Replace this with your backend URL
const SERVER_URL = 'http://192.168.0.127:3000'; // or ws://...

export const connectSocket = () => {
  socket = io(SERVER_URL, {
    transports: ['websocket'], // prefer websocket
    autoConnect: false,        // manual connect
  });

  return socket;
};

export const getSocket = (): Socket => {
  return socket;
};
