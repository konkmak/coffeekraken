const __SActionsStreamAction = require('../SActionsStreamAction');
const __writeFile = require('../../fs/writeFile');
const __toString = require('../../string/toString');
const __packageRoot = require('../../path/packageRoot');
const __deepMerge = require('../../object/deepMerge');

/**
 * @name            SFsOutputStreamAction
 * @namespace           node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 *
 * This class is a stream action that allows you to save file(s) to the filesystem
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SFsOutputStreamAction extends __SActionsStreamAction {
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
    outputStack: {
      type: 'Object',
      required: false
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
    super(
      __deepMerge(
        {
          id: 'actionStream.action.fs.output'
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
  run(streamObj, settings = this._settings) {
    return super.run(streamObj, async (resolve, reject) => {
      if (!streamObj.outputStack || typeof streamObj.outputStack !== 'object') {
        this.warn(
          `The streamObj does not contain any "<cyan>outputStack</cyan>" property so no file will be saved at all...`
        );
        return resolve(streamObj);
      }

      // loop on the files to save
      const outputStackKeys = Object.keys(streamObj.outputStack);
      for (let i = 0; i < outputStackKeys.length; i++) {
        const key = outputStackKeys[i];
        const outputPath = streamObj.outputStack[key];
        const readableOutputPath = outputPath.replace(
          __packageRoot(process.cwd()),
          ''
        );
        if (!streamObj[key]) continue;
        this.log(
          `Saving the streamObj property "<yellow>${key}</yellow>" under "<cyan>${readableOutputPath}</cyan>"`
        );
        await __writeFile(outputPath, __toString(streamObj[key]));
      }

      resolve(streamObj);
    });
  }
};