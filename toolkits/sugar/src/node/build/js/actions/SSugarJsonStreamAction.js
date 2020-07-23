const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __globby = require('globby');
const __path = require('path');

/**
 * @name                SSugarJsonStreamAction
 * @namespace           node.build.js.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This action is responsible of searching for packages with a ```sugar.json``` root file
 * and impoirting the main js files before compilation
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SSugarJsonStreamAction extends __SActionsStreamAction {
  /**
   * @name            definitionObj
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static definitionObj = {
    sugarJsonDirs: {
      type: 'String|Array<String>',
      required: true
    }
  };

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
    super(settings);
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
  run(streamObj, settings = this._settings) {
    // make sure we have a correct streamObj
    this.checkStreamObject(streamObj);

    return new Promise(async (resolve, reject) => {
      // search for sugar.json files
      let dirs = streamObj.sugarJsonDirs;
      if (!Array.isArray(dirs)) dirs = [dirs];
      let files = [];
      for (let dir of dirs) {
        files = [
          ...files,
          ...__globby.sync([
            `${dir}/sugar.json`,
            `${dir}/node_modules/*/sugar.json`,
            `${dir}/node_modules/*/*/sugar.json`
          ])
        ];
      }

      // read each sugar files
      files.forEach((filePath) => {
        const sugarJson = require(filePath);
        const sugarJsonPath = __path.dirname(filePath);
        if (sugarJson.js && sugarJson.js.main) {
          streamObj.data = `
            import "${sugarJsonPath}/${sugarJson.js.main}";
            ${streamObj.data};
          `;
        }
      });

      resolve(streamObj);
    });
  }
};
