import config from 'config';

// all notification types implement
export default class Notification {

  constructor() {
  }

  // bot is online
  online() {
  }
  
  // bot is offline
  offline() {
  }
  
  // coffee is brewing
  brewing() {
  }
  
  // coffee is ready
  finished() {
  }
  
  // random brewing message
  randomBrewingMessage() {
    if (config.has('notification_messages.start')) {
      const messages = config.get('notification_messages.start');
      return messages[Math.floor(Math.random() * messages.length)];
    }

    return 'brewing in progress';
  }
  
  // random finished message
  randomFinishedMessage() {
    if (config.has('notification_messages.done')) {
      const messages = config.get('notification_messages.done');
      return messages[Math.floor(Math.random() * messages.length)];
    }

    return 'brewing is complete';
  }
}
