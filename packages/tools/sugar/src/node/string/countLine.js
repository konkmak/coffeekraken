"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = require("../object/deepMerge");
const strip_ansi_1 = require("strip-ansi");
/**
 * @name                                  countLine
 * @namespace           sugar.js.string
 * @type                                  Function
 *
 * Count how many characters their is in the passed line.
 * This function will exclude the characters like the html tags like <red>, etc...
 *
 * @param           {String}              line              The line to count
 * @param           {Object}              [count={}]        Specify what you want to count outside of the normal characters of yourse. Here's the list of available options:
 * - htmlTags (false) {Boolean}: Specify if you want to count the html tags or not
 * - terminalSpecialChars (false) {Boolean}: Specify if you want to count the terminal specials chars like "\u001b[30m", etc...
 * - newLineChars (false) {Boolean}: Specify if you want to count the new line special char "\n" or not
 * @return          {Number}                                How many characters their is in the line
 *
 * @example         js
 * const countLine = require('@coffeekraken/sugar/js/string/countLine');
 * countLine('Hello <red>World</red>'); // 11
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function countLine(line, count = {}) {
    count = deepMerge_1.default({
        htmlTags: false,
        terminalSpecialChars: false,
        newLineChars: false
    }, count);
    let newLine = line;
    if (count.terminalSpecialChars === false) {
        newLine = strip_ansi_1.default(newLine);
    }
    if (count.htmlTags === false) {
        newLine = newLine.replace(/<\/?[a-zA-Z0-9]+\s?\/?>/g, '');
    }
    if (count.newLineChars === false) {
        newLine = newLine.replace('\n', '');
    }
    return newLine.length;
};