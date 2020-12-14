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
    return {
        type: 'mediaQuery',
        prefix: /@media\s?\([^{]*\)\s?/,
        open: '{',
        close: '}'
    };
});
//# sourceMappingURL=module.js.map