// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "lodash.clone", "lodash.clonedeep"], factory);
    }
})(function (require, exports) {
    "use strict";
    var lodash_clone_1 = __importDefault(require("lodash.clone"));
    var lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
    /**
     * @name                clone
     * @namespace           sugar.js.object
     * @type                Function
     * @stable
     *
     * This function allows you to clone an object either at 1 level, or deeply.
     *
     * @param       {Object}        object        The object to copy
     * @param       {Boolean}       [deep=false]  Specify if you want to clone the object deeply
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import clone from '@coffeekraken/sugar/js/object/clone';
     * clone({
     *    hello: 'world'
     * });
     *
     * @see       https://www.npmjs.com/package/lodash
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function clone(object, deep) {
        if (deep === void 0) { deep = false; }
        if (deep) {
            return lodash_clonedeep_1.default(object);
        }
        return lodash_clone_1.default(object);
    }
    return clone;
});
