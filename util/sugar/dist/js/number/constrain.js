"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = constrain;

/**
 * @name        constrain
 * @namespace       sugar.js.number
 * @type      Function
 *
 * Constrain a value between a min and a max value
 *
 * @param    {Number}    value    The value to constraint
 * @param    {Number}    [min=null]    The min value possible
 * @param    {Number}    [max=null]    The max value possible
 * @return    {Number}    The constrained value
 *
 * @example    js
 * import constrain from '@coffeekraken/sugar/js/numbers/constrain'
 * constrain(100, 0, 50) // 50
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function constrain(value, min = null, max = null) {
  if (min !== null && value < min) value = min;
  if (max !== null && value > max) value = max;
  return value;
}

module.exports = exports.default;