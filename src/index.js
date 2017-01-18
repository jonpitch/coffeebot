import raspi from 'raspi-io';
import five from 'johnny-five';

// setup board
const board = new five.Board({
  io: new raspi()
});

board.on('ready', function() {
  
  console.log('board ready');
  
  // on shutdown
  this.on('exit', function() {
    console.log('farewell');
  });
  
  // helpers to add to REPL
  this.repl.inject({ });
});