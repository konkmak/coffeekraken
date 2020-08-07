const __SActionsStream = require('../../stream/SActionsStream');
const __SWebpackStreamAction = require('./actions/SWebpackStreamAction');
const __STerserStreamAction = require('./actions/STerserStreamAction');
const __SFsReadFileStreamAction = require('../../stream/actions/SFsReadFileStreamAction');
const __deepMerge = require('../../object/deepMerge');
const __getFilename = require('../../fs/filename');
const __SFsOutputStreamAction = require('../../stream/actions/SFsOutputStreamAction');
const __SGlobResolverStreamAction = require('../../stream/actions/SGlobResolverStreamAction');
const __SSugarJsonStreamAction = require('./actions/SSugarJsonStreamAction');
const __path = require('path');

/**
 * @name            SBuildJsActionsStream
 * @namespace           node.build.js
 * @type            Class
 * @extends         SActionsStream
 *
 * This class represent a pre-configured action stream to build easily some javascript files
 *
 * @param           {Object}          [settings={}]         The settings object to configure your instance
 *
 * @todo        Document the streamObj required properties
 *
 * @example         js
 * const SBuildJsActionsStream = require('@coffeekraken/sugar/node/build/SBuildJsActionsStream');
 * const myStream = new SBuildJsActionsStream();
 * myStream.start({
 *    input: '...',
 *    output: '...'
 * }).on('resolve', (result) => {
 *    // do something
 * });
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildJsActionsStream extends __SActionsStream {
  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    // init actions stream
    super(
      {
        globResolver: __SGlobResolverStreamAction,
        readFile: __SFsReadFileStreamAction,
        sugarJson: __SSugarJsonStreamAction,
        webpack: __SWebpackStreamAction,
        terser: __STerserStreamAction,
        fsOutput: __SFsOutputStreamAction
      },
      __deepMerge(
        {
          name: 'Build JS',
          before: (streamObj) => {
            streamObj.globProperty = 'input';
            return streamObj;
          },
          afterActions: {
            globResolver: (streamObj) => {
              if (streamObj.input) {
                streamObj.filename = __getFilename(streamObj.input);
              }
              return streamObj;
            }
          },
          beforeActions: {
            fsOutput: (streamObj) => {
              if (streamObj.input) {
                streamObj.filename = __getFilename(streamObj.input);
              }
              if (!streamObj.outputStack) streamObj.outputStack = {};
              if (streamObj.outputDir && streamObj.filename && streamObj.data) {
                streamObj.outputStack.data = __path.resolve(
                  streamObj.outputDir,
                  streamObj.filename
                );
              }
              if (
                streamObj.outputDir &&
                streamObj.filename &&
                streamObj.sourcemapData
              ) {
                streamObj.outputStack.sourcemapData = __path.resolve(
                  streamObj.outputDir,
                  streamObj.filename + '.map'
                );
              }
              return streamObj;
            }
          }
        },
        settings
      )
    );
  }
};