"use strict";

var _jestUseragentMock = require("jest-useragent-mock");

module.exports = __testFn => {
  describe('sugar.js.is.firefox', () => {
    afterEach(() => {
      (0, _jestUseragentMock.clear)();
    });
    (0, _jestUseragentMock.mockUserAgent)('Mozilla/5.0 (Android 4.4; Mobile; rv:41.0) Gecko/41.0 Firefox/41.0');
    it('Should detect the passed variable type correctly', () => {
      expect(__testFn()).toBe(true);
    });
  });
};