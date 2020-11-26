// @ts-nocheck
// @shared

/**
 * @name                                  parse
 * @namespace           sugar.js.string
 * @type                                  Function
 * @stable
 *
 * Parse a string and convert it into his native data type like date, number, boolean, etc...
 *
 * @param             {String}                        value                                 The value to convert
 * @return            {Mixed}                                                               The converted value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import parse from '@coffeekraken/sugar/js/string/parse';
 * parse('10'); // => 10
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = (value) => {
  if (typeof value !== 'string') return value;
  value = value.split('⠀').join('').trim();
  try {
    return Function(`
      "use strict";
      return (${value});
    `)();
  } catch (e) {
    return value;
  }
};
