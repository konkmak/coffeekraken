const __existDeep = require('../../../dist/js/object/existDeep');


/**
 * @name                  getAppMeta
 * @namespace             sugar.node.app
 * @type                  Function
 *
 * Get the meta data defined using the 'setMeta' function
 *
 * @return            {Object}                              The meta data object setted
 *
 * @example           js
 * const getAppMeta = require('@coffeekraken/sugar/node/app/getAppMeta');
 * getAppMeta(); // => { name: 'My Cool App', version: '1.0.0' }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function getAppMeta() {
  if ( ! __existDeep('global.Sugar._app.metas')) return {};
  return Sugar._app.metas;
}
