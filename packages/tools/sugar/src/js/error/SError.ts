import __parseHtml from '../console/parseHtml';
import __trimLines from '../string/trimLines.js';
import __packageRoot from '../path/packageRoot';
import __toString from '../string/toString';

/**
 * @todo    Doc
 */

export default class SError extends Error {
  constructor(message) {
    if (typeof message !== 'string') {
      if (Array.isArray(message)) {
        message = message.join('\n');
      } else {
        message = __toString(message);
      }
    }

    // filter message for integrated stack
    message = message
      .split('\n')
      .filter((line) => {
        if (line.trim().slice(0, 10) === 'Thrown at:') return false;
        if (line.trim().slice(0, 3) === 'at ') return false;
        return true;
      })
      .join('\n');

    super(message);
    if (Error && Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    const stack = [];
    const packageRoot = __packageRoot();
    let stackArray = [];
    if (this.stack) {
      stackArray = this.stack.split(' at ').slice(1);
      stackArray
        .filter((l) => {
          if (l.trim() === 'Error') return false;
          if (l.trim() === '') return false;
          return true;
        })
        .forEach((l) => {
          if (l.trim() === '') return;
          stack.push(
            `<cyan>│</cyan> at <cyan>${l.replace(packageRoot, '')}</cyan>`
          );
        });
    }

    this.name = this.constructor.name;
    this.message = __trimLines(
      __parseHtml(`
      <red><underline>${this.name || this.constructor.name}</underline></red>

      ${message}

      ${stack.join('')}
    `)
    );

    let displayed = false;
    Object.defineProperty(this, 'stack', {
      get: function () {
        if (displayed) return '';
        displayed = true;
        return this.message;
      },
      set: function (value) {
        this._stack = value;
      }
    });
    this.stack = __trimLines(__parseHtml(stack.join('')));
  }
}