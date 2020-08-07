import __parseArgs from './parseArgs';
import __completeArgsObject from './completeArgsObject';

/**
 * @name                  argsToObject
 * @namespace           js.cli
 * @type                  Function
 *
 * This function take a simple object, a definitionObj object and return you the string version that you can pass
 * directly to the command line interface
 *
 * @param       {Object|String}        argsObj        The arguments object or string
 * @param       {Object}             definitionObj    The definitionObj object
 * @param       {Object}            [settings]        The settings object to configure your conversion process:
 * - throw (true) {Boolean}: Specify if you want to throw an error when the validation process fails
 * @return      {Object}                              The final values object
 *
 * @example       js
 * import argsToObject from '@coffeekraken/sugar/js/cli/argsToObject';
 * argsToObject('-a Yop, {
 *    arg1: {
 *      type: 'String',
 *      alias: 'a',
 *      default: 'Plop'
 *    },
 *    myOtherArg: {
 *      type: 'String'
 *    },
 *    lastArg: {
 *      type: 'String',
 *      alias: 'l',
 *      default: 'Nelson'
 *    }
 * });
 * // => { arg1: 'Yop', lastArg: 'Nelson' }
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function argsToObject(argsObj, definitionObj, settings = {}) {
  if (typeof argsObj === 'string') {
    return __parseArgs(argsObj, definitionObj);
  }
  return __completeArgsObject(argsObj, definitionObj, settings);
};