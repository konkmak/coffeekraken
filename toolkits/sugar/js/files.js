"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = files;

var _replaceTags = _interopRequireDefault(require("../../html/replaceTags"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                              files
 * @namespace           sugar.js.log.htmlPresets
 * @type                              Function
 *
 * Replace all the "log" html tags like "<red>", "<bold>", etc... with the corresponding syntax for the files
 *
 * @param                   {String}                      text                        The text to process
 * @return                  {String}                                                  The processed text ready for the terminal
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function files(text) {
  return (0, _replaceTags.default)(text, {
    black: (tag, content) => content,
    red: (tag, content) => content,
    green: (tag, content) => content,
    yellow: (tag, content) => content,
    blue: (tag, content) => content,
    magenta: (tag, content) => content,
    cyan: (tag, content) => content,
    white: (tag, content) => content,
    bgBlack: (tag, content) => content,
    bgRed: (tag, content) => content,
    bgGreen: (tag, content) => content,
    bgYellow: (tag, content) => content,
    bgBlue: (tag, content) => content,
    bgMagenta: (tag, content) => content,
    bgCyan: (tag, content) => content,
    bgWhite: (tag, content) => content,
    bold: (tag, content) => content,
    dim: (tag, content) => content,
    italic: (tag, content) => content,
    underline: (tag, content) => content,
    strike: (tag, content) => content,
    br: (tag, content) => '\n'
  });
}

module.exports = exports.default;