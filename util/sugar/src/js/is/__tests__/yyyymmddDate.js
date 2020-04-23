module.exports = (__testFn) => {

  describe('sugar.js.is.yyyymmdd', () => {

    it('Should detect the passed variable type correctly', () => {
      expect(__testFn('2020.10.13')).toBe(true);
      expect(__testFn('2020.20.13')).toBe(false);
    });

  });

}