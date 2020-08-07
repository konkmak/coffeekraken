"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBrowser;

/**
 * @name        isBrowser
 * @namespace           js.is
 * @type      Function
 *
 * Check if the script is running inside a browser or not
 *
 * @return   {Boolean}   true if it's in a browser, false if not
 *
 * @example    js
 * import isBrowser from '@coffeekraken/sugar/js/is/browser'
 * if (isBrowser() {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isBrowser(value) {
  return typeof window !== 'undefined';
}

module.exports = exports.default;