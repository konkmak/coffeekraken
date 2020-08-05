import __upperFirst from '../string/upperFirst';

/**
 * @name              argumentTypeDefinitionString
 * @namespace           js.parse
 * @type              Function
 *
 * Thia function take an argument type definition string like "String", "Array<String>", "Array|String", etc... and return an object that represent this.
 *
 * @param       {String}        argTypeString         The argument type definition string
 * @return      {Object}                              The argument type definition string in object format
 *
 * @example       js
 * import argumentTypeDefinitionString from '@coffeekraken/sugar/js/parse/argumentTypeDefinitionString';
 * argumentTypeDefinitionString('Array'); // => [{ type: 'array', of: null }] }
 * argumentTypeDefinitionString('Array<String>'); // => [{ type: 'array', of: [{ type: 'string' }] }]
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function argumentTypeDefinitionString(argTypeString) {
  // split the string by |
  let inDepth = 0;
  let currentPart = '',
    typesArray = [];
  argTypeString.split('').forEach((character) => {
    if (character === '>') {
      if (inDepth <= 0) {
        throw new Error(
          `It seems that your argument type definition string "${argTypeString}" is invalid...`
        );
      }
      inDepth--;
      currentPart += character;
      return;
    }
    if (character === '<') {
      inDepth++;
      currentPart += character;
      return;
    }
    if (character === '|') {
      if (inDepth > 0) {
        currentPart += character;
        return;
      }
      typesArray.push(currentPart);
      currentPart = '';
      return;
    }
    currentPart += character;
  });
  typesArray.push(currentPart);

  // init the return array
  const returnArray = [];

  // loop on each types array
  typesArray.forEach((typeDefinitionString) => {
    // split the string by <
    const parts = typeDefinitionString.split('<');

    // get the "type"
    const type = __upperFirst(parts[0]);

    // process the "of" part if exist
    let ofArray = null;
    if (parts[1]) {
      const ofPart = parts[1].slice(0, -1);
      ofArray = argumentTypeDefinitionString(ofPart);
    }

    // build the type object and add it the the returnArray
    returnArray.push({
      type,
      of: ofArray
    });
  });

  return returnArray;
}
