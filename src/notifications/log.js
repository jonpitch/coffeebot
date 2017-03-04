import Notification from 'notifications/notification';

// writes to console
export default class Log extends Notification {

  constructor() {
    super();
  }

  // bot is online
  online() {
    console.log('coffeebot is online');
  }
  
  // bot is offline
  offline() {
    console.log('coffeebot is offline');
  }
  
  // coffee is brewing
  brewing() {
    const message = this.randomBrewingMessage();
    console.log(message);
  }
  
  // coffee is ready
  finished() {
    const message = this.randomFinishedMessage();
    console.log(message);
  }
}
