"use strict";
var _a;
const __deepMerge = require('../../object/deepMerge');
const __blessed = require('blessed');
const __color = require('../../color/color');
const __hotkey = require('../../keyboard/hotkey');
const __parseHtml = require('../../terminal/parseHtml');
const __SBlessedComponent = require('../SBlessedComponent');
/**
 * @name                    SBlessedNotification
 * @namespace           sugar.node.blessed.notification
 * @type                    Class
 *
 * This class represent a notification that will be in a corner of the terminal
 * with some features like:
 * - Timeout
 * - On click action
 * - and more...
 *
 * @param         {String}             title            The notification title
 * @param         {String}            body              The notification body
 * @param         {String}            [cta=null]        The call to action text
 * @param         {Object}            [settings={}]     An object of settings to configure your notification more in details:
 * - onClick (null) {Function}: Specify a function to call when the user click on the notification
 * - timeout (5000) {Number}: Specify a number of ms to display the notification. -1 if you want to keep it visible until the user click on it
 * - position (tr) {String}: Specify the position of the notification. Can be tl, tr, bl or br
 * - bg (yellow) {String}: Specify the background color to apply to the notification
 * - fg (black) {String}: Specify the foreground color to apply to the notification
 *
 * @example             js
 * const SBlessedNotification = require('@coffeekraken/sugar/node/blessed/notification/SBlessedNotification');
 * const notification = new SBlessedNotification('Hello', 'This is a cool notif', null, {
 *      onClick: () => {
 *          console.log('Clicked');
 *      }
 * });
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class SBlessedNotification extends __SBlessedComponent {
        /**
         * @name            constructor
         * @type            Function
         * @constructor
         *
         * Constructor
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(title, body, settings = {}) {
            settings = __deepMerge({
                onClick: null,
                position: 'tr',
                timeout: 5000,
                bg: 'yellow',
                fg: 'black',
                hover: {
                    bg: 'yellow',
                    fg: 'black'
                }
            }, settings);
            let position = settings.position;
            delete settings.position;
            super({
                ...settings,
                width: 40,
                height: 4,
                style: {
                    bg: settings.bg,
                    fg: settings.fg,
                    hover: {
                        bg: settings.hover.bg,
                        fg: settings.hover.fg
                    }
                },
                padding: {
                    top: 1,
                    left: 2,
                    right: 2,
                    bottom: 0
                },
                clickable: settings.onClick !== null,
                content: __parseHtml([`<bold>${title}</bold>`, `${body}`, ''].join('\n'))
            });
            this.on('attach', () => {
                const stack = SBlessedNotification.displayStacks[position];
                if (stack.indexOf(this) === -1) {
                    stack.push(this);
                }
            });
            this.on('detach', () => {
                const stack = SBlessedNotification.displayStacks[position];
                const idx = stack.indexOf(this);
                if (idx === -1)
                    return;
                stack.splice(idx, 1);
                SBlessedNotification.update();
            });
            // click
            if (settings.onClick) {
                this.on('click', () => {
                    settings.onClick();
                    this.destroy();
                });
            }
            // timeout
            if (settings.timeout !== -1) {
                setTimeout(() => {
                    this.destroy();
                }, settings.timeout);
            }
        }
        static update() {
            let top = 1, left = 2, bottom = 1, right = 2;
            SBlessedNotification.displayStacks.tl.forEach(($notif) => {
                $notif.top = top;
                $notif.left = left;
                top += $notif.height + 1;
            });
            top = 1;
            SBlessedNotification.displayStacks.tr.forEach(($notif) => {
                $notif.top = top;
                $notif.right = right;
                top += $notif.height + 1;
            });
            SBlessedNotification.displayStacks.bl.forEach(($notif) => {
                $notif.bottom = bottom;
                $notif.left = left;
                bottom += $notif.height + 1;
            });
            bottom = 1;
            SBlessedNotification.displayStacks.br.forEach(($notif) => {
                $notif.bottom = bottom;
                $notif.right = right;
                bottom += $notif.height + 1;
            });
        }
        update() {
            SBlessedNotification.update();
            super.update();
        }
    },
    _a.displayStacks = {
        tl: [],
        tr: [],
        bl: [],
        br: []
    },
    _a);