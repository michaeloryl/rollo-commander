/* global io */
'use strict';

angular.module('rolloCommanderApp').factory('socket', function ($rootScope, $log) {
  $log.info('Socket Service initialized');
  var socket = window.io.connect();
  return {
    on: function (eventName, callback) {
      $log.info('SOCKET: Listening for server event ' + eventName);
      socket.on(eventName, function () {
        $log.info('SOCKET: <- ' + eventName);
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      $log.info('Socket service received emit request: ' + eventName);
      socket.emit(eventName, data, function (confirmation) {
        $log.info('SOCKET: -> ' + confirmation);
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});
