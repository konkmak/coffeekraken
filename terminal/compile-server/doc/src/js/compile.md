# compile

<!-- @namespace: compile-server.compile -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Compile some code



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
code  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The code to compile  |  required  |
language  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The language of the code to compile like. (sass,scss,js,javascript,coffee,coffeescript,typescript,ts,stylus,styl)  |  required  |
options  |  **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**  |  Some option to pass to the according compilation package bellow. (sass,scss = node-sass / js,coffee,ts = webpack with loaders / stylus = stylus)  |  optional  |  {}

### Example
```js
	const compileServer = require('@coffeekraken/compile-server');
compileServer.compile(myCoolCode, 'js').then((compiledCode) => {
 	// do something here...
});
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)