"use strict";

/**
 * @name 		queryselector-scope
 * @namespace       sugar.js.polyfill
 * @type      Polyfill
 *
 * Polyfill for the :scope value in the querySelector and querySelectorAll functions
 * To use it, just require this file in your codebase
 *
 * @example 	js
 * require('@coffeekraken/sugar/js/polyfill/queryselector-scope');
 *
 * @see 		http://stackoverflow.com/questions/6481612/queryselector-search-immediate-children
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
(function (doc, proto) {
  try {
    // check if browser supports :scope natively
    doc.querySelector(":scope body");
  } catch (err) {
    // polyfill native methods if it doesn't
    ["querySelector", "querySelectorAll"].forEach(function (method) {
      var nativ = proto[method];

      proto[method] = function (selectors) {
        if (/(^|,)\s*:scope/.test(selectors)) {
          // only if selectors contains :scope
          var id = this.id; // remember current element id

          this.id = "ID_" + Date.now(); // assign new unique id

          selectors = selectors.replace(/((^|,)\s*):scope/g, "$1#" + this.id); // replace :scope with #ID

          var result = doc[method](selectors);
          this.id = id; // restore previous id

          return result;
        } else {
          return nativ.call(this, selectors); // use native code for other selectors
        }
      };
    });
  }
})(window.document, Element.prototype);