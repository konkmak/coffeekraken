"use strict";
var _a;
const __SActionsStreamAction = require('../SActionsStreamAction');
const __glob = require('glob');
const __clone = require('../../object/clone');
const __extractSame = require('../../string/extractSame');
const __getFilename = require('../../fs/filename');
const __deepMerge = require('../../object/deepMerge');
const __SInterface = require('../../class/SInterface');
class SGlobResolverStreamActionInterface extends __SInterface {
}
SGlobResolverStreamActionInterface.definitionObj = {
    globProperty: {
        type: 'String',
        required: true
    }
};
/**
 * @name            SGlobResolverStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 *
 * This class is a stream action that allows you resolve glob pattern by specifying the streamObj property that
 * is one. It will then return an array of streamObj handled normally by the SActionsStream instance
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class SGlobResolverStreamAction extends __SActionsStreamAction {
        /**
         * @name            constructor
         * @type            Function
         * @constructor
         *
         * Constructor
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(settings = {}) {
            super(__deepMerge({
                id: 'actionStream.action.globResolver'
            }, settings));
        }
        /**
         * @name          run
         * @type          Function
         * @async
         *
         * Override the base class run method
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        run(streamObj, settings = this._settings) {
            return super.run(streamObj, async (resolve, reject) => {
                // resolve glob pattern
                const rootDir = streamObj[streamObj.globProperty];
                const files = __glob.sync(streamObj[streamObj.globProperty]);
                // build the streamObj stack
                const streamObjArray = [];
                // loop on each files founded
                files.forEach((filePath) => {
                    const newStreamObj = __clone(streamObj);
                    newStreamObj[streamObj.globProperty] = filePath;
                    let cleanedRootDir = rootDir;
                    cleanedRootDir = cleanedRootDir.replace(__getFilename(cleanedRootDir), '');
                    cleanedRootDir = cleanedRootDir
                        .replace(/\[.*\]/gm, '')
                        .replace(/\*{1,2}/gm, '')
                        .replace(/\(.*\)/gm, '')
                        .replace(/(\?|!|\+|@)/gm, '');
                    cleanedRootDir = cleanedRootDir.replace(/\/+$/, '');
                    let outputFilePath = filePath
                        .replace(cleanedRootDir, '')
                        .replace(__getFilename(filePath), '');
                    if (outputFilePath.slice(0, 1) === '/')
                        outputFilePath = outputFilePath.slice(1);
                    newStreamObj.outputDir = newStreamObj.outputDir + '/' + outputFilePath;
                    if (newStreamObj.outputDir.slice(-1) === '/')
                        newStreamObj.outputDir = newStreamObj.outputDir.slice(0, -1);
                    delete newStreamObj.globProperty;
                    streamObjArray.push(newStreamObj);
                });
                resolve(streamObjArray);
            });
        }
    },
    /**
     * @name            interface
     * @type             Object
     * @static
     *
     * Store the definition object that specify the streamObj required properties, types, etc...
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _a.interface = SGlobResolverStreamActionInterface,
    _a);