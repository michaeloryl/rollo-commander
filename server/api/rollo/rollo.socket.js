/**
 * Broadcast updates to client when the model changes
 */

'use strict';
var config = require('../../config/environment');
var events = require('../../components/events');
var subscriptions = [];

exports.register = function (socket) {
  console.log('Rollo socket registered: ' + socket.id);
  subscriptions.push(events.subscribe(config.TOPIC_ROLLO_TEST, function(data) {
    console.log('SOCKET -> ' + JSON.stringify(data));
    socket.emit(config.TOPIC_ROLLO_TEST, data);
  }));

  subscriptions.push(events.subscribe(config.TOPIC_ROLLO_CMD, function(data) {
    console.log('SOCKET -> ' + JSON.stringify(data));
    socket.emit(config.TOPIC_ROLLO_TEST, data);
  }));

  socket.on(config.TOPIC_ROLLO_CMD, function(data, fn) {
    console.log('SOCKET <- ' + JSON.stringify(data));
    fn(true);
  });

  socket.on(config.TOPIC_ROLLO_TEST, function(data, fn) {
    console.log('SOCKET <- ' + JSON.stringify(data));
    fn(true);
  });
};

exports.deregister = function (socket) {
  subscriptions.forEach(function(item) {
    item.remove();
  });

  console.log('Rollo socket deregistered: ' + socket.id);
};
