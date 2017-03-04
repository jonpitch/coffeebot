import config from 'config';
import Notification from 'notifications/notification';

const slack = require('slack-notify')(config.get('notification.slack.webhook'));
const username = 'coffeebot';
const emoji = ':coffee:';

// sends slack notification
export default class Slack extends Notification {

  constructor() {
    super();
  }
  
  // send slack notification
  // type: 'good|warning|danger' or a hex color
  // message: the notification to send
  send(type, message) {
    slack.send({
      username,
      icon_emoji: emoji,
      channel: config.get('notification.slack.channel'),
      attachments: [{
        text: message,
        color: type
      }]
    });
  }

  // bot is online
  online() {
    this.send('good', 'coffeebot is online');
  }
  
  // bot is offline
  offline() {
    this.send('danger', 'coffeebot is offline');
  }
  
  // coffee is brewing
  brewing() {
    const message = this.randomBrewingMessage();
    this.send('warning', message);
  }
  
  // coffee is ready
  finished() {
    const message = this.randomFinishedMessage();
    this.send('good', mesesage);
  }
}
