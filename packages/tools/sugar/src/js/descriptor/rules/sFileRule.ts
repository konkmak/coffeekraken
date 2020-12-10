// @ts-nocheck
// @shared

import {
  ISDescriptorRule,
  ISDescriptorResultObj,
  ISDescriptorSettings
} from '../interface/ISDescriptor';
import SDescriptor from '../_SDescriptor';

/**
 * @name          sFileRule
 * @namespace     sugar.js.descriptor.rules
 * @type          ISDescriptorRule
 *
 * This rule allows you to make sure that your value is not ```undefined```
 * or a nullish value like ```null``` or ```''```.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
export interface IParams {
  value: boolean;
}
export interface IRuleSettings {
  when: any[];
}

const ruleObj: ISDescriptorRule = {
  name: 'Required',
  id: 'required',
  settings: {
    when: [undefined, null]
  },
  message: 'This value is required',
  processParams: (params: boolean) => {
    return { value: params };
  },
  apply: (
    value: any,
    params: IParams,
    ruleSettings: IRuleSettings,
    settings: ISDescriptorSettings
  ): ISDescriptorResultObj | true => {
    if (params.value === true) {
      if (ruleSettings.when.indexOf(value) !== -1) {
        return false;
      }
    }
    return true;
  }
};

// register the new rule
SDescriptor.registerRule(ruleObj);

export default ruleObj;