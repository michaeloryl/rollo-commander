'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  NPM_UNKNOWN_LINE_RUNNING: 'rollo:npm:unknown line', // this is supported by the Rollo NPM module
  NPM_LINE_RUNNING: 'rollo:npm:line running', // this is supported by the Rollo NPM module
  NPM_LOG: 'rollo:npm:log line', // this is supported by the Rollo NPM module
  NPM_SAY: 'rollo:npm:say line', // this is supported by the Rollo NPM module
  NPM_STOP: 'rollo:npm:stop', // this is supported by the Rollo NPM module
  TOPIC_ROLLO_TEST: 'rollo:test',
  TOPIC_ROLLO_CMD: 'rollo:cmd',
  TOPIC_ROLLO_COMPLETE: 'rollo:complete',
  TOPIC_COLLISION: 'rollo:npm:collision',
  TOPIC_ROLLO_ERROR: 'rollo:error',
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
  STATUS_OK: 'ok',

  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'rollo-commander-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
