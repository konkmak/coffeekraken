const __SProcess = require('../../process/SProcess');
const __chokidar = require('chokidar');
const __SPromise = require('../../promise/SPromise');
const __deepMerge = require('../../object/deepMerge');
const __SFsFile = require('../../fs/SFsFile');
const __packageRoot = require('../../path/packageRoot');

/**
 * @name                SFsDeamon
 * @namespace           node.deamon.fs
 * @type                Class
 * @extends             SProcess
 *
 * This class allows you to simply launch some watch processes in order to be notified when some files are
 * updated, deleted or created on the filesystem.
 *
 * @example           js
 * const SFsDeamon = require('@coffeekraken/sugar/node/deamon/fs/SFsDeamon');
 * const deamon = new SFsDeamon();
 * demon.on('update', up => {
 *    // do somethong on update
 * });
 * deamon.watch('./my/cool/files/*.js');
 * deamon.watch('./my/other/cool/files/*.js', {
 *    id: 'other'
 * }).on('update', up => {
 *    // do something
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SFsDeamonProcess extends __SProcess {
  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(initialParams = {}, settings = {}) {
    super(
      initialParams,
      __deepMerge(
        {
          name: 'Filesystem Deamon'
        },
        settings
      )
    );
  }

  /**
   * @name            _filesCache
   * @type            Object
   * @private
   *
   * Store the already fetched files instances
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _filesCache = {};

  /**
   * @name              watch
   * @type              Function
   * @async
   *
   * This method start the watching process and returns you an SPromise instance on which you can subscribe
   * for these events:
   * - update: Triggered when a file has been updated
   * - delete: Triggered when a file has been deleted
   * - add: Triggered when a file has been added
   * The parameter passed along these events are an ```SFileInterface``` compatible object
   *
   * @param         {String|Array<String>}          input           The input glob pattern(s) to specify what to watch
   * @param         {Object}                      [settings={}]     A settings object to override the one passed in the constructor if wanted
   * @return        {SPromise}                                      An SPromise instance to subscribe to some events described above
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(argsObj, settings = {}) {
    settings = __deepMerge(this._settings, settings);

    const promise = new __SPromise(
      (resolve, reject, trigger, cancel) => {
        const runningTests = {};

        this.log({
          group: 'Initialization',
          value: `#start Starting the "<yellow>${settings.name}</yellow>" filesystem deamon...`
        });

        // if (!Array.isArray(argsObj.input)) argsObj.input = [argsObj.input];
        // argsObj.input = argsObj.input.map((input) => {
        //   return input.replace(`${process.cwd()}/`, '');
        // });
        // console.log(argsObj.input);

        __chokidar
          .watch(argsObj.input, {
            persistent: true,
            ignoreInitial: true,
            followSymlinks: true,
            ...settings
          })
          .on('ready', () => {
            this.log({
              group: 'Initialization',
              value: `#success The "<yellow>${settings.name}</yellow>" deamon is <green>ready</green>`
            });
          })
          .on('change', (filepath) => {
            const file = this._getFileInstanceFromPath(filepath);

            this.log({
              group: 'Updated files',
              value: `File updated: "<yellow>${file.filepath.replace(
                __packageRoot(file.filepath) + '/',
                ''
              )}</yellow>" <cyan>${file.size}</cyan>mb`
            });

            trigger('update', file);
          })
          .on('add', (filepath) => {
            const file = this._getFileInstanceFromPath(filepath);

            this.log({
              group: 'Added files',
              value: `File added: "<green>${file.filepath.replace(
                __packageRoot(file.filepath) + '/',
                ''
              )}</green>" <cyan>${file.size}</cyan>mb`
            });

            trigger('add', file);
          })
          .on('unlink', (filepath) => {
            delete this._filesCache[filepath];

            this.log({
              group: 'Deleted files',
              value: `File deleted: "<red>${file.filepath.replace(
                __packageRoot(file.filepath) + '/',
                ''
              )}</red>" <cyan>${file.size}</cyan>mb`
            });

            trigger('unlink', file);
          });
      },
      {
        id: settings.id || 'deamon.fs'
      }
    ).start();
    return super.run(promise);
  }

  _getFileInstanceFromPath(filepath) {
    let file;
    if (this._filesCache[filepath]) {
      file = this._filesCache[filepath];
      file.update();
    } else {
      file = new __SFsFile(filepath);
      this._filesCache[filepath] = file;
    }
    return file;
  }
};