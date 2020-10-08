const __sugarHeading = require('./ascii/sugarHeading');
const __sugarConfig = require('./config/sugar');
const __SLog = require('./log/SLog');
const __handleError = require('./error/handleError');
const __initEnv = require('./init/initEnv');
const __onProcessExit = require('./process/onProcessExit');
const __exitCleanup = require('./process/exitCleanup');
const __clear = require('clear');
const __SIpc = require('./ipc/SIpc');
const __isChildProcess = require('./is/childProcess');

/**
 * @name                    index
 * @namespace           node
 *
 * This file is the "initialisation" one for the sugar node toolkit.
 * It's optional to include it but if you do, you will get these features "for free":
 * - Logging: Get the powerfull options of the SLog class without any change in your codebase
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

// global IPC server
__SIpc.initGlobalInstance();
// if (!__isChildProcess()) {
//   __SIpc.on('error', (data, socket) => {
//     nativeConsole.log(data);
//   });
// }

// init env
__initEnv();

// handle the errors
__handleError();

// exit cleanup
__onProcessExit(() => {
  return __exitCleanup;
});

// Logging
new __SLog(__sugarConfig('log'));