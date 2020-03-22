const __isPlainObject = require('is-plain-object');

/**
 * @name                      plainObject
 * @namespace                 sugar.node.is
 * @type                      Function
 * 
 * Check if the passed object (or array of objects) is/are plain object(s)
 * 
 * @param         {Object|Array}            object                  The object(s) to check
 * @return        {Boolean}                                         true if is plain object(s), false if not
 * 
 * @example           js
 * const isPlainObject = require('@coffeekraken/sugar/node/is/plainObject');
 * isPlainObject({ hello: 'world'}); // => true
 * 
 * @see       https://www.npmjs.com/package/is-plain-object
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function plainObject(object) {
  if (!Array.isArray(object)) object = [object];
  for (let i = 0; i < object.length; i++) {
    if (!__isPlainObject(object[i])) return false;
  }
  return true;
}