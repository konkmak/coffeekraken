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
     * @name        isDdmmyyyyDate
     * @namespace           sugar.js.is
     * @type      Function
     * @stable
     *
     * Check if is a valid dd.mm.yyyy date
     * This will match : dd.mm.yyyy | dd/mm/yyyy | dd-mm-yyyy | dd mm yyyy
     *
     * @param    {String}    date    The date to check
     * @return    {Boolean}    true if is valid, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import isDdmmyyyyDate from '@coffeekraken/sugar/js/is/ddmmyyyyDate'
     * if (isDdmmyyyyDate('20.12.2018')) {
     *     // do something cool
     * }
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isDdmmyyyyDate(date) {
        return /^(?:(?:31(\/|-|\.|\s)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.|\s)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.|\s)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.|\s)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(date);
    }
    return isDdmmyyyyDate;
});
