const __SFsDeamonCli = require('../../node/deamon/fs/SFsDeamonCli');
module.exports = (stringArgs = '') => {
  const cli = new __SFsDeamonCli({
    output: {}
  });
  cli.run(stringArgs);
};
