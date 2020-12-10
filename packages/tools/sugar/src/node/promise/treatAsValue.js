"use strict";
// @shared
/**
 * @name           treatAsValue
 * @namespace       sugar.js.promise
 * @type            Function
 * @beta
 *
 * This function allows you to wrap a promise in a ```resolve``` call to prevent
 * this promise to be treated as a "chaining" promise but to be treated as
 * normal value passed in the resolve call.
 *
 * @param           {Promise}          promise          The promise to treat as a simple value
 * @return          {ITreatAsValueProxy}                             A proxy of this promise that will act just like a normal promise once getted by the "await" statement
 *
 * @example         js
 * import treatAsValue from '@coffeekraken/sugar/js/promise/treatAsValue';
 * await new Promise(resolve => {
 *      const myPromise = new Promise(resolve => {});
 *      resolve(treatAsValue(myPromise));
 * }); // => myPromise
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
const fn = function treatAsValue(promise, settings = {}) {
    settings = Object.assign({ during: -1 }, settings);
    let during = settings.during || -1;
    const proxy = Proxy.revocable(promise, {
        get(target, prop, receiver) {
            if (prop === 'then') {
                return target;
            }
            if (during > 0)
                during--;
            else if (during === 0) {
                proxy.revoke();
            }
            // @ts-ignore
            return Reflect.get(...arguments);
        }
    });
    proxy.proxy.restorePromiseBehavior = () => {
        proxy.revoke();
        return promise;
    };
    return proxy.proxy;
};
module.exports = fn;
//# sourceMappingURL=module.js.map