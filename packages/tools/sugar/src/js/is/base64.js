// @ts-nocheck
// @shared
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
     * @name        isBase64
     * @namespace           sugar.js.is
     * @type      Function
     * @stable
     *
     * Check if the passed value is a base 64 string
     *
     * @param    {Mixed}    value    The value to check
     * @return   {Boolean}   true if it's a Boolean, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import isBase64 from '@coffeekraken/sugar/js/is/base64'
     * if (isBase64(true) {
     *   // do something
     * }
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isBase64(value) {
        if (typeof value !== 'string')
            return false;
        if (value === '' || value.trim() === '')
            return false;
        var reg = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        return reg.test(value);
    }
    return isBase64;
});
//# sourceMappingURL=base64.js.map