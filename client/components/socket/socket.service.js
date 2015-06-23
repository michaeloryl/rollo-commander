/* global io */
'use strict';

angular.module('rolloCommanderApp').factory('socket', function ($rootScope, $log) {
  $log.info('socket service initiated');
  var socket = window.io.connect();
  return {
    on: function (eventName, callback) {
      $log.info('Socket service on: ' + eventName);
      socket.on(eventName, function () {
        $log.info('Socket.io on: ' + eventName);
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      $log.info('Socket service emit: ' + eventName);
      socket.emit(eventName, data, function () {
        $log.info('Socket.io emit: ' + eventName);
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
