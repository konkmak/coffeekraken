"use strict";
var _a;
const __SInterface = require('../../class/SInterface');
const __SOutputProcessInterface = require('./SOutputProcessInterface');
const __SProcessManagerInterface = require('../../process/interface/SProcessManagerInterface');
const __SOutputLogInterface = require('./SOutputLogInterface');
const __SCliInterface = require('../../cli/interface/SCliInterface');
/**
 * @name                SAppCommandInterface
 * @namespace           sugar.node.blessed.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an element used as a command in an SCommandPanel instance.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class SAppCommandInterface extends __SInterface {
    },
    // static implementsArray = [__SCliInterface];
    // static definitionObj = {};
    _a.title = 'SApp Command Interface',
    _a.description = 'This interface represent the minimum requirements that MUST have the instances passed in an SApp based application',
    _a);