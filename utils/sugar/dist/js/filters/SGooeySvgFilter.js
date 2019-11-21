"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SSvgFilter = _interopRequireDefault(require("./SSvgFilter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name 			SGooeySvgFilter
 * @extends 		SSvgFilter
 * This class represent a gooey SVG filter that can be applied on any HTMLElement.
 *
 * @example 		js
 * const filter = new SGooeySvgFilter();
 * filter.applyTo(myCoolHTMLElement);
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SGooeySvgFilter extends _SSvgFilter.default {
  /**
   * @constructor
   * @param 		{Number} 		amount 		The amount of effect to apply
   */
  constructor(amount = 8) {
    super("\n\t\t\t<feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"".concat(amount, "\" result=\"blur\" />\n\t\t\t<feColorMatrix in=\"blur\" mode=\"matrix\" values=\"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ").concat(parseInt(amount) + 9, " -9\" result=\"gooey\" />\n\t\t\t<feComposite in=\"SourceGraphic\" in2=\"gooey\" operator=\"atop\"/>\n\t\t"));
    this._blur = this.filter.querySelector("feGaussianBlur");
    this._color_matrix = this.filter.querySelector("feColorMatrix");
  }
  /**
   * The blur amount to produce the effect
   * @type 	{Number}
   */


  set blur(value) {
    this._blur.setAttribute("stdDeviation", value);
  }
  /**
   * The contrast amount to produce the effect
   * @type 	{Number}
   */


  set contrast(value) {
    // get value
    let v = this._color_matrix.getAttribute("values"); // process


    v = v.split(" ");
    v[v.length - 2] = value; // apply the new filter

    this._color_matrix.setAttribute("values", v.join(" "));
  }
  /**
   * The shrink amount to produce the effect
   * @type 	{Number}
   */


  set shrink(value) {
    // get value
    let v = this._color_matrix.getAttribute("values"); // process


    v = v.split(" ");
    v[v.length - 1] = value; // apply the new filter

    this._color_matrix.setAttribute("values", v.join(" "));
  }
  /**
   * The overall amount of effect to produce
   * @type 	{Number}
   */


  set amount(value) {
    this._blur.setAttribute("stdDeviation", value);

    this._color_matrix.setAttribute("values", "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ".concat(parseInt(value) + 9, " -9"));
  }

} // export modules


var _default = SGooeySvgFilter;
exports.default = _default;
module.exports = exports.default;