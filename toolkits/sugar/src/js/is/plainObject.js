import __isPlainObject from 'is-plain-object';

/**
 * @name                      plainObject
 * @namespace           js.is
 * @type                      Function
 *
 * Check if the passed object (or array of objects) is/are plain object(s)
 *
 * @param         {Object|Array}            object                  The object(s) to check
 * @return        {Boolean}                                         true if is plain object(s), false if not
 *
 * @example           js
 * const isPlainObject = require('@coffeekraken/sugar/js/is/plainObject');
 * isPlainObject({ hello: 'world'}); // => true
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function plainObject(object) {
  if (!object) return false;
  if (typeof object !== 'object') return false;
  if (object.constructor && object.constructor.name !== 'Object') return false;
  if (Object.prototype.toString.call(object) !== '[object Object]')
    return false;
  if (object !== Object(object)) return false;
  if (object.constructor !== Object) return false;
  return true;
}