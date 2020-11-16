"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = __toPlainObject => {
  var MyClass = /*#__PURE__*/function () {
    function MyClass(name) {
      _classCallCheck(this, MyClass);

      _defineProperty(this, "_settings", {
        hello: 'world'
      });

      this._name = name;
    }

    _createClass(MyClass, [{
      key: "testing",
      value: function testing(value) {
        this._plop = value;
      }
    }]);

    return MyClass;
  }();

  var myInstance = new MyClass('coffeekraken');
  myInstance.testing('hello');
  describe('sugar.js.class.toPlainObject', () => {
    it('Should convert a simple custom class instance into a plain object', () => {
      var plainObject = __toPlainObject(myInstance);

      expect(plainObject).toEqual({
        _settings: {
          hello: 'world'
        },
        _name: 'coffeekraken',
        _plop: 'hello'
      });
    });
  });
};