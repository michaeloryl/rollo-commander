/**
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 6/24/15
 * Time: 7:10 PM
 */
angular.module('rolloCommanderApp').constant('config', {
  TOPIC_ROLLO_TEST: 'rollo:test',
  TOPIC_ROLLO_CMD: 'rollo:cmd',
  TOPIC_ROLLO_COMPLETE: 'rollo:complete',
  TOPIC_ROLLO_DISCONNECT: 'rollo:disconnect',
  TOPIC_ROLLO_COLLISION: 'rollo:npm:collision',
  TOPIC_ROLLO_ERROR: 'rollo:error',
  TOPIC_ROLLO_LINE: 'rollo:line',
  TOPIC_ROLLO_SAY: 'rollo:say',
  TOPIC_ROLLO_LOG: 'rollo:log',
  CMD_RUN: 'run',
  CMD_STOP: 'stop',
  CMD_LOAD: 'load',
  CMD_STATUS: 'status',
  CMD_DEBUG_START: 'debug:start',
  CMD_DEBUG_STOP: 'debug:stop',
  CMD_CONNECT: 'connect',
  CMD_DISCONNECT: 'disconect',
  CMD_FILE_LOAD: 'file:load',
  CMD_FILE_SAVE: 'file:save',
  CMD_FILE_LIST: 'file:list',
  CMD_FILE_DELETE: 'file:delete',
  CMD_CYLON_START: 'cylon:start',
  CMD_CYLON_HALT: 'cylon:halt',
  STATUS_NO_CODE: 'no code',
  STATUS_OK: 'ok'
});
