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

board.on('ready', function () {

  console.log('board ready');

  // on shutdown
  this.on('exit', function () {
    console.log('farewell');
  });

  // helpers to add to REPL
  this.repl.inject({});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJib2FyZCIsIkJvYXJkIiwiaW8iLCJvbiIsImNvbnNvbGUiLCJsb2ciLCJyZXBsIiwiaW5qZWN0Il0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ0EsSUFBTUEsUUFBUSxJQUFJLHFCQUFLQyxLQUFULENBQWU7QUFDM0JDLE1BQUk7QUFEdUIsQ0FBZixDQUFkOztBQUlBRixNQUFNRyxFQUFOLENBQVMsT0FBVCxFQUFrQixZQUFXOztBQUUzQkMsVUFBUUMsR0FBUixDQUFZLGFBQVo7O0FBRUE7QUFDQSxPQUFLRixFQUFMLENBQVEsTUFBUixFQUFnQixZQUFXO0FBQ3pCQyxZQUFRQyxHQUFSLENBQVksVUFBWjtBQUNELEdBRkQ7O0FBSUE7QUFDQSxPQUFLQyxJQUFMLENBQVVDLE1BQVYsQ0FBaUIsRUFBakI7QUFDRCxDQVhEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJhc3BpIGZyb20gJ3Jhc3BpLWlvJztcbmltcG9ydCBmaXZlIGZyb20gJ2pvaG5ueS1maXZlJztcblxuLy8gc2V0dXAgYm9hcmRcbmNvbnN0IGJvYXJkID0gbmV3IGZpdmUuQm9hcmQoe1xuICBpbzogbmV3IHJhc3BpKClcbn0pO1xuXG5ib2FyZC5vbigncmVhZHknLCBmdW5jdGlvbigpIHtcbiAgXG4gIGNvbnNvbGUubG9nKCdib2FyZCByZWFkeScpO1xuICBcbiAgLy8gb24gc2h1dGRvd25cbiAgdGhpcy5vbignZXhpdCcsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKCdmYXJld2VsbCcpO1xuICB9KTtcbiAgXG4gIC8vIGhlbHBlcnMgdG8gYWRkIHRvIFJFUExcbiAgdGhpcy5yZXBsLmluamVjdCh7IH0pO1xufSk7Il19