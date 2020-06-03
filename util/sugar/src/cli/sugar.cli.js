#!/usr/bin/env node

require('../node/index');
const __exitCleanup = require('../node/process/exitCleanup');

/**
 * @name            sugar.cli
 * @namespace       sugar.cli
 * @type            File
 *
 * This is the main sugar cli file that split the commands
 * by calling the proper files with the parsed cli args
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const command = process.argv[2].split(' ')[0];
const stack = command.split('.')[0];
let action = command.split('.')[1] || null;
const args = process.argv.slice(3).join(' ') || '';

// handle clean exit
__exitCleanup();

// if no action, try to get the default one
if (!action) {
  const config = require(`./${stack}/config.json`);
  if (!config.default) {
    throw new Error(
      `Sorry but you have to specify an action to make on the module "${stack}}"...`
    );
  } else {
    action = config.default;
  }
}

require(`./${stack}/${action}.cli.js`)(args);
