"use strict";

module.exports = __ensureExists => {
  describe('sugar.js.object.ensureExists', () => {
    it('Should have created the passed dotted path inside the object', done => {
      var obj1 = {
        hello: 'world'
      };

      __ensureExists(obj1, 'coco.yop', {});

      expect(obj1).toEqual({
        hello: 'world',
        coco: {
          yop: {}
        }
      });
      done();
    });
  });
};