// @ts-nocheck
// @shared
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../object/deepMerge", "./adapters/SLogConsoleAdapter", "../core/env"], factory);
    }
})(function (require, exports) {
    "use strict";
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var SLogConsoleAdapter_1 = __importDefault(require("./adapters/SLogConsoleAdapter"));
    var env_1 = __importDefault(require("../core/env"));
    return /** @class */ (function () {
        /**
         * @name          constructor
         * @type          Function
         *
         * Constructor
         *
         * @param         {Object}        [settings={}]           The settings object to configure your SLog instance. Here's the settings available:
         * - adapters ({}) {Object}: An object of adapters that you want to use in this SLog instance. The format is { adapterName: adapterInstance, etc... }
         * - overrideNativeConsole (false) {Boolean}: This will override the console.log, warn, etc... methods
         * - adaptersByLevel ({}) (Object): Specify which adapter you want to use by level. Can be an Array like ['console','mail'] or a comma separated string like "console,mail". The object format is { adapterName: adaptersList }
         * - adaptersByEnvironment ({}) {Object}: Same as the "adaptersByLevel" but for the environments like "test", "development" or "production". The environment value is taken using the "sugar.js.core.env" function using the key "ENV" or "NODE_ENV"
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        function SLog(settings) {
            var _this_1 = this;
            if (settings === void 0) { settings = {}; }
            /**
             * @name          _settings
             * @type          Object
             * @private
             *
             * Store this instance settings
             *
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this._settings = {
                adapters: {},
                adaptersByLevel: {},
                overrideNativeConsole: false
            };
            // extend settings
            this._settings = deepMerge_1.default({
                adapters: {
                    console: new SLogConsoleAdapter_1.default()
                },
                adaptersByLevel: {
                    log: null,
                    info: null,
                    warn: null,
                    debug: null,
                    error: null,
                    trace: null
                },
                adaptersByEnvironment: {
                    test: null,
                    development: null,
                    production: null
                },
                overrideNativeConsole: false
            }, settings);
            // ensure every adapters are a class instance
            Object.keys(this._settings.adapters).forEach(function (adapterName) { return __awaiter(_this_1, void 0, void 0, function () {
                var cls;
                return __generator(this, function (_a) {
                    if (typeof this._settings.adapters[adapterName] === 'string') {
                        cls = require(this._settings.adapters[adapterName]);
                        this._settings.adapters[adapterName] = new cls();
                    }
                    return [2 /*return*/];
                });
            }); });
            // if needed, override the native console
            if (this._settings.overrideNativeConsole) {
                this._overrideNativeConsole();
            }
        }
        /**
         * @name            _overrideNativeConsole
         * @type            Function
         * @private
         *
         * Override the native console object to call the SLog methods instead of the normal once.
         * Store the native console inside the global/window variable called "nativeConsole"
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SLog.prototype._overrideNativeConsole = function () {
            // check if need to override the native console methods
            var _this = this; // eslint-disable-line
            var newConsole = (function (oldCons) {
                (global || window).nativeConsole = Object.assign({}, oldCons);
                return {
                    log: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this.log.apply(_this, args);
                    },
                    info: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this.info.apply(_this, args);
                    },
                    warn: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this.warn.apply(_this, args);
                    },
                    debug: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this.debug.apply(_this, args);
                    },
                    error: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this.error.apply(_this, args);
                    },
                    trace: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this.trace.apply(_this, args);
                    }
                };
            })((global || window).console);
            (global || window).console = newConsole;
        };
        /**
         * @name            _log
         * @type            Function
         * @private
         *
         * Internal log method that make the actual call to all the adapters, etc...
         *
         * @param         {Mixed}         ...args         The actual message(s) to log or the level wanted like "log", "warn", "info", "debug" or "error"
         * @return        {Promise}                             A promise that will be resolved once all the adapters have correctly log the message
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SLog.prototype._log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var adapters, level, messages, env, adaptersByEnvironment_1, adaptersLogStack;
                var _this_1 = this;
                return __generator(this, function (_a) {
                    adapters = null, level = 'log', messages = [];
                    args.forEach(function (v) {
                        if (typeof v === 'string') {
                            if (['log', 'warn', 'info', 'error', 'debug', 'trace'].indexOf(v) !== -1) {
                                level = v;
                                return;
                            }
                        }
                        messages.push(v);
                    });
                    messages = messages.filter(function (m) {
                        if (m === null || m === '')
                            return false;
                        if (typeof m === 'string' && m.trim() === '')
                            return false;
                        return true;
                    });
                    // process the adapters argument
                    if (adapters === null)
                        adapters = this._settings.adaptersByLevel[level];
                    if (adapters === null)
                        adapters = Object.keys(this._settings.adapters);
                    else if (typeof adapters === 'string')
                        adapters = adapters.split(',').map(function (a) { return a.trim(); });
                    env = env_1.default('env') || env_1.default('node_env') || 'production';
                    if (env) {
                        adaptersByEnvironment_1 = this._settings.adaptersByEnvironment[env];
                        if (adaptersByEnvironment_1 !== null &&
                            adaptersByEnvironment_1 !== undefined) {
                            if (typeof adaptersByEnvironment_1 === 'string')
                                adaptersByEnvironment_1 = adaptersByEnvironment_1
                                    .split(',')
                                    .map(function (a) { return a.trim(); });
                            adapters = adapters.filter(function (a) {
                                return adaptersByEnvironment_1.indexOf(a) !== -1;
                            });
                        }
                    }
                    if (!Array.isArray(adapters))
                        return [2 /*return*/];
                    adaptersLogStack = [];
                    // loop on all the adapters to log the message
                    adapters.forEach(function (adapterName) {
                        // check if the adapter exists
                        if (!_this_1._settings.adapters[adapterName])
                            return;
                        // loop on all messages to log
                        messages.forEach(function (message) {
                            // make the actual log call to this adapter and add it's result to the
                            // adaptersLogStack array
                            adaptersLogStack.push(_this_1._settings.adapters[adapterName].log(message, level));
                        });
                    });
                    // return the result of all the adapters promises
                    return [2 /*return*/, Promise.all(adaptersLogStack)];
                });
            });
        };
        /**
         * @name            log
         * @type            Function
         * @async
         *
         * The main log method that log a normal message
         *
         * @param           {Mixed}           ...args             The message(s) to log
         * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
         *
         * @example         js
         * await logger.log('Something cool');
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SLog.prototype.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // call the internal _log method and return his result
                    return [2 /*return*/, this._log.apply(this, args)];
                });
            });
        };
        /**
         * @name            info
         * @type            Function
         * @async
         *
         * The info method that log a message with the "info" level
         *
         * @param           {Mixed}           ...args             The message(s) to log
         * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
         *
         * @example         js
         * await logger.info('Something cool');
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SLog.prototype.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // call the internal _log method and return his result
                    return [2 /*return*/, this._log.apply(this, __spreadArrays(args, ['info']))];
                });
            });
        };
        /**
         * @name            warn
         * @type            Function
         * @async
         *
         * The warn method that log a message with the "warn" level
         *
         * @param           {Mixed}           ...args             The message(s) to log
         * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
         *
         * @example         js
         * await logger.warn('Something cool');
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SLog.prototype.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // call the internal _log method and return his result
                    return [2 /*return*/, this._log.apply(this, __spreadArrays(args, ['warn']))];
                });
            });
        };
        /**
         * @name            debug
         * @type            Function
         * @async
         *
         * The debug method that log a message with the "debug" level
         *
         * @param           {Mixed}           ...args             The message(s) to log
         * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
         *
         * @example         js
         * await logger.debug('Something cool');
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SLog.prototype.debug = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // call the internal _log method and return his result
                    return [2 /*return*/, this._log.apply(this, __spreadArrays(args, ['debug']))];
                });
            });
        };
        /**
         * @name            error
         * @type            Function
         * @async
         *
         * The error method that log a message with the "error" level
         *
         * @param           {Mixed}           ...args             The message(s) to log
         * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
         *
         * @example         js
         * await logger.error('Something cool');
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SLog.prototype.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // call the internal _log method and return his result
                    return [2 /*return*/, this._log.apply(this, __spreadArrays(args, ['error']))];
                });
            });
        };
        /**
         * @name            trace
         * @type            Function
         * @async
         *
         * The trace method that log a message with the "trace" level
         *
         * @param           {Mixed}           ...args             The message(s) to log
         * @return          {Promise}                             A promise that will be resolved once the message has been correctly logged through all adapters
         *
         * @example         js
         * await logger.trace('Something cool');
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SLog.prototype.trace = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // call the internal _log method and return his result
                    return [2 /*return*/, this._log.apply(this, __spreadArrays(args, ['trace']))];
                });
            });
        };
        return SLog;
    }());
});
