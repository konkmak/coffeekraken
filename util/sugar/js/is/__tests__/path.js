"use strict";

module.exports = __testFn => {
  describe('sugar.js.is.path', () => {
    it('Should detect the passed variable type correctly', () => {
      expect(__testFn('/hello/world')).toBe(true);
      expect(__testFn('abc/[a-z].js')).toBe(false);
    });
  });
};