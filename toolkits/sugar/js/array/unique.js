"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unique;

/**
 * @name              unique
 * @namespace           sugar.js.array
 * @type                  Function
 *
 * This function simply take an array as parameter and return a new one
 * with all the duplicates values removed.
 *
 * @param         {Array}         array               The array to deduplicates
 * @return        {Array}                             The deduplicated array
 *
 * @example         js
 * import unique from '@coffeekraken/sugar/js/array/unique';
 * unique(['hello','world','hello','world']); // => ['hello','world']
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function unique(array) {
  var a = array.concat();

  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  return a;
}

module.exports = exports.default;