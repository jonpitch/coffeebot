'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _notification = require('notifications/notification');

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
  DS18B20 Temperature Sensor
*/
var Console = function (_Notification) {
  _inherits(Console, _Notification);

  function Console() {
    _classCallCheck(this, Console);

    return _possibleConstructorReturn(this, (Console.__proto__ || Object.getPrototypeOf(Console)).call(this));
  }

  // bot is online


  _createClass(Console, [{
    key: 'online',
    value: function online() {
      console.log('coffeebot is online');
    }

    // bot is offline

  }, {
    key: 'offline',
    value: function offline() {
      console.log('coffeebot is offline');
    }

    // coffee is brewing

  }, {
    key: 'brewing',
    value: function brewing() {
      var message = this.randomBrewingMessage();
      console.log(message);
    }

    // coffee is ready

  }, {
    key: 'finished',
    value: function finished() {
      var message = this.randomFinishedMessage();
      console.log(message);
    }
  }]);

  return Console;
}(_notification2.default);

exports.default = Console;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub3RpZmljYXRpb25zL2NvbnNvbGUuanMiXSwibmFtZXMiOlsiQ29uc29sZSIsImNvbnNvbGUiLCJsb2ciLCJtZXNzYWdlIiwicmFuZG9tQnJld2luZ01lc3NhZ2UiLCJyYW5kb21GaW5pc2hlZE1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHcUJBLE87OztBQUVuQixxQkFBYztBQUFBOztBQUFBO0FBRWI7O0FBRUQ7Ozs7OzZCQUNTO0FBQ1BDLGNBQVFDLEdBQVIsQ0FBWSxxQkFBWjtBQUNEOztBQUVEOzs7OzhCQUNVO0FBQ1JELGNBQVFDLEdBQVIsQ0FBWSxzQkFBWjtBQUNEOztBQUVEOzs7OzhCQUNVO0FBQ1IsVUFBTUMsVUFBVSxLQUFLQyxvQkFBTCxFQUFoQjtBQUNBSCxjQUFRQyxHQUFSLENBQVlDLE9BQVo7QUFDRDs7QUFFRDs7OzsrQkFDVztBQUNULFVBQU1BLFVBQVUsS0FBS0UscUJBQUwsRUFBaEI7QUFDQUosY0FBUUMsR0FBUixDQUFZQyxPQUFaO0FBQ0Q7Ozs7OztrQkExQmtCSCxPIiwiZmlsZSI6ImNvbnNvbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTm90aWZpY2F0aW9uIGZyb20gJ25vdGlmaWNhdGlvbnMvbm90aWZpY2F0aW9uJztcblxuLyoqXG4gIERTMThCMjAgVGVtcGVyYXR1cmUgU2Vuc29yXG4qL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uc29sZSBleHRlbmRzIE5vdGlmaWNhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8vIGJvdCBpcyBvbmxpbmVcbiAgb25saW5lKCkge1xuICAgIGNvbnNvbGUubG9nKCdjb2ZmZWVib3QgaXMgb25saW5lJyk7XG4gIH1cbiAgXG4gIC8vIGJvdCBpcyBvZmZsaW5lXG4gIG9mZmxpbmUoKSB7XG4gICAgY29uc29sZS5sb2coJ2NvZmZlZWJvdCBpcyBvZmZsaW5lJyk7XG4gIH1cbiAgXG4gIC8vIGNvZmZlZSBpcyBicmV3aW5nXG4gIGJyZXdpbmcoKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IHRoaXMucmFuZG9tQnJld2luZ01lc3NhZ2UoKTtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgfVxuICBcbiAgLy8gY29mZmVlIGlzIHJlYWR5XG4gIGZpbmlzaGVkKCkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLnJhbmRvbUZpbmlzaGVkTWVzc2FnZSgpO1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICB9XG59XG4iXX0=