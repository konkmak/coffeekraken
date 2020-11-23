const __sugarConfig = require('../config/sugar');
const __getFilename = require('../fs/filename');
const __fs = require('fs');
const __path = require('path');
const __getExt = require('../fs/extension');
const __deepMerge = require('../object/deepMerge');
const __toString = require('../string/toString');
const __SPromise = require('../promise/SPromise');
const __SError = require('../error/SError');
const __STemplate = require('./STemplate');
const __unique = require('../array/unique');

/**
 * @name              render
 * @namespace         sugar.node.template
 * @type              Function
 * @async
 *
 * This function take a view path, a data object and optionaly a settings object to compile
 * the view and return a simple Promise that will be resolved or rejected depending on the
 * process status.
 *
 * @param       {String}        viewPath        The view path to compile. This has to be a dotted path like "my.cool.view" relative to the @config.views.rootDir directory
 * @param       {Object}        [data={}]       An object of data to use to compile the view correctly
 * @param       {Object}        [settings={}]   An object of settings to configure your rendering process. Here's the list of available settings:
 * - rootDir (__sugarConfig('views.rootDir')) {String|Array<String>}: Specify the root directory where to search for views. Can be an array of directories in which the engine will search through if needed
 *
 * @example       js
 * const render = require('@coffeekraken/sugar/node/template/render');
 * const result = await render('my.cool.template, {
 *    hello: 'world'
 * });
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function render(viewPath, data = null, settings = {}) {
  return new __SPromise(
    async (resolve, reject, trigger, cancel) => {
      const templateInstance = new __STemplate(viewPath, {
        ...settings
      });
      let resultObj;
      try {
        resultObj = await templateInstance.render(data, settings);
        resultObj.status = 200;
        return resolve({
          ...resultObj
        });
      } catch (e) {
        const errorTemplateInstance = new __STemplate('pages.501', settings);
        resultObj = await errorTemplateInstance.render(
          {
            ...data,
            error: e
          },
          settings
        );
        resultObj.status = 501;
        return reject({
          ...resultObj
        });
      }
    },
    {
      id: 'templateRender'
    }
  );
};