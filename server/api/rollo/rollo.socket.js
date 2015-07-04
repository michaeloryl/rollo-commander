/**
 * Broadcast updates to client when the model changes
 */

'use strict';
var config = require('../../config/environment');
var events = require('../../components/events');
var Rollo = require('rollo');
var subscriptions = [];

exports.register = function (socket) {
  console.log('Rollo socket registered: ' + socket.id);

  subscriptions.push(Rollo.registerDisconnectEvent(function() {
    console.log('SOCKET -> disconnect');
    socket.emit(config.TOPIC_ROLLO_DISCONNECT, {});
  }));

  subscriptions.push(Rollo.registerCompleteEvent(function() {
    console.log('SOCKET -> complete');
    socket.emit(config.TOPIC_ROLLO_COMPLETE, {});
  }));

  subscriptions.push(Rollo.registerLineEvent(function(data) {
    console.log('SOCKET -> line ' + JSON.stringify(data));
    socket.emit(config.NPM_LINE_RUNNING, data);
  }));

  subscriptions.push(Rollo.registerSayEvent(function(data) {
    console.log('SOCKET -> say ' + JSON.stringify(data));
    socket.emit(config.NPM_SAY, data);
  }));

  subscriptions.push(Rollo.registerLogEvent(function(data) {
    console.log('SOCKET -> log ' + JSON.stringify(data));
    socket.emit(config.NPM_LOG, data);
  }));

  socket.on(config.TOPIC_ROLLO_CMD, function(data, fn) {
    console.log('SOCKET <- ' + config.TOPIC_ROLLO_CMD + ' / ' + JSON.stringify(data));
    events.publish(config.TOPIC_ROLLO_CMD, data);
    fn(data);
  });
};

exports.deregister = function (socket) {
  subscriptions.forEach(function(item) {
    item.remove();
  });

  console.log('Rollo socket deregistered: ' + socket.id);
};
