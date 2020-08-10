"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

const __SActionsStream = require('../../stream/SActionsStream');

const __deepMerge = require('../../object/deepMerge');

const __SFsFilesResolverStreamAction = require('../../stream/actions/SFsFilesResolverStreamAction');

const __SDocMapStreamAction = require('./actions/SDocMapStreamActions');

const __SFsOutputStreamAction = require('../../stream/actions/SFsOutputStreamAction');
/**
 * @name            SBuildDocMapActionsStream
 * @namespace           node.build.docMap
 * @type            Class
 * @extends         SActionsStream
 *
 * This class represent a pre-configured action stream to build easily some javascript files
 *
 * @param           {Object}          [settings={}]         The settings object to configure your instance
 *
 * @todo        Document the streamObj required properties
 *
 * @example         js
 * const SBuildDocMapActionsStream = require('@coffeekraken/sugar/node/build/doc/SBuildDocMapActionsStream');
 * const myStream = new SBuildDocMapActionsStream();
 * myStream.start({
 *    input: '...',
 *    output: '...'
 * }).on('resolve', (result) => {
 *    // do something
 * });
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = /*#__PURE__*/function (_SActionsStream) {
  _inherits(SBuildDocMapActionsStream, _SActionsStream);

  var _super = _createSuper(SBuildDocMapActionsStream);

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SBuildDocMapActionsStream(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SBuildDocMapActionsStream);

    // init actions stream
    return _super.call(this, {
      filesResolver: __SFsFilesResolverStreamAction,
      docMap: __SDocMapStreamAction,
      fsOutput: __SFsOutputStreamAction
    }, __deepMerge({
      name: 'Build docMap.json file',
      actions: {
        filesResolver: {
          ignoreFolders: [],
          out: 'property'
        }
      },
      beforeActions: {
        fsOutput: streamObj => {
          if (!streamObj.outputStack) streamObj.outputStack = {};

          if (streamObj.output && streamObj.data) {
            streamObj.outputStack.data = streamObj.output;
          }

          return streamObj;
        }
      }
    }, settings));
  }

  return SBuildDocMapActionsStream;
}(__SActionsStream);