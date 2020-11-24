"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SDocblock_1 = __importDefault(require("../../docblock/SDocblock"));
/**
 * @name            htmlFromDocblocks
 * @namespace       sugar.js.convert
 * @type            Function
 * @wip
 *
 * Take a markdown string as input and convert it to HTML.
 *
 * @param       {String}          inputString         The input string to convert to HTML
 * @param       {Object}          [settings={}]       An object of settings to configure your conversion process:
 * @return      {String}                              The HTML converted result
 *
 * @todo        interface
 * @todo        doc
 *
 * @example       js
 * import htmlFromDocblocks from '@coffeekraken/sugar/js/convert/html/htmlFromDocblocks';
 * htmlFromDocblocks(`
 *  \/\*\*
 *   * @name    Hello world
 *  \*\/
 * `);
 * // <h1>Hello world</h1>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function htmlFromDocblocks(inputString, settings = {}) {
    settings = deepMerge_1.default({}, settings);
    const sDocblock = new SDocblock_1.default(inputString, settings);
    return sDocblock.toHtml(settings);
}
module.exports = htmlFromDocblocks;
