// @ts-nocheck

import __path from 'path';
import __upperFirst from '../../string/upperFirst';
import __SBlessedComponent from '../../blessed/SBlessedComponent';
import __sugarHeading from '../../ascii/sugarHeading';
import __sugarConfig from '../../config/sugar';
import __blessed from 'blessed';
import __parseHtml from '../../terminal/parseHtml';
import __countLine from '../../string/countLine';
import __SBlessedOutput from '../../blessed/SBlessedOutput';
import __color from '../../color/color';
import __hotkey from '../../keyboard/hotkey';
import __packageJson from '../../package/json';
import __SNotification from '../../blessed/notification/SNotification';
import __ora from 'ora';
import __SIpc from '../../ipc/SIpc';

/**
 * @name                SSugarAppTerminalUi
 * @namespace           sugar.node.ui.sugar
 * @type                Class
 * @extends             SBlessedComponent
 * @wip
 *
 * This class represent the Sugar UI interface in the terminal.
 *
 * @param           {SPromise}          source        The source from where to get data
 * @param           {Object}          [initialParams={}]        An object of initial params
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SSugarAppTerminalUi extends __SBlessedComponent {
  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(source: any, initialParams = {}) {
    super({
      screen: true
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_sources' does not exist on type 'SSugar... Remove this comment to see the full error message
    this._sources = source;
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_initialParams' does not exist on type '... Remove this comment to see the full error message
    this._initialParams = Object.assign({}, initialParams);

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_settings' does not exist on type 'SSuga... Remove this comment to see the full error message
    this._settings = __sugarConfig('sugar-app');
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_serverSettings' does not exist on type ... Remove this comment to see the full error message
    this._serverSettings = this._initialParams.modules[
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_settings' does not exist on type 'SSuga... Remove this comment to see the full error message
      this._settings.welcome.serverModule
    ];
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_modules' does not exist on type 'SSugar... Remove this comment to see the full error message
    this._modules = this._settings.modules;

    // @ts-expect-error ts-migrate(2339) FIXME: Property '$welcome' does not exist on type 'SSugar... Remove this comment to see the full error message
    this.$welcome = this._initWelcome(initialParams);
    // @ts-expect-error ts-migrate(2339) FIXME: Property '$modules' does not exist on type 'SSugar... Remove this comment to see the full error message
    this.$modules = this._initConsoles();
    // @ts-expect-error ts-migrate(2339) FIXME: Property '$bottomBar' does not exist on type 'SSug... Remove this comment to see the full error message
    this.$bottomBar = this._initBottomBar();

    __hotkey('escape').on('press', () => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '$modules' does not exist on type 'SSugar... Remove this comment to see the full error message
      if (this.$modules.parent) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '$modules' does not exist on type 'SSugar... Remove this comment to see the full error message
        this.$modules.detach();
      }
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_modules' does not exist on type 'SSugar... Remove this comment to see the full error message
    Object.keys(this._modules).forEach((moduleName, i) => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_modules' does not exist on type 'SSugar... Remove this comment to see the full error message
      const moduleObj = this._modules[moduleName];
      __hotkey(`${i + 1}`).on('press', () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_modulesReady' does not exist on type 'S... Remove this comment to see the full error message
        if (!this._modulesReady) return;
        this._showModule(moduleObj.id);
        __SIpc.trigger('sugar.ui.displayedModule', moduleObj.id);
      });
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_modulesReady' does not exist on type 'S... Remove this comment to see the full error message
    this._modulesReady = false;
    source.on('*.state', (state: any, metas: any) => {
      console.log('SA', state, metas);
      if (state === 'ready') {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_modulesReady' does not exist on type 'S... Remove this comment to see the full error message
        this._modulesReady = true;
      }
    });

    source.on('*.SSugarAppModule.*', (data: any, metas: any) => {
      switch (metas.originalStack) {
        case 'state':
          this._moduleState(data, metas);
          break;
        case 'log':
          this._moduleLog(data, metas);
          break;
        case 'start':
          this._moduleStart(data, metas);
          break;
        case 'success':
          this._moduleSuccess(data, metas);
          break;
        case 'error':
          this._moduleError(data, metas);
          break;
      }
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'append' does not exist on type 'SSugarAp... Remove this comment to see the full error message
    this.append(this.$bottomBar);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'append' does not exist on type 'SSugarAp... Remove this comment to see the full error message
    this.append(this.$welcome);

    // update bottom bar
    setInterval(() => {
      this._updateBottomBar();
    }, 100);
  }

  _getDisplayedModuleObj() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_displayedModuleId' does not exist on ty... Remove this comment to see the full error message
    if (!this._displayedModuleId) return {};
    // @ts-expect-error ts-migrate(2339) FIXME: Property '$modules' does not exist on type 'SSugar... Remove this comment to see the full error message
    if (!this.$modules.parent) return {};
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_displayedModuleId' does not exist on ty... Remove this comment to see the full error message
    return this._findModuleObjById(this._displayedModuleId);
  }

  _showModule(moduleId: any) {
    const moduleObj = this._findModuleObjById(moduleId);
    if (!moduleObj || !moduleObj.$container) return;

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_displayedModuleId' does not exist on ty... Remove this comment to see the full error message
    this._displayedModuleId = moduleObj.id;

    // @ts-expect-error ts-migrate(2339) FIXME: Property '$modules' does not exist on type 'SSugar... Remove this comment to see the full error message
    this.$modules.children.forEach(($child: any) => {
      $child.detach();
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property '$modules' does not exist on type 'SSugar... Remove this comment to see the full error message
    if (!this.$modules.parent) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'append' does not exist on type 'SSugarAp... Remove this comment to see the full error message
      this.append(this.$modules);
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property '$modules' does not exist on type 'SSugar... Remove this comment to see the full error message
    this.$modules.append(moduleObj.$container);
  }

  _updateBottomBar() {
    let content = '';
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_initialParams' does not exist on type '... Remove this comment to see the full error message
    Object.keys(this._initialParams.modules).forEach((moduleName, i) => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_modules' does not exist on type 'SSugar... Remove this comment to see the full error message
      const moduleObj = this._modules[moduleName];
      let bg: any, fg: any;
      switch (moduleObj.state) {
        case 'success':
        case 'complete':
          bg = 'green';
          fg = 'black';
          break;
        case 'running':
        case 'start':
          bg = 'blue';
          fg = 'white';
          break;
        case 'watching':
          bg = 'black';
          fg = 'white';
          break;
        case 'error':
          bg = 'red';
          fg = 'black';
          break;
        case 'ready':
          bg = 'black';
          fg = 'white';
          break;
        default:
          bg = 'yellow';
          fg = 'black';
          break;
      }

      let spinner = '';
      switch (moduleObj.state) {
        case 'watching':
        case 'running':
        case 'start':
          spinner = `${moduleObj.spinner.frame()}`;
          break;
        case 'success':
        case 'complete':
          spinner = `✓ `;
          break;
        case 'error':
          spinner = '✖ ';
          break;
        default:
          spinner = `› `;
          break;
      }

      const moduleString = ` ${spinner}${moduleObj.id} `
        .replace('[36m', '')
        .replace('[39m', '')
        .split('')
        .map((char) => {
          return `<bg${__upperFirst(
            bg
          )}><${fg}>${char}</${fg}></bg${__upperFirst(bg)}>`;
        })
        .join('');
      content += moduleString;
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property '$bottomBar' does not exist on type 'SSug... Remove this comment to see the full error message
    this.$bottomBar.setContent(__parseHtml(content));
  }

  _findModuleObjById(id: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_modules' does not exist on type 'SSugar... Remove this comment to see the full error message
    for (let i = 0; i < Object.keys(this._modules).length; i++) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_modules' does not exist on type 'SSugar... Remove this comment to see the full error message
      const moduleObj = this._modules[Object.keys(this._modules)[i]];
      if (moduleObj.id === id) return moduleObj;
    }
    return false;
  }

  /**
   * @name          _log
   * @type          Function
   * @private
   *
   * This function log the passed SPromise arguments in the correct module
   *
   * @since       2.0.0
   */
  _moduleLog(data: any, metas: any) {
    const moduleObj = this._findModuleObjById(data.module.id);
    if (!moduleObj || !moduleObj.$console) return;
    // moduleObj.$console.log(data);
  }

  _moduleError(data: any, metas: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '$modules' does not exist on type 'SSugar... Remove this comment to see the full error message
    if (this.$modules.parent) return;

    const moduleObj = this._findModuleObjById(data.module.id);
    if (moduleObj && moduleObj.$status) {
      clearTimeout(moduleObj.statusTimeout);
      moduleObj.$status.style.bg = 'red';
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'update' does not exist on type 'SSugarAp... Remove this comment to see the full error message
      this.update();
    }

    if (this._getDisplayedModuleObj().id === moduleObj.id) return;

    let msg = data.value;
    if (msg.length > 36) msg = msg.slice(0, 33) + '...';
    const $errorNotification = new __SNotification(
      data.module.name || data.module.id,
      msg,
      {
        bg: 'red',
        onClick: () => {
          this._showModule(moduleObj.id);
        }
      }
    );
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'append' does not exist on type 'SSugarAp... Remove this comment to see the full error message
    this.append($errorNotification);
  }

  // _moduleStart(value, metas) {
  //   const moduleObj = this._modules[value.module.idx];
  //   if (!moduleObj.spinner) moduleObj.spinner = __ora();
  //   if (!moduleObj) return;

  //   moduleObj.state = value.value;
  // }

  _moduleSuccess(data: any, metas: any) {
    const moduleObj = this._findModuleObjById(data.module.id);
    if (moduleObj && moduleObj.$status) {
      clearTimeout(moduleObj.statusTimeout);
      moduleObj.$status.style.bg = 'green';
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'update' does not exist on type 'SSugarAp... Remove this comment to see the full error message
      this.update();
      moduleObj.statusTimeout = setTimeout(() => {
        moduleObj.$status.style.bg = 'blue';
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'update' does not exist on type 'SSugarAp... Remove this comment to see the full error message
        this.update();
      }, 2000);
    }

    if (this._getDisplayedModuleObj().id === moduleObj.id) return;

    let msg = data.value || 'Process finished successfully';
    if (msg.length > 36) msg = msg.slice(0, 33) + '...';
    const $successNotification = new __SNotification(
      data.module.name || data.module.id,
      msg,
      {
        bg: 'green',
        onClick: () => {
          this._showModule(moduleObj.id);
        }
      }
    );
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'append' does not exist on type 'SSugarAp... Remove this comment to see the full error message
    this.append($successNotification);
  }

  _moduleState(data: any, metas: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_modules' does not exist on type 'SSugar... Remove this comment to see the full error message
    const moduleObj = this._modules[data.module.idx];
    if (!moduleObj.spinner) moduleObj.spinner = __ora();
    if (!moduleObj) return;

    moduleObj.state = data.value;
  }

  _moduleStart(data: any, metas: any) {
    const moduleObj = this._findModuleObjById(data.module.id);
    if (moduleObj && moduleObj.$status) {
      clearTimeout(moduleObj.statusTimeout);
      moduleObj.$status.style.bg = 'cyan';
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'update' does not exist on type 'SSugarAp... Remove this comment to see the full error message
      this.update();
    }

    if (this._getDisplayedModuleObj().id === moduleObj.id) return;

    let msg = data.value || 'Process starting...';
    if (msg.length > 36) msg = msg.slice(0, 33) + '...';
    const $startNotification = new __SNotification(
      data.module.name || data.module.id,
      msg,
      {
        bg: 'yellow',
        onClick: () => {
          this._showModule(moduleObj.id);
        }
      }
    );
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'append' does not exist on type 'SSugarAp... Remove this comment to see the full error message
    this.append($startNotification);
  }

  /**
   * @name              _initBottomBar
   * @type              Function
   * @private
   *
   * This method init the bottom screen bar
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _initBottomBar() {
    const $bar = __blessed.box({
      bottom: 0,
      left: 0,
      right: 0,
      height: 1,
      style: {
        bg: 'yellow'
      }
    });

    return $bar;
  }

  /**
   * @name              _initWelcome
   * @type              Function
   * @private
   *
   * This method init the welcome screen
   *
   * @param         {Object}        initialParams       An object of initial params used to launch the sugar ui
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _initWelcome(initialParams: any) {
    const $centeredBox = __blessed.box({
      top: 'center',
      left: 'center',
      width: '100%',
      style: {}
    });

    const logoString = __sugarHeading({
      borders: false
    });
    const $logo = __blessed.box({
      width: 'shrink',
      height: 8,
      top: 0,
      left: 'center',
      style: {},
      content: logoString
    });

    const $metasBox = __blessed.box({
      width: 'shrink',
      height: 'shrink',
      top: logoString.split('\n').length,
      left: 'center',
      style: {}
    });

    const spinner = __ora('Loading');

    const packageJson = __packageJson();

    const projectLine = `<bgWhite><black> ${packageJson.license} </black></bgWhite> <yellow>${packageJson.name}</yellow> <cyan>${packageJson.version}</cyan>`;
    const byLine = `By ${packageJson.author.split(/<|\(/)[0]}`;
    const byLineSpaces =
      Math.round((__countLine(projectLine) - __countLine(byLine)) / 2) - 1;

    const projectLines = [
      `<yellow>${'-'.repeat(__countLine(projectLine) + 6)}</yellow>`,
      `<yellow>|</yellow>  ${projectLine}  <yellow>|</yellow>`,
      `<yellow>|</yellow>  ${' '.repeat(byLineSpaces)} ${byLine} ${' '.repeat(
        byLineSpaces
      )}  <yellow>|</yellow>`,
      `<yellow>${'-'.repeat(__countLine(projectLine) + 6)}</yellow>`
    ];

    const updateContent = () => {
      let text = [...projectLines, '', spinner.frame()];
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_modulesReady' does not exist on type 'S... Remove this comment to see the full error message
      if (this._modulesReady) {
        text = [
          ...projectLines,
          ``,
          `WebUI <green>started</green> at`,
          `<bgYellow><black> http://${
            // @ts-expect-error ts-migrate(2339) FIXME: Property '_serverSettings' does not exist on type ... Remove this comment to see the full error message
            this._serverSettings.hostname
          }:${this._serverSettings.port} </black></bgYellow>`,
          '',
          `<cyan>${Object.keys(initialParams.modules).length}</cyan> module${
            Object.keys(initialParams.modules).length > 1 ? 's' : ''
          } loaded`
        ];
      }
      let larger = 0;
      text = text
        .map((t) => {
          t = __parseHtml(t);
          const length = __countLine(t);
          if (length > larger) larger = length;
          return t;
        })
        .map((line) => {
          line =
            ' '.repeat(Math.round((larger - __countLine(line)) / 2)) + line;
          return line;
        });

      $metasBox.setContent(text.join('\n'));
      $metasBox.screen.render();
    };
    setInterval(() => {
      updateContent();
    }, 100);

    $centeredBox.append($logo);
    $centeredBox.append($metasBox);

    return $centeredBox;
  }

  /**
   * @name             _initConsoles
   * @type              Function
   * @private
   *
   * This method init the console output and save it as reference in the "$console" property
   *
   * @param         {SPromise}          source          The source to log
   *
   * @since             2.0.0
   *
   */
  _initConsoles() {
    const $consolesContainer = __blessed.box({
      width: '100%',
      height: '100%-1',
      top: 0,
      left: 0,
      right: 0,
      mouse: true,
      keys: true,
      clickable: false,
      scrollable: true,
      scrollbar: {
        ch: ' ',
        inverse: true
      },
      style: {
        fg: 'white',
        scrollbar: {
          bg: __color('terminal.primary').toString()
        }
      },
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 2
      }
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_modules' does not exist on type 'SSugar... Remove this comment to see the full error message
    Object.keys(this._modules).forEach((moduleName) => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_modules' does not exist on type 'SSugar... Remove this comment to see the full error message
      const moduleObj = this._modules[moduleName];

      const $container = __blessed.box({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        style: {}
      });

      const $topBar = __blessed.box({
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        style: {
          bg: 'black'
        },
        padding: {
          top: 1,
          left: 2,
          right: 2
        },
        content: __parseHtml(
          `<yellow>${moduleObj.name}</yellow> | <white>${moduleObj.id}</white>`
        )
      });

      let OutputClass;
      if (moduleObj.ui) {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
        const requirePath = __path.relative(__dirname, moduleObj.ui);
        // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
        OutputClass = require(requirePath);
      } else {
        OutputClass = __SBlessedOutput;
      }

      // @ts-expect-error ts-migrate(2339) FIXME: Property '_sources' does not exist on type 'SSugar... Remove this comment to see the full error message
      const $console = new OutputClass(this._sources, {
        filter: (logObj: any) => {
          return logObj.module && logObj.module.id === moduleObj.id;
        },
        width: '100%',
        height: '100%-3',
        top: 3,
        left: 0,
        right: 0,
        mouse: true,
        keys: true,
        clickable: false,
        scrollable: true,
        scrollbar: {
          ch: ' ',
          inverse: true
        },
        style: {
          fg: 'white',
          scrollbar: {
            bg: __color('terminal.primary').toString()
          }
        },
        padding: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 2
        },
        ...moduleObj
      });

      $container.append($console);
      $container.append($topBar);

      moduleObj.$container = $container;
      moduleObj.$topBar = $topBar;
      moduleObj.$console = $console;
    });

    return $consolesContainer;
  }
}
