const __packageRoot = require('../src/node/path/packageRoot');
const __packageJson = require('../src/node/package/json');

module.exports = {
  /**
   * @name                useFrontspec
   * @namespace           config.build
   * @type                Boolean
   * @default             false
   *
   * Specify if you want to use the frontspec features (auto import code front frontspec.json files, etc...)
   * for your build process that support it.
   * If the "frontspec" config is setted in a particular build process, it will override this one.
   *
   * @since               2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  useFrontspec: false,

  /**
   * @name          inputDir
   * @namespace     config.build
   * @type          String
   * @default       `${__packageRoot()}/src`
   *
   * Specify the base input directory you want for your build sources.
   * This is used as base for all the build process like js, scss, etc...
   *
   * @since         2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  inputDir: `${__packageRoot()}/src`,

  /**
   * @name          outputDir
   * @namespace     config.build
   * @type          String
   * @default       `${__packageRoot()}/dist`
   *
   * Specify the base output directory you want for your build.
   * This is used as base for all the build process like js, scss, etc...
   *
   * @since         2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  outputDir: `${__packageRoot()}/dist`,

  scss: {
    /**
     * @name              input
     * @namespace         config.build.scss
     * @type              String
     * @default           [config.build.inputDir]/scss/[^_]*.scss
     *
     * Specify the root folder (or file) to check for .scss|sass files to build.
     * Glob patterns can be used
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    input: `[config.build.inputDir]/{css,scss}/[^_]*.scss`,

    /**
     * @name              outputDir
     * @namespace         config.build.scss
     * @type              String
     * @default           [config.build.outputDir]/css
     *
     * Specify the destination folder where to put the compiled files in
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    outputDir: `[config.build.outputDir]/css`,

    /**
     * @name            rootDir
     * @namespace       config.build.scss
     * @type            String
     * @default         __packageRoot()
     *
     * Specify the root directory from where the compiler will try to resolve modules
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    rootDir: __packageRoot(),

    /**
     * @name              style
     * @namespace         config.build.scss
     * @type              String
     * @default           expanded
     * @values            nested,expanded,compact,compressed
     *
     * Specify the output style that you want
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    style: 'expanded',

    /**
     * @name              map
     * @namespace         config.build.scss
     * @type              Boolean
     * @default           true
     *
     * Specify if you want sourcemap files to be generated
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    map: true,

    /**
     * @name              prod
     * @namespace         config.build.scss
     * @type              Boolean
     * @default           false
     *
     * Specify if you want also the <primary>production</primary> versions of the compiled files.
     * The production version are named ```[filename].prod.css```
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    prod: false,

    /**
     * @name              stripComments
     * @namespace         config.build.scss
     * @type              Boolean
     * @default           true
     *
     * Specify if you want to stripComments the generated css or not
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    stripComments: true,

    /**
     * @name              cache
     * @namespace         config.build.scss
     * @type              Boolean
     * @default           true
     *
     * Specify if you want to use the cache system to optimize your compilation time
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    cache: true,

    /**
     * @name              clearCache
     * @namespace         config.build.scss
     * @type              Boolean
     * @default           false
     *
     * Specify if you want to clear the cache before processing to the compilation
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    clearCache: false,

    /**
     * @name              minify
     * @namespace         config.build.scss
     * @type              Boolean
     * @default           false
     *
     * Specify if you want to minify the generated css or not
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    minify: false,

    /**
     * @name                frontspec
     * @namespace           config.build.scss
     * @type                Boolean
     * @default             undefined
     *
     * Specify if you want to use the frontspec features (auto import code front frontspec.json files, etc...)
     * for your scss build process.
     * If setted to undefined, the config.build.frontspec config will be used
     *
     * @since               2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    frontspec: undefined,

    /**
     * @name                sharedResources
     * @namespace           config.build.scss
     * @type                Boolean
     * @default             ['sugar']
     *
     * This options tells the sugar scss compiler which "frameworks" or "toolkit" you want to sharedResources automatically.
     * For now you can specify these:
     * - sugar: Import the coffeekraken sugar scss toolkit in your scss
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    sharedResources: '[config.scss.sharedResources]',

    /**
     * @name              banner
     * @namespace         config.build.scss
     * @type              String
     * @default           /* Compiled using Coffeekraken Sugar SJsCompiler class which stand over the AMAZING esbuild module * /
     *
     * Specify a banner (usually a comment) that you want to put on top of your generated code
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    banner:
      '/* Compiled using Coffeekraken Sugar SScssCompiler class which stand over the AMAZING sass module */',

    /**
     * @name                sass
     * @namespace           config.build.scss
     * @type                Object
     * @default             {}
     *
     * Store the <primary>Sass compiler</primary>(https://www.npmjs.com/package/sass) configuration if you want to override some default ones.
     * Here's the sass compiler settings setted by the ```sugar build.scss``` process:
     * - data (...) {String}: The actual scss data to compile
     * - includePaths ([<inputFolder>, <appRoot>/node_modules]): Specify which folders you want the compiler to inspect for resolving the @imports, etc statements
     * - sourceMap (true) {Boolean}: Specify if you want a sourcemap file to be generated
     * - outFile (<outputFile>) {String}: Specify the output file path for sourcemap generation
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    sass: {}
  },

  fonticons: {
    /**
     * @name              inputDir
     * @namespace         config.build.fonticons
     * @type              String
     * @default           [config.build.inputDir]/icons
     *
     * Specify the directory to use to find icons to build.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    inputDir: `[config.build.inputDir]/icons`,

    /**
     * @name              outputDir
     * @namespace         config.build.fonticons
     * @type              String
     * @default           [config.build.outputDir]/icons
     *
     * Specify the destination folder where to put the compiled files in
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    outputDir: `[config.build.outputDir]/icons`,

    /**
     * @name              watch
     * @namespace         config.build.fonticons
     * @type              String
     * @default           src/icons\/**\/*.svg
     *
     * Set the watch files that you want to check
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    watch: `[config.build.inputDir]/icons/**/*.svg`
  },

  js: {
    /**
     * @name              input
     * @namespace         config.build.js
     * @type              String
     * @default           [config.build.inputDir]/js/*.js
     *
     * Specify the root folder (or file) to check for .js files to build.
     * Glob patterns can be used
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get input() {
      return `[config.build.inputDir]/js/${
        this.bundle === true ? '*' : '**/*'
      }.js`;
    },

    /**
     * @name              outputDir
     * @namespace         config.build.js
     * @type              String
     * @default           [config.build.outputDir]/js
     *
     * Specify the destination folder where to put the compiled files in
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    outputDir: `[config.build.outputDir]/js`,

    /**
     * @name            rootDir
     * @namespace       config.build.js
     * @type            String
     * @default         __packageRoot()
     *
     * Specify the root directory from where the compiler will try to resolve modules
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    rootDir: __packageRoot(),

    /**
     * @name              map
     * @namespace         config.build.js
     * @type              Boolean
     * @default           true
     *
     * Specify if you want sourcemap files to be generated
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    map: true,

    /**
     * @name              bundle
     * @namespace         config.build.js
     * @type              Boolean
     * @default           true
     *
     * Specify if you want to bundle the files together or if you just want to
     * compile each individual files separately
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    bundle: true,

    /**
     * @name              prod
     * @namespace         config.build.js
     * @type              Boolean
     * @default           false
     *
     * Specify if you want also the <primary>production</primary> versions of the compiled files.
     * The production version are named ```[filename].prod.js```
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    prod: false,

    /**
     * @name              format
     * @namespace         config.build.js
     * @type              Boolean
     * @default           iife
     *
     * Specify the format you want as output. Can be **iife**, **cjs** or **esm**
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    format: 'iife',

    /**
     * @name              inject
     * @namespace         config.build.js
     * @type              Array<String>
     * @default           []
     *
     * Specify some files to inject in each processed files. Usefull for shiming, etc...
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    inject: [],

    /**
     * @name              loader
     * @namespace         config.build.js
     * @type              Object
     * @default           {}
     *
     * Specify some loader to use for specifiy extensions. Object format ```{".ext": "loader"}```
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    loader: {},

    /**
     * @name              minify
     * @namespace         config.build.js
     * @type              Boolean
     * @default           false
     *
     * Specify if you want to minify the output generated code or not
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    minify: false,

    /**
     * @name              platform
     * @namespace         config.build.js
     * @type              String
     * @default           browser
     *
     * Specify the platform you want to build the code for. Can be **browser** or **node**
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    platform: 'browser',

    /**
     * @name              target
     * @namespace         config.build.js
     * @type              Array<String>
     * @default           []
     *
     * Specify the target(s) you want. Can be es2020, chrome{version}, firefox{version}, safari{version}, edge{version} or node{version}
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    target: [],

    /**
     * @name              banner
     * @namespace         config.build.js
     * @type              String
     * @default           /* Compiled using Coffeekraken Sugar SJsCompiler class which stand over the AMAZING esbuild module * /
     *
     * Specify a banner (usually a comment) that you want to put on top of your generated code
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    banner:
      '/* Compiled using Coffeekraken Sugar SJsCompiler class which stand over the AMAZING esbuild module */',

    /**
     * @name              mainFields
     * @namespace         config.build.js
     * @type              Array<String>
     * @default           ['browser','main']
     *
     * Specify the list of package.json properties you want the compiler to use to resolve dependencies. The order MATHER
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    mainFields: ['browser', 'main']
  },

  config: {
    /**
     * @name              input
     * @namespace         config.build.config
     * @type              String
     * @default           [config.build.inputDir]/config/*.js
     *
     * Specify the root folder (or file) to check for .config|sass files to build.
     * Glob patterns can be used
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    input: `[config.build.inputDir]/config/*.config.js`,

    /**
     * @name              outputDir
     * @namespace         config.build.config
     * @type              String
     * @default           [config.build.outputDir]/config
     *
     * Specify the destination folder where to put the compiled files in
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    outputDir: `[config.build.outputDir]/config`,

    /**
     * @name              watch
     * @namespace         config.build.config
     * @type              String
     * @default           src/config\/**\/*.config.js
     *
     * Set the watch files that you want to check
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    watch: `[config.build.inputDir]/config/**/*.config.js`
  },

  docMap: {
    /**
     * @name         input
     * @namespace     config.build.docMap
     * @type          String
     * @default       ${__packageRoot()/src/*\*\/\*}
     *
     * Specify the rootDir where to start for the docMap generation
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    input: [
      // `[config.build.inputDir]/**/*:@namespace`,
      `${__packageRoot()}/README.md`
    ],

    /**
     * @name          externalDocMaps
     * @namespace     config.build.docMap
     * @type          String|Array<String>
     * @default       ['node_modules/*\/docMap.json', 'node_modules\/*\/*\/this.docMap.json']
     *
     * Specify some glob patterns where to search for some docMap.json files to integrate into our docMap
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    externalDocMaps: [
      `${__packageRoot()}/node_modules/*/docMap.json`,
      `${__packageRoot()}/node_modules/*/*/docMap.json`
    ],

    /**
     * @name          output
     * @namespace     config.build.docMap
     * @type          String
     * @default       [config.build.outputDir]/docMap.json
     *
     * Specify where you want to save the docMap data
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    output: `[config.build.outputDir]/docMap.json`,

    /**
     * @name              watch
     * @namespace         config.build.docMap
     * @type              String
     * @default           src/config\/**\/*.config.js
     *
     * Set the watch files that you want to check
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    watch: `[config.build.inputDir]/**/*.{js,css}`
  },

  views: {
    /**
     * @name              input
     * @namespace         views.build.views
     * @type              String
     * @default           [config.build.inputDir]/views/*.*
     *
     * Specify the root folder (or file) to check for .views|sass files to build.
     * Glob patterns can be used
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    input: `[config.build.inputDir]/views/**/*.*`,

    /**
     * @name              outputDir
     * @namespace         views.build.views
     * @type              String
     * @default           [config.build.outputDir]/views
     *
     * Specify the destination folder where to put the compiled files in
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    outputDir: `[config.build.outputDir]/views`,

    /**
     * @name              watch
     * @namespace         views.build.views
     * @type              String
     * @default           src/views\/**\/*.*
     *
     * Set the watch files that you want to check
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    watch: `[config.build.inputDir]/views/**/*.*`
  },

  frontspec: {
    /**
     * @name              outputDir
     * @namespace         config.build.frontspec
     * @type              String
     * @default           [config.build.outputDir]
     *
     * Specify the destination folder where to put the frontspec.json file in
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    outputDir: `[config.build.outputDir]`,

    /**
     * @name            filename
     * @namespace       config.build.frontspec
     * @type            String
     * @default         frontspec.json
     *
     * Specify the filename that the frontspec output file must have
     *
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    filename: 'frontspec.json',

    /**
     * @name            search
     * @namespace       config.build.frontspec
     * @type            String
     * @default         *.spec.{json,js}
     *
     * Specify the search pattern used by the glob process to find spec files
     *
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    search: '?(*.)frontspec.{json,js}',

    /**
     * @name            sources
     * @namespace       config.build.frontspec
     * @type            Object
     * @default         ...
     *
     * Specify the sources where to look at *.spec.{js,json} files
     *
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    sources: {
      root: {
        rootDir: '[config.build.inputDir]',
        dirDepth: 5,
        search: '*.frontspec.{json,js}'
      },
      nodeModules: {
        rootDir: `${__packageRoot()}/node_modules`,
        dirDepth: 3,
        search: 'frontspec.{json,js}'
      },
      sugar: {
        rootDir: `${__packageRoot()}/node_modules/@coffeekraken/sugar`,
        dirDepth: 3,
        search: 'frontspec.{json,js}'
      }
    },

    /**
     * @name            dirDepth
     * @namespace       config.build.frontspec
     * @type            String
     * @default         3
     *
     * Specify the number of folders the scanning process will go down
     *
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    dirDepth: 3,

    /**
     * @name            cache
     * @namespace       config.build.frontspec
     * @type            String
     * @default         false
     *
     * Specify if the build frontspec file process will take advantage of some cache or not
     *
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    cache: false
  }
};