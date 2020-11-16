"use strict";

module.exports = __autoPrefix => {
  describe('sugar.js.css.autoPrefix', () => {
    var style = "\n      .hello {\n        transition: '200ms all linear',\n        boxSizing: 'border-box',\n        display: 'flex',\n        color: 'blue'\n\n        &:after {\n          content: 'coco';\n        }\n      }\n\n      .plop {\n        content: 'hehehe';\n      }\n\n    "; // const style = {
    //   transition: '200ms all linear',
    //   boxSizing: 'border-box',
    //   display: 'flex',
    //   color: 'blue',
    //   coco: {
    //     transition: '200ms all linear',
    //     boxSizing: 'border-box',
    //     display: 'flex',
    //     color: 'blue'
    //   }
    // }

    it('Should prefix correctly the passed style string', () => {
      console.log(__autoPrefix(style));
    });
  });
};