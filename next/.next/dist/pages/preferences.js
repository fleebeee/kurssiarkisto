'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inherits2 = require('/Users/jk/kurssiarkisto/next/node_modules/babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _regenerator = require('/Users/jk/kurssiarkisto/next/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('/Users/jk/kurssiarkisto/next/node_modules/babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('/Users/jk/kurssiarkisto/next/node_modules/babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('/Users/jk/kurssiarkisto/next/node_modules/babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('/Users/jk/kurssiarkisto/next/node_modules/babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('/Users/jk/kurssiarkisto/next/node_modules/babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _react = require('/Users/jk/kurssiarkisto/next/node_modules/react/react.js');

var _react2 = _interopRequireDefault(_react);

require('isomorphic-fetch');

var _localStorage = require('local-storage');

var _localStorage2 = _interopRequireDefault(_localStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_React$Component) {
  (0, _inherits3.default)(_class, _React$Component);

  function _class(props) {
    (0, _classCallCheck3.default)(this, _class);

    var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this, props));

    _this.state = {
      isAuthenticated: 'pending',
      data: {}
    };
    return _this;
  }

  (0, _createClass3.default)(_class, [{
    key: 'componentDidMount',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var jwt, res, data;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                jwt = _localStorage2.default.get('jwt');

                if (!jwt) {
                  _context.next = 11;
                  break;
                }

                _context.next = 4;
                return fetch('http://localhost:3003/api/memberinfo', {
                  method: 'GET',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': jwt
                  }
                });

              case 4:
                res = _context.sent;
                _context.next = 7;
                return res.json();

              case 7:
                data = _context.sent;


                if (!!data.success) {
                  this.setState({ isAuthenticated: 'yes', data: data });
                } else {
                  this.setState({ isAuthenticated: 'no' });
                }
                _context.next = 12;
                break;

              case 11:
                this.setState({ isAuthenticated: 'no' });

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _ref.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: 'render',
    value: function render() {
      if (this.state.isAuthenticated === 'pending') {
        return _react2.default.createElement(
          'div',
          null,
          'Loading indicator'
        );
      } else if (this.state.isAuthenticated === 'no') {
        return _react2.default.createElement(
          'div',
          null,
          'Unauthorized'
        );
      } else if (this.state.isAuthenticated == 'yes') {
        return _react2.default.createElement(
          'div',
          null,
          'Hello you are authenticated ',
          this.state.data.msg
        );
      }
    }
  }]);
  return _class;
}(_react2.default.Component);

exports.default = _class;
    if (module.hot) {
      module.hot.accept()
      if (module.hot.status() !== 'idle') {
        var Component = module.exports.default || module.exports
        next.router.update('/preferences', Component)
      }
    }
  