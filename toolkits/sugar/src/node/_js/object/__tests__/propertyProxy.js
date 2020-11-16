"use strict";

module.exports = __propertyProxy => {
  describe('sugar.js.object.propertyProxy', () => {
    it('Should apply the property proxy correctly and detect the updated', done => {
      var obj1 = {
        hello: {
          world: 'hello world'
        },
        plop: {
          array: [0, 1, 2]
        }
      };

      __propertyProxy(obj1, 'hello.world', {
        get: value => {
          return 'get ' + value;
        },
        set: value => {
          return 'set ' + value;
        }
      });

      obj1.hello.world = 'lorem ipsum';
      var val = obj1.hello.world;
      expect(val).toBe('get set lorem ipsum');
      done();
    });
  });
};