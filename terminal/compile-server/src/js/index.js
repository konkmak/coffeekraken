import __compile from './compile';
import __setup from './setup';

/**
 * @name  	compileServer
 * @namespace       compile-server
 * @type      Object
 *
 * Expose the compile server API
 * ### Available functions
 * - ```setup``` : Setup the compile server JS api
 * - ```compile``` : Send some code to the compile server and get the response easily
 *
 * @example 		js
 * compileServer.setup({
 *  	// some options here...
 * });
 * compileServer.compile(myCoolCode, 'js').then((compiledCode) => {
 *  	// do something here...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
const api = {
	setup : __setup,
	compile : __compile
};
export default api;
