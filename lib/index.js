'use strict';

var _raspiIo = require('raspi-io');

var _raspiIo2 = _interopRequireDefault(_raspiIo);

var _johnnyFive = require('johnny-five');

var _johnnyFive2 = _interopRequireDefault(_johnnyFive);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// setup board
var board = new _johnnyFive2.default.Board({
  io: new _raspiIo2.default()
});

var BREW_THRESHOLD = _config2.default.get('threshold');
var CONSECUTIVE_BREWS = _config2.default.get('consecutive');
var BREW_TIME = _config2.default.get('brew_time');

// is the pot actively brewing
var isBrewing = false;

board.on('ready', function () {

  console.log('coffeebot is online');

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
      console.log('average time: ' + average);

      if (average > 0 && average < BREW_THRESHOLD * 2) {
        // pulse is in range
        brewPulseCount++;
        if (brewPulseCount > CONSECUTIVE_BREWS && !isBrewing) {
          isBrewing = true;
          console.log('definitely brewing');
          setTimeout(function () {
            brewPulseCount = 0;
            isBrewing = false;
            console.log('brewing complete');
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
    console.log('coffeebot is offline');
  });

  // helpers to add to REPL
  this.repl.inject({});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJib2FyZCIsIkJvYXJkIiwiaW8iLCJCUkVXX1RIUkVTSE9MRCIsImdldCIsIkNPTlNFQ1VUSVZFX0JSRVdTIiwiQlJFV19USU1FIiwiaXNCcmV3aW5nIiwib24iLCJjb25zb2xlIiwibG9nIiwidmlydHVhbCIsIlZpcnR1YWwiLCJFeHBhbmRlciIsImN1cnJlbnQiLCJTZW5zb3IiLCJwaW4iLCJ0eXBlIiwicHJldmlvdXMiLCJwdWxzZXMiLCJicmV3UHVsc2VDb3VudCIsInZhbHVlIiwibm93IiwiRGF0ZSIsInB1c2giLCJsZW5ndGgiLCJzbGljZSIsImF2ZXJhZ2UiLCJyZWR1Y2UiLCJhIiwiYiIsInNldFRpbWVvdXQiLCJyZXBsIiwiaW5qZWN0Il0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDQSxJQUFNQSxRQUFRLElBQUkscUJBQUtDLEtBQVQsQ0FBZTtBQUMzQkMsTUFBSTtBQUR1QixDQUFmLENBQWQ7O0FBSUEsSUFBTUMsaUJBQWlCLGlCQUFPQyxHQUFQLENBQVcsV0FBWCxDQUF2QjtBQUNBLElBQU1DLG9CQUFvQixpQkFBT0QsR0FBUCxDQUFXLGFBQVgsQ0FBMUI7QUFDQSxJQUFNRSxZQUFZLGlCQUFPRixHQUFQLENBQVcsV0FBWCxDQUFsQjs7QUFFQTtBQUNBLElBQUlHLFlBQVksS0FBaEI7O0FBRUFQLE1BQU1RLEVBQU4sQ0FBUyxPQUFULEVBQWtCLFlBQVc7O0FBRTNCQyxVQUFRQyxHQUFSLENBQVkscUJBQVo7O0FBRUE7QUFDQSxNQUFNQyxVQUFVLElBQUkscUJBQUtWLEtBQUwsQ0FBV1csT0FBZixDQUNkLElBQUkscUJBQUtDLFFBQVQsQ0FBa0IsVUFBbEIsQ0FEYyxDQUFoQjs7QUFJQTtBQUNBLE1BQU1DLFVBQVUsSUFBSSxxQkFBS0MsTUFBVCxDQUFnQjtBQUM5QkMsU0FBSyxDQUR5QjtBQUU5QmhCLFdBQU9XLE9BRnVCO0FBRzlCTSxVQUFNO0FBSHdCLEdBQWhCLENBQWhCOztBQU1BLE1BQUlDLFdBQVcsSUFBZjtBQUNBLE1BQUlDLFNBQVMsRUFBYjtBQUNBLE1BQUlDLGlCQUFpQixDQUFyQjtBQUNBTixVQUFRTixFQUFSLENBQVcsUUFBWCxFQUFxQixZQUFNO0FBQ3pCLFFBQU1hLFFBQVFQLFFBQVFPLEtBQXRCO0FBQ0EsUUFBTUMsTUFBTUMsS0FBS0QsR0FBTCxFQUFaOztBQUVBO0FBQ0EsUUFBSUosYUFBYSxJQUFqQixFQUF1QjtBQUNyQkMsYUFBT0ssSUFBUCxDQUFZRixNQUFNSixRQUFsQjtBQUNBLFVBQUlDLE9BQU9NLE1BQVAsR0FBZ0IsRUFBcEIsRUFBd0I7QUFDdEJOLGlCQUFTQSxPQUFPTyxLQUFQLENBQWEsQ0FBYixDQUFUO0FBQ0Q7QUFDRjs7QUFFRFIsZUFBV0ksR0FBWDtBQUNBLFFBQUlELFVBQVUsQ0FBVixJQUFlRixPQUFPTSxNQUFQLEdBQWdCLENBQS9CLElBQW9DLENBQUNsQixTQUF6QyxFQUFvRDtBQUNsRDtBQUNBLFVBQU1vQixVQUFVUixPQUFPUyxNQUFQLENBQWMsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKLEVBQVU7QUFBRSxlQUFPRCxJQUFJQyxDQUFYO0FBQWUsT0FBekMsSUFBNkNYLE9BQU9NLE1BQXBFO0FBQ0FoQixjQUFRQyxHQUFSLG9CQUE2QmlCLE9BQTdCOztBQUVBLFVBQUlBLFVBQVUsQ0FBVixJQUFlQSxVQUFXeEIsaUJBQWlCLENBQS9DLEVBQW1EO0FBQ2pEO0FBQ0FpQjtBQUNBLFlBQUlBLGlCQUFpQmYsaUJBQWpCLElBQXNDLENBQUNFLFNBQTNDLEVBQXNEO0FBQ3BEQSxzQkFBWSxJQUFaO0FBQ0FFLGtCQUFRQyxHQUFSLENBQVksb0JBQVo7QUFDQXFCLHFCQUFXLFlBQU07QUFDZlgsNkJBQWlCLENBQWpCO0FBQ0FiLHdCQUFZLEtBQVo7QUFDQUUsb0JBQVFDLEdBQVIsQ0FBWSxrQkFBWjtBQUNELFdBSkQsRUFJR0osU0FKSDtBQUtEO0FBRUYsT0FiRCxNQWFPLElBQUljLGlCQUFpQixHQUFyQixFQUEwQjtBQUMvQjtBQUNBQTtBQUVELE9BSk0sTUFJQTtBQUNMO0FBQ0FBLHlCQUFpQixDQUFqQjtBQUNEO0FBRUY7QUFDRixHQXpDRDs7QUEyQ0E7QUFDQSxPQUFLWixFQUFMLENBQVEsTUFBUixFQUFnQixZQUFXO0FBQ3pCQyxZQUFRQyxHQUFSLENBQVksc0JBQVo7QUFDRCxHQUZEOztBQUlBO0FBQ0EsT0FBS3NCLElBQUwsQ0FBVUMsTUFBVixDQUFpQixFQUFqQjtBQUNELENBckVEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJhc3BpIGZyb20gJ3Jhc3BpLWlvJztcbmltcG9ydCBmaXZlIGZyb20gJ2pvaG5ueS1maXZlJztcbmltcG9ydCBjb25maWcgZnJvbSAnY29uZmlnJztcblxuLy8gc2V0dXAgYm9hcmRcbmNvbnN0IGJvYXJkID0gbmV3IGZpdmUuQm9hcmQoe1xuICBpbzogbmV3IHJhc3BpKClcbn0pO1xuXG5jb25zdCBCUkVXX1RIUkVTSE9MRCA9IGNvbmZpZy5nZXQoJ3RocmVzaG9sZCcpO1xuY29uc3QgQ09OU0VDVVRJVkVfQlJFV1MgPSBjb25maWcuZ2V0KCdjb25zZWN1dGl2ZScpO1xuY29uc3QgQlJFV19USU1FID0gY29uZmlnLmdldCgnYnJld190aW1lJyk7XG5cbi8vIGlzIHRoZSBwb3QgYWN0aXZlbHkgYnJld2luZ1xubGV0IGlzQnJld2luZyA9IGZhbHNlO1xuXG5ib2FyZC5vbigncmVhZHknLCBmdW5jdGlvbigpIHtcbiAgXG4gIGNvbnNvbGUubG9nKCdjb2ZmZWVib3QgaXMgb25saW5lJyk7XG5cbiAgLy8gc2V0dXAgZXhwYW5kZXJcbiAgY29uc3QgdmlydHVhbCA9IG5ldyBmaXZlLkJvYXJkLlZpcnR1YWwoXG4gICAgbmV3IGZpdmUuRXhwYW5kZXIoJ01DUDIzMDA4JylcbiAgKTtcbiAgXG4gIC8vIHNldHVwIGN0IHNlbnNvclxuICBjb25zdCBjdXJyZW50ID0gbmV3IGZpdmUuU2Vuc29yKHtcbiAgICBwaW46IDAsXG4gICAgYm9hcmQ6IHZpcnR1YWwsXG4gICAgdHlwZTogJ2RpZ2l0YWwnXG4gIH0pO1xuICBcbiAgbGV0IHByZXZpb3VzID0gbnVsbDtcbiAgbGV0IHB1bHNlcyA9IFtdO1xuICBsZXQgYnJld1B1bHNlQ291bnQgPSAwO1xuICBjdXJyZW50Lm9uKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBjdXJyZW50LnZhbHVlO1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgXG4gICAgLy8gcHVzaCB0aW1lIG9udG8gc3RhY2tcbiAgICBpZiAocHJldmlvdXMgIT09IG51bGwpIHtcbiAgICAgIHB1bHNlcy5wdXNoKG5vdyAtIHByZXZpb3VzKTtcbiAgICAgIGlmIChwdWxzZXMubGVuZ3RoID4gMTApIHtcbiAgICAgICAgcHVsc2VzID0gcHVsc2VzLnNsaWNlKDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBwcmV2aW91cyA9IG5vdztcbiAgICBpZiAodmFsdWUgPT09IDEgJiYgcHVsc2VzLmxlbmd0aCA+IDkgJiYgIWlzQnJld2luZykge1xuICAgICAgLy8gd2hhdCBpcyB0aGUgYXZlcmFnZSB0aW1lIGJldHdlZW4gcHVsc2VzXG4gICAgICBjb25zdCBhdmVyYWdlID0gcHVsc2VzLnJlZHVjZSgoYSwgYikgPT4geyByZXR1cm4gYSArIGI7IH0pIC8gcHVsc2VzLmxlbmd0aDtcbiAgICAgIGNvbnNvbGUubG9nKGBhdmVyYWdlIHRpbWU6ICR7YXZlcmFnZX1gKTtcbiAgICAgIFxuICAgICAgaWYgKGF2ZXJhZ2UgPiAwICYmIGF2ZXJhZ2UgPCAoQlJFV19USFJFU0hPTEQgKiAyKSkge1xuICAgICAgICAvLyBwdWxzZSBpcyBpbiByYW5nZVxuICAgICAgICBicmV3UHVsc2VDb3VudCsrO1xuICAgICAgICBpZiAoYnJld1B1bHNlQ291bnQgPiBDT05TRUNVVElWRV9CUkVXUyAmJiAhaXNCcmV3aW5nKSB7XG4gICAgICAgICAgaXNCcmV3aW5nID0gdHJ1ZTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnZGVmaW5pdGVseSBicmV3aW5nJyk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBicmV3UHVsc2VDb3VudCA9IDA7XG4gICAgICAgICAgICBpc0JyZXdpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdicmV3aW5nIGNvbXBsZXRlJyk7XG4gICAgICAgICAgfSwgQlJFV19USU1FKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgIH0gZWxzZSBpZiAoYnJld1B1bHNlQ291bnQgPiAxMjUpIHtcbiAgICAgICAgLy8gc29tZSByZWNlbnQgcG90ZW50aWFsIGJyZXdpbmcgYWN0aXZpdHksIGhhbmRsaW5nIG91dGxpZXJzXG4gICAgICAgIGJyZXdQdWxzZUNvdW50LS07XG4gICAgICAgIFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmVzZXRcbiAgICAgICAgYnJld1B1bHNlQ291bnQgPSAwO1xuICAgICAgfVxuXG4gICAgfVxuICB9KTtcbiAgXG4gIC8vIG9uIHNodXRkb3duXG4gIHRoaXMub24oJ2V4aXQnLCBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZygnY29mZmVlYm90IGlzIG9mZmxpbmUnKTtcbiAgfSk7XG4gIFxuICAvLyBoZWxwZXJzIHRvIGFkZCB0byBSRVBMXG4gIHRoaXMucmVwbC5pbmplY3QoeyB9KTtcbn0pOyJdfQ==