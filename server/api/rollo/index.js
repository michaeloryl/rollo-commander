'use strict';

var express = require('express');
var controller = require('./rollo.controller');

var router = express.Router();

router.get('/test', controller.test);

module.exports = router;
