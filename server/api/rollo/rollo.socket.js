/**
 * Broadcast updates to client when the model changes
 */

'use strict';
var config = require('../../config/environment');
var events = require('../../components/events');

exports.register = function (socket) {
  console.log('Rollo socket registered');
  events.subscribe(config.TOPIC_ROLLO_TEST, function(data) {
    console.log('Rollo event subscriber received data to emit over websockets');
    socket.emit(config.TOPIC_ROLLO_TEST, data);
  });
};
