


<!-- @namespace    sugar.node.class -->
<!-- @name    SExpressApp -->

# ```js SExpressApp ```


This class represent an express based application and gives you access to a lot of usefull routes like "/app/config/:path", "/app/meta/:path", etc...



## Example (js)

```js
const SExpressApp = require('@coffeekraken/sugar/node/class/SExpressApp');
class MyCoolApp extends SExpressApp {
   // your app class here...
}
const myApp = new MyCoolApp();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods


<!-- @namespace    sugar.node.class.SExpressApp -->
<!-- @name    _registerRoutes -->

# ```js _registerRoutes ```


Register some usefull routes like "/app/config/:path", etc...




### Author
- 



<!-- @namespace    sugar.node.class.SExpressApp -->
<!-- @name    _startExpressServer -->

# ```js _startExpressServer ```


Start the express http server




### Author
- 



<!-- @namespace    sugar.node.class.SExpressApp -->
<!-- @name    _jsController -->

# ```js _jsController ```


Handle the base javascript route that serve the global and common files

## Parameters

- **req**  Object: The req express object

- **res**  Object: The res express object




### Author
- 



<!-- @namespace    sugar.node.class.SExpressApp -->
<!-- @name    _cssController -->

# ```js _cssController ```


Handle the base stylesheet route that serve the global and common files

## Parameters

- **req**  Object: The req express object

- **res**  Object: The res express object




### Author
- 


## Variables


<!-- @namespace    //                       sugar.node.class.SExpressApp -->
<!-- @name    //                            _configController -->

# ```js //                            _configController ```






### Author
- 



<!-- @namespace    //                       sugar.node.class.SExpressApp -->
<!-- @name    //                            _metaController -->

# ```js //                            _metaController ```






### Author
- 
