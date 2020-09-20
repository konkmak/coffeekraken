"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = striptags;

var _striptags = _interopRequireDefault(require("striptags"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name        striptags
 * @namespace           sugar.js.html
 * @type      Function
 *
 * Strip tags of an html string.
 * This is a simple wrapper of the nice "striptags" package that you can find here: https://www.npmjs.com/package/striptags
 *
 * @param    {String}    html    The html string to process
 * @param    {String}    allowableTags    The tags that are allowed like <h1><h2>...
 * @param     {String}    tagReplacement    A string with which you want to replace the tags
 * @return    {String}    The processed string without tags
 *
 * @example    js
 * import striptags from '@coffeekraken/sugar/js/string/striptags'
 * striptags('<p><span>Hello</span> world</p>', '<span>') // <span>Hello</span> world
 *
 * @see       https://www.npmjs.com/package/striptags
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function striptags(html, allowedTags, tagReplacement) {
  return (0, _striptags.default)(html, allowedTags, tagReplacement);
}

module.exports = exports.default;