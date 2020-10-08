"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _parseRgba = _interopRequireDefault(require("./parseRgba"));

var _parseHsl = _interopRequireDefault(require("./parseHsl"));

var _parseHsv = _interopRequireDefault(require("./parseHsv"));

var _rgba2hex = _interopRequireDefault(require("./rgba2hex"));

var _hex2rgba = _interopRequireDefault(require("./hex2rgba"));

var _hsv2rgba = _interopRequireDefault(require("./hsv2rgba"));

var _hsl2rgba = _interopRequireDefault(require("./hsl2rgba"));

var _rgba2hsv = _interopRequireDefault(require("./rgba2hsv"));

var _rgba2hsl = _interopRequireDefault(require("./rgba2hsl"));

var _parse2 = _interopRequireDefault(require("./parse"));

var _convert = _interopRequireDefault(require("./convert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name 		SColor
 * @namespace           sugar.js.color
 * @type    Class
 *
 * Class that provide complete and simple to use color manupilation capabilities like:
 * - Modifiers
 * 	- opacity
 * 	- darken
 * 	- lighten
 * 	- desaturate
 * 	- saturate
 * 	- spin (change hue)
 * 	- transparentize
 * 	- alpha
 * 	- grayscale
 * - Conversions
 * 	- rgba
 * 	- hsl
 * 	- hsv
 * 	- hex
 * - Print out formats
 * 	- toRgbaString
 * 	- toHslString
 * 	- toHsvString
 * 	- toHexString
 * 	- toString(format = null)
 *
 * @example 	js
 * import SColor from '@coffeekraken/sugar/js/classes/SColor'
 * let myColor = new SColor(#ff0000);
 * // get a lighter color
 * let ligtherColor = myColor.lighten(20);
 * // print the color to rgba
 * console.log(lighterColor.toRgbaString());
 *
 * @since     2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var SColor = /*#__PURE__*/function () {
  /**
   * @name                colors
   * @type                Object
   * @protected
   * @static
   *
   * Static color names map
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                _originalSColor
   * @type                Object
   * @private
   *
   * Original color value
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name            _r
   * @type            Number
   * @private
   *
   * Internal red value
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                _g
   * @type                Number
   * @private
   *
   * Internal green value
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                  _b
   * @type                  Number
   * @private
   *
   * Internal blue value
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name              _a
   * @type              Number
   * @private
   *
   * Internal alpha value
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                  _settings
   * @type                  Object
   * @private
   *
   * Store the settings passed to the constructor. Here's the list of available settings:
   * - returnNewInstance (false) {Boolean}: Specify if you want by default a new instance back when calling methods like "saturate", "desaturate", etc...
   * - defaultFormat (hex) {String}: Specify the default format for this instance. This is used in the "toString" method for example...
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                  constructor
   * @type                  Function
   *
   * Constructor
   *
   * @param   {object}    color     The color description like (#ff0000 | rgba(...) | hsl(...) | hsv(...) | {r:255,r:140,b:23,a:40})
   * @param       {Object}        [settings={}]         The settings to configure the SColor instance. Here's the available settings:
   * - returnNewInstance (false) {Boolean}: Specify if you want by default a new instance back when calling methods like "saturate", "desaturate", etc...
   * - defaultFormat (hex) {String}: Specify the default format for this instance. This is used in the "toString" method for example...
   * @return    {object}            The color instance
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SColor(color, settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SColor);

    _defineProperty(this, "_originalSColor", null);

    _defineProperty(this, "_r", null);

    _defineProperty(this, "_g", null);

    _defineProperty(this, "_b", null);

    _defineProperty(this, "_a", 1);

    _defineProperty(this, "_settings", {});

    // save the instance settings
    this._settings = (0, _deepMerge.default)({
      returnNewInstance: false,
      defaultFormat: 'hex'
    }, settings); // get the actual real color

    color = this.getColor(color); // save the original color

    this._originalSColor = color; // parse the input color to
    // split into rgba values

    this._parse(color);
  }
  /**
   * @name            getColor
   * @type            Function
   *
   * This method take as parameter the passed color to the constructor and has to return the
   * actual real color like color from the static colors listed in the SColor class or maybe
   * from the Sugar configured colors
   */


  _createClass(SColor, [{
    key: "getColor",
    value: function getColor(color) {
      // try to get the color from the map
      if (typeof color == 'string' && SColor.colors[color.toLowerCase()]) {
        return SColor.colors[color.toLowerCase()];
      } // return the passed color


      return color;
    }
    /**
     * @name            _parse
     * @type            Function
     * @private
     *
     * Parse
     *
     * @param       {object}      color       The color to parse like (#ff0000 | rgba(...) | hsl(...) | hsv(...) | {r:255,r:140,b:23,a:40})
     * @return      {object}                  The rgba representation of the passed color
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_parse",
    value: function _parse(color) {
      // parse the color
      color = (0, _convert.default)(color, 'rgba'); // assign new color values

      this.r = color.r;
      this.g = color.g;
      this.b = color.b;
      this.a = color.a; // return the parsed color

      return color;
    }
    /**
     * @name              convert2
     * @type              Function
     * @private
     *
     * Concert color
     *
     * @param       	{string}      	format 	      	The format wanted as output like (rgba,hsl,hsv and hex)
     * @values        rgba, hsl, hsv, hex
     * @return      	{object} 	                			The color in wanted object format
     *
     * @example           js
     * myColor._convert2('rgba');
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_convert2",
    value: function _convert2(format) {
      switch (format) {
        case 'rgba':
          return {
            r: this.r,
            g: this.g,
            b: this.b,
            a: this.a
          };
          break;

        case 'hsl':
          return (0, _rgba2hsl.default)(this.r, this.g, this.b, this.a);
          break;

        case 'hsv':
          return (0, _rgba2hsv.default)(this.r, this.g, this.b, this.a);
          break;

        case 'hex':
          return (0, _rgba2hex.default)(this.r, this.g, this.b, this.a);
          break;
      }
    }
    /**
     * @name                toHex
     * @type                Function
     *
     * To hex
     *
     * @return 	{string} 		The hex string representation
     *
     * @example           js
     * myColor.toHex();
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "toHex",
    value: function toHex() {
      return this._convert2('hex');
    }
    /**
     * @name            toHsl
     * @type            Function
     *
     * To hsl
     *
     * @return 	{object} 		The hsl object representation
     *
     * @example       js
     * myColor.toHsl();
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "toHsl",
    value: function toHsl() {
      return this._convert2('hsl');
    }
    /**
     * @name              toHsv
     * @type              Function
     *
     * To hsv
     *
     * @return 	{object} 		The hsv object representation
     *
     * @example         js
     * myColor.toHsv();
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "toHsv",
    value: function toHsv() {
      return this._convert2('hsv');
    }
    /**
     * @name            toRgba
     * @type            Function
     *
     * To rgba
     *
     * @return 	{object} 		The rgba object representation
     *
     * @example         js
     * myColor.toRgba();
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "toRgba",
    value: function toRgba() {
      return this._convert2('rgba');
    }
    /**
     * @name            r
     * @type            Number
     *
     * Get/set the red value
     *
     * @example         js
     * myColor.r;
     * myColor.r = 128;
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "reset",

    /**
     * @name          reset
     * @type          Function
     *
     * Reset to the original color
     *
     * @example         js
     * myColor.reset();
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    value: function reset() {
      // parse again the color
      this._parse(this._originalSColor);
    }
    /**
     * @name                desaturate
     * @type                Function
     *
     * Desaturate
     *
     * @param         	{Number} 	          amount 	        	The amount of desaturation wanted between 0-100
     * @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return 	        {SColor} 			                      	A new SColor instance or the actual one
     *
     * @example           js
     * myColor.desaturate(20);
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "desaturate",
    value: function desaturate(amount, returnNewInstance) {
      if (returnNewInstance === void 0) {
        returnNewInstance = this._settings.returnNewInstance;
      }

      amount = parseInt(amount);

      if (returnNewInstance) {
        var n = new SColor(this.toHex());
        n.s -= amount;
        return n;
      }

      this.s -= amount;
      return this;
    }
    /**
     * @name                saturate
     * @type                Function
     *
     * Saturate
     *
     * @param         	{Number}        	amount 	            	The amount of saturation wanted between 0-100
     * @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return 	        {SColor} 			                         	A new SColor instance or the actual one
     *
     * @example         js
     * myColor.saturate(20);
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "saturate",
    value: function saturate(amount, returnNewInstance) {
      if (returnNewInstance === void 0) {
        returnNewInstance = this._settings.returnNewInstance;
      }

      amount = parseInt(amount);

      if (returnNewInstance) {
        var n = new SColor(this.toHex());
        n.s += amount;
        return n;
      }

      this.s += amount;
      return this;
    }
    /**
     * @name                      grayscale
     * @type                      Function
     *
     * Return a new SColor instance of the color to grayscale
     *
     * @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return 	{SColor} 			A new SColor instance or the actual one
     *
     * @example           js
     * myColor.grayscale();
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "grayscale",
    value: function grayscale(returnNewInstance) {
      if (returnNewInstance === void 0) {
        returnNewInstance = this._settings.returnNewInstance;
      }

      if (returnNewInstance) {
        var n = new SColor(this.toHex());
        n.s = 0;
        return n;
      }

      this.s = 0;
      return this;
    }
    /**
     * @name              spin
     * @type              Function
     *
     * Spin the hue on the passed value (max 360)
     *
     * @param             	{Number}            	amount 		          	The amount of hue spin wanted between 0-360
     * @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return 	            {SColor} 				                          	A new SColor instance or the actual one
     *
     * @example           js
     * myColor.spin(230);
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "spin",
    value: function spin(amount, returnNewInstance) {
      if (returnNewInstance === void 0) {
        returnNewInstance = this._settings.returnNewInstance;
      }

      amount = parseInt(amount);
      var hue = this.h;
      var newHue = hue + amount;

      if (newHue > 360) {
        newHue -= 360;
      }

      if (returnNewInstance) {
        var n = new SColor(this.toHex());
        n.h = newHue;
        return n;
      }

      this.h = newHue;
      return this;
    }
    /**
     * @name              transparentize
     * @type              Function
     *
     * Transparentize
     *
     * @param             	{Number} 	          	amount 		          	The amount of transparence to apply between 0-100|0-1
     * @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return            	{SColor} 					                        	A new SColor instance or the actual one
     *
     * @example           js
     * myColor.transparenize(30);
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "transparentize",
    value: function transparentize(amount, returnNewInstance) {
      if (returnNewInstance === void 0) {
        returnNewInstance = this._settings.returnNewInstance;
      }

      amount = parseFloat(amount);

      if (returnNewInstance) {
        var n = new SColor(this.toHex());
        n.a -= amount;
        return n;
      }

      this.a -= amount;
      return this;
    }
    /**
     * @name                alpha
     * @type                Function
     *
     * Set the alpha
     *
     * @param           	{Number} 	            alpha 		            	The new alpha value to apply between 0-100|0-1
     * @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return          	{SColor} 					                            A new SColor instance or the actual one
     *
     * @example           js
     * myColor.alpha(10);
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "alpha",
    value: function alpha(_alpha, returnNewInstance) {
      if (returnNewInstance === void 0) {
        returnNewInstance = this._settings.returnNewInstance;
      }

      _alpha = parseFloat(_alpha);

      if (returnNewInstance) {
        var n = new SColor(this.toHex());
        n.a = _alpha;
        return n;
      }

      this.a = _alpha;
      return this;
    }
    /**
     * @name                  opacity
     * @type                  Function
     *
     * Set the opacity (alias for alpha)
     *
     * @param 	                {Number}          	opacity 	              	The new opacity value to apply between 0-100|0-1
     * @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return                	{SColor} 			                            		A new SColor instance or the actual one
     *
     * @example               js
     * myColor.opacity(20);
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "opacity",
    value: function opacity(_opacity, returnNewInstance) {
      if (returnNewInstance === void 0) {
        returnNewInstance = this._settings.returnNewInstance;
      }

      return this.alpha(_opacity, returnNewInstance);
    }
    /**
     * @name                  opacify
     * @type                  Function
     *
     * Opacify
     *
     * @param 	          {Number} 	            amount 		              The amount of transparence to remove between 0-100|0-1
     * @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return          	{SColor} 			                              	A new SColor instance or the actual one
     *
     * @example           js
     * myColor.opacify(18);
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "opacify",
    value: function opacify(amount, returnNewInstance) {
      if (returnNewInstance === void 0) {
        returnNewInstance = this._settings.returnNewInstance;
      }

      amount = parseFloat(amount);

      if (returnNewInstance) {
        var n = new SColor(this.toHex());
        n.a += amount;
        return n;
      }

      this.a += amount;
      return this;
    }
    /**
     * @name                  darken
     * @type                  Function
     *
     * Darken
     *
     * @param                 	{Number} 	                amount 	                	The amount of darkness (of the nightmare of the shadow) to apply between 0-100
     * @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return                	{SColor} 				                                    A new SColor instance or the actual one
     *
     * @example             js
     * myColor.darken(20);
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "darken",
    value: function darken(amount, returnNewInstance) {
      if (returnNewInstance === void 0) {
        returnNewInstance = this._settings.returnNewInstance;
      }

      amount = parseInt(amount);

      if (returnNewInstance) {
        var n = new SColor(this.toHex());
        n.l -= amount;
        return n;
      }

      this.l -= amount;
      return this;
    }
    /**
     * @name                      lighten
     * @type                      Function
     *
     * Lighten
     *
     * @param 	              {Number} 	              amount 	                	The amount of lightness (of the sky of the angels) to apply between 0-100
     * @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return                	{SColor} 			                                  	A new SColor instance or the actual one
     *
     * @example             js
     * myColor.lighten(20);
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "lighten",
    value: function lighten(amount, returnNewInstance) {
      if (returnNewInstance === void 0) {
        returnNewInstance = this._settings.returnNewInstance;
      }

      amount = parseInt(amount);

      if (returnNewInstance) {
        var n = new SColor(this.toHex());
        n.l += amount;
        return n;
      }

      this.l += amount;
      return this;
    }
    /**
     * @name                  toHexString
     * @type                  Function
     *
     * To hex string
     *
     * @return 	            {string} 	              	The hex string representation of the color
     *
     * @example           js
     * myColor.toHexString();
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "toHexString",
    value: function toHexString() {
      return this._convert2('hex');
    }
    /**
     * @name                  toRgbaString
     * @type                  Function
     *
     * To rgba string
     *
     * @return 	              {string} 	              	The rgba string representation of the color
     *
     * @example           js
     * myColor.toRgbaString();
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "toRgbaString",
    value: function toRgbaString() {
      return "rgba(".concat(this._r, ",").concat(this._g, ",").concat(this._b, ",").concat(this._a, ")");
    }
    /**
     * @name                    toHslString
     * @type                    Function
     *
     * To hsl string
     *
     * @return 	              {string} 	              	The hsl string representation of the color
     *
     * @example             js
     * myColor.toHslString();
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "toHslString",
    value: function toHslString() {
      var hsl = this._convert2('hsl');

      return "hsl(".concat(hsl.h, ",").concat(hsl.s, ",").concat(hsl.l, ")");
    }
    /**
     * @name                      toHsvString
     * @type                      Function
     *
     * To hsv string
     *
     * @return              	{string} 	              	The hsv string representation of the color
     *
     * @example           js
     * myColor.toHsvString();
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "toHsvString",
    value: function toHsvString() {
      var hsv = this._convert2('hsv');

      return "hsv(".concat(hsv.h, ",").concat(hsv.s, ",").concat(hsv.v, ")");
    }
    /**
     * @name                toString
     * @type                Function
     *
     * To string
     *
     * @param       {String}              [format=this._settings.defaultFormat]                The format you want back
     * @values        hex,hsl,hsv,rgba
     * @return 	      {string} 		                                                      The rgba string representation of the color
     *
     * @example         js
     * myColor.toString();
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "toString",
    value: function toString(format) {
      if (format === void 0) {
        format = this._settings.defaultFormat;
      }

      switch (format) {
        case 'hex':
          return this.toHexString();
          break;

        case 'hsl':
          return this.toHslString();
          break;

        case 'hsv':
          return this.toHsvString();
          break;

        case 'rgba':
        default:
          return this.toRgbaString();
          break;
      }
    }
  }, {
    key: "r",
    get: function get() {
      return this._r;
    },
    set: function set(value) {
      value = parseInt(value);
      value = value > 255 ? 255 : value;
      this._r = value;
    }
    /**
     * @name              g
     * @type              Number
     *
     * Get/set the green value
     *
     * @example         js
     * myColor.g;
     * myColor.g = 20;
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "g",
    get: function get() {
      return this._g;
    },
    set: function set(value) {
      value = parseInt(value);
      value = value > 255 ? 255 : value;
      this._g = value;
    }
    /**
     * @name              b
     * @type              Number
     *
     * Get/set the blue value
     *
     * @example           js
     * myColor.b;
     * myColor.b = 30;
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "b",
    get: function get() {
      return this._b;
    },
    set: function set(value) {
      value = parseInt(value);
      value = value > 255 ? 255 : value;
      this._b = value;
    }
    /**
     * @name              a
     * @type              Number
     *
     * Get/set the alpha value
     *
     * @example       js
     * myColor.a;
     * myColor.a = 20;
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "a",
    get: function get() {
      return this._a;
    },
    set: function set(value) {
      value = parseFloat(value);
      value = value > 1 ? 1 / 100 * value : value;
      value = value > 1 ? 1 : value;
      this._a = value;
    }
    /**
     * @name              l
     * @type              Number
     *
     * The luminence value
     *
     * @example             js
     * myColor.l;
     * myColor.l = 10;
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "l",
    get: function get() {
      return this._convert2('hsl').l;
    },
    set: function set(value) {
      var hsl = this._convert2('hsl');

      value = parseInt(value);
      value = value > 100 ? 100 : value;
      hsl.l = value;
      var rgba = (0, _hsl2rgba.default)(hsl.h, hsl.s, hsl.l);
      this.r = rgba.r;
      this.g = rgba.g;
      this.b = rgba.b;
    }
    /**
     * @name              s
     * @type              Number
     *
     * The saturation value
     *
     * @example         js
     * myColor.s;
     * myColor.s = 20;
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "s",
    get: function get() {
      return this._convert2('hsl').s;
    },
    set: function set(value) {
      var hsl = this._convert2('hsl');

      value = parseInt(value);
      value = value > 100 ? 100 : value;
      hsl.s = value;
      var rgba = (0, _hsl2rgba.default)(hsl.h, hsl.s, hsl.l);
      this.r = rgba.r;
      this.g = rgba.g;
      this.b = rgba.b;
    }
    /**
     * @name                  v
     * @type                  Number
     *
     * The value of the HSV format
     *
     * @example         js
     * myColor.v;
     * myColor.v = 20;
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "v",
    get: function get() {
      return this._convert2('hsv').v;
    },
    set: function set(value) {
      var hsv = this._convert2('hsv');

      value = parseInt(value);
      value = value > 100 ? 100 : value;
      hsv.v = value;
      var rgba = (0, _hsv2rgba.default)(hsv.h, hsv.s, hsv.v);
      this.r = rgba.r;
      this.g = rgba.g;
      this.b = rgba.b;
    }
    /**
     * @name              h
     * @type              Number
     *
     * Get/set the hue
     *
     * @example         js
     * myColor.h;
     * myColor.h = 30;
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "h",
    get: function get() {
      return this._convert2('hsl').h;
    },
    set: function set(value) {
      var hsl = this._convert2('hsl');

      value = parseInt(value);
      value = value > 360 ? 360 : value;
      hsl.h = value;
      var rgba = (0, _hsl2rgba.default)(hsl.h, hsl.s, hsl.l);
      this.r = rgba.r;
      this.g = rgba.g;
      this.b = rgba.b;
    }
  }]);

  return SColor;
}(); // // inject sugar css colors into class
// __domReady(() => {
//   // get settings
//   if (!__settings || !__settings.colors) return;
//   // loop on each colors
//   for (let colorName in __settings.colors) {
//     const color = __settings.colors[colorName];
//     if (!color) return;
//     if (color.color) {
//       SColor.colors[colorName] = color.color;
//     }
//     // modifiers
//     if (color.modifiers) {
//       // loop on modifiers
//       for (let modifierName in color.modifiers) {
//         const modifierColor = color.modifiers[modifierName];
//         SColor.colors[`${colorName}--${modifierName}`] = modifierColor;
//       }
//     }
//   }
// });
// export class


_defineProperty(SColor, "colors", {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  'indianred ': '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgrey: '#d3d3d3',
  lightgreen: '#90ee90',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370d8',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#d87093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32'
});

var _default = SColor;
exports.default = _default;
module.exports = exports.default;