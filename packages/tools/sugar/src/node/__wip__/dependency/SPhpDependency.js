"use strict";
// @ts-nocheck
const __SDependency = require('./SDependency');
/**
 * @name                    SPhpDependency
 * @namespace           sugar.node.dependency
 * @type                    Class
 * @wip
 *
 * This class is the one that take care of installing php on your system depending on the platform on which you are.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * const SPhpDependency = require('@coffeekraken/sugar/node/dependency/SPhpDependency');
 * const promise = SPhpDependency.install();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SPhpDependency extends __SDependency {
    /**
     * @name              constructor
     * @type              Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        // extend the base class
        super('php', __dirname + '/php.dependency.json', settings);
    }
};
//# sourceMappingURL=SPhpDependency.js.map