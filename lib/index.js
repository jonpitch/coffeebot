'use strict';

var _raspiIo = require('raspi-io');

var _raspiIo2 = _interopRequireDefault(_raspiIo);

var _johnnyFive = require('johnny-five');

var _johnnyFive2 = _interopRequireDefault(_johnnyFive);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _slack = require('notifications/slack');

var _slack2 = _interopRequireDefault(_slack);

var _log = require('notifications/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// setup board
var board = new _johnnyFive2.default.Board({
  io: new _raspiIo2.default()
});

// setup notifications


var notification = void 0;
if (_config2.default.get('notification_type') === 'slack') {
  notification = new _slack2.default();
} else {
  notification = new _log2.default();
}

var BREW_THRESHOLD = _config2.default.get('threshold');
var CONSECUTIVE_BREWS = _config2.default.get('consecutive');
var BREW_TIME = _config2.default.get('brew_time');

// is the pot actively brewing
var isBrewing = false;

board.on('ready', function () {

  // pot is online
  notification.online();

  // setup expander
  var virtual = new _johnnyFive2.default.Board.Virtual(new _johnnyFive2.default.Expander('MCP23008'));

  // setup ct sensor
  var current = new _johnnyFive2.default.Sensor({
    pin: 0,
    board: virtual,
    type: 'digital'
  });

  var previous = null;
  var pulses = [];
  var brewPulseCount = 0;
  current.on('change', function () {
    var value = current.value;
    var now = Date.now();

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
      var average = pulses.reduce(function (a, b) {
        return a + b;
      }) / pulses.length;

      if (average > 0 && average < BREW_THRESHOLD * 2) {
        // pulse is in range
        brewPulseCount++;
        if (brewPulseCount > CONSECUTIVE_BREWS && !isBrewing) {
          isBrewing = true;
          notification.brewing();
          setTimeout(function () {
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
  this.on('fail', function () {
    notification.offline();
  });

  this.on('exit', function () {
    notification.offline();
  });

  // helpers to add to REPL
  this.repl.inject({});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJib2FyZCIsIkJvYXJkIiwiaW8iLCJub3RpZmljYXRpb24iLCJnZXQiLCJCUkVXX1RIUkVTSE9MRCIsIkNPTlNFQ1VUSVZFX0JSRVdTIiwiQlJFV19USU1FIiwiaXNCcmV3aW5nIiwib24iLCJvbmxpbmUiLCJ2aXJ0dWFsIiwiVmlydHVhbCIsIkV4cGFuZGVyIiwiY3VycmVudCIsIlNlbnNvciIsInBpbiIsInR5cGUiLCJwcmV2aW91cyIsInB1bHNlcyIsImJyZXdQdWxzZUNvdW50IiwidmFsdWUiLCJub3ciLCJEYXRlIiwicHVzaCIsImxlbmd0aCIsInNsaWNlIiwiYXZlcmFnZSIsInJlZHVjZSIsImEiLCJiIiwiYnJld2luZyIsInNldFRpbWVvdXQiLCJmaW5pc2hlZCIsIm9mZmxpbmUiLCJyZXBsIiwiaW5qZWN0Il0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQVFBOzs7O0FBQ0E7Ozs7OztBQVBBO0FBQ0EsSUFBTUEsUUFBUSxJQUFJLHFCQUFLQyxLQUFULENBQWU7QUFDM0JDLE1BQUk7QUFEdUIsQ0FBZixDQUFkOztBQUlBOzs7QUFJQSxJQUFJQyxxQkFBSjtBQUNBLElBQUksaUJBQU9DLEdBQVAsQ0FBVyxtQkFBWCxNQUFvQyxPQUF4QyxFQUFpRDtBQUMvQ0QsaUJBQWUscUJBQWY7QUFDRCxDQUZELE1BRU87QUFDTEEsaUJBQWUsbUJBQWY7QUFDRDs7QUFFRCxJQUFNRSxpQkFBaUIsaUJBQU9ELEdBQVAsQ0FBVyxXQUFYLENBQXZCO0FBQ0EsSUFBTUUsb0JBQW9CLGlCQUFPRixHQUFQLENBQVcsYUFBWCxDQUExQjtBQUNBLElBQU1HLFlBQVksaUJBQU9ILEdBQVAsQ0FBVyxXQUFYLENBQWxCOztBQUVBO0FBQ0EsSUFBSUksWUFBWSxLQUFoQjs7QUFFQVIsTUFBTVMsRUFBTixDQUFTLE9BQVQsRUFBa0IsWUFBVzs7QUFFM0I7QUFDQU4sZUFBYU8sTUFBYjs7QUFFQTtBQUNBLE1BQU1DLFVBQVUsSUFBSSxxQkFBS1YsS0FBTCxDQUFXVyxPQUFmLENBQ2QsSUFBSSxxQkFBS0MsUUFBVCxDQUFrQixVQUFsQixDQURjLENBQWhCOztBQUlBO0FBQ0EsTUFBTUMsVUFBVSxJQUFJLHFCQUFLQyxNQUFULENBQWdCO0FBQzlCQyxTQUFLLENBRHlCO0FBRTlCaEIsV0FBT1csT0FGdUI7QUFHOUJNLFVBQU07QUFId0IsR0FBaEIsQ0FBaEI7O0FBTUEsTUFBSUMsV0FBVyxJQUFmO0FBQ0EsTUFBSUMsU0FBUyxFQUFiO0FBQ0EsTUFBSUMsaUJBQWlCLENBQXJCO0FBQ0FOLFVBQVFMLEVBQVIsQ0FBVyxRQUFYLEVBQXFCLFlBQU07QUFDekIsUUFBTVksUUFBUVAsUUFBUU8sS0FBdEI7QUFDQSxRQUFNQyxNQUFNQyxLQUFLRCxHQUFMLEVBQVo7O0FBRUE7QUFDQSxRQUFJSixhQUFhLElBQWpCLEVBQXVCO0FBQ3JCQyxhQUFPSyxJQUFQLENBQVlGLE1BQU1KLFFBQWxCO0FBQ0EsVUFBSUMsT0FBT00sTUFBUCxHQUFnQixFQUFwQixFQUF3QjtBQUN0Qk4saUJBQVNBLE9BQU9PLEtBQVAsQ0FBYSxDQUFiLENBQVQ7QUFDRDtBQUNGOztBQUVEUixlQUFXSSxHQUFYO0FBQ0EsUUFBSUQsVUFBVSxDQUFWLElBQWVGLE9BQU9NLE1BQVAsR0FBZ0IsQ0FBL0IsSUFBb0MsQ0FBQ2pCLFNBQXpDLEVBQW9EO0FBQ2xEO0FBQ0EsVUFBTW1CLFVBQVVSLE9BQU9TLE1BQVAsQ0FBYyxVQUFDQyxDQUFELEVBQUlDLENBQUosRUFBVTtBQUFFLGVBQU9ELElBQUlDLENBQVg7QUFBZSxPQUF6QyxJQUE2Q1gsT0FBT00sTUFBcEU7O0FBRUEsVUFBSUUsVUFBVSxDQUFWLElBQWVBLFVBQVd0QixpQkFBaUIsQ0FBL0MsRUFBbUQ7QUFDakQ7QUFDQWU7QUFDQSxZQUFJQSxpQkFBaUJkLGlCQUFqQixJQUFzQyxDQUFDRSxTQUEzQyxFQUFzRDtBQUNwREEsc0JBQVksSUFBWjtBQUNBTCx1QkFBYTRCLE9BQWI7QUFDQUMscUJBQVcsWUFBTTtBQUNmWiw2QkFBaUIsQ0FBakI7QUFDQVosd0JBQVksS0FBWjtBQUNBTCx5QkFBYThCLFFBQWI7QUFDRCxXQUpELEVBSUcxQixTQUpIO0FBS0Q7QUFFRixPQWJELE1BYU8sSUFBSWEsaUJBQWlCLEdBQXJCLEVBQTBCO0FBQy9CO0FBQ0FBO0FBRUQsT0FKTSxNQUlBO0FBQ0w7QUFDQUEseUJBQWlCLENBQWpCO0FBQ0Q7QUFFRjtBQUNGLEdBeENEOztBQTBDQTtBQUNBLE9BQUtYLEVBQUwsQ0FBUSxNQUFSLEVBQWdCLFlBQVc7QUFDekJOLGlCQUFhK0IsT0FBYjtBQUNELEdBRkQ7O0FBSUEsT0FBS3pCLEVBQUwsQ0FBUSxNQUFSLEVBQWdCLFlBQVc7QUFDekJOLGlCQUFhK0IsT0FBYjtBQUNELEdBRkQ7O0FBSUE7QUFDQSxPQUFLQyxJQUFMLENBQVVDLE1BQVYsQ0FBaUIsRUFBakI7QUFDRCxDQXpFRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByYXNwaSBmcm9tICdyYXNwaS1pbyc7XG5pbXBvcnQgZml2ZSBmcm9tICdqb2hubnktZml2ZSc7XG5pbXBvcnQgY29uZmlnIGZyb20gJ2NvbmZpZyc7XG5cbi8vIHNldHVwIGJvYXJkXG5jb25zdCBib2FyZCA9IG5ldyBmaXZlLkJvYXJkKHtcbiAgaW86IG5ldyByYXNwaSgpXG59KTtcblxuLy8gc2V0dXAgbm90aWZpY2F0aW9uc1xuaW1wb3J0IFNsYWNrIGZyb20gJ25vdGlmaWNhdGlvbnMvc2xhY2snO1xuaW1wb3J0IExvZyBmcm9tICdub3RpZmljYXRpb25zL2xvZyc7XG5cbmxldCBub3RpZmljYXRpb247XG5pZiAoY29uZmlnLmdldCgnbm90aWZpY2F0aW9uX3R5cGUnKSA9PT0gJ3NsYWNrJykge1xuICBub3RpZmljYXRpb24gPSBuZXcgU2xhY2soKTtcbn0gZWxzZSB7XG4gIG5vdGlmaWNhdGlvbiA9IG5ldyBMb2coKTtcbn1cblxuY29uc3QgQlJFV19USFJFU0hPTEQgPSBjb25maWcuZ2V0KCd0aHJlc2hvbGQnKTtcbmNvbnN0IENPTlNFQ1VUSVZFX0JSRVdTID0gY29uZmlnLmdldCgnY29uc2VjdXRpdmUnKTtcbmNvbnN0IEJSRVdfVElNRSA9IGNvbmZpZy5nZXQoJ2JyZXdfdGltZScpO1xuXG4vLyBpcyB0aGUgcG90IGFjdGl2ZWx5IGJyZXdpbmdcbmxldCBpc0JyZXdpbmcgPSBmYWxzZTtcblxuYm9hcmQub24oJ3JlYWR5JywgZnVuY3Rpb24oKSB7XG4gIFxuICAvLyBwb3QgaXMgb25saW5lXG4gIG5vdGlmaWNhdGlvbi5vbmxpbmUoKTtcblxuICAvLyBzZXR1cCBleHBhbmRlclxuICBjb25zdCB2aXJ0dWFsID0gbmV3IGZpdmUuQm9hcmQuVmlydHVhbChcbiAgICBuZXcgZml2ZS5FeHBhbmRlcignTUNQMjMwMDgnKVxuICApO1xuICBcbiAgLy8gc2V0dXAgY3Qgc2Vuc29yXG4gIGNvbnN0IGN1cnJlbnQgPSBuZXcgZml2ZS5TZW5zb3Ioe1xuICAgIHBpbjogMCxcbiAgICBib2FyZDogdmlydHVhbCxcbiAgICB0eXBlOiAnZGlnaXRhbCdcbiAgfSk7XG4gIFxuICBsZXQgcHJldmlvdXMgPSBudWxsO1xuICBsZXQgcHVsc2VzID0gW107XG4gIGxldCBicmV3UHVsc2VDb3VudCA9IDA7XG4gIGN1cnJlbnQub24oJ2NoYW5nZScsICgpID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGN1cnJlbnQudmFsdWU7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBcbiAgICAvLyBwdXNoIHRpbWUgb250byBzdGFja1xuICAgIGlmIChwcmV2aW91cyAhPT0gbnVsbCkge1xuICAgICAgcHVsc2VzLnB1c2gobm93IC0gcHJldmlvdXMpO1xuICAgICAgaWYgKHB1bHNlcy5sZW5ndGggPiAxMCkge1xuICAgICAgICBwdWxzZXMgPSBwdWxzZXMuc2xpY2UoMSk7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIHByZXZpb3VzID0gbm93O1xuICAgIGlmICh2YWx1ZSA9PT0gMSAmJiBwdWxzZXMubGVuZ3RoID4gOSAmJiAhaXNCcmV3aW5nKSB7XG4gICAgICAvLyB3aGF0IGlzIHRoZSBhdmVyYWdlIHRpbWUgYmV0d2VlbiBwdWxzZXNcbiAgICAgIGNvbnN0IGF2ZXJhZ2UgPSBwdWxzZXMucmVkdWNlKChhLCBiKSA9PiB7IHJldHVybiBhICsgYjsgfSkgLyBwdWxzZXMubGVuZ3RoO1xuICAgICAgXG4gICAgICBpZiAoYXZlcmFnZSA+IDAgJiYgYXZlcmFnZSA8IChCUkVXX1RIUkVTSE9MRCAqIDIpKSB7XG4gICAgICAgIC8vIHB1bHNlIGlzIGluIHJhbmdlXG4gICAgICAgIGJyZXdQdWxzZUNvdW50Kys7XG4gICAgICAgIGlmIChicmV3UHVsc2VDb3VudCA+IENPTlNFQ1VUSVZFX0JSRVdTICYmICFpc0JyZXdpbmcpIHtcbiAgICAgICAgICBpc0JyZXdpbmcgPSB0cnVlO1xuICAgICAgICAgIG5vdGlmaWNhdGlvbi5icmV3aW5nKCk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBicmV3UHVsc2VDb3VudCA9IDA7XG4gICAgICAgICAgICBpc0JyZXdpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5maW5pc2hlZCgpO1xuICAgICAgICAgIH0sIEJSRVdfVElNRSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICB9IGVsc2UgaWYgKGJyZXdQdWxzZUNvdW50ID4gMTI1KSB7XG4gICAgICAgIC8vIHNvbWUgcmVjZW50IHBvdGVudGlhbCBicmV3aW5nIGFjdGl2aXR5LCBoYW5kbGluZyBvdXRsaWVyc1xuICAgICAgICBicmV3UHVsc2VDb3VudC0tO1xuICAgICAgICBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJlc2V0XG4gICAgICAgIGJyZXdQdWxzZUNvdW50ID0gMDtcbiAgICAgIH1cblxuICAgIH1cbiAgfSk7XG4gIFxuICAvLyBvbiBmYWlsIGFuZCBzaHV0ZG93blxuICB0aGlzLm9uKCdmYWlsJywgZnVuY3Rpb24oKSB7XG4gICAgbm90aWZpY2F0aW9uLm9mZmxpbmUoKTtcbiAgfSk7XG4gIFxuICB0aGlzLm9uKCdleGl0JywgZnVuY3Rpb24oKSB7XG4gICAgbm90aWZpY2F0aW9uLm9mZmxpbmUoKTtcbiAgfSk7XG4gIFxuICAvLyBoZWxwZXJzIHRvIGFkZCB0byBSRVBMXG4gIHRoaXMucmVwbC5pbmplY3QoeyB9KTtcbn0pOyJdfQ==