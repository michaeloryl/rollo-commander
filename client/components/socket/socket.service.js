/* global io */
'use strict';

angular.module('rolloCommanderApp').factory('socket', function ($rootScope, $log) {
  $log.info('Socket Service initialized');
  var socket = window.io.connect();
  return {
    on: function (eventName, callback) {
      $log.info('SOCKET: Listening for server event ' + eventName);
      socket.on(eventName, function (data) {
        $log.info('SOCKET: <- ' + eventName + ' / ' + JSON.stringify(data));
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function (confirmation) {
        $log.info('SOCKET: -> ' + eventName + ' / ' + JSON.stringify(confirmation));
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
