"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _md = _interopRequireDefault(require("crypto-js/md5"));

var _toString = _interopRequireDefault(require("../string/toString"));

var _parse = _interopRequireDefault(require("../string/parse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __encryptedMessages = {};
/**
 * @name            md5
 * @namespace           sugar.js.crypt
 * @type            Object
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the md5 algorithm
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

var api = {
  /**
   * @name        encrypt
   * @type          Function
   *
   * Encrypt
   *
   * @param       {String}      message         The message to encrypt
   * @return      {String}                      The encrypted string
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  encrypt: function encrypt(message) {
    if (typeof message !== 'string') message = (0, _toString.default)(message);
    var string = (0, _md.default)(message).toString();
    __encryptedMessages[string] = message;
    return string;
  },

  /**
   * @name        decrypt
   * @type        Function
   *
   * Decrypt
   *
   * @param       {String}        message         The message to decrypt
   * @return      {String}                        The decrypted message
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  decrypt: function decrypt(message) {
    if (!__encryptedMessages[message]) {
      console.warn("The message \"".concat(message, "\" cannot be decrypted..."));
      return;
    }

    var string = __encryptedMessages[message];
    delete __encryptedMessages[message];
    return (0, _parse.default)(string);
  }
};
_md.default.encrypt = api.encrypt;
_md.default.decrypt = api.decrypt;
var _default = _md.default;
exports.default = _default;
module.exports = exports.default;