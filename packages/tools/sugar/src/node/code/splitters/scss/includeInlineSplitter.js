"use strict";
// @ts-nocheck
// @shared
module.exports = {
    type: 'include.inline',
    prefix: /@include\s[a-zA-Z0-9-_\.]+/,
    suffix: /;/,
    open: '(',
    close: ')',
    exclude: [/@include Sugar\.setup\(.*\);/]
};
//# sourceMappingURL=module.js.map