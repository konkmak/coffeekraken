"use strict";
// @ts-nocheck
/**
 * @name        getAuthToken
 * @namespace           sugar.node.github
 * @type        Function
 * @beta
 *
 * Get back the authentification informations (username, token) setted using the 'setAuthToken' function
 *
 * @return          {Object}              Return back the auth token object formated like so : username, token
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * const getAuthToken = require('@coffeekraken/node/github/getAuthToken');
 * console.log(getAuthToken()); // => { username: '...', token: '...' }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function getAuthToken() {
    return global.githubAuthToken || false;
};
