import Notification from 'notifications/notification';

/**
  DS18B20 Temperature Sensor
*/
export default class Console extends Notification {

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
