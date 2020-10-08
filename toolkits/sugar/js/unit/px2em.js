"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = px2em;

/**
 * @name                    px2em
 * @namespace           sugar.js.unit
 * @type                    Function
 *
 * Convert rem value to a px one
 *
 * @param         {Number}          em           The rem value to convert
 * @param         {HTMLElement}     [$elm=document.documentElement]         The HTMLElement to take as source for calculating the em
 * @return        {Number}                        The pixel value
 *
 * @example         js
 * import px2em from '@coffeekraken/sugar/js/unit/px2em';
 * px2em(36);
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function px2em(px, $elm) {
  if ($elm === void 0) {
    $elm = document.documentElement;
  }

  return px / parseFloat(getComputedStyle($elm).fontSize || '16px');
}

module.exports = exports.default;