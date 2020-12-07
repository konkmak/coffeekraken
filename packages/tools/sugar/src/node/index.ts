// @ts-nocheck

import __sugarConfig from './config/sugar';
import __SLog from './log/SLog';
import __handleError from './error/handleError';
import __initEnv from './init/initEnv';
import __onProcessExit from './process/onProcessExit';
import __exitCleanup from './process/exitCleanup';

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
