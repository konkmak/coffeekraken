const __path = require('path');

module.exports = (__SFsFile) => {
  describe('sugar.node.fs', () => {
    it('Should instanciate and get properties correctly from a file', (done) => {
      const file = new __SFsFile(
        __path.resolve(__dirname, 'data/3cb8876846e7c0e13896d23496ff7ac2.gif')
      );

      expect(file.filename).toBe('3cb8876846e7c0e13896d23496ff7ac2.gif');
      expect(
        file.filepath.includes(
          'toolkits/sugar/src/node/fs/__tests__/data/3cb8876846e7c0e13896d23496ff7ac2.gif'
        )
      ).toBe(true);
      expect(
        file.path.includes('toolkits/sugar/src/node/fs/__tests__/data')
      ).toBe(true);
      expect(file.extension).toBe('gif');
      expect(file.size).toBe(0.78925);
      expect(file.sizeInBytes).toBe(789250);
      expect(file.exists).toBe(true);

      done();
    });
  });
};
