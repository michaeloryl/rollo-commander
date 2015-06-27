var Cylon = require('cylon');
var Rollo = require('rollo');
var events = require('../events');

Cylon.robot({
  connections: {
    sphero: {adaptor: 'sphero', port: '/dev/tty.Sphero-ROB-AMP-SPP'}
  },

  devices: {
    sphero: {driver: 'sphero'}
  },

  work: myMainApp

});

module.exports.main = function(my) {
  if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1].substr(process.argv[1].lastIndexOf('/')+1) + ' filename.rol');
    console.log('\nYou must specify the name of the Rollo script file.\n');
    process.exit(1);
  }

  Rollo.setDebug(true);

  var fileName = process.argv[2];

  Rollo.runFile(my.sphero, fileName, function () {
    console.log("ROLLO: Shutting down");
    process.exit(0);
  });
};

module.exports.Cylon = Cylon;

module.exports.register = function() {
  events.subscribe(config.TOPIC_ROLLO_CMD, function(data) {
    console.log('SOCKET -> ' + JSON.stringify(data));

    // handle the commands here

  })
};

