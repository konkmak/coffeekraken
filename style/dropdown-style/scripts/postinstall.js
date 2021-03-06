const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");

if (process.env.PWD.match(/node_modules/)) {
  // move sources
  fse.moveSync("src/scss", "scss");

  // clean repo
  fse.removeSync(".resources");
  fse.removeSync("scripts");
  fse.removeSync("src");
  fse.removeSync("tests");

  // update sass files at root
  fs.writeFileSync("_index.scss", '@import "scss/index";');
}
