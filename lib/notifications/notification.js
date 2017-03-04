'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// all notification types implement
var Notification = function () {
  function Notification() {
    _classCallCheck(this, Notification);
  }

  // bot is online


  _createClass(Notification, [{
    key: 'online',
    value: function online() {}

    // bot is offline

  }, {
    key: 'offline',
    value: function offline() {}

    // coffee is brewing

  }, {
    key: 'brewing',
    value: function brewing() {}

    // coffee is ready

  }, {
    key: 'finished',
    value: function finished() {}

    // random brewing message

  }, {
    key: 'randomBrewingMessage',
    value: function randomBrewingMessage() {
      if (_config2.default.has('notification_messages.start')) {
        var messages = _config2.default.get('notification_messages.start');
        return messages[Math.floor(Math.random() * messages.length)];
      }

      return 'brewing in progress';
    }

    // random finished message

  }, {
    key: 'randomFinishedMessage',
    value: function randomFinishedMessage() {
      if (_config2.default.has('notification_messages.done')) {
        var messages = _config2.default.get('notification_messages.done');
        return messages[Math.floor(Math.random() * messages.length)];
      }

      return 'brewing is complete';
    }
  }]);

  return Notification;
}();

exports.default = Notification;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub3RpZmljYXRpb25zL25vdGlmaWNhdGlvbi5qcyJdLCJuYW1lcyI6WyJOb3RpZmljYXRpb24iLCJoYXMiLCJtZXNzYWdlcyIsImdldCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQTtJQUNxQkEsWTtBQUVuQiwwQkFBYztBQUFBO0FBQ2I7O0FBRUQ7Ozs7OzZCQUNTLENBQ1I7O0FBRUQ7Ozs7OEJBQ1UsQ0FDVDs7QUFFRDs7Ozs4QkFDVSxDQUNUOztBQUVEOzs7OytCQUNXLENBQ1Y7O0FBRUQ7Ozs7MkNBQ3VCO0FBQ3JCLFVBQUksaUJBQU9DLEdBQVAsQ0FBVyw2QkFBWCxDQUFKLEVBQStDO0FBQzdDLFlBQU1DLFdBQVcsaUJBQU9DLEdBQVAsQ0FBVyw2QkFBWCxDQUFqQjtBQUNBLGVBQU9ELFNBQVNFLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsTUFBTCxLQUFnQkosU0FBU0ssTUFBcEMsQ0FBVCxDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxxQkFBUDtBQUNEOztBQUVEOzs7OzRDQUN3QjtBQUN0QixVQUFJLGlCQUFPTixHQUFQLENBQVcsNEJBQVgsQ0FBSixFQUE4QztBQUM1QyxZQUFNQyxXQUFXLGlCQUFPQyxHQUFQLENBQVcsNEJBQVgsQ0FBakI7QUFDQSxlQUFPRCxTQUFTRSxLQUFLQyxLQUFMLENBQVdELEtBQUtFLE1BQUwsS0FBZ0JKLFNBQVNLLE1BQXBDLENBQVQsQ0FBUDtBQUNEOztBQUVELGFBQU8scUJBQVA7QUFDRDs7Ozs7O2tCQXZDa0JQLFkiLCJmaWxlIjoibm90aWZpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbmZpZyBmcm9tICdjb25maWcnO1xuXG4vLyBhbGwgbm90aWZpY2F0aW9uIHR5cGVzIGltcGxlbWVudFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90aWZpY2F0aW9uIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIC8vIGJvdCBpcyBvbmxpbmVcbiAgb25saW5lKCkge1xuICB9XG4gIFxuICAvLyBib3QgaXMgb2ZmbGluZVxuICBvZmZsaW5lKCkge1xuICB9XG4gIFxuICAvLyBjb2ZmZWUgaXMgYnJld2luZ1xuICBicmV3aW5nKCkge1xuICB9XG4gIFxuICAvLyBjb2ZmZWUgaXMgcmVhZHlcbiAgZmluaXNoZWQoKSB7XG4gIH1cbiAgXG4gIC8vIHJhbmRvbSBicmV3aW5nIG1lc3NhZ2VcbiAgcmFuZG9tQnJld2luZ01lc3NhZ2UoKSB7XG4gICAgaWYgKGNvbmZpZy5oYXMoJ25vdGlmaWNhdGlvbl9tZXNzYWdlcy5zdGFydCcpKSB7XG4gICAgICBjb25zdCBtZXNzYWdlcyA9IGNvbmZpZy5nZXQoJ25vdGlmaWNhdGlvbl9tZXNzYWdlcy5zdGFydCcpO1xuICAgICAgcmV0dXJuIG1lc3NhZ2VzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1lc3NhZ2VzLmxlbmd0aCldO1xuICAgIH1cblxuICAgIHJldHVybiAnYnJld2luZyBpbiBwcm9ncmVzcyc7XG4gIH1cbiAgXG4gIC8vIHJhbmRvbSBmaW5pc2hlZCBtZXNzYWdlXG4gIHJhbmRvbUZpbmlzaGVkTWVzc2FnZSgpIHtcbiAgICBpZiAoY29uZmlnLmhhcygnbm90aWZpY2F0aW9uX21lc3NhZ2VzLmRvbmUnKSkge1xuICAgICAgY29uc3QgbWVzc2FnZXMgPSBjb25maWcuZ2V0KCdub3RpZmljYXRpb25fbWVzc2FnZXMuZG9uZScpO1xuICAgICAgcmV0dXJuIG1lc3NhZ2VzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1lc3NhZ2VzLmxlbmd0aCldO1xuICAgIH1cblxuICAgIHJldHVybiAnYnJld2luZyBpcyBjb21wbGV0ZSc7XG4gIH1cbn1cbiJdfQ==