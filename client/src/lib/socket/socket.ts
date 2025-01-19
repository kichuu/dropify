// lib/socket/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io("https://fsd-group-14-5418.onrender.com"); // Replace with your backend URL
    console.log("Socket connected to server");
  }
  return socket;
};

export const getSocket = (): Socket | null => socket;
