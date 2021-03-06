"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isIe;

/**
 * @name        isIe
 * @namespace       sugar.js.is
 * @type      Function
 *
 * Detect if is ie (internet explorer)
 *
 * @example 	js
 * import isIe from '@coffeekraken/sugar/js/is/ie'
 * if (isIe()) {
 *   // do something cool
 * }
 *
 * @return    {Boolean}    true if is ie, false if not
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isIe() {
  return navigator.userAgent.indexOf("MSIE") > -1;
}

module.exports = exports.default;