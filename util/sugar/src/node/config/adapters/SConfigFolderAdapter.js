const __fs = require('fs');
const __deepMerge = require('../../object/deepMerge');
const __tmpDir = require('../../fs/tmpDir');
const __writeFileSync = require('../../fs/writeFileSync');
const __diff = require('../../object/diff');

const __SConfigAdapter = require('./SConfigAdapter');

/**
 * @name                  SConfigFolderAdapter
 * @namespace             sugar.node.config.adapters
 * @type                  Class
 *
 * This adapter let you specify a folder in which to put all the config files and access it normaly as you would with the SConfig system.
 * Each file in the folder will be the first level of the final config object like for example the file "colors.config.js" will be stored
 * in the final object under ```{ colors: ... }```.
 *
 * @param                   {Object}                    [settings={}]         The adapter settings that let you work with the good data storage solution...
 * - name (null) {String}: This specify the config name that you want to use.
 * - filename ('[name].config.js') {String}: Specify the filename to use for the file that will store the configs
 * - defaultConfigPath (null) {String}: This specify the path to the "default" config file.
 * - appConfigPath (${process.cwd()}/[filename]) {String}: This specify the path to the "app" config file
 * - userConfigPath (${__tmpDir()}/[filename]) {String}: This specify the path to the "user" config file
 * @return                  {Promise}                                         A promise that will be resolved once the data has been getted/saved...
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

module.exports = class SConfigFolderAdapter extends __SConfigAdapter {
  constructor(settings = {}) {
    settings = __deepMerge(
      {
        name: null,
        foldername: '.[name]',
        filename: '[name].config.js',
        defaultConfigPath: null,
        appConfigPath: `${process.cwd()}/[foldername]`,
        userConfigPath: `${__tmpDir()}/[foldername]`
      },
      settings
    );
    super(settings);

    this.settings.foldername = this.settings.foldername.replace(
      '[name]',
      this.name
    );
    if (this.settings.defaultConfigPath)
      this.settings.defaultConfigPath = this.settings.defaultConfigPath.replace(
        '[foldername]',
        this.settings.foldername
      );
    if (this.settings.appConfigPath)
      this.settings.appConfigPath = this.settings.appConfigPath.replace(
        '[foldername]',
        this.settings.foldername
      );
    if (this.settings.userConfigPath)
      this.settings.userConfigPath = this.settings.userConfigPath.replace(
        '[foldername]',
        this.settings.foldername
      );
  }

  load() {
    this._defaultConfig = {};
    this._appConfig = {};
    this._userConfig = {};

    // load the default config if exists
    if (
      this.settings.defaultConfigPath &&
      __fs.existsSync(this.settings.defaultConfigPath)
    ) {
      __fs.readdirSync(this.settings.defaultConfigPath).forEach((file) => {
        if (!file.includes(this.settings.filename.replace('[name]', '')))
          return;
        this._defaultConfig[file.replace('.config.js', '')] = require(this
          .settings.defaultConfigPath +
          '/' +
          file);
      });
    }

    // load the app config if exists
    if (
      this.settings.appConfigPath &&
      __fs.existsSync(this.settings.appConfigPath)
    ) {
      __fs.readdirSync(this.settings.appConfigPath).forEach((file) => {
        if (!file.includes(this.settings.filename.replace('[name]', '')))
          return;
        this._appConfig[file.replace('.config.js', '')] = require(this.settings
          .appConfigPath +
          '/' +
          file);
      });
    }

    // load the user config
    if (
      this.settings.userConfigPath &&
      __fs.existsSync(this.settings.userConfigPath)
    ) {
      __fs.readdirSync(this.settings.userConfigPath).forEach((file) => {
        if (!file.includes(this.settings.filename.replace('[name]', '')))
          return;
        this._userConfig[file.replace('.config.js', '')] = require(this.settings
          .userConfigPath +
          '/' +
          file);
      });
    }

    // mix the configs and save them in the instance
    return __deepMerge(this._defaultConfig, this._appConfig, this._userConfig);
  }

  save(newConfig = {}) {
    if (!this.settings.userConfigPath) {
      throw new Error(
        `You try to save the config "${this.name}" but the "settings.userConfigPath" is not set...`
      );
    }

    const baseConfig = __deepMerge(this._defaultConfig, this._appConfig);

    Object.keys(baseConfig).forEach((name) => {
      const configToSave = __diff(baseConfig[name], newConfig[name] || {});

      let newConfigString = `
      module.exports = ${JSON.stringify(configToSave)};
    `;

      // write the new config file
      __writeFileSync(
        this.settings.userConfigPath +
          '/' +
          this.settings.filename.replace('[name]', name),
        newConfigString
      );
    });

    return true;
  }
};