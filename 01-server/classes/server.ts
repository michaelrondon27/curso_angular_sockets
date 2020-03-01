import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';

export default class Server {

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private htppServer: http.Server;

    constructor() {

        this.app = express();

        this.port = SERVER_PORT;

        this.htppServer = new http.Server( this.app );

        this.io = socketIO( this.htppServer );

        this.escucharSockets();

    }

    private escucharSockets() {

        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {

            console.log('Cliente conectado');

        });

    }

    start( callback: Function ) {

        this.htppServer.listen( this.port, 'localhost', 0, callback() );

    }

}