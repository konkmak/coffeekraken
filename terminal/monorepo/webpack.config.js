const __path = require("path");
const __glob = require('glob');
const __findUp = require('find-up');
const __fs = require('fs');
const __config = require('./bin/commands/config');

let localPackageJson = {};
if (__fs.existsSync(`${process.cwd()}/package.json`)) {
  localPackageJson = require(`${process.cwd()}/package.json`);
}
let localWebpackConfig = {};
if (__fs.existsSync(`${process.cwd()}/webpack.config.js`)) {
  localWebpackConfig = require(`${process.cwd()}/webpack.config.js`);
}

const generalPackageJsonPath = __findUp.sync('package.json', {
  cwd: __dirname
});
let generalPackageJson = {};
if (generalPackageJsonPath) {
  generalPackageJson = require(generalPackageJsonPath);
}

const generalWebpackConfigPath = __findUp.sync('webpack.config.js', {
  cwd: __dirname
});
let generalWebpackConfig = {};
if (generalWebpackConfigPath) {
  generalWebpackConfig = require(generalWebpackConfigPath);
}

const globStringSrc = __config.dist.js.bundle.sourceFilesPattern.replace('<rootDir>', process.env.ROOT_DIR || '').replace('//','/');
const rawSrcEntries = __glob.sync(globStringSrc);
const srcEntries = {};
rawSrcEntries.forEach(entry => {
  // srcEntries[entry.split('/').slice(3).join('/')] = entry;
  srcEntries[entry.split('/').slice(-1)] = entry;
});

module.exports = env => ({
  mode: "production",
  entry: srcEntries,
  output: {
    path: __path.resolve(__config.dist.js.bundle.outputFolder.replace('<rootDir>', process.env.ROOT_DIR || '').replace('//','/')),
    filename: "[name]"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      }
    ]
  },
  ...(generalPackageJson.webpack || {}),
  ...generalWebpackConfig,
  ...(localPackageJson.webpack || {}),
  ...localWebpackConfig
});