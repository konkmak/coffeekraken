const __terminalKit = require('terminal-kit').terminal;

/**
 * @name                                      cursorPos
 * @namespace                                 sugar.node.terminal
 * @type                                      Function
 * 
 * Return the terminal cursor position in {x,y} format.
 * 
 * @return              {Promise}                         A promise resolved once the position has been getted
 * 
 * @example             js
 * const cursorPos = require('@coffeekraken/sugar/node/terminal/cursorPos');
 * await cursorPos(); // => { x: 10, y: 20 }
 * 
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function cursorPos() {
  return new Promise(async (resolve, reject) => {
    __terminalKit.once('terminal', (name, data) => {
      resolve(data);
    });
    try {
      await __terminalKit.getCursorLocation();
    } catch (e) { }
  });
}