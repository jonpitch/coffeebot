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

// sends slack notification

var Slack = function (_Notification) {
  _inherits(Slack, _Notification);

  function Slack() {
    _classCallCheck(this, Slack);

    return _possibleConstructorReturn(this, (Slack.__proto__ || Object.getPrototypeOf(Slack)).call(this));
  }

  // bot is online


  _createClass(Slack, [{
    key: 'online',
    value: function online() {
      slack.send({
        channel: _config2.default.get('notification.slack.channel'),
        attachments: [{
          text: 'coffeebot is online',
          color: 'good'
        }]
      });
    }

    // bot is offline

  }, {
    key: 'offline',
    value: function offline() {
      slack.send({
        channel: _config2.default.get('notification.slack.channel'),
        attachments: [{
          text: 'coffeebot is offline',
          color: 'danger'
        }]
      });
    }

    // coffee is brewing

  }, {
    key: 'brewing',
    value: function brewing() {
      var message = this.randomBrewingMessage();
      slack.send({
        channel: _config2.default.get('notification.slack.channel'),
        attachments: [{
          text: message,
          color: 'warning'
        }]
      });
    }

    // coffee is ready

  }, {
    key: 'finished',
    value: function finished() {
      var message = this.randomFinishedMessage();
      slack.send({
        channel: _config2.default.get('notification.slack.channel'),
        attachments: [{
          text: message,
          color: 'good'
        }]
      });
    }
  }]);

  return Slack;
}(_notification2.default);

