// shared

import __isMap from '../../is/map';
import { ISTypeDescriptor } from '../interface/ISType';
import __SType from '../_SType';

/**
 * @name              mapTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "map" with some utilities methods like "is", "cast", etc...
 *
 * @example         js
 * export default {
 *    name: 'String',
 *    id: 'string',
 *    is: (value) => typeof value === 'string',
 *    cast: (value) => '' + value,
 *    // etc...
 * };
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const descriptor: ISTypeDescriptor = {
  name: 'Map',
  id: 'map',
  is: (value: any) => __isMap(value),
  cast: (value: any) => {
    if (__isMap(value)) return value;
    const map = new Map();
    map.set('value', value);
    return map;
  }
};

export = descriptor;