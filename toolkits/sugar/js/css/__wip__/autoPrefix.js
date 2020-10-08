"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = autoPrefix;

var _inlineStylePrefixer = require("inline-style-prefixer");

var _css = _interopRequireDefault(require("css"));

var _set = _interopRequireDefault(require("../object/set"));

var _get = _interopRequireDefault(require("../object/get"));

var _scssParser = require("scss-parser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                autoPrefix
 * @namespace           js.css
 * @type                Function
 *
 * Prefix your passed css style
 *
 * @param         {String}            style             The style you want to prefix in string format
 * @param         {String}            [return=null]     You can tell what you want back between "string" and "object". By default it will return the same style type that you have passed
 * @return        {String}                              The prefixed style
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function autoPrefix(style) {
  var styleObj = typeof style === 'object' ? style : {};
  var prefixedStyleObj = {}; // check the passed param

  if (typeof style === 'string') {// styleObj = css.parse(style);
    // styleObj = parse(style);
  }

  parseCss(style); // __set(styleObj, 'stylesheet.rules.0.selectors.0', 'yououououou');
  // deepMap(styleObj, (value, name, path) => {
  //   if (name === 'value') {
  //     console.log(`.sel { ${value} }`);
  //     // __set(styleObj, path, 'hello');
  //     // __set(styleObj, path, css.parse(value));
  //     // __set(styleObj, path, css.parse(`
  //     // .sel { ${value} } `));
  //   }
  //   // console.log(path, name, value);
  // });
  // console.log(JSON.stringify(styleObj, null, 4));
  // console.log(__get(styleObj, 'stylesheet.rules.0.selectors.0'));
  // console.log(styleObj.stylesheet.rules[0].declarations);
  // // prefixing the object
  // prefixedStyleObj = prefix(styleObj);
  // console.log(prefixedStyleObj);

  return '';
}

function parseCss(css) {
  // const reg = /[\s\S]+\{[\s\S]+\}$/gm;
  var reg = /(\/\*\@-.*?)(?=\/\*\@-|\z)/gm;
  console.log(reg.exec(css));
}

function deepMap(object, handler, path) {
  if (path === void 0) {
    path = '';
  }

  if (Array.isArray(object)) {
    object.forEach((item, i) => {
      var newPath = path === '' ? "".concat(i) : "".concat(path, ".").concat(i);
      deepMap(item, handler, newPath);
    });
  } else if (typeof object === 'object') {
    Object.keys(object).forEach(itemName => {
      var itemValue = object[itemName];
      var newPath = path === '' ? "".concat(itemName) : "".concat(path, ".").concat(itemName);
      deepMap(itemValue, handler, newPath);
    });
  } else {
    handler(object, path.split('.').pop(), path);
  }
}

module.exports = exports.default;