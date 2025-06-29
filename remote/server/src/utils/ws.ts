import * as HTTP from 'http';
import { Server } from 'socket.io';

export interface IWS {
    io: Server;
    clients: Set<string>;
}

export function WS(server: HTTP.Server) {
    const clients: Set<string> = new Set();

    const io = new Server(server, {
        path: '/ws_gateway/',
        transports: ['polling', 'websocket'],
    });

    io.on('ready', () => {
        console.log('ready');
    });
    io.on('connection', (socket) => {
        console.log('wda');
        clients.add(socket.id);
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return { io, clients };
}
