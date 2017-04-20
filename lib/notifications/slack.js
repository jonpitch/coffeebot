'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _notification = require('notifications/notification');

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var slack = require('slack-notify')(_config2.default.get('notification.slack.webhook'));
var username = 'coffeebot';
var emoji = ':coffee:';

// sends slack notification

var Slack = function (_Notification) {
  _inherits(Slack, _Notification);

  function Slack() {
    _classCallCheck(this, Slack);

    return _possibleConstructorReturn(this, (Slack.__proto__ || Object.getPrototypeOf(Slack)).call(this));
  }

  // send slack notification
  // type: 'good|warning|danger' or a hex color
  // message: the notification to send


  _createClass(Slack, [{
    key: 'send',
    value: function send(type, message) {
      slack.send({
        username: username,
        icon_emoji: emoji,
        channel: _config2.default.get('notification.slack.channel'),
        attachments: [{
          text: message,
          color: type
        }]
      });
    }

    // bot is online

  }, {
    key: 'online',
    value: function online() {
      this.send('good', 'coffeebot is online');
    }

    // bot is offline

  }, {
    key: 'offline',
    value: function offline() {
      this.send('danger', 'coffeebot is offline');
    }

    // coffee is brewing

  }, {
    key: 'brewing',
    value: function brewing() {
      var message = this.randomBrewingMessage();
      this.send('warning', message);
    }

    // coffee is ready

  }, {
    key: 'finished',
    value: function finished() {
      var message = this.randomFinishedMessage();
      this.send('good', message);
    }
  }]);

  return Slack;
}(_notification2.default);

exports.default = Slack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub3RpZmljYXRpb25zL3NsYWNrLmpzIl0sIm5hbWVzIjpbInNsYWNrIiwicmVxdWlyZSIsImdldCIsInVzZXJuYW1lIiwiZW1vamkiLCJTbGFjayIsInR5cGUiLCJtZXNzYWdlIiwic2VuZCIsImljb25fZW1vamkiLCJjaGFubmVsIiwiYXR0YWNobWVudHMiLCJ0ZXh0IiwiY29sb3IiLCJyYW5kb21CcmV3aW5nTWVzc2FnZSIsInJhbmRvbUZpbmlzaGVkTWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxRQUFRQyxRQUFRLGNBQVIsRUFBd0IsaUJBQU9DLEdBQVAsQ0FBVyw0QkFBWCxDQUF4QixDQUFkO0FBQ0EsSUFBTUMsV0FBVyxXQUFqQjtBQUNBLElBQU1DLFFBQVEsVUFBZDs7QUFFQTs7SUFDcUJDLEs7OztBQUVuQixtQkFBYztBQUFBOztBQUFBO0FBRWI7O0FBRUQ7QUFDQTtBQUNBOzs7Ozt5QkFDS0MsSSxFQUFNQyxPLEVBQVM7QUFDbEJQLFlBQU1RLElBQU4sQ0FBVztBQUNUTCwwQkFEUztBQUVUTSxvQkFBWUwsS0FGSDtBQUdUTSxpQkFBUyxpQkFBT1IsR0FBUCxDQUFXLDRCQUFYLENBSEE7QUFJVFMscUJBQWEsQ0FBQztBQUNaQyxnQkFBTUwsT0FETTtBQUVaTSxpQkFBT1A7QUFGSyxTQUFEO0FBSkosT0FBWDtBQVNEOztBQUVEOzs7OzZCQUNTO0FBQ1AsV0FBS0UsSUFBTCxDQUFVLE1BQVYsRUFBa0IscUJBQWxCO0FBQ0Q7O0FBRUQ7Ozs7OEJBQ1U7QUFDUixXQUFLQSxJQUFMLENBQVUsUUFBVixFQUFvQixzQkFBcEI7QUFDRDs7QUFFRDs7Ozs4QkFDVTtBQUNSLFVBQU1ELFVBQVUsS0FBS08sb0JBQUwsRUFBaEI7QUFDQSxXQUFLTixJQUFMLENBQVUsU0FBVixFQUFxQkQsT0FBckI7QUFDRDs7QUFFRDs7OzsrQkFDVztBQUNULFVBQU1BLFVBQVUsS0FBS1EscUJBQUwsRUFBaEI7QUFDQSxXQUFLUCxJQUFMLENBQVUsTUFBVixFQUFrQkQsT0FBbEI7QUFDRDs7Ozs7O2tCQXpDa0JGLEsiLCJmaWxlIjoic2xhY2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29uZmlnIGZyb20gJ2NvbmZpZyc7XG5pbXBvcnQgTm90aWZpY2F0aW9uIGZyb20gJ25vdGlmaWNhdGlvbnMvbm90aWZpY2F0aW9uJztcblxuY29uc3Qgc2xhY2sgPSByZXF1aXJlKCdzbGFjay1ub3RpZnknKShjb25maWcuZ2V0KCdub3RpZmljYXRpb24uc2xhY2sud2ViaG9vaycpKTtcbmNvbnN0IHVzZXJuYW1lID0gJ2NvZmZlZWJvdCc7XG5jb25zdCBlbW9qaSA9ICc6Y29mZmVlOic7XG5cbi8vIHNlbmRzIHNsYWNrIG5vdGlmaWNhdGlvblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xhY2sgZXh0ZW5kcyBOb3RpZmljYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cbiAgXG4gIC8vIHNlbmQgc2xhY2sgbm90aWZpY2F0aW9uXG4gIC8vIHR5cGU6ICdnb29kfHdhcm5pbmd8ZGFuZ2VyJyBvciBhIGhleCBjb2xvclxuICAvLyBtZXNzYWdlOiB0aGUgbm90aWZpY2F0aW9uIHRvIHNlbmRcbiAgc2VuZCh0eXBlLCBtZXNzYWdlKSB7XG4gICAgc2xhY2suc2VuZCh7XG4gICAgICB1c2VybmFtZSxcbiAgICAgIGljb25fZW1vamk6IGVtb2ppLFxuICAgICAgY2hhbm5lbDogY29uZmlnLmdldCgnbm90aWZpY2F0aW9uLnNsYWNrLmNoYW5uZWwnKSxcbiAgICAgIGF0dGFjaG1lbnRzOiBbe1xuICAgICAgICB0ZXh0OiBtZXNzYWdlLFxuICAgICAgICBjb2xvcjogdHlwZVxuICAgICAgfV1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIGJvdCBpcyBvbmxpbmVcbiAgb25saW5lKCkge1xuICAgIHRoaXMuc2VuZCgnZ29vZCcsICdjb2ZmZWVib3QgaXMgb25saW5lJyk7XG4gIH1cbiAgXG4gIC8vIGJvdCBpcyBvZmZsaW5lXG4gIG9mZmxpbmUoKSB7XG4gICAgdGhpcy5zZW5kKCdkYW5nZXInLCAnY29mZmVlYm90IGlzIG9mZmxpbmUnKTtcbiAgfVxuICBcbiAgLy8gY29mZmVlIGlzIGJyZXdpbmdcbiAgYnJld2luZygpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5yYW5kb21CcmV3aW5nTWVzc2FnZSgpO1xuICAgIHRoaXMuc2VuZCgnd2FybmluZycsIG1lc3NhZ2UpO1xuICB9XG4gIFxuICAvLyBjb2ZmZWUgaXMgcmVhZHlcbiAgZmluaXNoZWQoKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IHRoaXMucmFuZG9tRmluaXNoZWRNZXNzYWdlKCk7XG4gICAgdGhpcy5zZW5kKCdnb29kJywgbWVzc2FnZSk7XG4gIH1cbn1cbiJdfQ==