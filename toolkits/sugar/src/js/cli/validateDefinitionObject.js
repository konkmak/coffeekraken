import __validateDefinitionObject from '../object/validateDefinitionObject';
import __deepMerge from '../object/deepMerge';

/**
 * @name            validateDefinitionObject
 * @namespace           js.cli
 * @type            Function
 *
 * This function take a definition object as parameter and check if all is valid.
 *
 * @param       {Object}        definitionObj         The definition object to check
 * @param       {Object}        [settings={}]               A settings object to configure your validation process:
 * - bySteps (false) {Boolean}: Specify if you want to have issues back all at a time or each one after the other
 * @return      {Boolean|String}                             true if valid, a string with the error details if not
 *
 * @example       js
 * import validateDefinitionObject from '@coffeekraken/sugar/js/cli/validateDefinitionObject';
 * const definition = {
 *    arg1: {
 *      type: 'String',
 *      alias: 'a',
 *      description: 'Something cool',
 *      default: 'hello'
 *    }
 * }
 * validateDefinitionObject(definition); // => true
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function validateDefinitionObject(definitionObj, settings = {}) {
  settings = __deepMerge(
    {
      bySteps: false
    },
    settings
  );

  let issues = [];

  return __validateDefinitionObject(definitionObj, (argName, argDefinition) => {
    // check alias
    if (argDefinition.alias) {
      if (typeof argDefinition.alias !== 'string') {
        const msg = `The "alias" property of an argument definition object has to be a String. You've passed "${__toString(
          argDefinition.alias
        )}" which is a "${typeof argDefinition.alias}" for your argument "${argName}"...`;
        if (settings.bySteps) {
          return msg;
        }
        issues = [...issues, msg];
      }
      if (argDefinition.alias.length !== 1) {
        const msg = `The "alias" property of an argument definition object has to be a 1 letter String. You've passed "${argDefinition.alias}" for your argument "${argName}"...`;
        if (settings.bySteps) {
          return msg;
        }
        issues = [...issues, msg];
      }
    }
    // check description
    if (!argDefinition.description) {
      const msg = `The property "description" for your argument "${argName}" is missing...`;
      if (settings.bySteps) {
        return msg;
      }
      issues = [...issues, msg];
    }
    if (typeof argDefinition.description !== 'string') {
      const msg = `The property "description" of an argument definition object has to be a String. You've passed "${__toString(
        argDefinition.description
      )}" which is a "${typeof argDefinition.description}" for your argument "${argName}"...`;
      if (settings.bySteps) return msg;
      issues = [...issues, msg];
    }
    // check level
    if (argDefinition.level && typeof argDefinition.level !== 'number') {
      const msg = `The property "level" for your argument "${argName}" has to be a Number. You've passed "${__toString(
        argDefinition.level
      )}" which is a "${typeof argDefinition.level}"...`;
      if (settings.bySteps) return msg;
      issues = [...issues, msg];
    }

    if (!issues.length) return true;
    return issues;
  });
}
