const __deepMerge = require('../object/deepMerge');
const __convert = require('../time/convert');
const __STimer = require('../time/STimer');
const __availableEasingsArray = require('../easing/availableEasingsArray');
const __SPromise = require('../promise/SPromise');

// TODO: tests

/**
 * @name              objectProperties
 * @namespace         sugar.node.transition
 * @type              Function
 *
 * This function take a start object and a target object and proceed to the transition of all properties
 * depending on the passed settings object that is documented bellow.
 *
 * @param       {Object}        startObj          The start object
 * @param       {Object}        targetObj         The target object
 * @param       {Object}        [settings={}]     An object of settings to configure your transition:
 * - duration (1s) {Number|String}: Specify the transition duration. Can be a number which will be treated as miliseconds, or a string like "1s", "10ms", "1m", etc...
 * - easing (easeInOutQuint) {String}: Specify the easing that you want to apply to your transition
 * - stepsCount (null) {Number}: Specify the number of steps that you want during your transition
 * - stepsInterval (null) {Number}: Specify the interval that you want between each steps in miliseconds
 * - round (true) {Boolean}: Specify if you want the returned transition object values to be rounded or not
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function objectProperties(startObj, targetObj, settings = {}) {
  return new __SPromise((resolve, reject, trigger, cancel) => {
    settings = __deepMerge(
      {
        duration: '1s',
        stepsCount: null,
        stepsInterval: null,
        easing: 'easeInOutQuint',
        round: true
      },
      settings
    );

    const availableEasingsArray = __availableEasingsArray();
    const duration = __convert(settings.duration, 'ms');
    let stepsCount = settings.stepsCount;
    let stepsInterval = settings.stepsInterval;

    // check the easing wanted
    if (availableEasingsArray.indexOf(settings.easing) === -1) {
      throw new Error(
        `You have specified "${
          settings.easing
        }" as easing for your transition object properties call but the available easings are "${availableEasingsArray.join(
          ','
        )}"...`
      );
    }

    // require the easing function
    const easingFn = require(`../easing/${settings.easing}`);

    // check if we have a steps passed, or calculate automatically
    if (!stepsCount && !stepsInterval) {
      stepsCount = Math.round(duration / 10); // step every 10ms
    } else if (!stepsCount && stepsInterval) {
      stepsCount = Math.round(duration / stepsInterval);
    }

    // build the start and target object that we will "transition"
    const startTransitionObj = {},
      targetTransitionObj = {};
    Object.keys(startObj).forEach((prop) => {
      if (
        typeof startObj[prop] === 'number' &&
        typeof targetObj[prop] === 'number'
      ) {
        startTransitionObj[prop] = startObj[prop];
        targetTransitionObj[prop] = targetObj[prop];
      }
    });

    const currentTransitionObj = {};
    const timer = new __STimer(settings.duration, {
      tickCount: stepsCount
    })
      .on('tick', () => {
        const returnedTransitionObj = {};
        // loop on each object properties
        Object.keys(startTransitionObj).forEach((prop) => {
          if (!currentTransitionObj[prop]) {
            currentTransitionObj[prop] = {
              startValue: startTransitionObj[prop],
              currentValue: startTransitionObj[prop],
              targetValue: targetTransitionObj[prop],
              valueDifference:
                targetTransitionObj[prop] - startTransitionObj[prop]
            };
          }
          const easingValue = easingFn((1 / 100) * timer.percentage);
          const currentEasedValue =
            currentTransitionObj[prop].valueDifference * easingValue;
          // const currentEasedValue =
          //   (currentTransitionObj[prop].valueDifference / 100) *
          //   timer.percentage *
          //   easingValue;
          let newValue =
            currentTransitionObj[prop].startValue + currentEasedValue;
          if (settings.round) newValue = Math.round(newValue);
          // save the current value
          currentTransitionObj[prop].currentValue = newValue;
          // set the property in the returned transition object
          returnedTransitionObj[prop] = newValue;
        });
        // trigger the "step" stack
        trigger('step', returnedTransitionObj);
      })
      .on('complete', () => {
        // resolve the transition
        resolve();
      })
      .on('cancel,finally', () => {
        // stop the timer
        timer.stop();
        // destroy the timer
        timer.destroy();
      })
      .start();
  }).start();
};