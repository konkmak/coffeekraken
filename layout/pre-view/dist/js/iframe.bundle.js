!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=260)}({1:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n={}){return n={element:null,keyup:!1,keydown:!0,splitKey:"+",...n},(0,r.default)(e,n,(e,n)=>{t(e,n)}),function(){r.default.unbind(e)}};var o,r=(o=n(49))&&o.__esModule?o:{default:o};r.default.filter=function(e){return!0},e.exports=t.default},260:function(e,t,n){"use strict";n.r(t);var o=n(1),r=n.n(o);r()(window.parent.ck_hotkey_selector||"command+enter",(e,t)=>{window.parent.postMessage("views-selector--open")}),r()(window.parent.ck_hotkey_states||"ctrl+enter",(e,t)=>{window.parent.postMessage("states-switcher--switch")})},49:function(e,t,n){"use strict";
/*!
 * hotkeys-js v3.7.3
 * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies.
 * 
 * Copyright (c) 2019 kenny wong <wowohoo@qq.com>
 * http://jaywcjlove.github.io/hotkeys
 * 
 * Licensed under the MIT license.
 */
function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}n.r(t);var r="undefined"!=typeof navigator&&navigator.userAgent.toLowerCase().indexOf("firefox")>0;function i(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on".concat(t),(function(){n(window.event)}))}function f(e,t){for(var n=t.slice(0,t.length-1),o=0;o<n.length;o++)n[o]=e[n[o].toLowerCase()];return n}function c(e){"string"!=typeof e&&(e="");for(var t=(e=e.replace(/\s/g,"")).split(","),n=t.lastIndexOf("");n>=0;)t[n-1]+=",",t.splice(n,1),n=t.lastIndexOf("");return t}for(var a={backspace:8,tab:9,clear:12,enter:13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,"⇪":20,",":188,".":190,"/":191,"`":192,"-":r?173:189,"=":r?61:187,";":r?59:186,"'":222,"[":219,"]":221,"\\":220},l={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,cmd:91,command:91},u={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},s={16:!1,18:!1,17:!1,91:!1},p={},y=1;y<20;y++)a["f".concat(y)]=111+y;var d=[],h="all",v=[],w=function(e){return a[e.toLowerCase()]||l[e.toLowerCase()]||e.toUpperCase().charCodeAt(0)};function g(e){h=e||"all"}function m(){return h||"all"}var k=function(e){var t=e.key,n=e.scope,o=e.method,r=e.splitKey,i=void 0===r?"+":r;c(t).forEach((function(e){var t=e.split(i),r=t.length,c=t[r-1],a="*"===c?"*":w(c);if(p[a]){n||(n=m());var u=r>1?f(l,t):[];p[a]=p[a].map((function(e){return(!o||e.method===o)&&e.scope===n&&function(e,t){for(var n=e.length>=t.length?e:t,o=e.length>=t.length?t:e,r=!0,i=0;i<n.length;i++)-1===o.indexOf(n[i])&&(r=!1);return r}(e.mods,u)?{}:e}))}}))};function b(e,t,n){var o;if(t.scope===n||"all"===t.scope){for(var r in o=t.mods.length>0,s)Object.prototype.hasOwnProperty.call(s,r)&&(!s[r]&&t.mods.indexOf(+r)>-1||s[r]&&-1===t.mods.indexOf(+r))&&(o=!1);(0!==t.mods.length||s[16]||s[18]||s[17]||s[91])&&!o&&"*"!==t.shortcut||!1===t.method(e,t)&&(e.preventDefault?e.preventDefault():e.returnValue=!1,e.stopPropagation&&e.stopPropagation(),e.cancelBubble&&(e.cancelBubble=!0))}}function O(e){var t=p["*"],n=e.keyCode||e.which||e.charCode;if(x.filter.call(this,e)){if(93!==n&&224!==n||(n=91),-1===d.indexOf(n)&&229!==n&&d.push(n),["ctrlKey","altKey","shiftKey","metaKey"].forEach((function(t){var n=u[t];e[t]&&-1===d.indexOf(n)?d.push(n):!e[t]&&d.indexOf(n)>-1&&d.splice(d.indexOf(n),1)})),n in s){for(var o in s[n]=!0,l)l[o]===n&&(x[o]=!0);if(!t)return}for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(s[r]=e[u[r]]);var i=m();if(t)for(var f=0;f<t.length;f++)t[f].scope===i&&("keydown"===e.type&&t[f].keydown||"keyup"===e.type&&t[f].keyup)&&b(e,t[f],i);if(n in p)for(var c=0;c<p[n].length;c++)if(("keydown"===e.type&&p[n][c].keydown||"keyup"===e.type&&p[n][c].keyup)&&p[n][c].key){for(var a=p[n][c],y=a.splitKey,h=a.key.split(y),v=[],g=0;g<h.length;g++)v.push(w(h[g]));v.sort().join("")===d.sort().join("")&&b(e,a,i)}}}function x(e,t,n){d=[];var o=c(e),r=[],a="all",u=document,y=0,h=!1,g=!0,m="+";for(void 0===n&&"function"==typeof t&&(n=t),"[object Object]"===Object.prototype.toString.call(t)&&(t.scope&&(a=t.scope),t.element&&(u=t.element),t.keyup&&(h=t.keyup),void 0!==t.keydown&&(g=t.keydown),"string"==typeof t.splitKey&&(m=t.splitKey)),"string"==typeof t&&(a=t);y<o.length;y++)r=[],(e=o[y].split(m)).length>1&&(r=f(l,e)),(e="*"===(e=e[e.length-1])?"*":w(e))in p||(p[e]=[]),p[e].push({keyup:h,keydown:g,scope:a,mods:r,shortcut:o[y],method:n,key:o[y],splitKey:m});void 0!==u&&!function(e){return v.indexOf(e)>-1}(u)&&window&&(v.push(u),i(u,"keydown",(function(e){O(e)})),i(window,"focus",(function(){d=[]})),i(u,"keyup",(function(e){O(e),function(e){var t=e.keyCode||e.which||e.charCode,n=d.indexOf(t);if(n>=0&&d.splice(n,1),e.key&&"meta"===e.key.toLowerCase()&&d.splice(0,d.length),93!==t&&224!==t||(t=91),t in s)for(var o in s[t]=!1,l)l[o]===t&&(x[o]=!1)}(e)})))}var K={setScope:g,getScope:m,deleteScope:function(e,t){var n,o;for(var r in e||(e=m()),p)if(Object.prototype.hasOwnProperty.call(p,r))for(n=p[r],o=0;o<n.length;)n[o].scope===e?n.splice(o,1):o++;m()===e&&g(t||"all")},getPressedKeyCodes:function(){return d.slice(0)},isPressed:function(e){return"string"==typeof e&&(e=w(e)),-1!==d.indexOf(e)},filter:function(e){var t=e.target||e.srcElement,n=t.tagName,o=!0;return!t.isContentEditable&&("INPUT"!==n&&"TEXTAREA"!==n||t.readOnly)||(o=!1),o},unbind:function(e){if(e){if(Array.isArray(e))e.forEach((function(e){e.key&&k(e)}));else if("object"===o(e))e.key&&k(e);else if("string"==typeof e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var i=n[0],f=n[1];"function"==typeof i&&(f=i,i=""),k({key:e,scope:i,method:f,splitKey:"+"})}}else Object.keys(p).forEach((function(e){return delete p[e]}))}};for(var j in K)Object.prototype.hasOwnProperty.call(K,j)&&(x[j]=K[j]);if("undefined"!=typeof window){var P=window.hotkeys;x.noConflict=function(e){return e&&window.hotkeys===x&&(window.hotkeys=P),x},window.hotkeys=x}t.default=x}});