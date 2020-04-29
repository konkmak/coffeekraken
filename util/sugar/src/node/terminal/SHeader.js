const __deepMerge = require('../object/deepMerge');
const __blessed = require('blessed');
const __parseHtml = require('./parseHtml');
const __splitEvery = require('../string/splitEvery');
const __countLine = require('../string/countLine');

/**
 * @name                    SHeader
 * @namespace               sugar.node.terminal
 * @type                    Class
 *
 * This class define a "header" in the terminal that you can easily configure to have the look and feel that you want
 * through simple settings described bellow.
 *
 * @param           {String}          title            Specify a title for this header.
 * @param           {Object}          [settings={}]   An object of settings described bellow:
 * - screen (true) {Boolean}: Specify if you want your header wrapped inside an "blessed"(https://www.npmjs.com/package/blessed) screen object. Useful when you just want to render your header in the terminal. If you have your own screen object
 *
 * @example         js
 * const SHeader = require('@coffeekraken/sugar/node/terminal/SHeader');
 * const header = new SHeader('Hello world', {});
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SHeader extends __blessed.box {
  /**
   * @name              _title
   * @type              String
   * @private
   *
   * Store the header title
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _title = null;

  /**
   * @name              _settings
   * @type              Object
   * @private
   *
   * Store the header settings
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name              constructor
   * @type              Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(title, settings = {}) {
    // save the settings
    const _settings = __deepMerge(
      {
        blessed: {
          padding: {
            top: 1,
            bottom: 1,
            left: 2,
            right: 2
          }
        }
      },
      settings
    );

    // extend from blessed.box
    super(_settings.blessed);
    // save settings
    this._settings = _settings;

    // save the title
    this._title = title;

    // set the size
    this.height = 4;

    // set the header content
    this.setContent(__parseHtml(title));

    // render the screen
    if (this.screen) this.screen.render();
  }
};
