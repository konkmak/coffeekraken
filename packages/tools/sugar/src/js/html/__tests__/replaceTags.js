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
    module.exports = function (__replaceTags) {
        describe('sugar.js.html.replaceTags', function () {
            var html = "\n  <div>\n    <bold>Hello world</bold>\n    <h1>\n      How are you?\n    </h1>\n  </div>\n";
            var res = __replaceTags(html, {
                bold: function (tag, content) { return "<yop>" + content + "</yop>"; },
                h1: function (tag, content) { return content; }
            });
            it('Should have replace the tags correctly', function () {
                expect(res.replace(/\s/g, '')).toBe("\n<div>\n<yop>Hello world</yop>\n\n  How are you?\n\n</div>\n".replace(/\s/g, ''));
            });
        });
    };
});
//# sourceMappingURL=module.js.map