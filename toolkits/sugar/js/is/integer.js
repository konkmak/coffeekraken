"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInteger;

/**
 * @name        isInteger
 * @namespace           js.is
 * @type      Function
 *
 * Check if the passed value is an integer
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @example 	js
 * import isInteger from '@coffeekraken/sugar/js/is/integer';
 * isInteger(10) => true
 * isInteger('hello') => false
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isInteger(data) {
  return !isNaN(data) && function (x) {
    return (x | 0) === x;
  }(parseFloat(data));
}

module.exports = exports.default;