import __packageRoot from '../../node/path/packageRoot';
import __parseArgs from '../../node/cli/parseArgs';

interface IPathRootOptions {
  highest?: boolean;
}

export default async (stringArgs = '') => {
  const args: IPathRootOptions = __parseArgs(stringArgs, {
    definitionObj: {
      highest: {
        type: 'Boolean',
        alias: 'h',
        default: false
      }
    }
  });

  console.log(__packageRoot(args.highest));
};