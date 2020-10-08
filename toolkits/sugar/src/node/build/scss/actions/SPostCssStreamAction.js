const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __Bundler = require('scss-bundle').Bundler;
const __getFilename = require('../../../fs/filename');
const __postcss = require('postcss');
const __precss = require('precss');
const __autoprefixer = require('autoprefixer');
const __postcssPresetEnv = require('postcss-preset-env');
const __cssnano = require('cssnano');
const __removeComments = require('postcss-discard-comments');
const __deepMerge = require('../../../object/deepMerge');
const __SBuildScssInterface = require('../interface/SBuildScssInterface');

/**
 * @name                SPostCssStreamAction
 * @namespace           sugar.node.build.scss.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of passing the postCss package on the generated css
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SPostCssStreamAction extends __SActionsStreamAction {
  /**
   * @name            interface
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = __SBuildScssInterface;

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(
      __deepMerge(
        {
          name: 'PostCSS',
          id: 'actionStream.action.scss.postCss'
        },
        settings
      )
    );
  }

  /**
   * @name          run
   * @type          Function
   * @async
   *
   * Override the base class run method
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(streamObj, settings) {
    return super.run(streamObj, async (resolve, reject) => {
      if (!streamObj.prod) return resolve(streamObj);

      const postCssResult = await __postcss([
        __precss,
        __autoprefixer,
        __postcssPresetEnv,
        __cssnano,
        __removeComments({ removeAll: true })
      ]).process(streamObj.data, {
        map: streamObj.map
          ? {
              inline: streamObj.prod ? false : true
            }
          : false,
        from: undefined
        // to: `${streamObj.outputDir}/${__getFilename(streamObj.input)}`
      });

      // set the "data" property with the new processed css
      if (postCssResult.css) {
        streamObj.data = postCssResult.css;
      }
      // // set the "sourcemapData" property if a map has been generated
      // if (postCssResult.map) {
      //   streamObj.sourcemapData = postCssResult.map;
      // }

      // resolving the action
      resolve(streamObj);
    });
  }
};