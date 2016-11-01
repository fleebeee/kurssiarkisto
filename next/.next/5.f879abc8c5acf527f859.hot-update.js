webpackHotUpdate(5,{

/***/ 125:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _inherits2 = __webpack_require__(1);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _regenerator = __webpack_require__(99);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _stringify = __webpack_require__(103);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _asyncToGenerator2 = __webpack_require__(105);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _getPrototypeOf = __webpack_require__(77);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(81);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(82);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(86);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _react = __webpack_require__(87);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(122);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _class = function (_React$Component) {
	  (0, _inherits3.default)(_class, _React$Component);

	  function _class(props) {
	    (0, _classCallCheck3.default)(this, _class);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this, props));

	    _this.signUp = _this.signUp.bind(_this);
	    _this.state = { email: '', password: '' };
	    _this.handleEmailChange = _this.handleEmailChange.bind(_this);
	    _this.handlePasswordChange = _this.handlePasswordChange.bind(_this);
	    _this.handleSubmit = _this.handleSubmit.bind(_this);
	    return _this;
	  }

	  (0, _createClass3.default)(_class, [{
	    key: 'signUp',
	    value: function () {
	      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(email, password) {
	        var res, data;
	        return _regenerator2.default.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _context.next = 2;
	                return fetch('http://localhost:3003/api/signup', {
	                  method: 'POST',
	                  headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                  },
	                  body: (0, _stringify2.default)({
	                    email: email,
	                    password: password
	                  })
	                });

	              case 2:
	                res = _context.sent;
	                _context.next = 5;
	                return res.json();

	              case 5:
	                data = _context.sent;

	                console.debug('signUp() response', data);
	                return _context.abrupt('return', data);

	              case 8:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function signUp(_x, _x2) {
	        return _ref.apply(this, arguments);
	      }

	      return signUp;
	    }()
	  }, {
	    key: 'handleEmailChange',
	    value: function handleEmailChange(event) {
	      this.setState({ email: event.target.value });
	    }
	  }, {
	    key: 'handlePasswordChange',
	    value: function handlePasswordChange(event) {
	      this.setState({ password: event.target.value });
	    }
	  }, {
	    key: 'handleSubmit',
	    value: function () {
	      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(event) {
	        var res;
	        return _regenerator2.default.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                _context2.next = 2;
	                return this.signUp(this.state.email, this.state.password);

	              case 2:
	                res = _context2.sent;


	                if (!res) {
	                  console.debug('No answer from server');
	                } else if (!!res.success) {
	                  console.debug('Successful sign up');
	                  // Redirect to front page
	                  this.props.url.pushTo('/');
	                } else {
	                  console.debug('Invalid sign up');
	                }

	              case 4:
	              case 'end':
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function handleSubmit(_x3) {
	        return _ref2.apply(this, arguments);
	      }

	      return handleSubmit;
	    }()
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        'Rekister\xF6idy',
	        _react2.default.createElement('input', {
	          type: 'text',
	          placeholder: 'email',
	          value: this.state.email,
	          onChange: this.handleEmailChange
	        }),
	        _react2.default.createElement('input', {
	          type: 'password',
	          placeholder: 'password',
	          value: this.state.password,
	          onChange: this.handlePasswordChange
	        }),
	        _react2.default.createElement(
	          'button',
	          { onClick: this.handleSubmit },
	          'Sign up'
	        )
	      );
	    }
	  }]);
	  return _class;
	}(_react2.default.Component);

	exports.default = _class;
	    if (true) {
	      module.hot.accept()
	      if (module.hot.status() !== 'idle') {
	        var Component = module.exports.default || module.exports
	        next.router.update('/signup', Component)
	      }
	    }
	  

/***/ }

})