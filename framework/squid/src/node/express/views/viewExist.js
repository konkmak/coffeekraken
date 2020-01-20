const __path = require('path');
const __fs = require('fs');
const __glob = require('glob');

/**
 * @name            viewExist
 * @namespace       squid.node.functions
 * @type            Function
 *
 * Check if a view exist depending on the registered engines in the config
 *
 * @param             {String}              viewPath                The dot path to the wanted view without extension
 * @param             {String}              [viewId=null]           A specific view id to check
 * @param             {String}              [extension=null]        A specific extension to check. If set to null, will check every registered template engines extensions
 * @return            {Boolean}                                     true if the view exist, false if not...
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (viewPath, viewId = null, extension = null) => {

  // get the views folder path
  let viewFilePath = `${process.cwd()}/${__squid.config.views.folder}/${viewPath.replace('.','/')}`;

  // append the viewId if passed
  if (viewId) {
    viewFilePath += `.${viewId}`;
  }

  // list all files in the asked view path
  let files = __glob.sync(`${viewFilePath}.*`);

  // if no files have been found, check if the "index" one exist
  if ( ! files.length) {
    files = __glob.sync(`${viewFilePath}/index.*`);
  }

  // now if no files have been found, this mean that the view does not exist...
  if ( ! files.length) return false;

  // get the engines enxtensions from the config
  const enginesExtensions = Object.keys(__squid.config.views.engines);

  // check that at least 1 found file has one of the registered engines extension...
  for (let i = 0; i < files.length; i++) {

    const filePath = files[i];

    // loop on each engines to check his extension
    for (let j = 0; j < enginesExtensions.length; j++) {

      const extension = enginesExtensions[j];

      if (filePath.slice( - extension.length) === extension) {
        return filePath;
      }
    }
  }

  // nothing found...
  return false;

};