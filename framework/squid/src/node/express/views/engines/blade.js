const __fs = require('fs');
const __nodeBladePhp = require('@coffeekraken/node-blade-php');
const __SquidViewPreprocessor = require('../../../classes/SquidViewPreprocessor');

/**
 * @name            blade
 * @namespace       squid.node.express.templateEngines
 * @type            Function
 *
 * Register a blade php template engine to handle views named like *.blade.php
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
 */
module.exports = function(filePath, options, callback) {
  __nodeBladePhp.setViewsFolder(options.settings.views);
  __nodeBladePhp.compile(filePath.replace(options.settings.views, ''), options).then(async result => {
    // preprocess the view
    const viewPreprocessor = new __SquidViewPreprocessor(result);
    result = await viewPreprocessor.process().then(values => {
      callback(null, values[values.length-1]);
    });
  });
}