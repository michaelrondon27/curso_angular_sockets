import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';

export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private htppServer: http.Server;

    private constructor() {

        this.app = express();

        this.port = SERVER_PORT;

        this.htppServer = new http.Server( this.app );

        this.io = socketIO( this.htppServer );

        this.escucharSockets();

    }

    public static get instance() {

        return this._instance || ( this._instance = new this() );

    }

    private escucharSockets() {

        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {

            // Conectar cliente
            socket.conectarCliente( cliente );

            // Configurar usuario
            socket.configurarUsuario( cliente, this.io );

            // Obtener Usuarios Activos
            socket.obtenerUsuarios( cliente, this.io  );

            // Desconectar
            socket.desconectar( cliente, this.io );

            // Mensajes
            socket.mensaje( cliente, this.io );

        });

    }

    start( callback: Function ) {

        this.htppServer.listen( this.port, 'localhost', 0, callback() );

    }

}