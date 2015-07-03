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
  subscriptions.push(events.subscribe(config.TOPIC_ROLLO_TEST, function(data) {
    console.log('SOCKET -> test ' + JSON.stringify(data));
    socket.emit(config.TOPIC_ROLLO_TEST, data);
  }));

  subscriptions.push(events.subscribe(config.TOPIC_ROLLO_ERROR, function(err) {
    console.log('SOCKET -> error ' + JSON.stringify(err));
    socket.emit(config.TOPIC_ROLLO_ERROR, err);
  }));

  subscriptions.push(events.subscribe(config.TOPIC_ROLLO_COMPLETE, function(data) {
    console.log('SOCKET -> complete ' + JSON.stringify(data));
    socket.emit(config.TOPIC_ROLLO_COMPLETE, data);
  }));

  Rollo.registerLineEvent(function(data) {
    console.log('SOCKET -> line ' + JSON.stringify(data));
    socket.emit(config.NPM_LINE_RUNNING, data);
  });

  Rollo.registerSayEvent(function(data) {
    console.log('SOCKET -> say ' + JSON.stringify(data));
    socket.emit(config.NPM_SAY, data);
  });

  subscriptions.push(events.subscribe(config.NPM_LOG, function(data) {
    console.log('SOCKET -> line ' + JSON.stringify(data));
    socket.emit(config.NPM_LOG, data);
  }));

  /*
    subscriptions.push(events.subscribe(config.TOPIC_ROLLO_CMD, function(data) {
      console.log('SOCKET -> ' + JSON.stringify(data));
      socket.emit(config.TOPIC_ROLLO_TEST, data);
    }));
  */

  socket.on(config.TOPIC_ROLLO_CMD, function(data, fn) {
    console.log('SOCKET <- ' + config.TOPIC_ROLLO_CMD + ' / ' + JSON.stringify(data));
    events.publish(config.TOPIC_ROLLO_CMD, data);
    fn(data);
  });

  socket.on(config.TOPIC_ROLLO_TEST, function(data, fn) {
    console.log('SOCKET <- ' + config.TOPIC_ROLLO_TEST + ' / ' + JSON.stringify(data));
    fn(data);
  });
};

exports.deregister = function (socket) {
  subscriptions.forEach(function(item) {
    item.remove();
  });

  console.log('Rollo socket deregistered: ' + socket.id);
};
