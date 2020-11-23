import _getExtendsStack from '../class/getExtendsStack'
import _argsToObject from '../cli/argsToObject'
import _SError from '../error/SError'
import _isClass from '../is/class'
import _deepMerge from '../object/deepMerge'
import _trimLines from '../string/trimLines'
import _validateObject from '../validation/object/validateObject'
import _validateObjectOutputString from '../validation/object/validateObjectOutputString'
import _typeof from '../value/typeof'
import _set from '../object/set'

type Constructor = new(...args: any[]) => any

/**
 * @name              SInterface
 * @namespace           sugar.js.class
 * @type              Function
 *
 * This class allows you to define an interface that you can later apply to an object instance
 * to make sure this particular instance has all the features, methods and properties you want.
 *
 * @todo      Enhance the interface validation for things like missing "type" property, etc...
 *
 * @example         js
 * import SInterface from '@coffeekraken/sugar/js/class/SInterface';
 * class MyCoolInterface extends SInterface {
 *    static definitionObj = {
 *      title: {
 *        type: 'String',
 *        required: true
 *      },
 *      doSomething: {
 *        type: 'Function',
 *        required: true
 *      }
 *    }
 * }
 *
 * class MyClass {
 *    constructor() {
 *      MyCoolInterface.apply(this);
 *    }
 * }
 *
 * const myObject = new MyClass();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */

abstract class STsAbstractInterface {
  type: string = 'interface'
  static i: any
  static d: object
  static desc: object
  static readonly extendsArray?: string[]
  static readonly implementsArray?: string[]
  abstract implements (instance: object, implementsArray: string[], settings: ISTsInterfaceSettings): void
}

// interface ISTsInterfaceProperty {

// }
interface ISTsInterfaceSettings {
  throw?: boolean
  name?: string
  return?: string
}

