'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lcHOC = require('../assets/lcHOC.css');

var _lcHOC2 = _interopRequireDefault(_lcHOC);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var geClass = function geClass(className) {
  return _lcHOC2.default && _lcHOC2.default[className] ? _lcHOC2.default[className] : className;
};

var CLASSNAME = geClass('lc-hoc'),
    CLASSNAME_UPDATE = geClass('lc-hoc--update'),
    DEFAULTS = {
  log: {
    use: true,
    expanded: false,
    renderCount: true,
    state: true,
    props: true,
    timings: true
  },
  flash: true
};

var getName = function getName(W) {
  return W.displayName || W.name || 'Component';
};

var lcHOC = function lcHOC(W, params) {

  if (!W.prototype.isReactComponent) {
    console.log('❗️ lcHOC does not currently support stateless components');
    return W;
  }

  return function (_W) {
    _inherits(HOC, _W);

    function HOC() {
      _classCallCheck(this, HOC);

      var _this = _possibleConstructorReturn(this, (HOC.__proto__ || Object.getPrototypeOf(HOC)).call(this));

      _this.name = getName(W);
      _this.oldProps = {};

      _this.settings = _this.getSettings();
      return _this;
    }

    _createClass(HOC, [{
      key: 'getSettings',
      value: function getSettings() {
        if (typeof params === 'undefined') {
          return DEFAULTS;
        }

        return Object.assign({}, DEFAULTS, params);
      }
    }, {
      key: 'toggleClass',
      value: function toggleClass() {
        this.lchoc.classList.remove(CLASSNAME_UPDATE);
        void this.lchoc.offsetWidth;
        this.lchoc.classList.add(CLASSNAME_UPDATE);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this.oldProps = this.props;
        this.nextProps = nextProps;
      }
    }, {
      key: 'componentWillUpdate',
      value: function componentWillUpdate() {
        if (this.settings.log.timings) {
          console.time(this.name + ' componentWillUpdate => componentDidUpdate');
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        if (this.settings.flash) {
          this.toggleClass('lc-hoc--update');
        }

        if (this.settings.log.use) {
          this.log();
        }
      }
    }, {
      key: 'log',
      value: function log() {
        var newProps = JSON.stringify(this.nextProps),
            oldProps = JSON.stringify(this.oldProps),
            groupType = this.settings.log.expanded ? 'group' : 'groupCollapsed';

        console[groupType](this.name + ' update');

        if (this.settings.log.renderCount) {
          console.count('\uD83C\uDF00 ' + this.name + ': render count');
        }

        if (this.state !== null && this.settings.log.state) {
          console[groupType]('⚡️ State');
          console.log(this.state);
          console.groupEnd();
        }

        if (this.settings.log.props) {
          if (newProps !== oldProps) {
            console[groupType]('🏠 Props');
            console.log('⬇️ %cOld: ', 'color: gray');
            console.log(this.oldProps);
            console.log('⬇️ %cNew: ', 'color: teal');
            console.log(this.props);
            console.groupEnd();
          } else {
            if (Object.keys(this.props).length === 0 && this.props.constructor === Object) {
              console.log('❗️ %cProps are empty', 'color: red');
            } else {
              console.log('❗️ %cProps are unchanged', 'color: red');
              console[groupType]('🏠 Props');
              console.log(this.props);
              console.groupEnd();
            }
          }
        }

        if (this.settings.log.timings) {
          console[groupType]('🕗 Timings');
          console.timeEnd(this.name + ' componentWillUpdate => componentDidUpdate');
          console.timeEnd(this.name + ' render => componentDidUpdate');
          console.groupEnd();
        }
        console.groupEnd();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        if (this.settings.log.timings) {
          console.time(this.name + ' render => componentDidUpdate');
        }

        return _react2.default.createElement(
          'div',
          {
            ref: function ref(_ref) {
              return _this2.lchoc = _ref;
            },
            className: CLASSNAME },
          _get(HOC.prototype.__proto__ || Object.getPrototypeOf(HOC.prototype), 'render', this).call(this)
        );
      }
    }]);

    return HOC;
  }(W);
};

exports.default = lcHOC;
module.exports = exports['default'];