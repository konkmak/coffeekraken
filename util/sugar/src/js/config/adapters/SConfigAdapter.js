import __deepMerge from '../../object/deepMerge';

/**
 * @name                                SConfigAdapter
 * @namespace                           sugar.js.config.adapters
 * @type                                Class
 * 
 * Base class for SCache adapters
 * 
 * @example             js
 * class SConfigCoolAdapter extends SConfigAdapter {
 *    constructor(settings = {}) {
 *      super(settings);
 *      // settings are accessible through this._settings
 *    }
 *    async load() {
 *      // load the config the way you want and return it in Object format
 *      return {};
 *    }
 *    async save(newConfig) {
 *      // save the newConfig object the way you want and return true when all it ok
 *      return true;
 *    }
 * }
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SConfigAdapter {

  /**
   * @name                              _settings
   * @type                              Object
   * @private
   * 
   * Store the default settings of the SConfigAdapter instance
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name                              constructor
   * @type                              Function
   * 
   * Construct the SConfigAdapter instance with the settings passed in object format. See description bellow.
   * 
   * @param         {Object}          [settings={}]             An object to configure the SConfigAdapter instance. This is specific to each adapters.settings.settings...
   * - name (null) {String}: Specify a simple name for this adapter instance. This name will be used to save the configs, etc...
   * - ...others: All the settings you need for your specific adapter
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    if (settings.name && !/^[a-zA-Z0-9_\-:]+$/.test(settings.name)) {
      throw new Error(`The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...`);
    }
    // store the settings
    this._settings = settings;
  }

  /**
   * @name                  name
   * @type                  String
   * @get
   * 
   * Access the adapter setted name
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get name() {
    return this._settings.name;
  }
  set name(value) {
    if (!/^[a-zA-Z0-9_\-:]+$/.test(value)) {
      throw new Error(`The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...`);
    }
    this._settings.name = value;
  }

  /**
   * @name                  settings
   * @type                  Object
   * @get
   * 
   * Access the adapter setted settings
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get settings() {
    return this._settings;
  }

}