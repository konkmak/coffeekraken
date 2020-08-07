"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

/**
 * @name      easeInOutQuad
 * @namespace           js.easing
 * @type      Function
 *
 * Ease in out quad function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function _default(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

module.exports = exports.default;