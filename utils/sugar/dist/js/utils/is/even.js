"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEven;

/**
 * Check if a number is even or not
 * @param    {Number}    value    The value to check
 * @return    {Boolean}    true if even, false if not
 *
 * @example    js
 * import isEven from 'coffeekraken-sugar/js/utils/is/even'
 * isEven(1) // false
 * isEven(2) // true
 */
function isEven(value) {
  return value % 2 === 0;
}

module.exports = exports.default;