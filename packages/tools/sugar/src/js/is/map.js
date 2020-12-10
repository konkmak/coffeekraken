// @ts-nocheck
// @shared
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @name        isMap
     * @namespace           sugar.js.is
     * @type      Function
     * @stable
     *
     * Check if the passed value is a js Map
     *
     * @param    {Mixed}    value    The value to check
     * @return   {Boolean}   true if it's a Map, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import isMap from '@coffeekraken/sugar/js/is/map'
     * const map = new Map();
     * if (isMap(map) {
     *   // do something
     * }
     *
     * @since         1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isMap(value) {
        return value instanceof Map;
    }
    return isMap;
});
//# sourceMappingURL=map.js.map