"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hotkey2 = _interopRequireDefault(require("@coffeekraken/sugar/js/keyboard/hotkey"));

var _querySelector2 = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/querySelector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StatesSwitcher {
  /**
   * Constructor
   */
  constructor($domElm, settings = {}) {
    this._$domElm = $domElm;
    this._settings = { ...settings
    };
    this._currentStateIndex = 0; // add the hotkeys

    this._addHotkeys(); // add events listeners


    this._addEventListeners(); // restore the state from localstorage


    this._restoreState();
  }
  /**
   * Add the hotkey getted from the settings object
   */


  _addHotkeys() {
    this._deleteHotkey = (0, _hotkey2.default)(window.ck_hotkey_states || 'ctrl+enter', (event, handler) => {
      this.switchState();
    });
  }
  /**
   * Remove the hotkey
   */


  _removeHotkeys() {
    if (this._deleteHotkey) this._deleteHotkey();
  }
  /**
   * Add event listeners
   */


  _addEventListeners() {
    window.addEventListener('message', e => {
      if (e.data === 'states-switcher--switch') {
        this.switchState();
      }
    });
  }
  /**
   * Apply a state by passing the state index
   */


  applyState(stateIndex) {
    // get the state size
    const stateWidth = window.ck_states[stateIndex]; // apply the width to the iframe

    this._$domElm.style.width = stateWidth;
  }
  /**
   * Switch between the registered states
   */


  switchState() {
    // update current state index
    this._currentStateIndex += 1;

    if (this._currentStateIndex >= window.ck_states.length) {
      this._currentStateIndex = 0;
    } // save the state in localstorage


    localStorage.setItem('ck-pre-view-state', this._currentStateIndex); // apply the state

    this.applyState(this._currentStateIndex);
  }
  /**
   * Restore the state from localstorage
   */


  _restoreState() {
    // try to get the state from localStorage
    const state = parseInt(localStorage.getItem('ck-pre-view-state')); // check if we have a states

    if (state !== null) {
      // set the state in instance
      this._currentStateIndex = state; // apply the state

      this.applyState(this._currentStateIndex);
    }
  }

}

exports.default = StatesSwitcher;
module.exports = exports.default;