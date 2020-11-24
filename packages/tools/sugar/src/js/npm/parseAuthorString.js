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
     * @name            parseAuthorString
     * @namespace       sugar.js.npm
     * @type            Function
     * @stable
     *
     * This function simply take an author string like "Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)" and
     * transform it into a plain object with these properties: name, email and url
     *
     * @param       {String}          string          The string to parse
     * @return      {Object}                          The plain object version of the string
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import parseAuthorString from '@coffeekraken/sugar/js/npm/parseAuthorString';
     * parseAuthorString("Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)")
     * // => {
     *   "name": "Olivier Bossel",
     *   "email": "olivier.bossel@gmail.com",
     *   "url": "https://olivierbossel.com"
     * }
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function parseAuthorString(string) {
        var reg = /(.*)\s?<(.*)>\s?\((.*)\)/gm;
        var matches = reg.exec(string.trim());
        var authorObj = {};
        if (matches) {
            if (matches[1]) {
                authorObj.name = matches[1].trim();
            }
            if (matches[2]) {
                authorObj.email = matches[2].trim();
            }
            if (matches[3]) {
                authorObj.url = matches[3].trim();
            }
        }
        return authorObj;
    }
    return parseAuthorString;
});
