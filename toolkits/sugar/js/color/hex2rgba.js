"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hex2rgba;

/**
 * @name                  hex2rgba
 * @namespace           sugar.js.color
 * @type                  Function
 *
 * Hex to RGBA
 *
 * @param	              {string}       	hex         		The hex string to convert
 * @return            	{object} 			                  	The rgba object representation
 *
 * @example         js
 * import hex2rgba from '@coffeekraken/sugar/js/color/hex2rgba';
 * hex2rgba('#ff00ff');
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function hex2rgba(hex) {
  hex = hex.replace('#', '');
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);
  var a = 1;

  if (hex.length == 8) {
    a = 1 / 255 * parseInt(hex.substring(6, 8), 16);
  }

  return {
    r: r,
    g: g,
    b: b,
    a: a
  };
}

module.exports = exports.default;