import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

const socketSetup = (server: HttpServer): void => {
    const io = new Server(server, {
        cors: { origin: '*' },
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('location-update', (data) => {
            console.log('Location update:', data);
            io.emit('location-update', data); // Broadcast to all clients
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};

export default socketSetup;
