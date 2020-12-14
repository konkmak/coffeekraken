// @ts-nocheck
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
     * @name        appendStyleTag
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Append a style tag either to the head or the body
     *
     * @param    {String}    css    The style css to append
     * @param       {HTMLElement}       [$parent=document.head]            The parent in which you want to append the style tag
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import appendStyleTag from '@coffeekraken/sugar/js/dom/appendStyleTag'
     * appendStyleTag('dist/js/app.js')
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function appendStyleTag(css, $parent) {
        if ($parent === void 0) { $parent = document.head || document.getElementsByTagName('head')[0]; }
        var $style = document.createElement('style');
        if ($style.styleSheet) {
            // This is required for IE8 and below.
            $style.styleSheet.cssText = css;
        }
        else {
            $style.appendChild(document.createTextNode(css));
        }
        $parent.appendChild($style);
    }
    return appendStyleTag;
});
//# sourceMappingURL=module.js.map