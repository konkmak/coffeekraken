"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const md5_1 = require("../crypt/md5");
/**
 * @name            gravatarUrl
 * @namespace           sugar.js.url
 * @type            Function
 *
 * Return a gravatar url depending on the passed user email and size
 *
 * @param           {String}            email             The user email
 * @param           {Number}            [size=200]        The wanted image size. From 1 to 2048
 * @return          {String}                              The generated gravatar url
 *
 * @example       js
 * import gravatarUrl from '@coffeekraken/sugar/js/util/gravatarUrl';
 * console.log(gravatarUrl('olivier.bossel@gmail.com')); // https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function gravatarUrl(email, size = 200) {
    return `https://www.gravatar.com/avatar/${md5_1.default.encrypt(email)}?s=${size}`;
}
exports.default = gravatarUrl;