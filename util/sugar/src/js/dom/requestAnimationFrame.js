/**
 * @name      requestAnimationFrame
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Proxy for the window.requestAnimationFrame function
 *
 * @param       {Function}      cb          The function to call when it's time to update your animation for the next repaint
 * @return      {Integer}                   A long integer value, the request id, that uniquely identifies the entry in the callback list
 *
 * @example     js
 * @import requestAnimationFrame from '@coffeekraken/sugar/js/dom/requestAnimationFrame';
 * requestAnimationFrame(function() {
 *    // do something...
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame;
