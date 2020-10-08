"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _map = _interopRequireDefault(require("../object/map"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _node = _interopRequireDefault(require("../is/node"));

var _author = _interopRequireDefault(require("./tags/author"));

var _simpleValue = _interopRequireDefault(require("./tags/simpleValue"));

var _description = _interopRequireDefault(require("./tags/description"));

var _return = _interopRequireDefault(require("./tags/return"));

var _example = _interopRequireDefault(require("./tags/example"));

var _param = _interopRequireDefault(require("./tags/param"));

var _snippet = _interopRequireDefault(require("./tags/snippet"));

var _SDocblock = _interopRequireDefault(require("./SDocblock"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name          SDocblockBlock
 * @namespace           sugar.js.docblock
 * @type          Class
 *
 * This class represent a docblock object that contains all the "tags" values and some features like:
 * - Converting the block to markdown
 * - More to come...
 *
 * @param         {String}       source      The docblock source.  Has to be a parsable docblock string
 * @param         {Object}      [settings={}]       A settings object to configure your instance
 *
 * @todo        tests
 * @todo        Support "feature" tag
 * @todo        Check the supported tags
 *
 * @example         js
 * import SDocblockBlock from '@coffeekraken/sugar/js/docblock/SDocblockBlock';
 * const myBlock = new SDocblockBlock(myDocblockString);
 * const myBlock.toObject();
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
var SDocblockBlock = /*#__PURE__*/function () {
  /**
   * @name            tagsMap
   * @type            Object
   * @static
   *
   * Store the default tags mapping to their parsing functions
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */

  /**
   * @name          _source
   * @type          String
   * @private
   *
   * Store the passed source
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */

  /**
   * @name          _settings
   * @type          Object
   * @private
   *
   * Store this instance settings
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */

  /**
   * @name        _blockObj
   * @type        {Object}
   * @private
   *
   * Store the parsed docblock object
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */

  /**
   * @name          constructor
   * @type          Function
   * @contructor
   *
   * Constructor
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SDocblockBlock(source, settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SDocblockBlock);

    _defineProperty(this, "_source", null);

    _defineProperty(this, "_settings", {});

    _defineProperty(this, "_blockObj", {});

    this._source = source.trim();
    this._settings = (0, _deepMerge.default)({
      filepath: null,
      parse: {
        tags: SDocblockBlock.tagsMap
      }
    }, settings); // parse the docblock string

    this._blockObj = this.parse();
  }
  /**
   * @name          toString
   * @type          Function
   *
   * This method return the passed source string
   *
   * @return      {String}              The passed docblock string
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SDocblockBlock, [{
    key: "toString",
    value: function toString() {
      return this._source.trim();
    }
    /**
     * @name          toObject
     * @type          Function
     *
     * This method return the parsed docblock object
     *
     * @return      {Object}              The parsed dobclock object
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "toObject",
    value: function toObject() {
      return this._blockObj;
    }
    /**
     * @name          parse
     * @type          Function
     * @private
     *
     * This method take a docblick string and parse it to a javascript object
     *
     * @return      {Object}          The object version of the source string
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "parse",
    value: function parse() {
      // some variables
      var currentTag = null;
      var currentContent = [];
      var currentObj = {};
      var docblockObj = {};
      var previousWasEmptyLine = false;

      function add() {
        if (currentContent.length) currentObj.content = currentContent;

        if (docblockObj.hasOwnProperty(currentTag) && !Array.isArray(docblockObj[currentTag])) {
          var currentValue = docblockObj[currentTag];
          docblockObj[currentTag] = [currentValue];
        }

        if (!currentObj.value) currentObj.value = true;

        if (Array.isArray(docblockObj[currentTag])) {
          docblockObj[currentTag].push(currentObj);
        } else {
          docblockObj[currentTag] = currentObj;
        }

        currentObj = {};
        currentContent = [];
        currentTag = null;
      } // split the block by tags


      var lines = this._source.trim().split('\n');

      if (!lines || !lines.length) return null;
      lines = lines.map(l => l.trim());
      lines.forEach(line => {
        // get the tag name
        var tagNameReg = /\*[\s]?@([a-zA-Z0-9]+)/;
        var tagNameMatch = line.match(tagNameReg);

        if (line.replace('*', '').trim() === '') {
          if (currentContent.length > 0) {
            currentContent.push('');
          } else {
            if (currentTag && currentObj.value) {
              add();
            }

            previousWasEmptyLine = true;
          }
        } else if (tagNameMatch) {
          if (currentTag) {
            add();
          }

          currentTag = tagNameMatch[1];
          line = line.replace(tagNameMatch[0], '').trim();

          if (line.length > 0) {
            currentObj.value = line;
          } else {
            currentObj.value = true;
          }

          previousWasEmptyLine = false;
        } else if (previousWasEmptyLine) {
          currentTag = 'description';
          currentContent = [line.replace('*', '')];
          currentObj = {};
          previousWasEmptyLine = false;
        } else {
          line = line.replace('/**', '');
          line = line.replace('*/', '');
          line = line.replace('* ', '');
          line = line.replace('*', '');

          if (line.trim().length) {
            currentContent.push(line);
          }
        }
      });
      add();
      docblockObj = (0, _map.default)(docblockObj, (value, prop) => {
        if (!prop || prop.length <= 1 || prop.slice(0, 1) === '_') return value;
        if (this._settings.parse.tags[prop] && prop !== 'src') return this._settings.parse.tags[prop](value);
        return (0, _simpleValue.default)(value);
      });

      if (docblockObj['src'] && (0, _node.default)() && this._settings.filepath) {
        var __fs = require('fs');

        var __path = require('path');

        var absoluteFilepath = __path.resolve(this._settings.filepath, docblockObj['src']);

        var srcValue = __fs.readFileSync(absoluteFilepath, 'utf8');

        var srcDocblockInstance = new _SDocblock.default(srcValue);
        var srcBlocks = srcDocblockInstance.parse();

        if (srcBlocks.length) {
          var tags = srcBlocks[0].parse();
          docblockObj = (0, _deepMerge.default)(docblockObj, tags);
        }
      } // save the raw string


      docblockObj.raw = this._source.toString(); // return the parsed docblock object

      return docblockObj;
    }
  }]);

  return SDocblockBlock;
}();

