import raspi from 'raspi-io';
import five from 'johnny-five';
import config from 'config';

// setup board
const board = new five.Board({
  io: new raspi()
});

// setup notifications
import Slack from 'notifications/slack';
import Log from 'notifications/log';

let notification;
if (config.get('notification_type') === 'slack') {
  notification = new Slack();
} else {
  notification = new Log();
}

const BREW_THRESHOLD = config.get('threshold');
const CONSECUTIVE_BREWS = config.get('consecutive');
const BREW_TIME = config.get('brew_time');

// is the pot actively brewing
let isBrewing = false;

board.on('ready', function() {
  
  // pot is online
  notification.online();

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
  
  let previous = null;
  let pulses = [];
  let brewPulseCount = 0;
  current.on('change', () => {
    const value = current.value;
    const now = Date.now();
    
    // push time onto stack
    if (previous !== null) {
      pulses.push(now - previous);
      if (pulses.length > 10) {
        pulses = pulses.slice(1);
      }
    }
    
    previous = now;
    if (value === 1 && pulses.length > 9 && !isBrewing) {
      // what is the average time between pulses
      const average = pulses.reduce((a, b) => { return a + b; }) / pulses.length;
      
      if (average > 0 && average < (BREW_THRESHOLD * 2)) {
        // pulse is in range
        brewPulseCount++;
        if (brewPulseCount > CONSECUTIVE_BREWS && !isBrewing) {
          isBrewing = true;
          notification.brewing();
          setTimeout(() => {
            brewPulseCount = 0;
            isBrewing = false;
            notification.finished();
          }, BREW_TIME);
        }
        
      } else if (brewPulseCount > 125) {
        // some recent potential brewing activity, handling outliers
        brewPulseCount--;
        
      } else {
        // reset
        brewPulseCount = 0;
      }

    }
  });
  
  // on fail and shutdown
  this.on('fail', function() {
    notification.offline();
  });
  
  this.on('exit', function() {
    notification.offline();
  });
  
  // helpers to add to REPL
  this.repl.inject({ });
});