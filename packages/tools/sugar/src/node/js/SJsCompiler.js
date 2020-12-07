"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const esbuild_1 = __importDefault(require("esbuild"));
const buildInNodeModules_1 = __importDefault(require("../module/buildInNodeModules"));
const resolve_1 = __importDefault(require("resolve"));
const filter_1 = __importDefault(require("../object/filter"));
const SBuildJsInterface_1 = __importDefault(require("./build/interface/SBuildJsInterface"));
const esbuildScssLoaderPlugin_1 = __importDefault(require("./build/plugins/esbuild/esbuildScssLoaderPlugin"));
/**
 * @name                SJsCompiler
 * @namespace           sugar.node.js
 * @type                Class
 * @wip
 *
 * This class wrap the "esbuild" compiler with some additional features to compile your js files
 * quicky and efficiently
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 * @feature         2.0.0       Optimize the render time as much as 10-100x faster
 *
 * @param           {Object}            [settings={}]       An object of settings to configure your instance
 * *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SJsCompiler from '@coffeekraken/sugar/node/scss/SJsCompiler';
 * const compiler = new SJsCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.scss');
 * const compiledCode = await compiler.compile(`
 *      \@include myCoolMixin();
 * `);
 *
 * @see             https://github.com/evanw/esbuild
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let _rootDir;
module.exports = (_a = class SJsCompiler {
        /**
         * @name            constructor
         * @type             Function
         * @constructor
         *
         * Constructor
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(settings = {}) {
            /**
             * @name            _settings
             * @type            Object
             * @private
             *
             * Store the instance settings
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this._settings = {};
            this._settings = deepMerge_1.default(Object.assign(Object.assign({ id: this.constructor.name }, SBuildJsInterface_1.default.getDefaultValues()), { plugins: [] }), settings);
            this._settings.plugins.unshift(this.constructor._resolverPlugin);
            this._settings.plugins.unshift(esbuildScssLoaderPlugin_1.default);
            // prod
            if (this._settings.prod) {
                this._settings.bundle = true;
                this._settings.minify = true;
            }
        }
        /**
         * @name              compile
         * @type              Function
         * @async
         *
         * This method is the main one that allows you to actually compile the
         * code you pass either inline, either a file path.
         *
         * @param         {String}            filePath          The source you want to compile. Must be a file path
         * @param         {Object}            [settings={}]       An object of settings to override the instance ones
         * @return        {SPromise}                          An SPromise instance that will be resolved (or rejected) when the compilation is finished
         *
         * @since             2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        compile(filePath, settings = {}) {
            return new SPromise_1.default((resolve, reject, trigger, cancel) => __awaiter(this, void 0, void 0, function* () {
                settings = deepMerge_1.default(this._settings, settings);
                _rootDir = settings.rootDir;
                const banner = settings.banner || '';
                settings = filter_1.default(settings, (key, value) => {
                    if (Array.isArray(value) && !value.length)
                        return false;
                    return this.constructor._esbuildAcceptedSettings.indexOf(key) !== -1;
                });
                const startTime = Date.now();
                const buildService = yield esbuild_1.default.startService();
                buildService
                    .build(Object.assign(Object.assign({}, settings), { entryPoints: [filePath], logLevel: 'silent', write: false, sourcemap: settings.map, charset: 'utf8' }))
                    .then((resultObj) => {
                    // resolve with the compilation result
                    resolve({
                        js: `
                ${banner}
                let process = {};
                ${resultObj.outputFiles[0].text}
              `,
                        startTime: startTime,
                        endTime: Date.now(),
                        duration: Date.now() - startTime
                    });
                });
            }), {
                id: this._settings.id
            });
        }
    },
    /**
     * @name            _resolverPlugin
     * @type            Object
     * @static
     *
     * ESBuild resolver plugin
     *
     * @since       2.0.0
     */
    _a._resolverPlugin = {
        name: 'SFrontendServerEsBuildResolvePlugin',
        setup(build) {
            Object.keys(buildInNodeModules_1.default).forEach((path) => {
                const builtInObj = buildInNodeModules_1.default[path];
                if (builtInObj.polyfill && builtInObj.polyfill.browser) {
                    build.onResolve({ filter: new RegExp(`^${path}$`) }, (args) => {
                        let resolvedPath = resolve_1.default.sync(builtInObj.polyfill.browser, {
                            basedir: _rootDir,
                            moduleDirectory: ['node_modules'],
                            includeCoreModules: false,
                            preserveSymlinks: true,
                            packageFilter: (pkg, dir) => {
                                if (pkg.browser) {
                                    if (typeof pkg.browser === 'string') {
                                        pkg.main = pkg.browser;
                                    }
                                    else if (typeof pkg.browser === 'object') {
                                        pkg.main = pkg.browser[Object.keys(pkg.browser)[0]];
                                    }
                                }
                                return pkg;
                            }
                        });
                        return { path: resolvedPath };
                    });
                }
            });
        }
    },
    /**
     * @name            _esbuildAcceptedSettings
     * @type            Array
     * @static
     *
     * This static property store all the accepted esbuild options keys
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _a._esbuildAcceptedSettings = [
        'bundle',
        'define',
        'external',
        'format',
        'globalName',
        'inject',
        'jsxFactory',
        'jsxFragment',
        'platform',
        'loader',
        'minify',
        'outdir',
        'outfile',
        'sourcemap',
        'target',
        'write',
        'avoidTDZ',
        // 'banner',
        'charset',
        'color',
        'errorLimit',
        'footer',
        'keepNames',
        'logLevel',
        'mainFields',
        'metafile',
        'outExtension',
        'plugins',
        'outbase',
        'publicPath',
        'pure',
        'resolveExtensions',
        'sourcefile',
        'stdin',
        'tsconfig',
        'tsconfigRaw'
    ],
    _a);
//# sourceMappingURL=SJsCompiler.js.map