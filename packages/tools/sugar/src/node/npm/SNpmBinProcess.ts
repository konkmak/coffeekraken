import _SProcess from '../process/SProcess'
import _SNpmBinInterface from './interface/SNpmBinInterface'
import _deepMerge from '../object/deepMerge'

/**
 * @name              SNpmBinProcess
 * @namespace         sugar.node.npm
 * @type              Class
 * @extends           SProcess
 *
 * This class represent the npm bin capabilities like install a bin globally or locally, uninstall it, etc...
 *
 * @param         {Object}       [settings={}]         An object of settings to configure your instance
 *
 * @example       js
 * const SNpmBinProcess = require('@coffeekraken/sugar/node/npm/SNpmBinProcess');
 * const p = new SNpmBinProcess();
 * p.run({
 *  action: 'install',
 *  package: '@coffeekraken/sugar',
 *  globally: true
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SNpmBinProcess extends _SProcess {
  static interface = _SNpmBinInterface

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor (settings = {}) {
    super(
      _deepMerge(
        {
          id: 'SNpmBinProcess',
          name: 'Npm Bin Process'
        },
        settings
      )
    )
  }

  /**
   * @name              process
   * @type              Function
   *
   * Method that actually execute the process
   *
   * @param       {Object}       params           The arguments object that will be passed to the underlined actions stream instance
   * @param       {Object}       [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
   * @return      {Süromise}                       An SPomise instance representing the build process
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  process (params, settings = {}) {
    setTimeout(() => {
      const actionStream = new __SBuildJsActionsStream({
        ...settings,
        logs: {
          success: false,
          start: false
        }
      })
      this._buildJsActionStream = actionStream.start(params)
      this.bindSPromise(this._buildJsActionStream)
    }, 1000)
  }
}