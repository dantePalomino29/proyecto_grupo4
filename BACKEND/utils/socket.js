import mongoose from 'mongoose';
import { Server } from 'socket.io';
let io;

export const initSocket = (server) => {
  console.log("Inicializando sockets...");
  io = new Server(server, {
    cors: {
      origin: '*'
    }
  });

  io.on('connection', (socket) => {
    console.log('Usuario conectado al socket:', socket.id);

    socket.on('matriculado', (usuario) => {
      socket.join(usuario);
      console.log(`Usuario ${usuario} matriculado al canal de notificaciones.`);
    });

    socket.on('disconnect', () => {
      console.log('Usuario desconectado del socket:', socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io no ha sido inicializado');
  }
  return io;
};