exports.default = Slack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub3RpZmljYXRpb25zL3NsYWNrLmpzIl0sIm5hbWVzIjpbInNsYWNrIiwicmVxdWlyZSIsImdldCIsIlNsYWNrIiwic2VuZCIsImNoYW5uZWwiLCJhdHRhY2htZW50cyIsInRleHQiLCJjb2xvciIsIm1lc3NhZ2UiLCJyYW5kb21CcmV3aW5nTWVzc2FnZSIsInJhbmRvbUZpbmlzaGVkTWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxRQUFRQyxRQUFRLGNBQVIsRUFBd0IsaUJBQU9DLEdBQVAsQ0FBVyw0QkFBWCxDQUF4QixDQUFkOztBQUVBOztJQUNxQkMsSzs7O0FBRW5CLG1CQUFjO0FBQUE7O0FBQUE7QUFFYjs7QUFFRDs7Ozs7NkJBQ1M7QUFDUEgsWUFBTUksSUFBTixDQUFXO0FBQ1RDLGlCQUFTLGlCQUFPSCxHQUFQLENBQVcsNEJBQVgsQ0FEQTtBQUVUSSxxQkFBYSxDQUFDO0FBQ1pDLGdCQUFNLHFCQURNO0FBRVpDLGlCQUFPO0FBRkssU0FBRDtBQUZKLE9BQVg7QUFPRDs7QUFFRDs7Ozs4QkFDVTtBQUNSUixZQUFNSSxJQUFOLENBQVc7QUFDVEMsaUJBQVMsaUJBQU9ILEdBQVAsQ0FBVyw0QkFBWCxDQURBO0FBRVRJLHFCQUFhLENBQUM7QUFDWkMsZ0JBQU0sc0JBRE07QUFFWkMsaUJBQU87QUFGSyxTQUFEO0FBRkosT0FBWDtBQU9EOztBQUVEOzs7OzhCQUNVO0FBQ1IsVUFBTUMsVUFBVSxLQUFLQyxvQkFBTCxFQUFoQjtBQUNBVixZQUFNSSxJQUFOLENBQVc7QUFDVEMsaUJBQVMsaUJBQU9ILEdBQVAsQ0FBVyw0QkFBWCxDQURBO0FBRVRJLHFCQUFhLENBQUM7QUFDWkMsZ0JBQU1FLE9BRE07QUFFWkQsaUJBQU87QUFGSyxTQUFEO0FBRkosT0FBWDtBQU9EOztBQUVEOzs7OytCQUNXO0FBQ1QsVUFBTUMsVUFBVSxLQUFLRSxxQkFBTCxFQUFoQjtBQUNBWCxZQUFNSSxJQUFOLENBQVc7QUFDVEMsaUJBQVMsaUJBQU9ILEdBQVAsQ0FBVyw0QkFBWCxDQURBO0FBRVRJLHFCQUFhLENBQUM7QUFDWkMsZ0JBQU1FLE9BRE07QUFFWkQsaUJBQU87QUFGSyxTQUFEO0FBRkosT0FBWDtBQU9EOzs7Ozs7a0JBbERrQkwsSyIsImZpbGUiOiJzbGFjay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb25maWcgZnJvbSAnY29uZmlnJztcbmltcG9ydCBOb3RpZmljYXRpb24gZnJvbSAnbm90aWZpY2F0aW9ucy9ub3RpZmljYXRpb24nO1xuXG5jb25zdCBzbGFjayA9IHJlcXVpcmUoJ3NsYWNrLW5vdGlmeScpKGNvbmZpZy5nZXQoJ25vdGlmaWNhdGlvbi5zbGFjay53ZWJob29rJykpO1xuXG4vLyBzZW5kcyBzbGFjayBub3RpZmljYXRpb25cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsYWNrIGV4dGVuZHMgTm90aWZpY2F0aW9uIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgLy8gYm90IGlzIG9ubGluZVxuICBvbmxpbmUoKSB7XG4gICAgc2xhY2suc2VuZCh7XG4gICAgICBjaGFubmVsOiBjb25maWcuZ2V0KCdub3RpZmljYXRpb24uc2xhY2suY2hhbm5lbCcpLFxuICAgICAgYXR0YWNobWVudHM6IFt7XG4gICAgICAgIHRleHQ6ICdjb2ZmZWVib3QgaXMgb25saW5lJyxcbiAgICAgICAgY29sb3I6ICdnb29kJ1xuICAgICAgfV1cbiAgICB9KTtcbiAgfVxuICBcbiAgLy8gYm90IGlzIG9mZmxpbmVcbiAgb2ZmbGluZSgpIHtcbiAgICBzbGFjay5zZW5kKHtcbiAgICAgIGNoYW5uZWw6IGNvbmZpZy5nZXQoJ25vdGlmaWNhdGlvbi5zbGFjay5jaGFubmVsJyksXG4gICAgICBhdHRhY2htZW50czogW3tcbiAgICAgICAgdGV4dDogJ2NvZmZlZWJvdCBpcyBvZmZsaW5lJyxcbiAgICAgICAgY29sb3I6ICdkYW5nZXInXG4gICAgICB9XVxuICAgIH0pO1xuICB9XG4gIFxuICAvLyBjb2ZmZWUgaXMgYnJld2luZ1xuICBicmV3aW5nKCkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLnJhbmRvbUJyZXdpbmdNZXNzYWdlKCk7XG4gICAgc2xhY2suc2VuZCh7XG4gICAgICBjaGFubmVsOiBjb25maWcuZ2V0KCdub3RpZmljYXRpb24uc2xhY2suY2hhbm5lbCcpLFxuICAgICAgYXR0YWNobWVudHM6IFt7XG4gICAgICAgIHRleHQ6IG1lc3NhZ2UsXG4gICAgICAgIGNvbG9yOiAnd2FybmluZydcbiAgICAgIH1dXG4gICAgfSk7XG4gIH1cbiAgXG4gIC8vIGNvZmZlZSBpcyByZWFkeVxuICBmaW5pc2hlZCgpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5yYW5kb21GaW5pc2hlZE1lc3NhZ2UoKTtcbiAgICBzbGFjay5zZW5kKHtcbiAgICAgIGNoYW5uZWw6IGNvbmZpZy5nZXQoJ25vdGlmaWNhdGlvbi5zbGFjay5jaGFubmVsJyksXG4gICAgICBhdHRhY2htZW50czogW3tcbiAgICAgICAgdGV4dDogbWVzc2FnZSxcbiAgICAgICAgY29sb3I6ICdnb29kJ1xuICAgICAgfV1cbiAgICB9KTtcbiAgfVxufVxuIl19