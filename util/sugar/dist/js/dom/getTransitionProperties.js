"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTransitionProperties;

var _getStyleProperty = _interopRequireDefault(require("./getStyleProperty"));

var _autoCast = _interopRequireDefault(require("../string/autoCast"));

var _toMs = _interopRequireDefault(require("../string/toMs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      getTransitionProperties
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Get the css transition properties from an HTMLElement in an object format
 *
 * @param 		{HTMLElement} 					elm  		The element to get the properties from
 * @return 		{Object} 									The animation properties
 *
 * @example  	js
 * import getTransitionProperties from '@coffeekraken/sugar/js/dom/getTransitionProperties'
 * const props = getTransitionProperties(myCoolHTMLElement);
 * // output format
 * // {
 * // 	property : ['all'],
 * // 	duration : [200],
 * // 	delay : [0],
 * // 	timingFunction : ['linear'],
 * // 	totalDuration : 200
 * // }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function splitIfNeeded(what, separator) {
  if (what.indexOf(separator) !== -1) {
    return what.split(separator).map(item => item.trim());
  }

  return [what];
}

function getTransitionProperties(elm) {
  // get the transition properties
  const property = (0, _getStyleProperty.default)(elm, "transition-property");
  const duration = (0, _getStyleProperty.default)(elm, "transition-duration") || 0;
  const timingFunction = (0, _getStyleProperty.default)(elm, "transition-timing-function");
  const delay = (0, _getStyleProperty.default)(elm, "transition-delay"); // return the transition object

  const props = {
    property: splitIfNeeded(property, ","),
    duration: splitIfNeeded(duration, ",").map(value => (0, _toMs.default)(value)),
    delay: splitIfNeeded(delay, ",").map(value => (0, _toMs.default)(value)),
    timingFunction: splitIfNeeded(timingFunction, ",")
  };
  let totalDuration = 0;
  let i = 0;
  const delays = [0].concat(props.delay);
  [0].concat(props.duration).forEach(val => {
    if (val + delays[i] > totalDuration) {
      totalDuration = val + delays[i];
    }

    i++;
  });
  props.totalDuration = totalDuration;
  return props;
}

module.exports = exports.default;