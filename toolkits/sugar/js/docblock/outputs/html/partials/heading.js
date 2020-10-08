"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n{{#if namespace}}<!-- @namespace    {{namespace}} -->{{/if}}\n  {{#if name}}<!-- @name    {{name}} -->{{/if}}\n\n{{#if name}}\n<h1 class=\"s-h1 s-m-b\">\n  {{#if static}}\n    <span class=\"s-db-static\">Static</span>span>\n  {{/if}}\n  {{#if get}}\n    <span class=\"s-db-get\">get</span>\n  {{/if}}\n  {{#if set}}\n    <span class=\"s-db-set\">set</span>\n  {{/if}}\n  <span class=\"s-db-name\">\n    {{name}}\n  </span>\n</h1>\n{{/if}}\n{{#if since}}\n<h2 class=\"s-h3 s-m-b-small\">\n  <span class=\"s-db-since\">Since: {{since}}</span>\n</h2>\n{{/if}}\n\n{{> sharings}}\n\n{{#if description}}\n<p class=\"s-p\">{{description}}</p>\n{{/if}}\n";
exports.default = _default;
module.exports = exports.default;