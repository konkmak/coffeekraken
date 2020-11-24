// @ts-nocheck

import MobileDetect from 'mobile-detect';
/**
 * @name        isPhone
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Detect if is a phone device
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is a phone, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isPhone from '@coffeekraken/sugar/js/is/phone'
 * if (isPhone()) {
 *   // do something cool...
 * }
 *
 * @see       https://www.npmjs.com/package/mobile-detect
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isPhone(ua = navigator.userAgent) {
  const md = new MobileDetect(ua);
  return md.phone() !== null;
}
export = isPhone;