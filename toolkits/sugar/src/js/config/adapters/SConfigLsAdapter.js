import __set from '../../object/set';
import __get from '../../object/get';
import __toString from '../../string/toString';
import __parse from '../../string/parse';
import __stringifyObject from 'stringify-object';
import __deepMerge from '../../object/deepMerge';
import __SConfigAdapter from './SConfigAdapter';
import __diff from '../../object/diff';

/**
 * @name                  SConfigLsAdapter
 * @namespace           sugar.js.config.adapters
 * @type                  Class
 *
 * This Local Storage adapter for the SConfig class let you define a name for your config and then you can just
 * let the SConfig class do the work for you...
 *
 * @param                   {Object}                    [settings={}]         The adapter settings that let you work with the good data storage solution...
 * - name (null) {String}: This specify the config name that you want to use.
 * - defaultConfig ({}) {Object}: This specify the "default" config that you want.
 * - appConfig ({}) {Object}: This specify the "application" level config that you want.
 * - userConfig ({}) {Object}: This specify the "user" level config that you want. It's usually this config that is updated
 * @return                  {Promise}                                         A promise that will be resolved once the data has been getted/saved...
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

module.exports = class SConfigLsAdapter extends __SConfigAdapter {
  constructor(settings = {}) {
    super(settings);
  }

  load() {
    // try to get the config from the localstorage
    const config = __parse(localStorage.getItem(this._settings.name)) || {};

    // mix the configs and save them in the instance
    return __deepMerge(
      config.default || {},
      config.app || {},
      config.user || {}
    );
  }

  save(newConfig = {}) {
    const baseConfig = __deepMerge(
      this._settings.defaultConfig,
      this._settings.appConfig
    );
    localStorage.setItem(
      this._settings.name,
      __toString({
        default: this._settings.defaultConfig,
        app: this._settings.appConfig,
        user: __diff(baseConfig, newConfig)
      })
    );
    return true;
  }
};