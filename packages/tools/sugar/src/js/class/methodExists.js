// @ts-nocheck
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @name                                    methodExists
     * @namespace           sugar.js.class
     * @type                                    Function
     * @stable
     *
     * Check if one or more methods exists on a class instance
     *
     * @param           {Object}              instance                The instance to check the methods on
     * @param           {String}              ...methods              The methods to check
     * @return          {Boolean|Array}                               Return true if all is ok, and an array of missing methods if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example           js
     * class Coco {
     *    hello() {}
     * }
     * import methodExists from '@coffeekraken/sugar/node/class/methodExists';
     * const myInstance = new Coco();
     * methodExists(myInstance, 'hello', 'world'); // => ['world'];
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function methodExists(instance) {
        var methods = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            methods[_i - 1] = arguments[_i];
        }
        var missingMethodsArray = [];
        if (!Array.isArray(methods))
            methods = [methods];
        methods.forEach(function (method) {
            if (typeof instance[method] !== 'function')
                missingMethodsArray.push(method);
        });
        return !missingMethodsArray.length ? true : missingMethodsArray;
    }
    return methodExists;
});
