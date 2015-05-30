/**
 * Broadcast updates to client when the model changes
 */

'use strict';
var config = require('../../config/environment');
var events = require('../../components/events');

exports.register = function (socket) {
  events.subscribe('send', function(data) {
    socket.emit('thing:msg', data);
  });
};
