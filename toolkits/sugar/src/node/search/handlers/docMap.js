const __deepMerge = require('../../object/deepMerge');
const __packageRoot = require('../../path/packageRoot');
const __fs = require('fs');
const __Fuse = require('fuse.js');
const __SSearchResultItem = require('../SSearchResultItem');
const __searchQueryParser = require('search-query-parser');
const __SUrlAction = require('../../action/browser/SUrlAction');

/**
 * @name                search
 * @namespace           node.search.handlers
 * @type                Function
 *
 * This function is responsible of handling the docMap search
 * by filtering the docMap and send back the serch result json.
 *
 * @param         {String}        searchString        The searching string
 * @param         {Object}        [settings={}]       A settings object to configure your search process. Here's the available settings:
 * @return        {Promise}                         A promise that will be resolved with an array of SSearchResultItem object either as full instances, or in JSON format depending on the settings.format property
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function search(searchString, settings = {}) {
  settings = __deepMerge(
    {
      filePath: __packageRoot() + '/docMap.json',
      action: {
        url: '/doc[path]'
      }
    },
    settings
  );

  let queryObj = __searchQueryParser.parse(searchString.trim(), {
    keywords: ['name', 'namespace', 'path']
  });
  delete queryObj.offsets;
  delete queryObj.exclude;
  if (typeof queryObj !== 'object' || !Object.keys(queryObj).length) {
    queryObj = {};
    queryObj.namespace = searchString;
  }

  return new Promise((resolve, reject) => {
    // load the docmap
    if (!__fs.existsSync(settings.filePath)) {
      throw new Error(
        `You try to make a research using the <primary>docMap</primary> search handler but it seems that your configuration point to a file that does not exists "<cyan>${settings.filePath}</cyan>"...`
      );
    }
    const docMap = require(settings.filePath);

    const fuse = new __Fuse(docMap, {
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
      shouldSort: true,
      keys: Object.keys(queryObj)
    });

    const operators = [];
    Object.keys(queryObj).forEach((key) => {
      operators.push({
        [key]: queryObj[key]
      });
    });

    const pathsArray = [];
    const results = fuse
      .search({
        $and: operators
      })
      .map((item) => {
        return {
          ...item.item
        };
      })
      .filter((item) => {
        if (pathsArray.indexOf(item.path) === -1) {
          pathsArray.push(item.path);
          return true;
        }
        return false;
      })
      .map((item) => {
        let action;
        if (typeof settings.action === 'function') {
          action = settings.action(item);
        } else if (typeof settings.action === 'object') {
          action = new __SUrlAction({
            url: settings.action.url.replace('[path]', item.path),
            target: '_self'
          });
        }
        return new __SSearchResultItem(item.name, item.namespace, action, {});
      });

    // resolving the handler with the results array
    resolve(results);
  });
};
