// @shared
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../interface/SInterface"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SInterface_1 = __importDefault(require("../../interface/SInterface"));
    var LogInterface = /** @class */ (function (_super) {
        __extends(LogInterface, _super);
        function LogInterface() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LogInterface.definition = {
            value: {
                require: true
            }
        };
        return LogInterface;
    }(SInterface_1.default));
    return LogInterface;
});
//# sourceMappingURL=LogInterface.js.map