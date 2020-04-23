"use strict";

const __diff = require('deep-diff').diff;

const __set = require('../../../node/object/set');

const __get = require('../../../node/object/get');
/**
 * @name                            deepDiff
 * @namespace                       sugar.node.object
 * @type                            Function
 * 
 * Take two objects and return an object that contains only the differences between them
 * 
 * @param           {Object}              origin              The original object to compare
 * @param           {Object}              compare             The object to compare to the original one
 * @return          {Object}                                  An object that contains only the differences between the two objects
 * 
 * @example           js
 * const deepDiff = require('@coffeekraken/sugar/node/object/deepDiff');
 * const origin = { hello: 'world', plop: 'yop' };
 * const compare = { hello: 'world' };
 * deepDiff(origin, compare); // => { plop: 'yop' }
 * 
 * @see     https://www.npmjs.com/package/deep-diff
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function deepDiff(origin, compare) {
  const finalObject = {}; // const diffs = __diff(origin, compare, (path, key) => {
  //   const p = path.length ? path.join('.') + '.' + key : key;
  //   const value = __get(origin, p);
  //   console.log(p, value);
  //   return value !== undefined || !Array.isArray(value);
  // });

  const diffs = __diff(origin, compare);

  console.log(diffs);
  diffs.forEach(diff => {
    switch (diff.kind) {
      case 'D':
        break;

      case 'E':
        break;

      case 'N':
        __set(finalObject, diff.path.join('.'), diff.rhs);

        break;
    }
  });
  return finalObject;
};