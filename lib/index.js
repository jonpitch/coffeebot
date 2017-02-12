'use strict';

var _raspiIo = require('raspi-io');

var _raspiIo2 = _interopRequireDefault(_raspiIo);

var _johnnyFive = require('johnny-five');

var _johnnyFive2 = _interopRequireDefault(_johnnyFive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// setup board
var board = new _johnnyFive2.default.Board({
  io: new _raspiIo2.default()
});

// times in milliseconds
// TODO configurable
var brewingThreshold = 200;
var heatingThreshold = 1700;
var idleThreshold = 2500;
var leeway = 200;
var brewTime = 480000;

// state of coffeepot - 'brewing', 'heating', 'idle'
var state = 'idle';

board.on('ready', function () {
  var _this = this;

  console.log('coffeebot is online');

  // setup expander
  var virtual = new _johnnyFive2.default.Board.Virtual(new _johnnyFive2.default.Expander('MCP23008'));

  // setup ct sensor
  var current = new _johnnyFive2.default.Sensor({
    pin: 0,
    board: virtual,
    type: 'digital'
  });

  var pulses = [];
  current.on('change', function () {
    var value = _this.value;
    var now = Date.now();

    if (value === 1 && pulses.length > 10) {
      // remove first element, add next time, calculate average
      pulses.shift();
      pulses.push(now);
      var average = pulses.reduce(function (a, b) {
        return a + b;
      }) / pulses.length;

      if (average < brewingThreshold + leeway || average > brewingThreshold - leeway && state !== 'brewing' && state !== 'heating') {
        // possible brewing
        state = 'brewing';

        // TODO send notification about brewing started
        console.log('percolations are imminent');

        // TODO set timeout -> in x minutes, notify coffee is ready
        setTimeout(function () {
          console.log('coffee is ready');
        }, brewTime);
      } else if (average < heatingTreshold + leeway || average > heatingTreshold - leeway && state !== 'heating' && state !== 'idle') {
        // possible heating
        state = 'heating';
        console.log('coffee pot is heating');
      } else {
        // possible idle
        state = 'idle';
        console.log('coffee pot is chillin');
      }
    } else if (value === 1) {
      // push time onto stack
      pulses.push(now);
      console.log('initializing...');
    }
  });

  // on shutdown
  this.on('exit', function () {
    console.log('coffeebot is offline');
  });

  // helpers to add to REPL
  this.repl.inject({});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJib2FyZCIsIkJvYXJkIiwiaW8iLCJicmV3aW5nVGhyZXNob2xkIiwiaGVhdGluZ1RocmVzaG9sZCIsImlkbGVUaHJlc2hvbGQiLCJsZWV3YXkiLCJicmV3VGltZSIsInN0YXRlIiwib24iLCJjb25zb2xlIiwibG9nIiwidmlydHVhbCIsIlZpcnR1YWwiLCJFeHBhbmRlciIsImN1cnJlbnQiLCJTZW5zb3IiLCJwaW4iLCJ0eXBlIiwicHVsc2VzIiwidmFsdWUiLCJub3ciLCJEYXRlIiwibGVuZ3RoIiwic2hpZnQiLCJwdXNoIiwiYXZlcmFnZSIsInJlZHVjZSIsImEiLCJiIiwic2V0VGltZW91dCIsImhlYXRpbmdUcmVzaG9sZCIsInJlcGwiLCJpbmplY3QiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDQSxJQUFNQSxRQUFRLElBQUkscUJBQUtDLEtBQVQsQ0FBZTtBQUMzQkMsTUFBSTtBQUR1QixDQUFmLENBQWQ7O0FBSUE7QUFDQTtBQUNBLElBQU1DLG1CQUFtQixHQUF6QjtBQUNBLElBQU1DLG1CQUFtQixJQUF6QjtBQUNBLElBQU1DLGdCQUFnQixJQUF0QjtBQUNBLElBQU1DLFNBQVMsR0FBZjtBQUNBLElBQU1DLFdBQVcsTUFBakI7O0FBRUE7QUFDQSxJQUFJQyxRQUFRLE1BQVo7O0FBRUFSLE1BQU1TLEVBQU4sQ0FBUyxPQUFULEVBQWtCLFlBQVc7QUFBQTs7QUFFM0JDLFVBQVFDLEdBQVIsQ0FBWSxxQkFBWjs7QUFFQTtBQUNBLE1BQU1DLFVBQVUsSUFBSSxxQkFBS1gsS0FBTCxDQUFXWSxPQUFmLENBQ2QsSUFBSSxxQkFBS0MsUUFBVCxDQUFrQixVQUFsQixDQURjLENBQWhCOztBQUlBO0FBQ0EsTUFBTUMsVUFBVSxJQUFJLHFCQUFLQyxNQUFULENBQWdCO0FBQzlCQyxTQUFLLENBRHlCO0FBRTlCakIsV0FBT1ksT0FGdUI7QUFHOUJNLFVBQU07QUFId0IsR0FBaEIsQ0FBaEI7O0FBTUEsTUFBSUMsU0FBUyxFQUFiO0FBQ0FKLFVBQVFOLEVBQVIsQ0FBVyxRQUFYLEVBQXFCLFlBQU07QUFDekIsUUFBTVcsUUFBUSxNQUFLQSxLQUFuQjtBQUNBLFFBQU1DLE1BQU1DLEtBQUtELEdBQUwsRUFBWjs7QUFFQSxRQUFJRCxVQUFVLENBQVYsSUFBZUQsT0FBT0ksTUFBUCxHQUFnQixFQUFuQyxFQUF1QztBQUNyQztBQUNBSixhQUFPSyxLQUFQO0FBQ0FMLGFBQU9NLElBQVAsQ0FBWUosR0FBWjtBQUNBLFVBQU1LLFVBQVVQLE9BQU9RLE1BQVAsQ0FBYyxVQUFDQyxDQUFELEVBQUlDLENBQUosRUFBVTtBQUFFLGVBQU9ELElBQUlDLENBQVg7QUFBZSxPQUF6QyxJQUE2Q1YsT0FBT0ksTUFBcEU7O0FBRUEsVUFBSUcsVUFBV3ZCLG1CQUFtQkcsTUFBOUIsSUFDQW9CLFVBQVd2QixtQkFBbUJHLE1BQTlCLElBQ0FFLFVBQVUsU0FEVixJQUVBQSxVQUFVLFNBSGQsRUFJRTtBQUNBO0FBQ0FBLGdCQUFRLFNBQVI7O0FBRUE7QUFDQUUsZ0JBQVFDLEdBQVIsQ0FBWSwyQkFBWjs7QUFFQTtBQUNBbUIsbUJBQVcsWUFBTTtBQUNmcEIsa0JBQVFDLEdBQVIsQ0FBWSxpQkFBWjtBQUNELFNBRkQsRUFFR0osUUFGSDtBQUlELE9BaEJELE1BZ0JPLElBQUltQixVQUFXSyxrQkFBa0J6QixNQUE3QixJQUNQb0IsVUFBV0ssa0JBQWtCekIsTUFBN0IsSUFDQUUsVUFBVSxTQURWLElBRUFBLFVBQVUsTUFIUCxFQUlMO0FBQ0E7QUFDQUEsZ0JBQVEsU0FBUjtBQUNBRSxnQkFBUUMsR0FBUixDQUFZLHVCQUFaO0FBRUQsT0FUTSxNQVNBO0FBQ0w7QUFDQUgsZ0JBQVEsTUFBUjtBQUNBRSxnQkFBUUMsR0FBUixDQUFZLHVCQUFaO0FBQ0Q7QUFFRixLQXJDRCxNQXFDTyxJQUFJUyxVQUFVLENBQWQsRUFBaUI7QUFDdEI7QUFDQUQsYUFBT00sSUFBUCxDQUFZSixHQUFaO0FBQ0FYLGNBQVFDLEdBQVIsQ0FBWSxpQkFBWjtBQUNEO0FBQ0YsR0E5Q0Q7O0FBZ0RBO0FBQ0EsT0FBS0YsRUFBTCxDQUFRLE1BQVIsRUFBZ0IsWUFBVztBQUN6QkMsWUFBUUMsR0FBUixDQUFZLHNCQUFaO0FBQ0QsR0FGRDs7QUFJQTtBQUNBLE9BQUtxQixJQUFMLENBQVVDLE1BQVYsQ0FBaUIsRUFBakI7QUFDRCxDQXhFRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByYXNwaSBmcm9tICdyYXNwaS1pbyc7XG5pbXBvcnQgZml2ZSBmcm9tICdqb2hubnktZml2ZSc7XG5cbi8vIHNldHVwIGJvYXJkXG5jb25zdCBib2FyZCA9IG5ldyBmaXZlLkJvYXJkKHtcbiAgaW86IG5ldyByYXNwaSgpXG59KTtcblxuLy8gdGltZXMgaW4gbWlsbGlzZWNvbmRzXG4vLyBUT0RPIGNvbmZpZ3VyYWJsZVxuY29uc3QgYnJld2luZ1RocmVzaG9sZCA9IDIwMDtcbmNvbnN0IGhlYXRpbmdUaHJlc2hvbGQgPSAxNzAwO1xuY29uc3QgaWRsZVRocmVzaG9sZCA9IDI1MDA7XG5jb25zdCBsZWV3YXkgPSAyMDA7XG5jb25zdCBicmV3VGltZSA9IDQ4MDAwMDtcblxuLy8gc3RhdGUgb2YgY29mZmVlcG90IC0gJ2JyZXdpbmcnLCAnaGVhdGluZycsICdpZGxlJ1xubGV0IHN0YXRlID0gJ2lkbGUnO1xuXG5ib2FyZC5vbigncmVhZHknLCBmdW5jdGlvbigpIHtcbiAgXG4gIGNvbnNvbGUubG9nKCdjb2ZmZWVib3QgaXMgb25saW5lJyk7XG5cbiAgLy8gc2V0dXAgZXhwYW5kZXJcbiAgY29uc3QgdmlydHVhbCA9IG5ldyBmaXZlLkJvYXJkLlZpcnR1YWwoXG4gICAgbmV3IGZpdmUuRXhwYW5kZXIoJ01DUDIzMDA4JylcbiAgKTtcbiAgXG4gIC8vIHNldHVwIGN0IHNlbnNvclxuICBjb25zdCBjdXJyZW50ID0gbmV3IGZpdmUuU2Vuc29yKHtcbiAgICBwaW46IDAsXG4gICAgYm9hcmQ6IHZpcnR1YWwsXG4gICAgdHlwZTogJ2RpZ2l0YWwnXG4gIH0pO1xuICBcbiAgbGV0IHB1bHNlcyA9IFtdO1xuICBjdXJyZW50Lm9uKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgXG4gICAgaWYgKHZhbHVlID09PSAxICYmIHB1bHNlcy5sZW5ndGggPiAxMCkge1xuICAgICAgLy8gcmVtb3ZlIGZpcnN0IGVsZW1lbnQsIGFkZCBuZXh0IHRpbWUsIGNhbGN1bGF0ZSBhdmVyYWdlXG4gICAgICBwdWxzZXMuc2hpZnQoKTtcbiAgICAgIHB1bHNlcy5wdXNoKG5vdyk7XG4gICAgICBjb25zdCBhdmVyYWdlID0gcHVsc2VzLnJlZHVjZSgoYSwgYikgPT4geyByZXR1cm4gYSArIGI7IH0pIC8gcHVsc2VzLmxlbmd0aDtcbiAgICAgIFxuICAgICAgaWYgKGF2ZXJhZ2UgPCAoYnJld2luZ1RocmVzaG9sZCArIGxlZXdheSkgfHwgXG4gICAgICAgICAgYXZlcmFnZSA+IChicmV3aW5nVGhyZXNob2xkIC0gbGVld2F5KSAmJlxuICAgICAgICAgIHN0YXRlICE9PSAnYnJld2luZycgJiZcbiAgICAgICAgICBzdGF0ZSAhPT0gJ2hlYXRpbmcnXG4gICAgICApIHtcbiAgICAgICAgLy8gcG9zc2libGUgYnJld2luZ1xuICAgICAgICBzdGF0ZSA9ICdicmV3aW5nJztcbiAgICAgICAgXG4gICAgICAgIC8vIFRPRE8gc2VuZCBub3RpZmljYXRpb24gYWJvdXQgYnJld2luZyBzdGFydGVkXG4gICAgICAgIGNvbnNvbGUubG9nKCdwZXJjb2xhdGlvbnMgYXJlIGltbWluZW50Jyk7XG4gICAgICAgIFxuICAgICAgICAvLyBUT0RPIHNldCB0aW1lb3V0IC0+IGluIHggbWludXRlcywgbm90aWZ5IGNvZmZlZSBpcyByZWFkeVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29mZmVlIGlzIHJlYWR5Jyk7XG4gICAgICAgIH0sIGJyZXdUaW1lKTtcbiAgICAgICAgXG4gICAgICB9IGVsc2UgaWYgKGF2ZXJhZ2UgPCAoaGVhdGluZ1RyZXNob2xkICsgbGVld2F5KSB8fCBcbiAgICAgICAgICBhdmVyYWdlID4gKGhlYXRpbmdUcmVzaG9sZCAtIGxlZXdheSkgJiZcbiAgICAgICAgICBzdGF0ZSAhPT0gJ2hlYXRpbmcnICYmXG4gICAgICAgICAgc3RhdGUgIT09ICdpZGxlJ1xuICAgICAgKSB7XG4gICAgICAgIC8vIHBvc3NpYmxlIGhlYXRpbmdcbiAgICAgICAgc3RhdGUgPSAnaGVhdGluZyc7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjb2ZmZWUgcG90IGlzIGhlYXRpbmcnKTtcbiAgICAgICAgXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBwb3NzaWJsZSBpZGxlXG4gICAgICAgIHN0YXRlID0gJ2lkbGUnO1xuICAgICAgICBjb25zb2xlLmxvZygnY29mZmVlIHBvdCBpcyBjaGlsbGluJyk7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAxKSB7XG4gICAgICAvLyBwdXNoIHRpbWUgb250byBzdGFja1xuICAgICAgcHVsc2VzLnB1c2gobm93KTtcbiAgICAgIGNvbnNvbGUubG9nKCdpbml0aWFsaXppbmcuLi4nKTtcbiAgICB9XG4gIH0pO1xuICBcbiAgLy8gb24gc2h1dGRvd25cbiAgdGhpcy5vbignZXhpdCcsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKCdjb2ZmZWVib3QgaXMgb2ZmbGluZScpO1xuICB9KTtcbiAgXG4gIC8vIGhlbHBlcnMgdG8gYWRkIHRvIFJFUExcbiAgdGhpcy5yZXBsLmluamVjdCh7IH0pO1xufSk7Il19