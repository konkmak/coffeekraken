"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setRecursiveTimeout;

/**
 * @name        setRecursiveTimeout
 * @namespace       sugar.js.function
 * @type      Function
 *
 * This utils function allows you to call a passed function each x time during a certain duration
 *
 * @param 		{Function} 		fn 				The function to execute
 * @param 		{Number} 		timeout 		The time between each execution
 * @param 		{Number} 		duration 		The duration of the timeout
 * @param 		{Number}		[spread=0] 		An optional spread time that will be used to randomize the function executions times
 * @return 		{Function} 		clearer 		A function that you can use to clear the timeout before it ends by itself
 *
 * @example 		js
 * import setRecursiveTimeout from '@coffeekraken/sugar/js/function/setRecursiveTimeout';
 * setRecursiveTimeout(() => {
 * 		// I will be executed 10 times
 * }, 1000, 10000);
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function setRecursiveTimeout(fn, timeout, duration, spread = 0) {
  let idx = 0;
  let currentDuration = 0;
  let timeoutFn = null;

  (function tick() {
    // call the function
    fn(idx); // update current duration

    currentDuration += timeout;
    idx++; // recursive call until end

    if (!duration || duration === -1 || currentDuration < duration) {
      const spreadValue = -spread + Math.round(Math.random(spread * 2));
      timeoutFn = setTimeout(tick, timeout + spreadValue);
    }
  })(); // return the clear function to be able to stop the timeout


  return function () {
    // clear the timeout
    clearTimeout(timeoutFn);
  };
}

module.exports = exports.default;