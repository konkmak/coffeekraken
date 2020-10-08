"use strict";

module.exports = __parseAuthorString => {
  describe('sugar.js.npm.parseAuthorString', () => {
    it('Should parse the passed author string correctly', done => {
      expect(__parseAuthorString('Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com) ')).toEqual({
        name: 'Olivier Bossel',
        email: 'olivier.bossel@gmail.com',
        url: 'https://olivierbossel.com'
      });
      done();
    });
  });
};