"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __SAuthAdapter = require('./SAuthAdapter');

var __blessed = require('blessed');

var __terminalKit = require('terminal-kit');

var __parseHtml = require('../../../terminal/parseHtml');

var __ora = require('ora');
/**
 * @name                            STerminalAuthAdapter
 * @namespace           node.auth.adapters
 * @type                            Class
 *
 * Terminal SAuth adapter that allows you to ask the auth informations through the terminal
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = /*#__PURE__*/function (_SAuthAdapter) {
  _inherits(STerminalAuthAdapter, _SAuthAdapter);

  var _super = _createSuper(STerminalAuthAdapter);

  /**
   * @name                          constructor
   * @type                          Function
   *
   * Construct the STerminalAuthAdapter instance
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function STerminalAuthAdapter() {
    _classCallCheck(this, STerminalAuthAdapter);

    return _super.call(this, ['basic', 'bearer']);
  }

  _createClass(STerminalAuthAdapter, [{
    key: "_resetScreen",
    value: function _resetScreen() {
      // if (this._screen) this._screen.destroy();
      if (!this._screen) {
        this._screen = __blessed.screen({
          smartCSR: true
        });

        this._screen.key(['C-c'], function (ch, key) {
          return process.exit(0);
        });
      }

      if (this._container) {
        this._screen.remove(this._container);

        this._container.destroy();
      }

      this._container = __blessed.form({
        top: 'center',
        left: 'center',
        width: process.stdout.columns < 50 ? '90%' : '50%',
        // tags: true,
        keys: true,
        vi: false,
        style: {
          fg: 'white'
        }
      });

      this._screen.append(this._container);
    }
    /**
     * @name                      _success
     * @type                      Function
     * @async
     *
     * Display the success message to the user
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_success",
    value: function _success() {
      return new Promise((resolve, reject) => {
        this._isValidating = false;
        clearTimeout(this._validationTimeout);

        this._resetScreen();

        var success = __blessed.box({
          width: '100%',
          content: __parseHtml('<green>✓ Your auth info have been validated!</green>'),
          align: 'center'
        });

        this._container.height = 1;

        this._container.append(success);

        this._screen.render();

        setTimeout(() => {
          resolve();

          this._screen.destroy();
        }, 2000);
      });
    }
    /**
     * @name                      _validation
     * @type                      Function
     * @async
     *
     * Display the validation message to the user
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_validation",
    value: function () {
      var _validation2 = _asyncToGenerator(function* () {
        if (!this._isValidating) this._isValidating = true;

        this._resetScreen();

        if (!this._oraLoader) {
          this._oraLoader = __ora('Please wait while your auth info are validated...');
        }

        var loading = __blessed.text({
          content: this._oraLoader.frame(),
          align: 'center'
        });

        this._container.height = 1;

        this._container.append(loading);

        this._screen.render();

        if (this._isValidating) {
          this._validationTimeout = setTimeout(() => {
            this._validation();
          }, 20);
        }

        return true;
      });

      function _validation() {
        return _validation2.apply(this, arguments);
      }

      return _validation;
    }()
    /**
     * @name                      _basic
     * @type                      Function
     * @async
     *
     * Ask the user for username, password
     *
     * @param             {Object}              [settings={}]       An object of settings. Here's the options available:
     * - title (null) {String}: The title to display on top of the form
     * - error (null) {String}: An error message to display to the user. Can be something like "Your credentials have been declined. Please try again..."
     * - info (null) {String}: An info message to display to the user
     * @return            {Promise}                     A promise that will be resolved with the getted username, password
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_basic",
    value: function _basic(settings) {
      if (settings === void 0) {
        settings = {};
      }

      return new Promise((resolve, reject) => {
        this._resetScreen();

        this._isValidating = false;
        clearTimeout(this._validationTimeout);
        var titleY = 0;

        var title = __blessed.text({
          height: 1,
          top: titleY,
          style: {
            fg: 'yellow'
          },
          content: settings.title || 'Basic auth'
        });

        var infoY = settings.info ? titleY + 2 : titleY;

        var info = __blessed.text({
          top: infoY,
          style: {
            fg: 'white'
          },
          content: settings.info || ''
        });

        var errorY = settings.error ? infoY + 2 : infoY;

        var error = __blessed.text({
          height: 1,
          top: errorY,
          style: {
            fg: 'red'
          },
          content: settings.error || ''
        });

        var usernameLabelY = errorY + 2;

        var usernameLabel = __blessed.text({
          height: 1,
          top: usernameLabelY,
          style: {
            fg: 'white'
          },
          content: 'Username: '
        });

        var usernameY = usernameLabelY + 2;

        var username = __blessed.textbox({
          name: 'username',
          height: 3,
          top: usernameY,
          mouse: true,
          style: {
            fg: 'black',
            bg: '#ffffff',
            focus: {
              bg: 'yellow',
              fg: 'black'
            }
          },
          inputOnFocus: true,
          padding: {
            top: 1,
            bottom: 1,
            left: 2,
            right: 2
          }
        });

        var passwordLabelY = usernameY + 4;

        var passwordLabel = __blessed.text({
          height: 1,
          top: passwordLabelY,
          style: {
            fg: 'white'
          },
          content: 'Password: '
        });

        var passwordY = passwordLabelY + 2;

        var password = __blessed.textbox({
          name: 'password',
          height: 3,
          top: passwordY,
          mouse: true,
          style: {
            fg: 'black',
            bg: '#ffffff',
            focus: {
              bg: 'yellow',
              fg: 'black'
            }
          },
          censor: true,
          inputOnFocus: true,
          padding: {
            top: 1,
            bottom: 1,
            left: 2,
            right: 2
          }
        });

        var buttonY = passwordY + 4;

        var button = __blessed.button({
          height: 3,
          width: 15,
          top: buttonY,
          right: 0,
          align: 'center',
          mouse: true,
          style: {
            fg: 'black',
            bg: 'yellow',
            hover: {
              bg: 'cyan'
            }
          },
          content: '✔ Login',
          padding: {
            top: 1,
            bottom: 1,
            left: 2,
            right: 2
          }
        });

        this._container.append(title);

        if (settings.info) {
          this._container.append(info);
        }

        if (settings.error) {
          this._container.append(error);
        }

        this._container.append(usernameLabel);

        this._container.append(username);

        this._container.append(passwordLabel);

        this._container.append(password);

        this._container.append(button);

        this._screen.render();

        username.focus();
        username.key(['enter'], e => {
          this._container.submit();
        });
        password.key(['enter'], e => {
          this._container.submit();
        });
        button.on('press', e => {
          this._container.submit();
        });

        this._container.on('submit', e => {
          resolve({
            username: e.username,
            password: e.password
          });
        });
      });
    }
    /**
     * @name                      _bearer
     * @type                      Function
     * @async
     *
     * Ask the user for bearer auth info (token)
     *
     * @param             {Object}              [settings={}]       An object of settings. Here's the options available:
     * - title (null) {String}: The title displayed on top of the form
     * - error (null) {String}: An error message to display to the user. Can be something like "Your credentials have been declined. Please try again..."
     * - info (null) {String}: An info message to display to the user
     * @return            {Promise}                     A promise that will be resolved with the getted username, password
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_bearer",
    value: function _bearer(settings) {
      if (settings === void 0) {
        settings = {};
      }

      return new Promise((resolve, reject) => {
        this._resetScreen();

        this._isValidating = false;
        clearTimeout(this._validationTimeout);
        var titleY = 0;

        var title = __blessed.text({
          height: 1,
          top: titleY,
          style: {
            fg: 'yellow'
          },
          content: settings.title || 'Bearer auth'
        });

        var infoY = settings.info ? titleY + 2 : titleY;

        var info = __blessed.text({
          top: infoY,
          style: {
            fg: 'white'
          },
          content: settings.info || ''
        });

        var errorY = settings.error ? infoY + 2 : infoY;

        var error = __blessed.text({
          top: errorY,
          style: {
            fg: 'red'
          },
          content: settings.error || ''
        });

        var tokenLabelY = errorY + 2;

        var tokenLabel = __blessed.text({
          height: 1,
          top: tokenLabelY,
          style: {
            fg: 'white'
          },
          content: 'Bearer token: '
        });

        var tokenY = tokenLabelY + 2;

        var token = __blessed.textbox({
          name: 'token',
          height: 3,
          top: tokenY,
          mouse: true,
          style: {
            fg: 'black',
            bg: '#ffffff',
            focus: {
              bg: 'yellow',
              fg: 'black'
            }
          },
          inputOnFocus: true,
          padding: {
            top: 1,
            bottom: 1,
            left: 2,
            right: 2
          }
        });

        var buttonY = tokenY + 4;

        var button = __blessed.button({
          height: 3,
          width: 15,
          top: buttonY,
          right: 0,
          align: 'center',
          mouse: true,
          style: {
            fg: 'black',
            bg: 'yellow',
            hover: {
              bg: 'cyan'
            }
          },
          content: '✔ Login',
          padding: {
            top: 1,
            bottom: 1,
            left: 2,
            right: 2
          }
        });

        this._container.append(title);

        if (settings.info) {
          this._container.append(info);
        }

        if (settings.error) {
          this._container.append(error);
        }

        this._container.append(tokenLabel);

        this._container.append(token);

        this._container.append(button);

        this._screen.render();

        token.focus();
        token.key(['enter'], e => {
          this._container.submit();
        });
        button.on('press', e => {
          this._container.submit();
        });

        this._container.on('submit', e => {
          resolve({
            token: e.token
          });
        });
      });
    }
  }]);

  return STerminalAuthAdapter;
}(__SAuthAdapter);