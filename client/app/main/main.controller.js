'use strict';

angular.module('rolloCommanderApp')
  .controller('MainCtrl', function ($scope, $http, socket, $log, config) {
    var methods = {};
    $scope.code = "speed 40\nwhile 1 == 1 {\n  go 1\n  stop\n  flash 'yellow'\n  wait 1\n  right\n}";
    $scope.err = {};
    $scope.log = [];
    $scope.say = [];
    $log.info("Started MainCtrl");

    $scope.lineNumber = 0;
    $scope.awesomeThings = [];

    socket.on(config.NPM_LINE_RUNNING, function (data) {
      $scope.line = data;
    });

    socket.on(config.NPM_LINE_RUNNING, function (data) {
      $scope.line = data;
    });

    socket.on(config.NPM_LOG, function (data) {
      $scope.log.unshift(data);
    });

    socket.on(config.NPM_SAY, function (data) {
      $scope.say.unshift(data);
    });

    socket.on(config.TOPIC_ROLLO_ERROR, function (err) {
      $scope.err = err;
      $log.info("Received error from server");
    });

    $scope.emitTest = function () {
      $log.info('Attempting to send event to server');
      socket.emit(config.TOPIC_ROLLO_TEST, {msg: 'Message from client to server'}, function (socket, args) {
        $log.info("Event sent to server: " + args);
      })
    };

    $scope.emitCommand = function (command, data) {
      var cmd = 'CMD_' + command.toUpperCase();

      if (data == undefined) {
        data = {};
      }

      var payload = {
        cmd: cmd,
        data: data
      };

      if (config.hasOwnProperty(cmd)) {
        socket.emit(config.TOPIC_ROLLO_CMD, payload, function (data) {
          $log.info("Event sent to server: " + JSON.stringify(data));
        })
      } else {
        $log.info('Unsupported command: ' + cmd);
      }
    };

    return methods;
  });
