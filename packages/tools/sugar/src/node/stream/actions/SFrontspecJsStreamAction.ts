const __SActionsStreamAction = require('../SActionsStreamAction');
const __deepMerge = require('../../object/deepMerge');
const __SInterface = require('../../class/SInterface');
const __SFrontspec = require('../../doc/SFrontspec');

class SFrontspecJsStreamActionInterface extends __SInterface {
  static definitionObj = {
    frontspec: {
      type: 'Boolean|Object'
    }
  };
}

/**
 * @name            SFrontspecJsStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 *
 * This action take care of integrating the previous finded "frontspec.json" files
 * into the actual codebase handled by this stream action.
 *
 * @param       {Object}        [settings={}]          A settings object to configure your action
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SFrontspecJsStreamAction extends __SActionsStreamAction {
  /**
   * @name            interface
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = SFrontspecJsStreamActionInterface;

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
          sourceProp: 'data',
          id: 'SFrontspecJsStreamAction'
        },
        settings
      )
    );
    this.constructor.definitionObj = {
      [this._settings.sourceProp]: {
        type: 'String',
        required: true
      }
    };
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
      if (!streamObj.frontspec) return resolve(streamObj);

      const frontspec = new __SFrontspec();
      const promise = frontspec.json();
      promise.catch((e) => {
        reject(e);
      });
      const res = await promise;
      if (res) streamObj.frontspec = res;
      else return resolve(streamObj);

      let codeString = '';

      codeString += this._processFrontspecObj(streamObj.frontspec);
      if (streamObj.frontspec.children) {
        Object.keys(streamObj.frontspec.children).forEach((childPath) => {
          const frontspecObj = streamObj.frontspec.children[childPath];
          codeString += this._processFrontspecObj(frontspecObj);
        });
      }

      // prepend the resulting frontspec imports, init, etc... in the streamObj
      streamObj[settings.sourceProp] = `
        ${codeString}
        ${streamObj[settings.sourceProp]}
      `;

      resolve(streamObj);
    });
  }

  _processFrontspecObj(frontspecObj) {
    let frontspecCodeString = '';
    if (!frontspecObj.src || !frontspecObj.src.js) return frontspecCodeString;
    Object.keys(frontspecObj.src.js).forEach((name) => {
      const jsObj = frontspecObj.src.js[name];

      if (!jsObj.path && !jsObj.code) {
        return reject(
          `Sorry but the "<yellow>src.js.${name}</yellow>" frontspec object does not contain any "<cyan>path</cyan>" or "<cyan>code</cyan>" properties...`
        );
      } else if (!jsObj.path && jsObj.code && jsObj.includes('[path]')) {
        return reject(
          `Sorry but the "<yellow>src.js.${name}</yellow>" frontspec object does contain a "<cyan>code</cyan>" property that include some "<magenta>[path]</magenta>" token(s) but it does not contain the "<cyan>path</cyan>" required property...`
        );
      }
      let codeString = jsObj.code || '';
      if (jsObj.path) {
        codeString = codeString.replace('[path]', jsObj.path);
      }
      if (
        codeString === '' &&
        jsObj.path &&
        path !== 'frontspec.json' &&
        frontspecObj.package
      ) {
        codeString = `import ${frontspecObj.package.name}/${jsObj.path};`;
      }

      frontspecCodeString += `
            ${codeString}
          `;
    });

    return frontspecCodeString;
  }
};