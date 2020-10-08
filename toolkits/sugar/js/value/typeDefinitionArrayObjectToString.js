"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = typeDefinitionArrayObjectToString;

/**
 * @name          typeDefinitionArrayObjectToString
 * @namespace     sugar.js.value
 * @type          Function
 *
 * This function take as parameter a type definition object like this one:
 * {
 *    type: [{
 *      type: 'Array',
 *      of: [{
 *        type: 'Boolean'
 *      }]
 *    }]
 * }
 * an transform it to a string like so "Array<Boolean>"
 *
 * @param       {Object}        typeDefinitionArrayObj       The type definition array object
 * @return      {String}                                The string representation of the type definition object
 *
 * @example         js
 * import typeDefinitionArrayObjToString from '@coffeekraken/sugar/js/value/typeDefinitionArrayObjectToString'
 * typeDefinitionArrayObjToString([{
 *    type: [{
 *      type: 'Array',
 *      of: [{
 *        type: 'Boolean'
 *      }]
 *    }]
 * }]); // => Array<Boolean>
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function typeDefinitionArrayObjectToString(typeDefinitionArrayObj) {
  var parts = [];
  if (!Array.isArray(typeDefinitionArrayObj)) typeDefinitionArrayObj = [typeDefinitionArrayObj];
  typeDefinitionArrayObj.forEach(definitionObj => {
    var part = definitionObj.type;

    if (definitionObj.of) {
      var ofString = typeDefinitionArrayObjectToString(definitionObj.of);
      part += "<".concat(ofString, ">");
    }

    parts.push(part);
  });
  return parts.join('|');
}

module.exports = exports.default;