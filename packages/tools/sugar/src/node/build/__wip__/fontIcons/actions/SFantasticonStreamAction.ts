// @ts-nocheck

const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __deepMerge = require('../../../object/deepMerge');
const __BBuildFontIconsInterface = require('../interface/SBuildFontIconsInterface');
const __childProcess = require('child_process');
const __ensureDirSync = require('../../../fs/ensureDirSync');
const __removeSync = require('../../../fs/removeSync');
const __copy = require('../../../clipboard/copy');
const __generateFonts = require('fantasticon').generateFonts;
const __fantasticonConfig = require('../fantasticon.config');

/**
 * @name                SFantasticonStreamAction
 * @namespace           sugar.node.build.fonticons.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of generating the icon font from the passed source directory
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SFantasticonStreamAction extends __SActionsStreamAction {
  /**
   * @name            interface
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = __BBuildFontIconsInterface;

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
          name: 'Font icons generator',
          id: 'SFantasticonStreamAction'
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
    return super.run(streamObj, async (resolve, reject, trigger, cancel) => {
      __removeSync(streamObj.outputDir);
      __ensureDirSync(streamObj.outputDir);

      // Default options
      __generateFonts(
        __deepMerge(
          {
            name: 'sugar-icons',
            inputDir: streamObj.inputDir,
            outputDir: streamObj.outputDir,
            fontTypes: ['eot', 'woff2', 'woff'],
            assetTypes: ['css', 'html', 'json'],
            formatOptions: {},
            pathOptions: {},
            codepoints: {},
            fontHeight: 300,
            round: undefined, // --
            descent: undefined, // Will use `svgicons2svgfont` defaults
            normalize: undefined, // --
            selector: null,
            tag: 'i',
            prefix: 'icon',
            fontsUrl: './'
          },
          __fantasticonConfig
        )
      ).then((results) => {
        resolve(streamObj);
      });
    });
  }
};
