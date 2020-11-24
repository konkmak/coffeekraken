// @ts-nocheck
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
        define(["require", "exports", "../../error/SValueValidationError", "../../object/deepMerge", "../../value/typeof", "./validation/SRequiredValidation", "./validation/SPathValidation", "./validation/STypeValidation", "./validation/SValuesValidation"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SValueValidationError_1 = __importDefault(require("../../error/SValueValidationError"));
    var deepMerge_2 = __importDefault(require("../../object/deepMerge"));
    var typeof_2 = __importDefault(require("../../value/typeof"));
    var SRequiredValidation_1 = __importDefault(require("./validation/SRequiredValidation"));
    var SPathValidation_1 = __importDefault(require("./validation/SPathValidation"));
    var STypeValidation_1 = __importDefault(require("./validation/STypeValidation"));
    var SValuesValidation_1 = __importDefault(require("./validation/SValuesValidation"));
    var _validationsObj = {
        required: {
            class: SRequiredValidation_1.default,
            args: []
        },
        path: {
            class: SPathValidation_1.default,
            args: ['%definitionObj.path.exists']
        },
        type: {
            class: STypeValidation_1.default,
            args: ['%definitionObj.type']
        },
        values: {
            class: SValuesValidation_1.default,
            args: ['%definitionObj.values']
        }
    };
    /**
     * @name          validateValue
     * @namespace     sugar.js.validation.value
     * @type          Function
     * @wip
     *
     * This function take a value and check if it correspond to the passed definition object.
     * If the value pass the test, the function will return true, otherwise it will return
     * a string that describe the issue.
     *
     * @param         {Mixed}       value       The value to check
     * @param         {Object}      definitionObj     THe definition object
     * @param       {Object}        [settings={}]         An object of settings to configure your validation process:
     * - throw (true) {Boolean}: Specify if you want to throw an error when something goes wrong
     * - name ('unnamed') {String}: Specify a name. Useful for debugging
     * - extendFn (null) {Function}: Specify a function that will be called after the default validations checks and before the return or throw statements. It will have as arguments the "value" to check, the "definitionObj" and the "settings" object. You then can make your checks and return an array of "issues" like ["path","other"], etc...
     * @return         {Boolean|Object}           true if the check is passed, an Array of String describing the issue if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import validateValue from '@coffeekraken/sugar/js/validation/value/validateValue';
     * validateValue(true, {
     *    type: 'Boolean|String',
     *    required: true
     * }); // => true
     *
     * @todo      tests
     *
     * @since     2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function validateValue(value, definitionObj, settings) {
        if (settings === void 0) { settings = {}; }
        settings = deepMerge_2.default({
            name: 'unnamed',
            throw: true,
            extendFn: null,
            validationsObj: _validationsObj
        }, settings);
        if ((value === null || value === undefined) &&
            definitionObj.default !== undefined) {
            value = definitionObj.default;
        }
        if (value === null || (value === undefined && !definitionObj.required)) {
            return true;
        }
        var issueObj = {
            $expected: definitionObj,
            $received: {
                type: typeof_2.default(value),
                value: value
            },
            $name: settings.name,
            $issues: [],
            $messages: {}
        };
        Object.keys(settings.validationsObj).forEach(function (validationName, i) {
            var _a;
            if (!_validationsObj[validationName]) {
                issueObj.$issues.push("definitionObj." + validationName + ".unknown");
                issueObj.$messages["definitionObj." + validationName + ".unknown"] = "The specified \"<yellow>" + validationName + "</yellow>\" validation is <red>not supported</red>";
            }
            if (!definitionObj[validationName])
                return;
            var validationObj = Object.assign({}, settings.validationsObj[validationName]);
            validationObj.args = validationObj.args.map(function (arg) {
                if (typeof arg === 'string' && arg.slice(0, 15) === '%definitionObj.') {
                    arg = definitionObj[arg.replace('%definitionObj.', '')];
                }
                return arg;
            });
            var validationResult = (_a = validationObj.class).apply.apply(_a, __spreadArrays([value], validationObj.args));
            if (validationResult !== true) {
                issueObj.$issues.push(validationName);
                issueObj.$messages[validationName] = validationResult;
            }
        });
        if (settings.extendFn && typeof settings.extendFn === 'function') {
            var additionalIssues = settings.extendFn(value, definitionObj, settings) || [];
            issueObj.$issues = __spreadArrays(issueObj.$issues, (additionalIssues.$issues || []));
            issueObj.$messages = __spreadArrays(issueObj.$messages, (additionalIssues.$messages || []));
        }
        if (!issueObj.$issues.length)
            return true;
        if (settings.throw) {
            throw new SValueValidationError_1.default(issueObj);
        }
        return issueObj;
    }
    return validateValue;
});
