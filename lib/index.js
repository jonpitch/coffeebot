'use strict';

var _raspiIo = require('raspi-io');

var _raspiIo2 = _interopRequireDefault(_raspiIo);

var _johnnyFive = require('johnny-five');

var _johnnyFive2 = _interopRequireDefault(_johnnyFive);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _slack = require('notifications/slack');

var _slack2 = _interopRequireDefault(_slack);

var _console = require('sensors/console');

var _console2 = _interopRequireDefault(_console);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// setup board
var board = new _johnnyFive2.default.Board({
  io: new _raspiIo2.default()
});

// setup notifications


var notification = void 0;
if (_config2.default.get('notification_type') === 'slack') {
  notification = _slack2.default;
} else {
  notification = _console2.default;
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

  // on shutdown
  this.on('exit', function () {
    notification.offline();
  });

  // helpers to add to REPL
  this.repl.inject({});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJib2FyZCIsIkJvYXJkIiwiaW8iLCJub3RpZmljYXRpb24iLCJnZXQiLCJCUkVXX1RIUkVTSE9MRCIsIkNPTlNFQ1VUSVZFX0JSRVdTIiwiQlJFV19USU1FIiwiaXNCcmV3aW5nIiwib24iLCJvbmxpbmUiLCJ2aXJ0dWFsIiwiVmlydHVhbCIsIkV4cGFuZGVyIiwiY3VycmVudCIsIlNlbnNvciIsInBpbiIsInR5cGUiLCJwcmV2aW91cyIsInB1bHNlcyIsImJyZXdQdWxzZUNvdW50IiwidmFsdWUiLCJub3ciLCJEYXRlIiwicHVzaCIsImxlbmd0aCIsInNsaWNlIiwiYXZlcmFnZSIsInJlZHVjZSIsImEiLCJiIiwiYnJld2luZyIsInNldFRpbWVvdXQiLCJmaW5pc2hlZCIsIm9mZmxpbmUiLCJyZXBsIiwiaW5qZWN0Il0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQVFBOzs7O0FBQ0E7Ozs7OztBQVBBO0FBQ0EsSUFBTUEsUUFBUSxJQUFJLHFCQUFLQyxLQUFULENBQWU7QUFDM0JDLE1BQUk7QUFEdUIsQ0FBZixDQUFkOztBQUlBOzs7QUFJQSxJQUFJQyxxQkFBSjtBQUNBLElBQUksaUJBQU9DLEdBQVAsQ0FBVyxtQkFBWCxNQUFvQyxPQUF4QyxFQUFpRDtBQUMvQ0Q7QUFDRCxDQUZELE1BRU87QUFDTEE7QUFDRDs7QUFFRCxJQUFNRSxpQkFBaUIsaUJBQU9ELEdBQVAsQ0FBVyxXQUFYLENBQXZCO0FBQ0EsSUFBTUUsb0JBQW9CLGlCQUFPRixHQUFQLENBQVcsYUFBWCxDQUExQjtBQUNBLElBQU1HLFlBQVksaUJBQU9ILEdBQVAsQ0FBVyxXQUFYLENBQWxCOztBQUVBO0FBQ0EsSUFBSUksWUFBWSxLQUFoQjs7QUFFQVIsTUFBTVMsRUFBTixDQUFTLE9BQVQsRUFBa0IsWUFBVzs7QUFFM0I7QUFDQU4sZUFBYU8sTUFBYjs7QUFFQTtBQUNBLE1BQU1DLFVBQVUsSUFBSSxxQkFBS1YsS0FBTCxDQUFXVyxPQUFmLENBQ2QsSUFBSSxxQkFBS0MsUUFBVCxDQUFrQixVQUFsQixDQURjLENBQWhCOztBQUlBO0FBQ0EsTUFBTUMsVUFBVSxJQUFJLHFCQUFLQyxNQUFULENBQWdCO0FBQzlCQyxTQUFLLENBRHlCO0FBRTlCaEIsV0FBT1csT0FGdUI7QUFHOUJNLFVBQU07QUFId0IsR0FBaEIsQ0FBaEI7O0FBTUEsTUFBSUMsV0FBVyxJQUFmO0FBQ0EsTUFBSUMsU0FBUyxFQUFiO0FBQ0EsTUFBSUMsaUJBQWlCLENBQXJCO0FBQ0FOLFVBQVFMLEVBQVIsQ0FBVyxRQUFYLEVBQXFCLFlBQU07QUFDekIsUUFBTVksUUFBUVAsUUFBUU8sS0FBdEI7QUFDQSxRQUFNQyxNQUFNQyxLQUFLRCxHQUFMLEVBQVo7O0FBRUE7QUFDQSxRQUFJSixhQUFhLElBQWpCLEVBQXVCO0FBQ3JCQyxhQUFPSyxJQUFQLENBQVlGLE1BQU1KLFFBQWxCO0FBQ0EsVUFBSUMsT0FBT00sTUFBUCxHQUFnQixFQUFwQixFQUF3QjtBQUN0Qk4saUJBQVNBLE9BQU9PLEtBQVAsQ0FBYSxDQUFiLENBQVQ7QUFDRDtBQUNGOztBQUVEUixlQUFXSSxHQUFYO0FBQ0EsUUFBSUQsVUFBVSxDQUFWLElBQWVGLE9BQU9NLE1BQVAsR0FBZ0IsQ0FBL0IsSUFBb0MsQ0FBQ2pCLFNBQXpDLEVBQW9EO0FBQ2xEO0FBQ0EsVUFBTW1CLFVBQVVSLE9BQU9TLE1BQVAsQ0FBYyxVQUFDQyxDQUFELEVBQUlDLENBQUosRUFBVTtBQUFFLGVBQU9ELElBQUlDLENBQVg7QUFBZSxPQUF6QyxJQUE2Q1gsT0FBT00sTUFBcEU7O0FBRUEsVUFBSUUsVUFBVSxDQUFWLElBQWVBLFVBQVd0QixpQkFBaUIsQ0FBL0MsRUFBbUQ7QUFDakQ7QUFDQWU7QUFDQSxZQUFJQSxpQkFBaUJkLGlCQUFqQixJQUFzQyxDQUFDRSxTQUEzQyxFQUFzRDtBQUNwREEsc0JBQVksSUFBWjtBQUNBTCx1QkFBYTRCLE9BQWI7QUFDQUMscUJBQVcsWUFBTTtBQUNmWiw2QkFBaUIsQ0FBakI7QUFDQVosd0JBQVksS0FBWjtBQUNBTCx5QkFBYThCLFFBQWI7QUFDRCxXQUpELEVBSUcxQixTQUpIO0FBS0Q7QUFFRixPQWJELE1BYU8sSUFBSWEsaUJBQWlCLEdBQXJCLEVBQTBCO0FBQy9CO0FBQ0FBO0FBRUQsT0FKTSxNQUlBO0FBQ0w7QUFDQUEseUJBQWlCLENBQWpCO0FBQ0Q7QUFFRjtBQUNGLEdBeENEOztBQTBDQTtBQUNBLE9BQUtYLEVBQUwsQ0FBUSxNQUFSLEVBQWdCLFlBQVc7QUFDekJOLGlCQUFhK0IsT0FBYjtBQUNELEdBRkQ7O0FBSUE7QUFDQSxPQUFLQyxJQUFMLENBQVVDLE1BQVYsQ0FBaUIsRUFBakI7QUFDRCxDQXJFRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByYXNwaSBmcm9tICdyYXNwaS1pbyc7XG5pbXBvcnQgZml2ZSBmcm9tICdqb2hubnktZml2ZSc7XG5pbXBvcnQgY29uZmlnIGZyb20gJ2NvbmZpZyc7XG5cbi8vIHNldHVwIGJvYXJkXG5jb25zdCBib2FyZCA9IG5ldyBmaXZlLkJvYXJkKHtcbiAgaW86IG5ldyByYXNwaSgpXG59KTtcblxuLy8gc2V0dXAgbm90aWZpY2F0aW9uc1xuaW1wb3J0IHNsYWNrIGZyb20gJ25vdGlmaWNhdGlvbnMvc2xhY2snO1xuaW1wb3J0IGxvZyBmcm9tICdzZW5zb3JzL2NvbnNvbGUnO1xuXG5sZXQgbm90aWZpY2F0aW9uO1xuaWYgKGNvbmZpZy5nZXQoJ25vdGlmaWNhdGlvbl90eXBlJykgPT09ICdzbGFjaycpIHtcbiAgbm90aWZpY2F0aW9uID0gc2xhY2s7XG59IGVsc2Uge1xuICBub3RpZmljYXRpb24gPSBsb2c7XG59XG5cbmNvbnN0IEJSRVdfVEhSRVNIT0xEID0gY29uZmlnLmdldCgndGhyZXNob2xkJyk7XG5jb25zdCBDT05TRUNVVElWRV9CUkVXUyA9IGNvbmZpZy5nZXQoJ2NvbnNlY3V0aXZlJyk7XG5jb25zdCBCUkVXX1RJTUUgPSBjb25maWcuZ2V0KCdicmV3X3RpbWUnKTtcblxuLy8gaXMgdGhlIHBvdCBhY3RpdmVseSBicmV3aW5nXG5sZXQgaXNCcmV3aW5nID0gZmFsc2U7XG5cbmJvYXJkLm9uKCdyZWFkeScsIGZ1bmN0aW9uKCkge1xuICBcbiAgLy8gcG90IGlzIG9ubGluZVxuICBub3RpZmljYXRpb24ub25saW5lKCk7XG5cbiAgLy8gc2V0dXAgZXhwYW5kZXJcbiAgY29uc3QgdmlydHVhbCA9IG5ldyBmaXZlLkJvYXJkLlZpcnR1YWwoXG4gICAgbmV3IGZpdmUuRXhwYW5kZXIoJ01DUDIzMDA4JylcbiAgKTtcbiAgXG4gIC8vIHNldHVwIGN0IHNlbnNvclxuICBjb25zdCBjdXJyZW50ID0gbmV3IGZpdmUuU2Vuc29yKHtcbiAgICBwaW46IDAsXG4gICAgYm9hcmQ6IHZpcnR1YWwsXG4gICAgdHlwZTogJ2RpZ2l0YWwnXG4gIH0pO1xuICBcbiAgbGV0IHByZXZpb3VzID0gbnVsbDtcbiAgbGV0IHB1bHNlcyA9IFtdO1xuICBsZXQgYnJld1B1bHNlQ291bnQgPSAwO1xuICBjdXJyZW50Lm9uKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBjdXJyZW50LnZhbHVlO1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgXG4gICAgLy8gcHVzaCB0aW1lIG9udG8gc3RhY2tcbiAgICBpZiAocHJldmlvdXMgIT09IG51bGwpIHtcbiAgICAgIHB1bHNlcy5wdXNoKG5vdyAtIHByZXZpb3VzKTtcbiAgICAgIGlmIChwdWxzZXMubGVuZ3RoID4gMTApIHtcbiAgICAgICAgcHVsc2VzID0gcHVsc2VzLnNsaWNlKDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBwcmV2aW91cyA9IG5vdztcbiAgICBpZiAodmFsdWUgPT09IDEgJiYgcHVsc2VzLmxlbmd0aCA+IDkgJiYgIWlzQnJld2luZykge1xuICAgICAgLy8gd2hhdCBpcyB0aGUgYXZlcmFnZSB0aW1lIGJldHdlZW4gcHVsc2VzXG4gICAgICBjb25zdCBhdmVyYWdlID0gcHVsc2VzLnJlZHVjZSgoYSwgYikgPT4geyByZXR1cm4gYSArIGI7IH0pIC8gcHVsc2VzLmxlbmd0aDtcbiAgICAgIFxuICAgICAgaWYgKGF2ZXJhZ2UgPiAwICYmIGF2ZXJhZ2UgPCAoQlJFV19USFJFU0hPTEQgKiAyKSkge1xuICAgICAgICAvLyBwdWxzZSBpcyBpbiByYW5nZVxuICAgICAgICBicmV3UHVsc2VDb3VudCsrO1xuICAgICAgICBpZiAoYnJld1B1bHNlQ291bnQgPiBDT05TRUNVVElWRV9CUkVXUyAmJiAhaXNCcmV3aW5nKSB7XG4gICAgICAgICAgaXNCcmV3aW5nID0gdHJ1ZTtcbiAgICAgICAgICBub3RpZmljYXRpb24uYnJld2luZygpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgYnJld1B1bHNlQ291bnQgPSAwO1xuICAgICAgICAgICAgaXNCcmV3aW5nID0gZmFsc2U7XG4gICAgICAgICAgICBub3RpZmljYXRpb24uZmluaXNoZWQoKTtcbiAgICAgICAgICB9LCBCUkVXX1RJTUUpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgfSBlbHNlIGlmIChicmV3UHVsc2VDb3VudCA+IDEyNSkge1xuICAgICAgICAvLyBzb21lIHJlY2VudCBwb3RlbnRpYWwgYnJld2luZyBhY3Rpdml0eSwgaGFuZGxpbmcgb3V0bGllcnNcbiAgICAgICAgYnJld1B1bHNlQ291bnQtLTtcbiAgICAgICAgXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyByZXNldFxuICAgICAgICBicmV3UHVsc2VDb3VudCA9IDA7XG4gICAgICB9XG5cbiAgICB9XG4gIH0pO1xuICBcbiAgLy8gb24gc2h1dGRvd25cbiAgdGhpcy5vbignZXhpdCcsIGZ1bmN0aW9uKCkge1xuICAgIG5vdGlmaWNhdGlvbi5vZmZsaW5lKCk7XG4gIH0pO1xuICBcbiAgLy8gaGVscGVycyB0byBhZGQgdG8gUkVQTFxuICB0aGlzLnJlcGwuaW5qZWN0KHsgfSk7XG59KTsiXX0=