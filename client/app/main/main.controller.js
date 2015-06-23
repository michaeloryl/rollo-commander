'use strict';

angular.module('rolloCommanderApp')
  .controller('MainCtrl', function ($scope, $http, socket, $log) {
    var methods = {};
    $log.info("Started MainCtrl");

    $scope.lineNumber = 0;
    $scope.awesomeThings = [];

    socket.on(TOPIC_ROLLO_TEST, function (data) {
      $log.info('Received object over websockets: ' + data);
    });

    $scope.getThings = function() {
      $log.info("Fetching things");
      $http.get('/api/things').success(function(awesomeThings) {
        $scope.awesomeThings = awesomeThings;
      });
    };

    return methods;
  });