export = class STsInterface extends STsAbstractInterface {
  /**
   * @name              settings
   * @type              Object
   * @static
   *
   * Store the default settings that will be passed to the ```apply``` function
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static settings: ISTsInterfaceSettings = {
    throw: true,
    return: 'String'
  }

  /**
   * @name              apply
   * @type              Function
   * @static
   *
   * This static method allows you to apply the interface on an object instance.
   * By default, if something is wrong in your class implementation, an error with the
   * description of what's wrong will be thrown. You can change that behavior if you prefer having
   * true returned when all is ok, or a string describing the current issue by specify the "settings.throw" property to false.
   *
   * @param       {Object}                instance              The instance to apply the interface on
   * @param       {Object}              [settings={}]         An object of settings to configure your apply process
   * - throw (false) {Boolean}: Specify if you want that an error is throwned if the test does not pass
   * - return (String) {String}: Specify in which return you want the result back. Can be "String" of "Object".
   * @return      {Boolean|String}                              true if all is ok, a string describing the issue if not...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static apply (instance: object, settings: ISTsInterfaceSettings = {}): boolean | string {
    settings = _deepMerge(this.settings, settings)

    // name
    if (settings.name !== null) {
      settings.name = instance.constructor.name !== null ? instance.constructor.name : instance.name
    }

    const instanceType = _typeof(instance, {
      customClass: false
    })
    if (instanceType !== 'Object' && instanceType !== 'Class') {
      throw new _SError(
        `Sorry but the "<yellow>instance</yellow>" argument of the "<cyan>SInterface.apply</cyan>" static method have to be an <green>Object</green> and you've passed an <red>${_typeof(
          instance
        )}</red>...`
      )
    }

    let issueObj = {
      $issues: []
    }
    let implementationValidationResult

    const extendsStack = _getExtendsStack(instance)

    // check if the passed instance base class already implements this insterface
    // if (
    //   instance.constructor.__interfaces !== undefined &&
    //   Array.isArray(instance.constructor.__interfaces)
    // ) {
    //   if (instance.constructor.__interfaces.indexOf(this) !== -1) return true
    // } else if (instance.__interfaces !== undefined && Array.isArray(instance.__interfaces)) {
    //   if (instance.__interfaces.indexOf(this) !== -1) return true
    // }

    // extends array
    // if (Array.isArray(this.extendsArray)) {
    //   this.extendsArray.forEach((cls) => {
    //     if (!extendsStack.includes(cls)) {
    //       setTimeout(() => {
    //         throw new _SError(
    //           `Your class|instance "<yellow>${
    //             instance.constructor.name
    //           }</yellow>" that implements the "<cyan>${
    //             this.name
    //           }</cyan>" interface has to extend the "<green>${cls}</green>" class...`
    //         )
    //       })
    //     }
    //   })
    // }

    // // implements array
    // if (this.implementsArray !== undefined && Array.isArray(this.implementsArray)) {
    //   this.implements(instance, this.implementsArray, settings)
    // }

    // definition object
    if (this.definitionObj) {
      implementationValidationResult = _validateObject(
        instance,
        this.definitionObj,
        {
          throw: false,
          name: settings.name,
          interface: settings.interface
        }
      )
      if (implementationValidationResult !== true) {
        issueObj = _deepMerge(issueObj, implementationValidationResult, {
          array: true
        })
      }
    }

    if (!issueObj.$issues.length) {
      // save on the instance and the constructor that we implements this interface correctly
      if (!instance.__interfaces) {
        Object.defineProperty(instance, '__interfaces', {
          enumerable: false,
          writable: true,
          value: [this]
        })
      } else if (Array.isArray(instance.__interfaces)) {
        instance.__interfaces.push(this)
      }
      if (!instance.constructor.__interfaces) {
        Object.defineProperty(instance.constructor, '__interfaces', {
          enumerable: false,
          writable: true,
          value: [this]
        })
      } else if (Array.isArray(instance.constructor.__interfaces)) {
        instance.constructor.__interfaces.push(this)
      }

      return true
    }

    if (settings.throw) {
      throw new _SError(this.outputString(issueObj, settings))
    }

    switch (settings.return.toLowerCase()) {
      case 'object':
        return issueObj
      case 'string':
      default:
        return SInterface.outputString(issueObj, settings)
    }
  }

  /**
   * @name          implements
   * @type          Function
   * @static
   *
   * This static method allows you to tell that a particular instance of a class implements
   * one or more interfaces. This allows you after to specify the property "implements" with an array
   * of SInterface classes that you want your property to implements
   *
   * @param         {SInterface}          ...interfaces           The interfaces you want to implements
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static implements (instance: Constructor, interfaces: object[]|null = null, settings: ISTsInterfaceSettings = {}): object {
    if (interfaces === null) interfaces = [this]
    if (!Array.isArray(interfaces)) interfaces = [interfaces]

    // if (_isClass(instance)) {
    //   // return instance;
    //   class SInterfaceImplementsMiddleClass extends instance implements Constructor {
    //     constructor (...args: any[]) {
    //       super(...args)
    //       STsInterface.implements(this, interfaces, settings)
    //     }
    //   }
    //   Object.defineProperty(SInterfaceImplementsMiddleClass, 'name', {
    //     value: instance.name
    //   })

    //   return SInterfaceImplementsMiddleClass
    // }

    // make sure the instance has all the interfaces requirements
    interfaces.forEach((Interface) => {
      Interface.apply(instance, {
        ...settings,
        interface: Interface.name
      })
    })
  }
}

class SInterface {
  /**
   * @name          getDefaultValues
   * @type          Function
   * @static
   *
   * This static method allows you to get the default values object
   * that this interface represent
   *
   * @return      {Object}        An object of all default values represented by this interface
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static getDefaultValues () {
    return this.applyAndComplete({})
  }

  /**
   * @name          applyAndThrow
   * @type          Function
   * @static
   *
   * This static method do the exact same as the ```apply``` one but will throw an error if something is wrong...
   *
   * @param       {Object}                instance              The instance to apply the interface on
   * @return      {Boolean}                                     Return true is all is ok. Throw an error otherwise
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static applyAndThrow (instance, settings = {}) {
    const apply = SInterface.apply.bind(this)
    return apply(instance, {
      ...settings,
      throw: true
    })
  }

  /**
   * @name          applyAndComplete
   * @type          Function
   * @static
   *
   * This static method allows you to complete the passed data object and apply the interface
   * directly. If something goes wrong, it will throw an error, otherwise, return the
   * completed object
   *
   * @param       {Object}      object        The object on which to apply the interface and to complete
   * @param       {Object}      [settings={}]     An object of settings to configure your process
   * - duplicate (false) {Boolean}: Specify if you want to get back a new object or the passed one completed
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static applyAndComplete (object, settings = {}) {
    settings = _deepMerge(
      {
        duplicate: false
      },
      settings
    )
    const completedObject = this.complete(object, settings)
    this.applyAndThrow(completedObject, settings)
    return completedObject
  }

  /**
   * @name          complete
   * @type          Function
   * @static
   *
   * This static method allows you to pass an object to complete with the "default" values
   * of the definition object if needed
   *
   * @param         {Object}            data              The data object to complete
   * @return        {Object}                              The completed data object
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static complete (data, settings = {}) {
    settings = _deepMerge(
      {
        duplicate: false
      },
      settings
    )

    let argsObj = data
    if (settings.duplicate) {
      argsObj = Object.assign({}, data)
    }

    // loop on all the arguments
    Object.keys(this.definitionObj).forEach((argString) => {
      const argDefinitionObj = this.definitionObj[argString]

      // check if we have an argument passed in the properties
      if (
        argsObj[argString] === undefined &&
        argDefinitionObj.default !== undefined
      ) {
        _set(argsObj, argString, argDefinitionObj.default)
      }
    })

    return argsObj
  }

  /**
   * @name          outputString
   * @type          Function
   * @static
   *
   * This static method allows you to get the ```apply``` result
   * in a readable way.
   *
   * @param         {Object}               resultObj               The resulting object coming from the ```apply``` method
   * @return        {String}                                    The string version of the result
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static outputString (resultObj, settings = {}) {
    const headerString = this._outputHeaderString(settings)
    const string = _validateObjectOutputString(resultObj, settings)
    return _trimLines(`${headerString}${string}`)
  }

  /**
   * @name          output
   * @type          Function
   * @static
   *
   * This static method allows you to console.log the ```apply``` result
   * in a readable way.
   *
   * @param         {Object}               resultObj               The resulting object coming from the ```apply``` method
   * @return        {String}                                    The string version of the result
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static output (resultObj, settings = {}) {
    const string = this.outputString(resultObj, settings)
    console.log(string)
  }

  /**
   * @name                _outputHeaderString
   * @type                Function
   * @private
   *
   * This method simply generate the output header depending on the passed settings like:
   * - title: The title you want to display
   * - description: A description to explain a little bit more the issue
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static _outputHeaderString (settings = {}) {
    const array = []
    if (settings.title) {
      array.push(`<red><underline>${settings.title}</underline></red>`)
      array.push(' ')
    }
    if (settings.description) {
      array.push(`${settings.description}`)
      array.push(' ')
    }

    return array.join('\n')
  }

  /**
   * @name                parse
   * @type                Function
   * @static
   *
   * This method take a string like "-v 'something' --temp" and convert it into an object of arguments
   * depending on the definition object of this interface
   *
   * @param       {String}            string            The string to parse
   * @return      {Object}                              The object of arguments values
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static parse (string) {
    const args = _argsToObject(string, this.definitionObj)
    return args
  }

  /**
   * @name                parseAndComplete
   * @type                Function
   * @static
   *
   * This method take a string like "-v 'something' --temp" and convert it into an object of arguments
   * depending on the definition object of this interface.
   * It will also complete the data object obtained with the "default" values if needed
   *
   * @param       {String}            string            The string to parse
   * @return      {Object}                              The object of arguments values
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static parseAndComplete (string) {
    let args = _argsToObject(string, this.definitionObj)
    args = this.complete(args)
    return args
  }

  /**
   * @name          extends
   * @type          Function
   * @static
   *
   * This static method allows you to start from this particular interface and to extends it
   * by passing an object containing these properties:
   * - definitionObj ({}) {Object}: An object to extends the static definitionObj one
   * - settings ({}) {Object}: An object of settings to extends the static settings one
   * @param     {Object}      extendsObj      An object to extends the static ones of the duplicated interface
   * @return    {SInterface}                  A new SInterface class based on the extended one
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static extends (extendsObj) {
    class ExtendedInterface extends this {}
    ExtendedInterface.definitionObj = _deepMerge(
      ExtendedInterface.definitionObj,
      extendsObj.definitionObj || {}
    )
    ExtendedInterface.settings = _deepMerge(
      ExtendedInterface.settings,
      extendsObj.settings || {}
    )
    return ExtendedInterface
  }
}