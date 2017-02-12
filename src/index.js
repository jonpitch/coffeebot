import raspi from 'raspi-io';
import five from 'johnny-five';

// setup board
const board = new five.Board({
  io: new raspi()
});

// times in milliseconds
// TODO configurable
const brewingThreshold = 200;
const heatingThreshold = 1700;
const idleThreshold = 2500;
const leeway = 200;
const brewTime = 480000;

// state of coffeepot - 'brewing', 'heating', 'idle'
let state = 'idle';

board.on('ready', function() {
  
  console.log('coffeebot is online');

  // setup expander
  const virtual = new five.Board.Virtual(
    new five.Expander('MCP23008')
  );
  
  // setup ct sensor
  const current = new five.Sensor({
    pin: 0,
    board: virtual,
    type: 'digital'
  });
  
  let pulses = [];
  current.on('change', () => {
    const value = this.value;
    const now = Date.now();
    
    if (value === 1 && pulses.length > 10) {
      // remove first element, add next time, calculate average
      pulses.shift();
      pulses.push(now);
      const average = pulses.reduce((a, b) => { return a + b; }) / pulses.length;
      console.log(`average time: ${average}`);
      
      if (average < (brewingThreshold + leeway) || 
          average > (brewingThreshold - leeway) &&
          state !== 'brewing' &&
          state !== 'heating'
      ) {
        // possible brewing
        state = 'brewing';
        
        // TODO send notification about brewing started
        console.log('percolations are imminent');
        
        // TODO set timeout -> in x minutes, notify coffee is ready
        setTimeout(() => {
          console.log('coffee is ready');
        }, brewTime);
        
      } else if (average < (heatingTreshold + leeway) || 
          average > (heatingTreshold - leeway) &&
          state !== 'heating' &&
          state !== 'idle'
      ) {
        // possible heating
        state = 'heating';
        console.log('coffee pot is heating');
        
      } else {
        // possible idle
        state = 'idle';
        console.log('coffee pot is chillin');
      }

    } else if (value === 1) {
      // push time onto stack
      pulses.push(now);
      console.log('initializing...');
    }
  });
  
  // on shutdown
  this.on('exit', function() {
    console.log('coffeebot is offline');
  });
  
  // helpers to add to REPL
  this.repl.inject({ });
});