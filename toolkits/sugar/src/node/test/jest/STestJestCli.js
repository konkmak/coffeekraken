const __SCli = require('../../cli/SCli');
const __deepMerge = require('../../object/deepMerge');
const __STestJestCliInterface = require('./interface/STestJestCliInterface');
const __STestJestProcess = require('./STestJestProcess');

/**
 * @name            STestJestCli
 * @namespace           node.test.jest
 * @type            Class
 * @extends         SCli
 *
 * This class represent the tests jest cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STestJestCli extends __SCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'sugar test.jest %arguments';

  /**
   * @name          definitionObj
   * @type          Object
   * @static
   *
   * Store the definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static definitionObj = __STestJestCliInterface.definitionObj;

  /**
   * @name          processClass
   * @type          SProcess
   * @static
   *
   * Store the process class that will be used to run the test jest process
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static processClass = __STestJestProcess;

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
          id: 'cli.test.jest',
          name: 'Cli Test Jest',
          childProcess: {
            pipe: ['log', 'update', 'add', 'unlink', 'state']
          }
        },
        settings
      )
    );
  }
}

// module.exports = STestJestCli;
module.exports = __STestJestCliInterface.implements(STestJestCli);