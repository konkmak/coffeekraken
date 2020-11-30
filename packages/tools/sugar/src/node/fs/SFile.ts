// @ts-nocheck

import __deepMerge from '../object/deepMerge';
import __SPromise from '../promise/SPromise';
// import __SFileInterface from './interface/SFileInterface';
import __fs from 'fs';
import __path from 'path';
import __extension from './extension';
import __getFilename from './filename';
import __SFileSettingsInterface from './interface/SFileSettingsInterface';
import __SError from '../error/SError';
import __packageRoot from '../path/packageRoot';

import ISFile, {
  ISFileSettings,
  ISFileCtor,
  ISFileReadSettings,
  ISFileWriteSettings
} from './interface/ISFile';

/**
 * @name            SFile
 * @namespace       sugar.node.fs
 * @type            Class
 * @implements      SFileInterface
 * @extends         SPromise
 * @beta
 *
 * This class represent a file in the filesystem. With it you can simply instanciate one by passing the file path,
 * and get access to all the nice meta data like:
 * - name: The file name
 * - path: The full path to the file
 * - rootDir: The root directory specified through the settings.rootDir property
 * - relPath: The relative file path from the rootDir
 * - dirPath: The path to the folder where is the file
 * - extension: The file extension
 * - size: The file size in megabytes
 * - sizeInBytes: The file siz in bytes
 * - exists: true if the file exists on the disk, false otherwise
 *
 * @param         {String}          filepath        The file path you want to init
 * @param         {Object}          [settings={}]    An object of settings to configure your file instance:
 * - rootDir (__packageRoot()) {String}: Specify a root directory for the file. This is usefull to have then access to properties like ```relPath```, etc...
 * - checkExistence (true) {Boolean}: Specify if you want this inited file to really exists on the disk or not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import SFile from '@coffeekraken/sugar/node/fs/SFile';
 * const file = new SFile('something/cool/sugar.json');
 * file.extension; // => json
 * file.exists; // => true
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const Cls: ISFileCtor = class SFile extends __SPromise implements ISFile {
  /**
   * @name        name
   * @type        String
   *
   * Store the full file name
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  name;

  /**
   * @name        path
   * @type        String
   *
   * Store the full file path
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  path;

  /**
   * @name        rootDir
   * @type        String
   *
   * Store the root directory where the file actually lives.
   * The root directory can be for example ```src/js``` for a file that lives under ```/my/cool/path/src/js/array/sort.js```.
   * To set this property, you need to pass the ```rootDir``` setting through the constructor...
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  rootDir;

  /**
   * @name        relPath
   * @type        String
   *
   * Store the path relative to the ```rootDir``` property. To have access to this property, you MUST
   * specify the settings.rootDir through the constructor
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  relPath;

  /**
   * @name        dirPath
   * @type        String
   *
   * Store the path to the folder where the file lives
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  dirPath;

  /**
   * @name        extension
   * @type        String
   *
   * Store the file extension
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  extension;

  /**
   * @name        size
   * @type        Number
   *
   * Store the file size in megabytes
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  size = -1;

  /**
   * @name        sizeInBytes
   * @type        Number
   *
   * Store the file size in bytes
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  sizeInBytes = -1;

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(filepath: string, settings: ISFileSettings = {}) {
    super(settings);
    this._settings = __deepMerge(
      {
        id: 'SFile',
        checkExistence: true,
        rootDir: __packageRoot()
      },
      this._settings
    );

    if (settings.rootDir && !filepath.includes(settings.rootDir)) {
      filepath = __path.resolve(settings.rootDir, filepath);
    }

    // check if the file exists
    this.exists = __fs.existsSync(filepath);

    // check if need to check for the file existence or not...
    if (settings.checkExistence && !this.exists) {
      throw new __SError(
        `The passed filepath "<cyan>${filepath}</cyan>" does not exist and you have setted the "<yellow>checkExistence</yellow>" setting to <green>true</green>`
      );
    }

    if (this._settings.rootDir) {
      this.rootDir = this._settings.rootDir;
      this.relPath = __path.relative(this.rootDir, filepath);
    }

    // save the file path
    this.path = filepath;
    this.name = __getFilename(filepath);
    this.extension = __extension(filepath);
    this.dirPath = __path.dirname(filepath);

    if (this.exists) {
      this.update();
    }
  }

  /**
   * @name            toObject
   * @type            Function
   *
   * This method transform this instance into a plain object
   *
   * @return        {Object}        A plain object version of this instance
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toObject() {
    return {
      exists: this.exists,
      rootDir: this.rootDir,
      path: this.path,
      relPath: this.relPath,
      name: this.name,
      extension: this.extension,
      dirPath: this.dirPath
    };
  }

  /**
   * @name            update
   * @type            Function
   * @private
   *
   * This method simply updates the informations like the file size, etc...
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  update() {
    if (!this.exists) return;
    // get the file stats
    const stats = __fs.statSync(this.path);
    this.sizeInBytes = stats.size;
    this.size = stats.size / 1000000;
  }

  /**
   * @name        read
   * @type        Function
   * @async
   *
   * This method allows you to read the file asycronously
   *
   * @param     {ISFileReadSettings}        [settings={}]           An object of settings to configure your read process
   * @return    {Promise}                                          A promise that will be resolved with the file content when readed
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  read(settings: ISFileReadSettings = {}): Promise<string> {
    if (this.exists === false) {
      throw `You try to read the file "<yellow>${this.path}</yellow>" but this file does not exists on the filesystem`;
    }
    settings = {
      encoding: 'utf8',
      ...settings
    };
    return __fs.readFile(this.path, settings);
  }

  /**
   * @name        readSync
   * @type        Function
   *
   * This method allows you to read the file syncronously
   *
   * @param     {ISFileReadSettings}        [settings={}]           An object of settings to configure your read process
   * @return    {String}                                          The file content readed
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  readSync(settings: ISFileReadSettings = {}): string {
    if (this.exists === false) {
      throw `You try to read the file "<yellow>${this.path}</yellow>" but this file does not exists on the filesystem`;
    }
    settings = {
      encoding: 'utf8',
      ...settings
    };
    return __fs.readFileSync(this.path, settings);
  }

  /**
   * @name        write
   * @type        Function
   * @async
   *
   * This method allows you to write the file asycronously
   *
   * @param     {String}                data                    The data to write in the file
   * @param     {ISFileWriteSettings}        [settings={}]           An object of settings to configure your read process
   * @return    {Promise}                                          A promise that will be resolved with the file content when readed
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  write(data: string, settings: ISFileWriteSettings = {}): Promise<any> {
    settings = {
      encoding: 'utf8',
      ...settings
    };
    return __fs.writeFile(this.path, data, settings);
  }

  /**
   * @name        writeSync
   * @type        Function
   *
   * This method allows you to write the file sycronously
   *
   * @param     {String}                data                    The data to write in the file
   * @param     {ISFileWriteSettings}        [settings={}]           An object of settings to configure your read process
   * @return    {Promise}                                          A promise that will be resolved with the file content when readed
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  write(data: string, settings: ISFileWriteSettings = {}): any {
    settings = {
      encoding: 'utf8',
      ...settings
    };
    return __fs.writeFileSync(this.path, data, settings);
  }
};

export = Cls;
