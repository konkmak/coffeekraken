export interface ISLogObj {
  value: any;
}

export interface ISLogAdapter {
  _settings: object;
}

export interface ISLogAdaptersSettingObj {
  [key: string]: ISLogAdapter;
}

export interface ISLogAdaptersByLevelSettingObj {
  log: ISLogAdapter | ISLogAdapter[];
  info: ISLogAdapter | ISLogAdapter[];
  warn: ISLogAdapter | ISLogAdapter[];
  debug: ISLogAdapter | ISLogAdapter[];
  error: ISLogAdapter | ISLogAdapter[];
  trace: ISLogAdapter | ISLogAdapter[];
}

export interface ISLogAdaptersByEnvironmentSettingObj {
  test: ISLogAdapter | ISLogAdapter[];
  development: ISLogAdapter | ISLogAdapter[];
  production: ISLogAdapter | ISLogAdapter[];
}

export interface ISLogSettings {
  adapters: ISLogAdaptersSettingObj;
  adaptersByLevel: ISLogAdaptersByLevelSettingObj;
  adaptersByEnvironment: ISLogAdaptersByEnvironmentSettingObj;
  overrideNativeConsole: boolean;
}

export default interface ISLog {
  new (settings: ISLogSettings): ISLog;
  log(...args: ISLogObj[]): Promise<any>;
  info(...args: ISLogObj[]): Promise<any>;
  warn(...args: ISLogObj[]): Promise<any>;
  debug(...args: ISLogObj[]): Promise<any>;
  error(...args: ISLogObj[]): Promise<any>;
  trace(...args: ISLogObj[]): Promise<any>;
}