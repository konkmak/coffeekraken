"use strict";
var _a;
const __frontendServer = require('./frontend');
const __SProcess = require('../../process/SProcess');
const __SFrontendServerInterface = require('./interface/SFrontendServerInterface');
/**
 * @name            SFrontendServerProcess
 * @namespace           sugar.node.server.frontend
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the frontend server Cli based on the express server one
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class SFrontendServerProcess extends __SProcess {
        /**
         * @name          constructor
         * @type          Function
         * @constructor
         *
         * Constructor
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(settings = {}) {
            super({
                id: 'SFrontendServerProcess',
                name: 'Frontend Server Process',
                ...settings
            });
        }
        /**
         * @name              process
         * @type              Function
         *
         * Method that actually execute the process
         *
         * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
         * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
         * @return      {Süromise}                        An SPomise instance representing the build process
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        process(params, settings = {}) {
            this._frontendServerProcess = __frontendServer(params);
            this.bindSPromise(this._frontendServerProcess);
        }
    },
    _a.interface = __SFrontendServerInterface,
    _a);