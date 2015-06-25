/**
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 6/24/15
 * Time: 7:10 PM
 */
angular.module('rolloCommanderApp').constant('config', {
  TOPIC_ROLLO_TEST: 'rollo:test',
  TOPIC_ROLLO_CMD: 'rollo:cmd',
  CMD_RUN: 'run',
  CMD_STOP: 'stop',
  CMD_LOAD: 'load',
  CMD_STATUS: 'status',
  CMD_DEBUG_START: 'debug:start',
  CMD_DEBUG_STOP: 'debug:stop'
});
