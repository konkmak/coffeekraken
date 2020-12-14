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
    module.exports = function (__autoPrefix) {
        describe('sugar.js.css.autoPrefix', function () {
            var style = "\n      .hello {\n        transition: '200ms all linear',\n        boxSizing: 'border-box',\n        display: 'flex',\n        color: 'blue'\n\n        &:after {\n          content: 'coco';\n        }\n      }\n\n      .plop {\n        content: 'hehehe';\n      }\n\n    ";
            // const style = {
            //   transition: '200ms all linear',
            //   boxSizing: 'border-box',
            //   display: 'flex',
            //   color: 'blue',
            //   coco: {
            //     transition: '200ms all linear',
            //     boxSizing: 'border-box',
            //     display: 'flex',
            //     color: 'blue'
            //   }
            // }
            it('Should prefix correctly the passed style string', function () {
                console.log(__autoPrefix(style));
            });
        });
    };
});
//# sourceMappingURL=module.js.map