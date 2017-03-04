import config from 'config';
import Notification from 'notifications/notification';

const slack = require('slack-notify')(config.get('notification.slack.webhook'));

// sends slack notification
export default class Slack extends Notification {

  constructor() {
    super();
  }

  // bot is online
  online() {
    slack.send({
      channel: config.get('notification.slack.channel'),
      attachments: [{
        text: 'coffeebot is online',
        color: 'good'
      }]
    });
  }
  
  // bot is offline
  offline() {
    slack.send({
      channel: config.get('notification.slack.channel'),
      attachments: [{
        text: 'coffeebot is offline',
        color: 'danger'
      }]
    });
  }
  
  // coffee is brewing
  brewing() {
    const message = this.randomBrewingMessage();
    slack.send({
      channel: config.get('notification.slack.channel'),
      attachments: [{
        text: message,
        color: 'warning'
      }]
    });
  }
  
  // coffee is ready
  finished() {
    const message = this.randomFinishedMessage();
    slack.send({
      channel: config.get('notification.slack.channel'),
      attachments: [{
        text: message,
        color: 'good'
      }]
    });
  }
}
