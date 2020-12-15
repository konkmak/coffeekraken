// @ts-nocheck
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name 		SLocalStorageFonts
     * @namespace           sugar.js.class
     * @type    Class
     *
     * This class allows to easily store and load custom fonts from the localStorage
     *
     * @example 	js
     * new SLocalStorageFonts({
     *  	json_path : '/fonts/fonts.json#v1'
     * });
     *
     * // the fonts.json file looks like this
     * {
     * 		"fonts" : [{
     *	  		"font-family" : "Open Sans",
     *	    	"font-weight" : 300,
     *      	"src" : "url(data:application/font-woff;base64,d09GRgA..."
     *      }]
     * }
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    var SLocalStorageFonts = /** @class */ (function () {
        /**
         * @constructor
         * @param 		{Object} 	settings 	The settings
         */
        function SLocalStorageFonts(settings) {
            if (settings === void 0) { settings = {}; }
            /**
             * Settings
             * @type 	{Object}
             */
            this._settings = {
                /**
                 * Store the version of the fonts to load.
                 * Used for cache busting
                 * @setting
                 * @type 		{String}
                 * @default 	1.0
                 */
                version: 1.0,
                /**
                 * Set the json file to load
                 * @setting
                 * @type 		{String}
                 * @default 	/fonts/fonts.json
                 */
                json_path: '/fonts/fonts.json',
                /**
                 * Set if want the debug messages in the console
                 * @setting
                 * @type 		{Boolean}
                 * @default 	false
                 */
                debug: false
            };
            this._settings = __assign(__assign({}, this._settings), settings);
            // init
            this._init();
        }
        /**
         * Init
         */
        SLocalStorageFonts.prototype._init = function () {
            var _this = this;
            // check cachebuster
            var cb = this._settings.json_path.split('#');
            if (cb.length == 2) {
                this._settings.version = cb[1];
                this._settings.json_path = cb[0];
            }
            try {
                this._cache = window.localStorage.getItem('sugar-fonts');
                if (this._cache) {
                    this._cache = JSON.parse(this._cache);
                    if (this._cache.version == this._settings.version) {
                        this._debug('No new version of you fonts');
                        this._insertFonts(this._cache.value);
                    }
                    else {
                        this._debug('New version of your fonts');
                        // busting the cache
                        window.localStorage.removeItem('sugar-fonts');
                        this._cache = null;
                    }
                }
            }
            catch (e) {
                // localstorage not available
                this._debug('Your browser seems to not support the localStorage api');
            }
            // if no cache, load the fonts file
            if (!this._cache) {
                window.addEventListener('load', function (e) {
                    var request = new XMLHttpRequest(), response = undefined;
                    request.open('GET', _this._settings.json_path, true);
                    request.onload = function () {
                        if (request.status == 200) {
                            try {
                                response = JSON.parse(request.responseText);
                                var fontface_1 = '';
                                response.fonts.forEach(function (font) {
                                    fontface_1 += '@font-face{';
                                    for (var prop in font) {
                                        var value = font[prop];
                                        if (prop == 'font-family') {
                                            value = '"' + value + '"';
                                        }
                                        fontface_1 += prop + ':' + value + ';';
                                    }
                                    fontface_1 += '}';
                                });
                                // insert fonts
                                _this._insertFonts(fontface_1);
                                // save fonts in localstorage
                                window.localStorage.setItem('sugar-fonts', JSON.stringify({
                                    version: _this._settings.version,
                                    value: fontface_1
                                }));
                            }
                            catch (e) { }
                        }
                    };
                    request.send();
                });
            }
        };
        /**
         * Insert font
         */
        SLocalStorageFonts.prototype._insertFonts = function (value) {
            this._debug('inserting fonts');
            var style = document.createElement('style');
            style.innerHTML = value;
            document.head.appendChild(style);
        };
        /**
         * Debug
         */
        SLocalStorageFonts.prototype._debug = function () {
            if (this._settings.debug) {
                console.log('SUGAR-LOCALSTORAGEFONTS', arguments);
            }
        };
        return SLocalStorageFonts;
    }());
    // export modules
    exports.default = SLocalStorageFonts;
});
//# sourceMappingURL=SLocalStorageFonts.js.map