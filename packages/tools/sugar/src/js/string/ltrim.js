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
     * @name        ltrim
     * @namespace           sugar.js.string
     * @type      Function
     * @stable
     *
     * Trim left a specified string
     *
     * @param    {String}    string    The string to trim
     * @param    {String}    needle    The string to find an cut out if found
     * @param    {Boolean}  [trimResult=true]       If you want to trim the resulted ltrim
     * @return    {String}    The trimed string
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import ltrim from '@coffeekraken/sugar/js/string/ltrim'
     * ltrim('Hello World', 'Hello') // World
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function ltrim(string, needle, trimResult) {
        if (trimResult === void 0) { trimResult = true; }
        if (string.substr(0, needle.length) === needle) {
            return trimResult
                ? string.substr(needle.length).trim()
                : string.substr(needle.length);
        }
        // nothing to trim
        return string;
    }
    return ltrim;
});
