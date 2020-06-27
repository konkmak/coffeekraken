const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __SDocblock = require('../../../docblock/SDocblock');

/**
 * @name                SDocblocksObjectsToMarkdownStreamAction
 * @namespace           node.build.doc.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of converting the docblocks objects in the "data" property into markdown string
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SDocblocksObjectsToMarkdownStreamAction extends __SActionsStreamAction {
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
    data: {
      type: 'String',
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

    // return the promise for this action
    return new Promise((resolve, reject) => {
      // convert the objects to markdown
      // console.log(streamObj.data);
      const docblockInstance = new __SDocblock(streamObj.data, {
        filepath: streamObj.input
      });
      streamObj.data = docblockInstance.toMarkdown();
      resolve(streamObj);
    });
  }
};