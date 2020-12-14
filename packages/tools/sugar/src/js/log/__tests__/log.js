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
    module.exports = function (__log) {
        describe('sugar.js.log.log', function () {
            var promises = [];
            promises.push(__log('Hello world'));
            it('Should have resolved the 1 log promise correctly', function (done) {
                Promise.all(promises).then(function (c) {
                    expect(c.length).toBe(1);
                    done();
                });
            });
        });
    };
});
//# sourceMappingURL=module.js.map