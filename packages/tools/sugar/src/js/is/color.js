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
     * @name        isColor
     * @namespace           sugar.js.is
     * @type      Function
     * @stable
     *
     * Check if the passed value is a color
     *
     * @param 		{Mixed} 		value 		The value to check
     * @return 		{Boolean} 					The check result
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import isColor from '@coffeekraken/sugar/js/is/color';
     * isColor('red') => true
     * isColor('#fff') => true
     * isColor('hello') => false
     *
     * @see 		http://stackoverflow.com/questions/6386090/validating-css-color-names
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isColor(value) {
        var ele = document.createElement('div');
        ele.style.color = value;
        return ele.style.color.split(/\s+/).join('').toLowerCase() !== '';
    }
    return isColor;
});
