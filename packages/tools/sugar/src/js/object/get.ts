// @ts-nocheck

/**
 * @name                          get
 * @namespace           sugar.js.object
 * @type                          Function
 * @stable
 *
 * Retreive an object value using a dotted path like "myObject.myProperty.myValue"
 *
 * @param               {Object}                 obj                The object in which to set the value
 * @param               {String}                path                The dotted object path to get
 * @return              {Mixed}                                     The getted value or "undefined" if nothing found...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import get from '@coffeekraken/sugar/js/object/get';
 * get('myObject.cool.value'); // => 'Hello world'
 *
 * @since     2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = (obj, path) => {
  if (obj[path] !== undefined) return obj[path];
  if (!path || path === '' || path === '.') return obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');
  const a = path.split('.');
  let o = obj;
  while (a.length) {
    const n = a.shift();
    if (typeof o !== 'object') return;
    if (!(n in o)) return;
    o = o[n];
  }
  return o;
};
