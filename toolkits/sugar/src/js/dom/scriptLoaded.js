import __SPromise from '../promise/SPromise';

/**
 * @name      scriptLoaded
 * @namespace           js.dom
 * @type      Function
 *
 * Detect when a script has been fully loaded
 *
 * @param    {HTMLScriptElement}    $script    The script element to detect the loading state
 * @return    {Promise}    The promise that will be resolved when the script is fully loaded
 *
 * @example    js
 * import scriptLoaded from '@coffeekraken/sugar/js/dom/scriptLoaded'
 * scriptLoaded($script).then(($script) => {
 *   // do something here
 * })
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function loadScript($script) {
  return new __SPromise((resolve, reject, trigger, cancel) => {
    let done = false;

    $script.onload = handleLoad;
    $script.onreadystatechange = handleReadyStateChange;
    $script.onerror = handleError;

    function handleLoad() {
      if (!done) {
        done = true;
        resolve($script);
      }
    }

    function handleReadyStateChange() {
      var state;
      if (!done) {
        state = $script.readyState;
        if (state === 'complete') {
          handleLoad();
        }
      }
    }
    function handleError(e) {
      if (!done) {
        done = true;
        reject(new Error(e));
      }
    }
  })
    .on('cancel,finally', () => {
      $script.onload = null;
      $script.onreadystatechange = null;
      $script.onerror = null;
    })
    .start();
}