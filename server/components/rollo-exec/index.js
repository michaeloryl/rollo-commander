var Cylon = require('cylon');
var Rollo = require('rollo');
var events = require('../events');
var config = require('../../config/environment');
var my = null;

var robot = Cylon.robot({
  connections: {
    sphero: {adaptor: 'sphero', port: '/dev/tty.Sphero-ROB-AMP-SPP'}
  },

  devices: {
    sphero: {driver: 'sphero'}
  },

  work: function(mySphero) {
    my = mySphero;
  }

});

module.exports.register = function() {
  events.subscribe(config.TOPIC_ROLLO_CMD, commandHandler);
  return module.exports;
};

function commandHandler(payload) {
  var commands = {
    CMD_RUN: cmdRun,
    CMD_STOP: cmdStop,
    CMD_LOAD: cmdLoad,
    CMD_STATUS: cmdStatus,
    CMD_DEBUG_START: cmdDebugStart,
    CMD_DEBUG_STOP: cmdDebugStop,
    CMD_CONNECT: cmdConnect,
    CMD_DISCONNECT: cmdDisconnect,
    CMD_CYLON_START: cmdCylonStart,
    CMD_CYLON_HALT: cmdCylonHalt
  };

  console.log('SOCKET -> ' + JSON.stringify(payload));

  var cmd = payload.cmd;
  var data = payload.data;

  if (commands.hasOwnProperty(cmd)) {
    commands[cmd].call(this, data);
  } else {
    console.log('Unhandled command received: ' + cmd);
  }
}

function cmdRun(data) {
  console.log('cmdRun: ' + JSON.stringify(data));
}

function cmdStop(data) {
  console.log('cmdStop: ' + JSON.stringify(data));
}

function cmdLoad(data) {
  console.log('cmdLoad: ' + JSON.stringify(data));
  var tree = Rollo.parse(data);

  Rollo.execute(my, tree, function(response) {
    console.log('cmdLoad:callback(): ' + response);
  })
}

function cmdStatus(data) {
  console.log('cmdStatus: ' + JSON.stringify(data));
}

function cmdDebugStart(data) {
  console.log('cmdDebugStart: ' + JSON.stringify(data));
}

function cmdDebugStop(data) {
  console.log('cmdDebugStop: ' + JSON.stringify(data));
}

function cmdConnect(data) {
  console.log('cmdConnect: ' + JSON.stringify(data));
}

function cmdDisconnect(data) {
  console.log('cmdDisconnect: ' + JSON.stringify(data));
}

function cmdCylonStart(data) {
  console.log('cmdCylonStart: ' + JSON.stringify(data));
  if (my == null) {
    robot.start()
  }
}

function cmdCylonHalt(data) {
  console.log('cmdCylonHalt: ' + JSON.stringify(data));
  my = null;
  robot.halt();
}
