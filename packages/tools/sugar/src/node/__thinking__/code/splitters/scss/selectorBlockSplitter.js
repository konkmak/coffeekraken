"use strict";
// @ts-nocheck
module.exports = {
    type: 'selector.block',
    prefix: /(^(?!.*@media)[\t ]*([a-zA-Z#.:*[][^{\/]*\s*)\s?){/m,
    prefixMatchIdx: 1,
    open: '{',
    close: '}'
};
