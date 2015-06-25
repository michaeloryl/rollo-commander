'use strict';

angular.module('rolloCommanderApp')
  .controller('MainCtrl', function ($scope, $http, socket, $log, config) {
    var methods = {};
    $log.info("Started MainCtrl");

    $scope.lineNumber = 0;
    $scope.awesomeThings = [];

    socket.on(config.TOPIC_ROLLO_TEST, function (data) {
      $log.info('Received object over websockets: ' + data);
    });

    $scope.emitTest = function() {
      $log.info('Attempting to send event to server');
      socket.emit(config.TOPIC_ROLLO_TEST, {msg: 'This is a test message'}, function(socket, args) {
        $log.info("Event sent to server: " + args);
      })
    };

    return methods;
  });
