"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = circleConstrain;

var _distanceBetween = _interopRequireDefault(require("./distanceBetween"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Take as parameter a central point, a radius and a points to constrain inside the circle defined by the radius
 * @param    {Vector2}    center    The center point of the circle
 * @param    {Number}    radius    The radius to constrain the point in
 * @param    {Vector2}    point    The point to constrain
 * @return    {Vector2}    The new constrained value for the point
 *
 * @example    js
 * import circleConstrain from 'coffeekraken-sugar/js/geom/2d/circleConstrain'
 * circleConstrain({
 * 	x: 10, y: 10
 * }, 10, {
 * 	x: 10, y: 5
 * })
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://stackoverflow.com/questions/8515900/how-to-constrain-movement-within-the-area-of-a-circle
 */
function circleConstrain(center, radius, point) {
  var dist = (0, _distanceBetween.default)(center, point);

  if (dist <= radius) {
    return point;
  } else {
    const x = point.x - center.x;
    const y = point.y - center.y;
    var radians = Math.atan2(y, x);
    return {
      x: Math.cos(radians) * radius + center.x,
      y: Math.sin(radians) * radius + center.y
    };
  }
}

module.exports = exports.default;