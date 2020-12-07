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
     * @name        constructorName
     * @namespace           sugar.js.object
     * @type      Function
     * @stable
     *
     * Return the constructor name of the passed object
     *
     * @param 		{Object} 			obj 		The object to get the constructor name from
     * @return 		{String}						The constructor name
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import constructorName from '@coffeekraken/sugar/js/object/constructorName';
     * class MyCoolClass {
     * 		// class implementation...
     * }
     * const myObj = new MyCoolClass();
     * console.log(constructorName(myObj)); => MyCoolClass
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function constructorName(obj) {
        return obj.constructor && obj.constructor.name ? obj.constructor.name : null;
    }
    return constructorName;
});
//# sourceMappingURL=constructorName.js.map