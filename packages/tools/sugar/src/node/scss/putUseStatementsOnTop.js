"use strict";
// @ts-nocheck
/**
 * @name                putUseStatementsOnTop
 * @namespace           sugar.node.scss
 * @type                Function
 * @beta
 *
 * This function simply search for "@use" statements in the passed content
 * and put them on top of the string
 *
 * @param       {String}            content             The content you want to process
 * @return      {String}                                The processed content
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import putUseStatementsOnTop from '@coffeekraken/sugar/node/scss/putUseStatementsOnTop';
 * putUseStatementsOnTop(`
 *     $something: 'cool';
 *     \@use 'my/cool/library' as MyCoolLibrary;
 * `);
 * // \@use 'my/cool/library' as MyCoolLibrary;
 * // $something: 'cool';
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function putUseStatementsOnTop(content) {
    // take all the "@use" statements and put them on top
    const useMatches = content.match(/@use\s.*[^;]/gm);
    if (useMatches) {
        for (let i = useMatches.length; i > 0; i--) {
            const useStatement = useMatches[i - 1];
            content = content.replace(useStatement, '');
            content = `
            ${useStatement}
            ${content}
        `;
        }
    }
    return content;
}
module.exports = putUseStatementsOnTop;
//# sourceMappingURL=putUseStatementsOnTop.js.map