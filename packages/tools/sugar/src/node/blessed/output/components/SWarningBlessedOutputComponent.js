"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SBlessedOutputComponent_1 = __importDefault(require("../SBlessedOutputComponent"));
const blessed_1 = __importDefault(require("blessed"));
const parseHtml_1 = __importDefault(require("../../../console/parseHtml"));
const deepMerge_1 = __importDefault(require("../../../object/deepMerge"));
/**
 * @name                SWarningBlessedOutputComponent
 * @namespace           sugar.node.blessed.output.components
 * @type                Class
 * @extends             SBlessedOutputComponent
 * @state               Beta
 *
 * This represent the "warning" blessed output component
 *
 * @param           {ILog}      logObj          The log object to use
 * @param           {ISWarningBlessedOutputComponentSettings}         [settings={}]       Some settings to configure your display
 *
 * @example         js
 * // register the component in the SBlessedOutput class
 * import SBlessedOutput from '@coffeekraken/sugar/node/blessed/output/SBlessedOutput';
 * import SWarningBlessedOutputComponent from '@coffeekraken/sugar/node/blessed/output/components/SWarningBlessedOutputComponent';
 * SBlessedOutput.registerComponent(SWarningBlessedOutputComponent);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const cls = (_a = class SWarningBlessedOutputComponent extends SBlessedOutputComponent_1.default {
        /**
         * @name        constructor
         * @type        Function
         * @constructor
         *
         * Constructor
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(logObj, settings = {}) {
            super(logObj, deepMerge_1.default({
                blessed: {}
            }));
            this._$content = blessed_1.default.box({
                content: parseHtml_1.default(['<yellow><bold>Warning:</bold></yellow>', '', logObj.value].join('\n')),
                top: 0,
                left: 3,
                height: 'shrink',
                style: {}
            });
            this._$line = blessed_1.default.box({
                top: 0,
                left: 0,
                width: 1,
                height: 'shrink',
                style: {
                    bg: 'yellow'
                }
            });
            this.append(this._$content);
            this.append(this._$line);
        }
        update() {
            this._$content.height = this.getScrollHeight();
            this._$line.height = this.getScrollHeight();
            super.update();
        }
    },
    /**
     * @name        id
     * @type        String
     * @static
     *
     * Specify the "id" string that will be used in the logObj.type property
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _a.id = 'warning',
    _a);
module.exports = cls;
//# sourceMappingURL=SWarningBlessedOutputComponent.js.map