exports.default = SDocblockBlock;

_defineProperty(SDocblockBlock, "tagsMap", {
  author: _author.default,
  abstract: _simpleValue.default,
  final: _simpleValue.default,
  async: _simpleValue.default,
  generator: _simpleValue.default,
  global: _simpleValue.default,
  constructor: _simpleValue.default,
  hideconstructor: _simpleValue.default,
  ignore: _simpleValue.default,
  inheritdoc: _simpleValue.default,
  inner: _simpleValue.default,
  instance: _simpleValue.default,
  mixin: _simpleValue.default,
  override: _simpleValue.default,
  access: _simpleValue.default,
  category: _simpleValue.default,
  copyright: _simpleValue.default,
  deprecated: _simpleValue.default,
  alias: _simpleValue.default,
  augments: _simpleValue.default,
  callback: _simpleValue.default,
  class: _simpleValue.default,
  classdesc: _simpleValue.default,
  constant: _simpleValue.default,
  constructs: _simpleValue.default,
  copyright: _simpleValue.default,
  default: _simpleValue.default,
  deprecated: _simpleValue.default,
  exports: _simpleValue.default,
  external: _simpleValue.default,
  host: _simpleValue.default,
  file: _simpleValue.default,
  function: _simpleValue.default,
  func: _simpleValue.default,
  method: _simpleValue.default,
  implements: _simpleValue.default,
  interface: _simpleValue.default,
  kind: _simpleValue.default,
  lends: _simpleValue.default,
  license: _simpleValue.default,
  memberof: _simpleValue.default,
  'memberof!': _simpleValue.default,
  mixes: _simpleValue.default,
  module: _simpleValue.default,
  name: _simpleValue.default,
  namespace: _simpleValue.default,
  package: _simpleValue.default,
  private: _simpleValue.default,
  protected: _simpleValue.default,
  public: _simpleValue.default,
  readonly: _simpleValue.default,
  requires: _simpleValue.default,
  see: _simpleValue.default,
  since: _simpleValue.default,
  static: _simpleValue.default,
  summary: _simpleValue.default,
  this: _simpleValue.default,
  todo: _simpleValue.default,
  tutorial: _simpleValue.default,
  type: _simpleValue.default,
  variation: _simpleValue.default,
  version: _simpleValue.default,
  enum: _simpleValue.default,
  src: _simpleValue.default,
  description: _description.default,
  desc: _description.default,
  // yields: __yieldsTag,
  // typedef: __typedefTag,
  // throws: __throwsTag,
  return: _return.default,
  param: _param.default,
  property: _param.default,
  prop: _param.default,
  // listens: __listensTag,
  // member: __memberTag,
  // var: __memberTag,
  // event: __eventTag,
  // borrows: __borrowsTag,
  snippet: _snippet.default,
  example: _example.default
});

module.exports = exports.default;