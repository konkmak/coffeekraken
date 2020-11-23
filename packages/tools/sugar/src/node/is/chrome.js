"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        isChrome
 * @namespace           sugar.js.is
 * @type      Function
 *
 * Detect if is chrome
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 *
 * @example 	js
 * import isChrome from '@coffeekraken/sugar/js/is/chrome'
 * if (isChrome()) {
 *   // do something cool
 * }
 *
 * @return    {Boolean}    true if is chrome, false if not
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isChrome(ua = navigator.userAgent) {
    return ua.indexOf('Chrome') > -1;
}
exports.default = isChrome;