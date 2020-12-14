// TODO: More tests
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
    module.exports = function (__SDocblock) {
        describe('sugar.js.docblock.SDocblockParser', function () {
            it('Should parse a simple docblick correctly', function (done) {
                var docblock = "\n      /**\n       * @name                  DockblockParser\n       * @namespace           js.docblock\n       * @type                  Class\n       *\n       * This is the main class that expose the methods like \"parse\", etc...\n       * You have to instanciate it by passing a settings object. Here's the available options:\n       *\n       * @example         js\n       * import SDocblockParser from '@coffeekraken/sugar/js/docblock/SSDocblockParser';\n       * new SDocblockParser({\n       *    // override some settings here...\n       * }).parse(myString);\n       *\n       * @since     2.0.0\n       * @author \tOlivier Bossel <olivier.bossel@gmail.com>\n       */\n\n      /**\n       * @name        debounce\n       * @namespace           js.function\n       * @type      Function\n       *\n       * This utils function allows you to make sure that a function that will normally be called\n       * several times, for example during a scroll event, to be called only once after\n       * the delay passed\n       *\n       * @example \t\tjs\n       * import debounce from '@coffeekraken/sugar/js/function/debounce';\n       * const myDebouncedFn = debounce(() => {\n       * \t\t// my function content that will be\n       * \t\t// executed only once after the 1 second delay\n       * }, 1000);\n       *\n       * document.addEventListener('scroll', (e) => {\n       * \t\t// call my debounced function\n       * \t\tmyDebouncedFn();\n       * });\n       *\n       * @author \t        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n       */\n\n      /**\n       * @name          definition\n       * @type          Object\n       * @get\n       * @static\n       *\n       * Store the definition object\n       *\n       * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n       */\n\n      /**\n       * @name        includes\n       * @namespace           js.string\n       * @type      Function\n       *\n       * Same as the native String.includes function but accept either an array of items\n       * or a simple comma separated string like \"something,cool,hello,world\"\n       *\n       * @param    {String}    string    The string to check\n       * @param     {Array|String}    values      An array or comma separated string to check\n       * @return    {Boolean|Array}     An array of values that exists in the string or false if nothing match\n       *\n       * @example    js\n       * import includes from '@coffeekraken/sugar/js/string/includes'\n       * includes('Hello world', 'world,coco') // ['world']\n       *\n       * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n       */\n      ";
                var parser = new __SDocblock(docblock);
                var renderedBlocks = parser.toMarkdown();
                // console.log(renderedBlocks);
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map