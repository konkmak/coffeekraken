


<!-- @namespace    sugar.js.is -->
<!-- @name    childProcess -->

# ```js childProcess ```


Check if the current script is running as a child process or not by checking if the ```process.send``` exists, or is the environment variable ```IS_CHILD_PROCESS``` is true.



## Example (js)

```js
import isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
isChildProcess(); // => false
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


