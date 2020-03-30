const __deepMerge = require('../object/deepMerge');
const __tmpDir = require('../tmpDir');

/**
 * @name                                SCacheFsAdapter
 * @namespace                           sugar.node.fs.cacheAdapters
 * @type                                Class
 * 
 * A filesystem SCache adapter that allows you to store your cache items on the user system
 * 
 * @example             js
 * const cache = new SCache({
 *    ttl: 100,
 *    adapter: new SCacheFsAdapter({
 *      path: '/my/cool/folder
 *    })
 * });
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SCacheFsAdapter {

  /**
   * @name                              _settings
   * @type                              Object
   * @private
   * 
   * Store the default settings of the SCacheFsAdapter instance
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name                              constructor
   * @type                              Function
   * 
   * Construct the SCacheFsAdapter instance with the settings passed in object format. See description bellow.
   * 
   * @param         {Object}          [settings={}]             An object to configure the SCacheFsAdapter instance. This is specific to each adapters.settings.settings...
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(__deepMerge({
      path: `${__tmpDir()}/SCache`
    }, settings));
  }

  /**
   * @name                          set
   * @type                          Function
   * 
   * Set a cache item on the filesystem
   * 
   * @param             {String}              name              The item name
   * @param             {Mixed}               value             The value to save
   * @param             {Object}              [settings={}]     A settings object to override the default ones defined on the SCache instance
   * @return            {Object|Boolean}                        Return the objectToSave generated by the "this.processItem" method, or false if something goes wrong...
   * 
   * @example           js
   * await myCache.set('myCoolItem', { hello: 'world' }, {
   *    ttl: 40000
   * });
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async set(name, value, settings = {}) {
    // generate the object to save
    const objectToSave = this.processItem(name, value, settings);

    // return the object to save
    return objectToSave;
  }

}