/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var events = require('../../components/events');
var config = require('../../config/environment');

// Get list of things
exports.test = function (req, res) {
  var message = { msg: 'This is a message response to /api/rollo/test'};
  console.log('Somebody is trying to send a message');
  events.publish(config.TOPIC_ROLLO_TEST, message);
  res.json(message);
};

