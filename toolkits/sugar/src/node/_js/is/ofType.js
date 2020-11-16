"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ofType;

var _parseTypeDefinitionString = _interopRequireDefault(require("../validation/utils/parseTypeDefinitionString"));

var _toString = _interopRequireDefault(require("../string/toString"));

var _class = _interopRequireDefault(require("./class"));

var _integer = _interopRequireDefault(require("./integer"));

var _upperFirst = _interopRequireDefault(require("../string/upperFirst"));

var _typeof = _interopRequireDefault(require("../value/typeof"));

var _typeDefinitionArrayObjectToString = _interopRequireDefault(require("../value/typeDefinitionArrayObjectToString"));

var _getExtendsStack = _interopRequireDefault(require("../class/getExtendsStack"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name              ofType
 * @namespace           sugar.js.is
 * @type              Function
 *
 * This function take the value to check and an argument type definition string like "String", "Array<String>", etc... and return true or false depending
 * if the value pass the test or not...
 *
 * @param       {Mixed}        value          The value to check
 * @param       {String}       argTypeDefinition      The argument type definition string to use for the test
 * @return      {Boolean|Object}                    true if the value pass the test, an object with two sub-objects describing the issue. 1 names "$expected" and the othet names "$received"
 *
 * @example       js
 * import isOfType from '@coffeekraken/sugar/js/is/ofType';
 * ifOfType(true, 'Boolean'); // => true
 * isOfType(12, 'String|Number'); // => true
 * isOfType(['hello',true], 'Array<String>'); // => { $expected: { type: 'Array<String>' }, $received: { type: 'Array<String|Boolean>' }}
 * isOfType(['hello',true], 'Array<String|Boolean>'); // => true
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function ofType(value, argTypeDefinition) {
  var definitionArray = argTypeDefinition; // parsing the argument definition string

  if (typeof argTypeDefinition === 'string') {
    definitionArray = (0, _parseTypeDefinitionString.default)(argTypeDefinition);
  }

  var typeOfValue = (0, _typeof.default)(value);
  var issueObj = {
    $received: {
      type: (0, _typeof.default)(value, {
        of: true
      }),
      value
    },
    $expected: {
      type: (0, _typeDefinitionArrayObjectToString.default)(definitionArray)
    },
    $issues: ['type']
  };

  var _loop = function _loop(i) {
    var definitionObj = definitionArray[i]; // if ((value === null || value === undefined) && definitionObj.type) {
    //   issueObj.received.type = __typeof(value);
    // }
    // Array | Object

    if (definitionObj.type === 'Array' || definitionObj.type === 'Object') {
      // Array
      if (definitionObj.type === 'Array') {
        // make sure the value is an array
        if (typeOfValue === 'Array' && !definitionObj.of) return {
          v: true
        }; // Object
      } else if (definitionObj.type === 'Object') {
        if (typeOfValue === 'Object' && !definitionObj.of) return {
          v: true
        };
      }

      if (definitionObj.of && (Array.isArray(value) || typeof value === 'object')) {
        var loopOn = Array.isArray(value) ? [...value.keys()] : Object.keys(value);
        var checkValuesResult = true;
        var receivedTypes = [];
        loopOn.forEach(valueIndex => {
          var valueToCheck = value[valueIndex];

          if (ofType(valueToCheck, definitionObj.of) !== true) {
            checkValuesResult = false;
          }

          var typeString = (0, _typeof.default)(valueToCheck);

          if (receivedTypes.indexOf(typeString) === -1) {
            receivedTypes.push(typeString);
          }
        });
        if (checkValuesResult) return {
          v: true
        }; // if (!checkValuesResult) {
        //   issueObj.received.type = `${typeOfValue}<${receivedTypes.join('|')}>`;
        // }
      }
    } // Class
    else if (definitionObj.type === 'Class') {
        if ((0, _class.default)(value)) return {
          v: true
        };
      } // Integer
      else if (definitionObj.type === 'Int' || definitionObj.type === 'Integer') {
          if ((0, _integer.default)(value)) return {
            v: true
          };
        } // check default types
        else if (['Boolean', 'Number', 'String', 'Bigint', 'Symbol', 'Function'].indexOf(definitionObj.type) !== -1) {
            if (definitionObj.type === 'Number') {
              var type = typeOfValue;
              if (type === 'Number' || type === 'Integer') return {
                v: true
              };
            } else {
              if (typeOfValue === definitionObj.type) return {
                v: true
              };
            }
          } // check for "custom" types
          else if ((0, _class.default)(value) && value.name) {
              if ((0, _typeof.default)(value) === definitionObj.type) return {
                v: true
              };
              var classesStack = (0, _getExtendsStack.default)(value);
              if (classesStack.indexOf(definitionObj.type) !== -1) return {
                v: true
              };
            } else if (value && value.constructor && value.constructor.name) {
              if (definitionObj.type === value.constructor.name) return {
                v: true
              };
            }
  };

  for (var i = 0; i < definitionArray.length; i++) {
    var _ret = _loop(i);

    if (typeof _ret === "object") return _ret.v;
  }

  return issueObj;
}

function getBaseClass(targetClass) {
  var stack = [];

  if (targetClass instanceof Function) {
    var baseClass = targetClass;

    while (baseClass) {
      var newBaseClass = Object.getPrototypeOf(baseClass);

      if (newBaseClass && newBaseClass !== Object && newBaseClass.name) {
        stack.push(newBaseClass.name);
        baseClass = newBaseClass;
      } else {
        break;
      }
    }

    return stack;
  }
}

module.exports = exports.default;