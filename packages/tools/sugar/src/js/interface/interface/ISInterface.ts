// @shared

import { ISDescriptorSettings } from '../../descriptor/interface/ISDescriptor';
import ISDescriptorResult from '../../descriptor/interface/ISDescriptorResult';

export interface ISInterfaceSettings {
  name?: string;
  id?: string;
  arrayAsValue?: boolean;
  throwOnError?: boolean;
  complete?: boolean;
  descriptorSettings?: ISDescriptorSettings;
}

export interface ISInterfaceResultData {
  descriptorResult: ISDescriptorResult;
  instance: any;
}

export interface ISInterfaceDefinition {
  [key: string]: any;
}
export interface ISInterfaceDefinitionMap {
  [key: string]: ISInterfaceDefinition;
}

export interface ISInterfaceCtor {
  new (settings?: ISInterfaceSettings): ISInterface;
  definition: ISInterfaceDefinitionMap | ISInterfaceDefinition;
  settings: ISInterfaceSettings;
}
export default interface ISInterface {
  _definition: ISInterfaceDefinitionMap | ISInterfaceDefinition;
  _settings: ISInterfaceSettings;
}
