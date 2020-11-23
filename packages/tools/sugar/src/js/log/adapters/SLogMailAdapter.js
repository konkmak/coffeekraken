var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __deepMerge from '../../object/deepMerge';
import __isNode from '../../is/node';
import Email from './vendors/smtp.js';
import __mailHtmlPreset from '../htmlPresets/mail';
// TODO finish the dev and make tests...
/**
 * @name                    SLogMailAdapter
 * @namespace           sugar.js.log
 * @type                    Class
 *
 * This class allows you to log your messages, errors, etc... easily through some adapters that cover some targets like "console" of course,
 * "mail", "slack", etc...
 *
 * @example               js
 * import SLog from '@coffeekraken/sugar/js/log/SLog';
 * import SLogMailAdapter from '@coffeekraken/sugar/js/log/adapters/SLogMailAdapter';
 * const logger = new SLog({
 *    adapters: {
 *      mail: new SLogMailAdapter()
 *    }
 * });
 * logger.log('Something cool happend...');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SLogMailAdapter {
    /**
     * @name          constructor
     * @type          Function
     *
     * Constructor
     *
     * @param         {Object}        [settings={}]           The settings object to configure your SLogMailAdapter instance. Here's the settings available:
     * - host (null) {String}: Your smtp server hostname
     * - username (null) {String}: Your smtp username if needed
     * - password (null) {String}: Your smtp password if needed
     * - secureToken (null) {String}: An SmtpJS secure token to avoid delivering your password online
     * - to (null) {String}: The email address where you want to send the logs
     * - from (null) {String}: The email address from which you want to send the logs
     * - subject ('[level] sugar.js.log') {String}: The mail title. You can use the [level] placeholder to be replaced with the actual log level
     * - body ('[content]') {String}: The mail body. You can use the [content] placeholder to be replaced with the actual log
     * - metas ({}) {Object}: An object that will be transformed into a list and place inside the mail [content]
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        /**
         * @name          _settings
         * @type          Object
         * @private
         *
         * Store this instance settings
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        // extend settings
        this._settings = __deepMerge({
            subject: '[level] sugar.js.log',
            body: '[content]',
            metas: {}
        }, settings);
    }
    /**
     * @name            log
     * @type            Function
     * @async
     *
     * This is the main method of the logger. It actually log the message passed as parameter to the console
     *
     * @param         {Mixed}          message            The message to log
     * @param         {String}         level              The log level. Can be "log", "info", "error", "debug" or "warn"
     * @return        {Promise}                           A promise that will be resolved once the message has been logged correctly
     *
     * @example         js
     * await consoleAdapter.log('hello world');
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    log(message, level) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let imageData = null;
                if (!__isNode) {
                    const canvas = yield html2canvas(document.body);
                    imageData = canvas.toDataURL('image/jpeg');
                }
                let list = [];
                Object.keys(this._settings.metas).forEach((metaName) => {
                    list.push(`<li><strong>${metaName}</strong>: ${this._settings.metas[metaName]}</li>`);
                });
                const body = __mailHtmlPreset(this._settings.body.replace('[content]', `
        ${message}
        <br /><br />
        ${list.join('<br />')}
      `));
                const subject = this._settings.subject.replace('[level]', level);
                let keys = Object.keys(this._settings);
                let newobj = {};
                keys.forEach((key) => {
                    if (['host', 'username', 'password', 'to', 'from', 'securetoken'].indexOf(key.toLowerCase()) === -1)
                        return;
                    newobj[key.charAt(0).toUpperCase() + key.slice(1)] = this._settings[key];
                });
                try {
                    const _set = Object.assign({ Body: body, Subject: subject }, newobj);
                    if (imageData) {
                        _set['Attachments'] = [
                            {
                                name: `screenshot.jpg`,
                                data: imageData
                            }
                        ];
                    }
                    delete _set.metas;
                    Email.send(_set)
                        .then((message) => {
                        console.log('ME', message);
                        resolve(message);
                    })
                        .catch((error) => {
                        console.log('ERROR', error);
                        reject(error);
                    });
                }
                catch (e) {
                    console.error(e);
                }
            }));
        });
    }
}