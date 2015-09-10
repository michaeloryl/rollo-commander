'use strict';

angular.module('rolloCommanderApp')
  .controller('MainCtrl', function ($scope, $http, socket, $log, config) {
    var methods = {};
    $scope.code = "speed 40\nwhile 1 == 1 {\n  go 1\n  stop\n  flash 'yellow'\n  wait 1\n  right\n}";
    $scope.err = {};
    $scope.log = [];
    $scope.say = [];
    $scope.line = [];
    $scope.running = false;

    $log.info("Started MainCtrl");

    $scope.lineNumber = 0;
    $scope.awesomeThings = [];

    socket.on(config.TOPIC_ROLLO_LINE, function (data) {
      $scope.line = data;
    });

    socket.on(config.TOPIC_ROLLO_LOG, function (data) {
      $scope.log.unshift(data);
    });

    socket.on(config.TOPIC_ROLLO_SAY, function (data) {
      $scope.say.unshift(data);
    });

    socket.on(config.TOPIC_ROLLO_ERROR, function (err) {
      $scope.err = err;
    });

    $scope.run = run;
    function run() {
      emitCommand('load', $scope.code);
      $scope.lines = $scope.code.split('\n');
      $scope.running = true;
    }

    $scope.stop = stop;
    function stop() {
      emitCommand('stop');
      $scope.running = false;
    }

    $scope.emitTest = emitTest;
    function emitTest() {
      $log.info('Attempting to send event to server');
      socket.emit(config.TOPIC_ROLLO_TEST, {msg: 'Message from client to server'}, function (socket, args) {
        $log.info("Event sent to server: " + args);
      })
    }

    $scope.emitCommand = emitCommand;
    function emitCommand(command, data) {
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
    }

    return methods;
  });
