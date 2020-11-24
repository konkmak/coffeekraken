// @ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
        define(["require", "exports", "../class/getExtendsStack", "../cli/argsToObject", "../error/SError", "../is/class", "../object/deepMerge", "../string/trimLines", "../validation/object/validateObject", "../validation/object/validateObjectOutputString", "../value/typeof", "../object/set"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _a;
    var getExtendsStack_2 = __importDefault(require("../class/getExtendsStack"));
    var argsToObject_2 = __importDefault(require("../cli/argsToObject"));
    var SError_2 = __importDefault(require("../error/SError"));
    var class_2 = __importDefault(require("../is/class"));
    var deepMerge_2 = __importDefault(require("../object/deepMerge"));
    var trimLines_2 = __importDefault(require("../string/trimLines"));
    var validateObject_2 = __importDefault(require("../validation/object/validateObject"));
    var validateObjectOutputString_2 = __importDefault(require("../validation/object/validateObjectOutputString"));
    var typeof_2 = __importDefault(require("../value/typeof"));
    var set_2 = __importDefault(require("../object/set"));
    return (_a = /** @class */ (function () {
            function SInterface() {
            }
            /**
             * @name              apply
             * @type              Function
             * @static
             *
             * This static method allows you to apply the interface on an object instance.
             * By default, if something is wrong in your class implementation, an error with the
             * description of what's wrong will be thrown. You can change that behavior if you prefer having
             * true returned when all is ok, or a string describing the current issue by specify the "settings.throw" property to false.
             *
             * @param       {Object}                instance              The instance to apply the interface on
             * @param       {Object}               [settings={}]         An object of settings to configure your apply process
             * - throw (false) {Boolean}: Specify if you want that an error is throwned if the test does not pass
             * - return (String) {String}: Specify in which return you want the result back. Can be "String" of "Object".
             * @return      {Boolean|String}                              true if all is ok, a string describing the issue if not...
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            SInterface.apply = function (instance, settings) {
                var _this = this;
                if (settings === void 0) { settings = {}; }
                settings = deepMerge_2.default(this.settings, settings);
                // name
                if (!settings.name) {
                    settings.name = instance.constructor.name || instance.name;
                }
                var instanceType = typeof_2.default(instance, {
                    customClass: false
                });
                if (instanceType !== 'Object' && instanceType !== 'Class') {
                    throw new SError_2.default("Sorry but the \"<yellow>instance</yellow>\" argument of the \"<cyan>SInterface.apply</cyan>\" static method have to be an <green>Object</green> and you've passed an <red>" + typeof_2.default(instance) + "</red>...");
                }
                var issueObj = {
                    $issues: []
                };
                var implementationValidationResult;
                var extendsStack = getExtendsStack_2.default(instance);
                // check if the passed instance base class already implements this insterface
                if (instance.constructor.__interfaces &&
                    Array.isArray(instance.constructor.__interfaces)) {
                    if (instance.constructor.__interfaces.indexOf(this) !== -1)
                        return true;
                }
                else if (instance.__interfaces && Array.isArray(instance.__interfaces)) {
                    if (instance.__interfaces.indexOf(this) !== -1)
                        return true;
                }
                // extends array
                if (this.extendsArray && Array.isArray(this.extendsArray)) {
                    this.extendsArray.forEach(function (cls) {
                        if (extendsStack.indexOf(cls) === -1) {
                            setTimeout(function () {
                                throw new SError_2.default("Your class|instance \"<yellow>" + (instance.name || instance.constructor.name) + "</yellow>\" that implements the \"<cyan>" + _this.name + "</cyan>\" interface has to extend the \"<green>" + cls + "</green>\" class...");
                            });
                        }
                    });
                }
                // implements array
                if (this.implementsArray && Array.isArray(this.implementsArray)) {
                    this.implements(instance, this.implementsArray, settings);
                }
                // definition object
                if (this.definitionObj) {
                    implementationValidationResult = validateObject_2.default(instance, this.definitionObj, {
                        throw: false,
                        name: settings.name,
                        interface: settings.interface
                    });
                    if (implementationValidationResult !== true) {
                        issueObj = deepMerge_2.default(issueObj, implementationValidationResult, {
                            array: true
                        });
                    }
                }
                if (!issueObj.$issues.length) {
                    // save on the instance and the constructor that we implements this interface correctly
                    if (!instance.__interfaces) {
                        Object.defineProperty(instance, '__interfaces', {
                            enumerable: false,
                            writable: true,
                            value: [this]
                        });
                    }
                    else if (Array.isArray(instance.__interfaces)) {
                        instance.__interfaces.push(this);
                    }
                    if (!instance.constructor.__interfaces) {
                        Object.defineProperty(instance.constructor, '__interfaces', {
                            enumerable: false,
                            writable: true,
                            value: [this]
                        });
                    }
                    else if (Array.isArray(instance.constructor.__interfaces)) {
                        instance.constructor.__interfaces.push(this);
                    }
                    return true;
                }
                if (settings.throw) {
                    throw new SError_2.default(this.outputString(issueObj, settings));
                }
                switch (settings.return.toLowerCase()) {
                    case 'object':
                        return issueObj;
                    case 'string':
                    default:
                        return SInterface.outputString(issueObj, settings);
                }
            };
            /**
             * @name          getDefaultValues
             * @type          Function
             * @static
             *
             * This static method allows you to get the default values object
             * that this interface represent
             *
             * @return      {Object}        An object of all default values represented by this interface
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            SInterface.getDefaultValues = function () {
                return this.applyAndComplete({});
            };
            /**
             * @name          applyAndThrow
             * @type          Function
             * @static
             *
             * This static method do the exact same as the ```apply``` one but will throw an error if something is wrong...
             *
             * @param       {Object}                instance              The instance to apply the interface on
             * @return      {Boolean}                                     Return true is all is ok. Throw an error otherwise
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            SInterface.applyAndThrow = function (instance, settings) {
                if (settings === void 0) { settings = {}; }
                var apply = SInterface.apply.bind(this);
                return apply(instance, __assign(__assign({}, settings), { throw: true }));
            };
            /**
             * @name          applyAndComplete
             * @type          Function
             * @static
             *
             * This static method allows you to complete the passed data object and apply the interface
             * directly. If something goes wrong, it will throw an error, otherwise, return the
             * completed object
             *
             * @param       {Object}      object        The object on which to apply the interface and to complete
             * @param       {Object}      [settings={}]     An object of settings to configure your process
             * - duplicate (false) {Boolean}: Specify if you want to get back a new object or the passed one completed
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            SInterface.applyAndComplete = function (object, settings) {
                if (settings === void 0) { settings = {}; }
                settings = deepMerge_2.default({
                    duplicate: false
                }, settings);
                var completedObject = this.complete(object, settings);
                this.applyAndThrow(completedObject, settings);
                return completedObject;
            };
            /**
             * @name          implements
             * @type          Function
             * @static
             *
             * This static method allows you to tell that a particular instance of a class implements
             * one or more interfaces. This allows you after to specify the property "implements" with an array
             * of SInterface classes that you want your property to implements
             *
             * @param         {SInterface}          ...interfaces           The interfaces you want to implements
             *
             * @since         2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            SInterface.implements = function (instance, interfaces, settings) {
                if (interfaces === void 0) { interfaces = null; }
                if (settings === void 0) { settings = {}; }
                if (interfaces === null)
                    interfaces = [this];
                if (!Array.isArray(interfaces))
                    interfaces = [interfaces];
                if (class_2.default(instance)) {
                    // return instance;
                    var SInterfaceImplementsMiddleClass = /** @class */ (function (_super) {
                        __extends(SInterfaceImplementsMiddleClass, _super);
                        function SInterfaceImplementsMiddleClass() {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            var _this = _super.apply(this, args) || this;
                            SInterface.implements(_this, interfaces, settings);
                            return _this;
                        }
                        return SInterfaceImplementsMiddleClass;
                    }(instance));
                    Object.defineProperty(SInterfaceImplementsMiddleClass, 'name', {
                        value: instance.name
                    });
                    // if (settings.applyOnStatic) {
                    //   const staticFns = Object.getOwnPropertyNames(instance).filter(
                    //     (prop) => typeof instance[prop] === 'function'
                    //   );
                    //   staticFns.forEach((fnName) => {
                    //     SInterfaceImplementsMiddleClass[fnName] = function (...args) {
                    //       interfaces.forEach((Interface) => {
                    //         Interface.apply(SInterfaceImplementsMiddleClass, {
                    //           ...settings,
                    //           interface: Interface.name
                    //         });
                    //       });
                    //       return instance[fnName](...args);
                    //     };
                    //   });
                    // }
                    return SInterfaceImplementsMiddleClass;
                }
                // make sure the instance has all the interfaces requirements
                interfaces.forEach(function (Interface) {
                    Interface.apply(instance, __assign(__assign({}, settings), { interface: Interface.name }));
                });
            };
            /**
             * @name          complete
             * @type          Function
             * @static
             *
             * This static method allows you to pass an object to complete with the "default" values
             * of the definition object if needed
             *
             * @param         {Object}            data              The data object to complete
             * @return        {Object}                              The completed data object
             *
             * @since         2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            SInterface.complete = function (data, settings) {
                var _this = this;
                if (settings === void 0) { settings = {}; }
                settings = deepMerge_2.default({
                    duplicate: false
                }, settings);
                var argsObj = data;
                if (settings.duplicate) {
                    argsObj = Object.assign({}, data);
                }
                // loop on all the arguments
                Object.keys(this.definitionObj).forEach(function (argString) {
                    var argDefinitionObj = _this.definitionObj[argString];
                    // check if we have an argument passed in the properties
                    if (argsObj[argString] === undefined &&
                        argDefinitionObj.default !== undefined) {
                        set_2.default(argsObj, argString, argDefinitionObj.default);
                    }
                });
                return argsObj;
            };
            /**
             * @name          outputString
             * @type          Function
             * @static
             *
             * This static method allows you to get the ```apply``` result
             * in a readable way.
             *
             * @param         {Object}               resultObj               The resulting object coming from the ```apply``` method
             * @return        {String}                                    The string version of the result
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            SInterface.outputString = function (resultObj, settings) {
                if (settings === void 0) { settings = {}; }
                var headerString = this._outputHeaderString(settings);
                var string = validateObjectOutputString_2.default(resultObj, settings);
                return trimLines_2.default("" + headerString + string);
            };
            /**
             * @name          output
             * @type          Function
             * @static
             *
             * This static method allows you to console.log the ```apply``` result
             * in a readable way.
             *
             * @param         {Object}               resultObj               The resulting object coming from the ```apply``` method
             * @return        {String}                                    The string version of the result
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            SInterface.output = function (resultObj, settings) {
                if (settings === void 0) { settings = {}; }
                var string = this.outputString(resultObj, settings);
                console.log(string);
            };
            /**
             * @name                _outputHeaderString
             * @type                Function
             * @private
             *
             * This method simply generate the output header depending on the passed settings like:
             * - title: The title you want to display
             * - description: A description to explain a little bit more the issue
             *
             * @since           2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            SInterface._outputHeaderString = function (settings) {
                if (settings === void 0) { settings = {}; }
                var array = [];
                if (settings.title) {
                    array.push("<red><underline>" + settings.title + "</underline></red>");
                    array.push(' ');
                }
                if (settings.description) {
                    array.push("" + settings.description);
                    array.push(' ');
                }
                return array.join('\n');
            };
            /**
             * @name                parse
             * @type                Function
             * @static
             *
             * This method take a string like "-v 'something' --temp" and convert it into an object of arguments
             * depending on the definition object of this interface
             *
             * @param       {String}            string            The string to parse
             * @return      {Object}                              The object of arguments values
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            SInterface.parse = function (string) {
                var args = argsToObject_2.default(string, this.definitionObj);
                return args;
            };
            /**
             * @name                parseAndComplete
             * @type                Function
             * @static
             *
             * This method take a string like "-v 'something' --temp" and convert it into an object of arguments
             * depending on the definition object of this interface.
             * It will also complete the data object obtained with the "default" values if needed
             *
             * @param       {String}            string            The string to parse
             * @return      {Object}                              The object of arguments values
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            SInterface.parseAndComplete = function (string) {
                var args = argsToObject_2.default(string, this.definitionObj);
                args = this.complete(args);
                return args;
            };
            /**
             * @name          extends
             * @type          Function
             * @static
             *
             * This static method allows you to start from this particular interface and to extends it
             * by passing an object containing these properties:
             * - definitionObj ({}) {Object}: An object to extends the static definitionObj one
             * - settings ({}) {Object}: An object of settings to extends the static settings one
             * @param     {Object}      extendsObj      An object to extends the static ones of the duplicated interface
             * @return    {SInterface}                  A new SInterface class based on the extended one
             *
             * @since     2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            SInterface.extends = function (extendsObj) {
                var ExtendedInterface = /** @class */ (function (_super) {
                    __extends(ExtendedInterface, _super);
                    function ExtendedInterface() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return ExtendedInterface;
                }(this));
                ExtendedInterface.definitionObj = deepMerge_2.default(ExtendedInterface.definitionObj, extendsObj.definitionObj || {});
                ExtendedInterface.settings = deepMerge_2.default(ExtendedInterface.settings, extendsObj.settings || {});
                return ExtendedInterface;
            };
            return SInterface;
        }()),
        /**
         * @name              settings
         * @type              Object
         * @static
         *
         * Store the default settings that will be passed to the ```apply``` function
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        _a.settings = {
            throw: true,
            return: 'String'
        },
        _a);
});
