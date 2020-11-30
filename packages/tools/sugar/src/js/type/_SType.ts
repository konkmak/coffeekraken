// @shared

import __uniquid from '../string/uniqid';
import __isOfType from '../is/ofType';
import __deepMerge from '../object/deepMerge';
import __parseTypeString from './parseTypeString';
import ISType, {
  ISTypeCtor,
  ISTypeDescriptor,
  ISTypeSettings,
  ISTypeRegisteredTypes
} from './interface/ISType';

/**
 * @name                SType
 * @namespace           sugar.js.type
 * @type                Class
 *
 * This class is the main one that MUST be used as parent one
 * when creating any type like object, string, etc...
 *
 * @param       {ISTypeSettings}      settings        An object of setting to configure your descriptor instance
 *
 * @example       js
 * import SType from '@coffeekraken/sugar/js/descriptor/SType';
 * class MyDescriptor extends SType {
 *    constructor(settings) {
 *      super(settings);
 *      // do something...
 *    }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const Cls: ISTypeCtor = class SType implements ISType {
  /**
   * @name        _settings
   * @type        ISTypeSettings
   * @private
   *
   * Store the descriptor settings
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings: ISTypeSettings;

  /**
   * @name      array
   * @type      Boolean
   *
   * This specify if this type instance represent an array of types
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  array: boolean = false;

  /**
   * @name      type
   * @type      String
   *
   * This specify the type represented by this SType instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  type: string;

  /**
   * @name      _registeredTypes
   * @type      ISTypeRegisteredTypes
   * @static
   *
   * Store the registered _registeredTypes into a simple object
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  static _registeredTypes: ISTypeRegisteredTypes = {};

  /**
   * @name      registerType
   * @type      Function
   * @static
   *
   * This static method allows you to register a new rule
   * by passing a valid ISDescriptorRule object
   *
   * @param     {ISDescriptorRule}        rule        The rule object to register
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  static registerType(type: ISTypeDescriptor): void {
    if (type.id === undefined || typeof type.id !== 'string') {
      throw `Sorry but you try to register a type that does not fit the ISTypeDescriptor interface...`;
    }
    this._registeredTypes[type.id] = type;
  }

  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(typeString: string, settings: ISTypeSettings = {}) {
    // parse the typeString
    if (typeString.includes('|') !== -1) {
      const parsedString = __parseTypeString(typeString);
      console.log('parsed', parsedString);
    } else {
      // check if we got a [] at the end
      if (typeString.match(/\[\]$/gm)) {
        // mark this type as array
        this.array = true;
      }
      this.type = typeString.replace('[]', '').trim();
    }
    // save the settings
    this._settings = __deepMerge({}, this.constructor.settings, settings);
  }

  /**
   * @name          name
   * @type          String
   * @get
   *
   * Access the descriptor name. Either the value of settings.name, or the constructor name
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  get name(): string {
    return this._settings.name !== undefined
      ? this._settings.name
      : this.constructor.name;
  }

  /**
   * @name          id
   * @type          String
   * @get
   *
   * Access the descriptor id. Either the value of settings.name, or the constructor name
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  get id(): string {
    return this._settings.id !== undefined
      ? this._settings.id
      : this.constructor.id;
  }
};

export = Cls;
