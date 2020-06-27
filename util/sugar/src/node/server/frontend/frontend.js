const __sugarConfig = require('../../config/sugar');
const __deepMerge = require('../../object/deepMerge');
const __expressServer = require('../express/express');
const __express = require('express');
const __bladePhp = require('../../template/bladePhp');
const __SNav = require('../../nav/SNav');
const __deepMap = require('../../object/deepMap');
const __packageRoot = require('../../path/packageRoot');
const __packageJson = require(__packageRoot(process.cwd()) + '/package.json');
const __fs = require('fs');
const __path = require('path');
const __ejs = require('ejs');
const __ejsLint = require('ejs-lint');
const tmpDir = require('../../fs/tmpDir');
const __rimraf = require('rimraf');
const tempDirectory = require('temp-dir');

/**
 * @name                express
 * @namespace           node.server.frontend
 * @type                Function
 *
 * This function take care of starting a frontend express based server
 *
 * @param         {Object}          [args={}]         The args object to configure the build process. Check the PhpSCli class definition object for available arguments
 * @return        {express}                       The server instance started
 *
 * @example       js
 * const frontendServer = require('@coffeekraken/sugar/node/server/frontend/frontend');
 * frontendServer({});
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = async (args = {}) => {
  const settings = __deepMerge(__sugarConfig('frontend'), args);
  const server = __expressServer(settings.express);
  let sNavInstance;

  settings.assets = __deepMap(settings.assets, (value, prop) => {
    if (prop === 'path') return value.replace(settings.express.rootDir, '');
    return value;
  });

  // generate menus
  const menuStack = {};
  if (settings.menu) {
    sNavInstance = new __SNav('main', 'Main', []);
    Object.keys(settings.menu).forEach(async (menuName) => {
      // generate the menus
      const generatorObj = settings.menu[menuName].generator;
      menuStack[menuName] = await generatorObj.fn(generatorObj.directory);
      // add the nav to the main navigation
      sNavInstance.addItem(menuStack[menuName]);
    });
  }

  function renderTemplate(string, data = {}) {
    const lintRes = __ejsLint(string);
    if (lintRes) {
      throw new Error(lintRes);
    }
    // rendering the template
    const result = __ejs.render(string, data);
    return result;
  }

  // build the "templateData" object to pass to the render engines
  const templateData = {
    title: __packageJson.name,
    package: __packageJson,
    menuHtml: sNavInstance ? sNavInstance.toHtml() : '',
    settings: settings
  };

  server.get('/', async (req, res) => {
    const indexHtmlPath = __packageRoot(process.cwd()) + '/index.html';
    const indexViewPath = `${__sugarConfig('views.rootDir')}/index.blade.php`;
    if (__fs.existsSync(indexViewPath)) {
      // get the view content
      const viewContent = __fs.readFileSync(
        `${__sugarConfig('views.rootDir')}/index.blade.php`,
        'utf8'
      );

      let view = 'index';
      const tmpDir = __path.resolve(__sugarConfig('views.rootDir'), 'tmp');

      // check if the view does extend a special layout
      if (!viewContent.includes('@extends(')) {
        // make sure we have a tmp dir
        if (!__fs.existsSync(tmpDir)) __fs.mkdirSync(tmpDir);
        // copy the default layout
        __fs.copyFileSync(
          __path.resolve(__dirname, 'views/layouts/main.blade.php'),
          __path.resolve(tmpDir, 'main.blade.php')
        );
        // generate a new view that will extends the default one provided by sugar
        const newViewContent = `
          @extends('tmp.main')
          @section('content')
            ${viewContent}
          @endsection
        `;
        __fs.writeFileSync(
          __path.resolve(tmpDir, 'index.blade.php'),
          newViewContent
        );
        // change the view to render
        view = 'tmp.index';
      }

      // render the view
      let result = await __bladePhp(view, {
        ...templateData
      });

      // remove tmp folder
      __rimraf.sync(tmpDir);

      // render using ejs
      result = renderTemplate(result, {
        ...templateData
      });

      res.send(result);
    } else if (__fs.existsSync(indexHtmlPath)) {
      const content = __fs.readFileSync(indexHtmlPath, 'utf8');
      if (!content.includes('<body')) {
        const baseContent = __fs.readFileSync(
          __dirname + '/static/index.html',
          'utf8'
        );
        const stringToCompile = baseContent.replace('[content]', content);
        const result = renderTemplate(stringToCompile, templateData);
        res.send(result);
      } else {
        const result = renderTemplate(content, templateData);
        res.send(result);
      }
    }
  });

  // loop on pages
  Object.keys(settings.pages).forEach(async (pageName) => {
    const pageSettings = settings.pages[pageName];

    server.get(`${pageSettings.slug}/*`, async (req, res) => {
      try {
        const response = await pageSettings.handler(req, server);

        // handle response
        const view = response.page || 'pages.default';
        const content = response.content || '404';
        const title = response.title || 'Welcome';

        // render the view
        let result = await __bladePhp(view, {
          ...templateData,
          title,
          content
        });

        // render using ejs
        result = renderTemplate(result, {
          ...templateData
        });

        res.send(result);
      } catch (e) {
        console.log(e);
        // res.redirect('/404');
      }
    });
  });
  return server;
};