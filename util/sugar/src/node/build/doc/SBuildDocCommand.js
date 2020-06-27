const __SCommand = require('../../terminal/SCommand');
const __deepMerge = require('../../object/deepMerge');
const __SBuildDocCli = require('./SBuildDocCli');
const __sugarConfig = require('../../config/sugar');

/**
 * @name              SBuildDocCommand
 * @namespace           node.build.doc
 * @type              SCommand
 *
 * This class represent a command used to watch and build documentation files
 *
 * @param         {Object}        [argsObj={}]                An object to configure this specific scss command with these properties:
 * - input (null) {String}: Specify the input files that you want to build. You can use glob pattern
 * - outputDir (null) {String}: Specify the output folder where you want to save the compiled files
 * @param        {Object}         [commandSettings={}]         An object of SCommand settings to configure your command
 *
 * @example       js
 * const SBuildDocCommand = require('@coffeekraken/sugar/node/build/doc/SBuildDocCommand');
 * const myCommand = new SBuildDocCommand();
 * myCommand.run();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = class SBuildDocCommand extends __SCommand {
  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(argsObj = {}, commandSettings = {}) {
    // init command
    super(
      'build.doc',
      new __SBuildDocCli(),
      __deepMerge(
        {
          argsObj,
          title: 'Build Doc',
          key: 'd',
          concurrent: false,
          namespace: 'build.doc',
          watch: {
            patterns: __sugarConfig('build.doc.watch'),
            mapToProperty: 'input'
          }
        },
        commandSettings
      )
    );
  }
};