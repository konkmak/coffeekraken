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
     * @name        isNumber
     * @namespace           sugar.js.is
     * @type      Function
     * @stable
     *
     * Check if the passed value is a number
     *
     * @param 		{Mixed} 		value 		The value to check
     * @return 		{Boolean} 					The check result
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import isNumber from '@coffeekraken/sugar/js/is/number';
     * isNumber(12) => true
     * isNumber(22.3) => true
     * isNumber('20') => false
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isNumber(source) {
        return !isNaN(parseFloat(source)) && isFinite(source);
    }
    return isNumber;
});
