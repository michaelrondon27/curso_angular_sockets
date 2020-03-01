"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desconectar = (cliente) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
};
// Escuchar mensajes
exports.mensaje = (cliente) => {
    cliente.on('mensaje', (payload) => {
        console.log('Mensaje recibido', payload);
    });
};
