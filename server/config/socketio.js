/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');

// When the user disconnects.. perform this
function onDisconnect(socket) {
    console.log('Socket Disconect: [%s]', socket.address);
  require('../api/rollo/rollo.socket').deregister(socket);
}

// When the user connects.. perform this
function onConnect(socket) {
    // When the client emits 'info', this listens and executes
    socket.on('info', function (data) {
        console.log('Info - [%s] %s', socket.address, JSON.stringify(data, null, 2));
    });

    // Insert sockets below
  require('../api/thing/thing.socket').register(socket);
  require('../api/rollo/rollo.socket').register(socket);
}

module.exports = function (socketio) {
    socketio.on('connection', function (socket) {
        socket.address = socket.handshake.address !== null ? socket.handshake.address : process.env.DOMAIN;

        socket.connectedAt = new Date();

        // Call onDisconnect.
        socket.on('disconnect', function () {
            onDisconnect(socket);
            console.log('Socket Disconnect: [%s] DISCONNECTED', socket.address);
        });

        // Call onConnect.
        onConnect(socket);
        console.log('Socket Connect: [%s] CONNECTED', socket.address);
    });
};
