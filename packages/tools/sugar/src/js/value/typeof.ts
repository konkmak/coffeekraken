import _deepMerge from '../object/deepMerge'
import _isInt from '../is/integer'
import _isClass from '../is/class'
import _upperFirst from '../string/upperFirst'

interface ITypeofSettings {
  of?: boolean
  customClass?: boolean
}

/**
 * @name          typeof
 * @namespace          sugar.js.value
 * @type          Function
 *
 * This function return the correct type of the passed value.
 * It support the recognition of arrays and return 'Array' as property type.
 * You can olso ask the function to gives you the "of" types of the passed value. This mean that if you
 * pass an Array like so "[10,'Hello',true]" and that you ask for "of" types, it will returns you
 * "Array<Integer|String|Boolean>".
 * Another feature is to ask the result as an object like so:
 * {
 *    type: 'Array',
 *    of: ['Integer','String','Boolean']
 * }
 * You can ask also the typeof function to returns you the actual class name if the passed value is an instance
 * of an custom class.
 *
 * @param       {Mixed}    value    The value to get the type of
 * @param       {Object}    [settings={}]         An object of settings to configure your type get process:
 * - of (false) {Boolean}: Specify if you want to get the "child" properties types for Objects, Arrays and custom classes
 * - format ('String') {String}: Specify if you want back a String of an Object
 * - customClass (true) {Boolean}: Specify if you want the custom classes to return theirs real names or simply Object
 * @return      {String|Object}               The type in string format, of an object if the setting "object" is set to true
 *
 * @example         js
 * import typeof from '@coffeekraken/sugar/js/value/typeof';
 * typeof(true); // => Boolean
 * typeof(10); // => Integer
 * typeof(12.4); // => Number
 * typeof(['Hello']); // => Array
 * typeof(['Hello',true], { of: true }); // => Array<String|Boolean>
 *
 * class MyCoolClass {
 *    // ...
 * }
 * const myInstance = new MyCoolClass();
 * typeof(myInstance, { customClass: true }); // => MyCoolClass
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = function typeOf (value: any, settings: ITypeofSettings = {}): string {
  settings = _deepMerge(
    {
      of: false,
      customClass: true
    },
    settings
  )

  // get the real type
  let type: string
  if (Array.isArray(value)) type = 'Array'
  else if (value === null) type = 'Null'
  else if (value === undefined) type = 'Undefined'
  else if (typeof value === 'string') type = 'String'
  else if (_isInt(value)) type = 'Integer'
  else if (typeof value === 'number') type = 'Number'
  else if (typeof value === 'boolean') type = 'Boolean'
  else if (value instanceof RegExp) type = 'RegExp'
  else if (settings.customClass === true && _isClass(value) && value.name !== undefined) {
    type = _upperFirst(value.name)
  } else if (
    settings.customClass === true &&
    value.constructor !== undefined &&
    value.constructor.name !== undefined
  ) {
    type = _upperFirst(value.constructor.name)
  } else if (settings.customClass === false && _isClass(value)) {
    type = 'Class'
  } else if (typeof value === 'function') type = 'Function'
  else if (typeof value === 'object') type = 'Object'
  else type = 'Unknown'

  // check if need to get the "child" types
  const avoidTypes = [
    'Null',
    'Undefined',
    'String',
    'Integer',
    'Number',
    'Boolean',
    'Unknown'
  ]
  if (settings.of === true && !avoidTypes.includes(type)) {
    const loopOn = Array.isArray(value)
      ? [...value.keys()]
      : Object.keys(value)
    const receivedTypes: string[] = []
    loopOn.forEach((valueIndex: any) => {
      const valueToCheck = value[valueIndex]
      const childType: string = typeOf(valueToCheck, {
        of: false,
        customClass: settings.customClass
      })
      if (!receivedTypes.includes(childType)) {
        receivedTypes.push(childType)
      }
    })
    // save the "of" types in the result obj
    type += `<${receivedTypes.join('|')}>`
  }

  return type
}