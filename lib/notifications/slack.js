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
      this.send('good', mesesage);
    }
  }]);

  return Slack;
}(_notification2.default);

exports.default = Slack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub3RpZmljYXRpb25zL3NsYWNrLmpzIl0sIm5hbWVzIjpbInNsYWNrIiwicmVxdWlyZSIsImdldCIsInVzZXJuYW1lIiwiZW1vamkiLCJTbGFjayIsInR5cGUiLCJtZXNzYWdlIiwic2VuZCIsImljb25fZW1vamkiLCJjaGFubmVsIiwiYXR0YWNobWVudHMiLCJ0ZXh0IiwiY29sb3IiLCJyYW5kb21CcmV3aW5nTWVzc2FnZSIsInJhbmRvbUZpbmlzaGVkTWVzc2FnZSIsIm1lc2VzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFFBQVFDLFFBQVEsY0FBUixFQUF3QixpQkFBT0MsR0FBUCxDQUFXLDRCQUFYLENBQXhCLENBQWQ7QUFDQSxJQUFNQyxXQUFXLFdBQWpCO0FBQ0EsSUFBTUMsUUFBUSxVQUFkOztBQUVBOztJQUNxQkMsSzs7O0FBRW5CLG1CQUFjO0FBQUE7O0FBQUE7QUFFYjs7QUFFRDtBQUNBO0FBQ0E7Ozs7O3lCQUNLQyxJLEVBQU1DLE8sRUFBUztBQUNsQlAsWUFBTVEsSUFBTixDQUFXO0FBQ1RMLDBCQURTO0FBRVRNLG9CQUFZTCxLQUZIO0FBR1RNLGlCQUFTLGlCQUFPUixHQUFQLENBQVcsNEJBQVgsQ0FIQTtBQUlUUyxxQkFBYSxDQUFDO0FBQ1pDLGdCQUFNTCxPQURNO0FBRVpNLGlCQUFPUDtBQUZLLFNBQUQ7QUFKSixPQUFYO0FBU0Q7O0FBRUQ7Ozs7NkJBQ1M7QUFDUCxXQUFLRSxJQUFMLENBQVUsTUFBVixFQUFrQixxQkFBbEI7QUFDRDs7QUFFRDs7Ozs4QkFDVTtBQUNSLFdBQUtBLElBQUwsQ0FBVSxRQUFWLEVBQW9CLHNCQUFwQjtBQUNEOztBQUVEOzs7OzhCQUNVO0FBQ1IsVUFBTUQsVUFBVSxLQUFLTyxvQkFBTCxFQUFoQjtBQUNBLFdBQUtOLElBQUwsQ0FBVSxTQUFWLEVBQXFCRCxPQUFyQjtBQUNEOztBQUVEOzs7OytCQUNXO0FBQ1QsVUFBTUEsVUFBVSxLQUFLUSxxQkFBTCxFQUFoQjtBQUNBLFdBQUtQLElBQUwsQ0FBVSxNQUFWLEVBQWtCUSxRQUFsQjtBQUNEOzs7Ozs7a0JBekNrQlgsSyIsImZpbGUiOiJzbGFjay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb25maWcgZnJvbSAnY29uZmlnJztcbmltcG9ydCBOb3RpZmljYXRpb24gZnJvbSAnbm90aWZpY2F0aW9ucy9ub3RpZmljYXRpb24nO1xuXG5jb25zdCBzbGFjayA9IHJlcXVpcmUoJ3NsYWNrLW5vdGlmeScpKGNvbmZpZy5nZXQoJ25vdGlmaWNhdGlvbi5zbGFjay53ZWJob29rJykpO1xuY29uc3QgdXNlcm5hbWUgPSAnY29mZmVlYm90JztcbmNvbnN0IGVtb2ppID0gJzpjb2ZmZWU6JztcblxuLy8gc2VuZHMgc2xhY2sgbm90aWZpY2F0aW9uXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGFjayBleHRlbmRzIE5vdGlmaWNhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuICBcbiAgLy8gc2VuZCBzbGFjayBub3RpZmljYXRpb25cbiAgLy8gdHlwZTogJ2dvb2R8d2FybmluZ3xkYW5nZXInIG9yIGEgaGV4IGNvbG9yXG4gIC8vIG1lc3NhZ2U6IHRoZSBub3RpZmljYXRpb24gdG8gc2VuZFxuICBzZW5kKHR5cGUsIG1lc3NhZ2UpIHtcbiAgICBzbGFjay5zZW5kKHtcbiAgICAgIHVzZXJuYW1lLFxuICAgICAgaWNvbl9lbW9qaTogZW1vamksXG4gICAgICBjaGFubmVsOiBjb25maWcuZ2V0KCdub3RpZmljYXRpb24uc2xhY2suY2hhbm5lbCcpLFxuICAgICAgYXR0YWNobWVudHM6IFt7XG4gICAgICAgIHRleHQ6IG1lc3NhZ2UsXG4gICAgICAgIGNvbG9yOiB0eXBlXG4gICAgICB9XVxuICAgIH0pO1xuICB9XG5cbiAgLy8gYm90IGlzIG9ubGluZVxuICBvbmxpbmUoKSB7XG4gICAgdGhpcy5zZW5kKCdnb29kJywgJ2NvZmZlZWJvdCBpcyBvbmxpbmUnKTtcbiAgfVxuICBcbiAgLy8gYm90IGlzIG9mZmxpbmVcbiAgb2ZmbGluZSgpIHtcbiAgICB0aGlzLnNlbmQoJ2RhbmdlcicsICdjb2ZmZWVib3QgaXMgb2ZmbGluZScpO1xuICB9XG4gIFxuICAvLyBjb2ZmZWUgaXMgYnJld2luZ1xuICBicmV3aW5nKCkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLnJhbmRvbUJyZXdpbmdNZXNzYWdlKCk7XG4gICAgdGhpcy5zZW5kKCd3YXJuaW5nJywgbWVzc2FnZSk7XG4gIH1cbiAgXG4gIC8vIGNvZmZlZSBpcyByZWFkeVxuICBmaW5pc2hlZCgpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5yYW5kb21GaW5pc2hlZE1lc3NhZ2UoKTtcbiAgICB0aGlzLnNlbmQoJ2dvb2QnLCBtZXNlc2FnZSk7XG4gIH1cbn1cbiJdfQ==