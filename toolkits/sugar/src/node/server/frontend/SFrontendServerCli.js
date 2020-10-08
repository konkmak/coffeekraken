const __SCli = require('../../cli/SCli');
const __SFrontendServerProcess = require('./SFrontendServerProcess');
const __SFrontendServerInterface = require('./interface/SFrontendServerInterface');
const __deepMerge = require('../../object/deepMerge');

/**
 * @name            SFrontendServerCli
 * @namespace           sugar.node.server.frontend
 * @type            Class
 * @extends         SExpressServerCli
 *
 * This class represent the frontend server Cli based on the express server one
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFrontendServerCli extends __SCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'sugar server.frontend %arguments';

  /**
   * @name          interface
   * @type          String
   * @static
   *
   * Store the cli definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = __SFrontendServerInterface;

  /**
   * @name          processClass
   * @type          SProcess
   * @static
   *
   * Store the process class that will be used to run the frontend server
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static processClass = __SFrontendServerProcess;

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(args = {}, settings = {}) {
    super(
      args,
      __deepMerge(
        {
          id: 'SFrontendServerCli',
          name: 'Frontend Server'
        },
        settings
      )
    );
  }
}

module.exports = __SFrontendServerInterface.implements(
  SFrontendServerCli,
  __SFrontendServerInterface
);