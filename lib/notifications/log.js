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

// writes to console
var Log = function (_Notification) {
  _inherits(Log, _Notification);

  function Log() {
    _classCallCheck(this, Log);

    return _possibleConstructorReturn(this, (Log.__proto__ || Object.getPrototypeOf(Log)).call(this));
  }

  // bot is online


  _createClass(Log, [{
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

  return Log;
}(_notification2.default);

exports.default = Log;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub3RpZmljYXRpb25zL2xvZy5qcyJdLCJuYW1lcyI6WyJMb2ciLCJjb25zb2xlIiwibG9nIiwibWVzc2FnZSIsInJhbmRvbUJyZXdpbmdNZXNzYWdlIiwicmFuZG9tRmluaXNoZWRNZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUFFQTtJQUNxQkEsRzs7O0FBRW5CLGlCQUFjO0FBQUE7O0FBQUE7QUFFYjs7QUFFRDs7Ozs7NkJBQ1M7QUFDUEMsY0FBUUMsR0FBUixDQUFZLHFCQUFaO0FBQ0Q7O0FBRUQ7Ozs7OEJBQ1U7QUFDUkQsY0FBUUMsR0FBUixDQUFZLHNCQUFaO0FBQ0Q7O0FBRUQ7Ozs7OEJBQ1U7QUFDUixVQUFNQyxVQUFVLEtBQUtDLG9CQUFMLEVBQWhCO0FBQ0FILGNBQVFDLEdBQVIsQ0FBWUMsT0FBWjtBQUNEOztBQUVEOzs7OytCQUNXO0FBQ1QsVUFBTUEsVUFBVSxLQUFLRSxxQkFBTCxFQUFoQjtBQUNBSixjQUFRQyxHQUFSLENBQVlDLE9BQVo7QUFDRDs7Ozs7O2tCQTFCa0JILEciLCJmaWxlIjoibG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5vdGlmaWNhdGlvbiBmcm9tICdub3RpZmljYXRpb25zL25vdGlmaWNhdGlvbic7XG5cbi8vIHdyaXRlcyB0byBjb25zb2xlXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2cgZXh0ZW5kcyBOb3RpZmljYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICAvLyBib3QgaXMgb25saW5lXG4gIG9ubGluZSgpIHtcbiAgICBjb25zb2xlLmxvZygnY29mZmVlYm90IGlzIG9ubGluZScpO1xuICB9XG4gIFxuICAvLyBib3QgaXMgb2ZmbGluZVxuICBvZmZsaW5lKCkge1xuICAgIGNvbnNvbGUubG9nKCdjb2ZmZWVib3QgaXMgb2ZmbGluZScpO1xuICB9XG4gIFxuICAvLyBjb2ZmZWUgaXMgYnJld2luZ1xuICBicmV3aW5nKCkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLnJhbmRvbUJyZXdpbmdNZXNzYWdlKCk7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gIH1cbiAgXG4gIC8vIGNvZmZlZSBpcyByZWFkeVxuICBmaW5pc2hlZCgpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5yYW5kb21GaW5pc2hlZE1lc3NhZ2UoKTtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgfVxufVxuIl19