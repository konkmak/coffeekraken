"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
const SNpmBinCliInterface_1 = __importDefault(require("./interface/SNpmBinCliInterface"));
const child_process_1 = __importDefault(require("child_process"));
const packageRoot_1 = __importDefault(require("../../node/path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const findPackages_1 = __importDefault(require("../../node/monorepo/findPackages"));
module.exports = function bin(stringArgs = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const argsObj = parseArgs_1.default(stringArgs, {
            definition: SNpmBinCliInterface_1.default.definition
        });
        const binCommand = `npm bin ${argsObj.global ? '-g' : ''}`;
        const binFolderPath = child_process_1.default.execSync(binCommand).toString();
        let packagePath;
        if (!argsObj.package) {
            packagePath = packageRoot_1.default();
            if (!fs_1.default.existsSync(`${packagePath}/package.json`)) {
                throw "Sorry but you're not in any package folder to take the bin from...";
            }
        }
        else {
            const packagesObj = yield findPackages_1.default();
            let packageJson;
            for (let i = 0; i < Object.keys(packagesObj).length; i++) {
                const json = packagesObj[Object.keys(packagesObj)[i]];
                if (json.name === argsObj.package) {
                    packageJson = json;
                    packageJson.absolutePath = path_1.default.resolve(process.cwd(), Object.keys(packagesObj)[i]);
                    break;
                }
            }
            console.log(argsObj);
            if (!packageJson)
                throw `Sorry but no package has been found with the name "<yellow>${argsObj.package}</yellow>"...`;
            // check for bins
            if (!packageJson.bin)
                throw `Sorry but the package named "<yellow>${packageJson.name}</yellow>" does not have any bin's to install...`;
            Object.keys(packageJson.bin).forEach((binName) => {
                const binPath = packageJson.bin[binName];
                const binAbsolutePath = path_1.default.resolve(packageJson.absolutePath, binPath);
                switch (argsObj.action) {
                    case 'i':
                    case 'install':
                        // console.log('ln -s ../../../workspaces/coffeekraken/packages/tools/sugar/src/cli/sugar.cli.js sugar')
                        // console.log(`ln -s ${_path.relative(binFolderPath, binAbsolutePath)} ${binName}`)
                        const symlinkCommand = `cd ${binFolderPath} && rm -rf ${binFolderPath}/${binName} && ln -s ${path_1.default.relative(binFolderPath, binAbsolutePath)} ${binName}`;
                        // console.log(symlinkCommand)
                        console.log(`The "<yellow>${binName}</yellow>" bin from the package "<cyan>${packageJson.name}</cyan>" has been successfully installed ${argsObj.global ? '<magenta>globaly</magenta>' : ''}`);
                        child_process_1.default.spawnSync(symlinkCommand, [], {
                            shell: true
                        });
                        // _fs.symlinkSync(binAbsolutePath, `${binFolderPath}/${binName}`);
                        break;
                    case 'u':
                    case 'un':
                    case 'uninstall':
                        console.log(`The "<yellow>${binName}</yellow>" bin from the package "<cyan>${packageJson.name}</cyan>" has been successfully uninstalled ${argsObj.global ? '<magenta>globaly</magenta>' : ''}`);
                        // _childProcess.execSync(`rm -rf ${binAbsolutePath}/${binName}`, {
                        //   shell: true
                        // });
                        break;
                }
            });
        }
    });
};
