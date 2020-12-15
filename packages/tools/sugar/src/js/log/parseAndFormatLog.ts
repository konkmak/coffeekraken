import ILog from './interface/ILog';
import __parseArgs from '../cli/parseArgs';
import __parseHtml from '../console/parseHtml';

/**
 * @name                parseAndFormatLog
 * @namespace           sugar.node
 * @type                Function
 * @state               beta
 *
 * This function take as input either a string with some arguments like "--type group --title 'hello world'", etc... or directly an object
 * with arguments as properties and format that into a valid ILog formated object
 *
 * @param       {String|String[]|Object|Object[]}          log          The log(s) to parse and format
 * @return      {ILog}                                                  An ILog complient object
 *
 * @example         js
 * import parseAndFormatLog from '@coffeekraken/sugar/js/log/parseAndFormatLog';
 * parseAndFormatLog('[--type group --title "hello world"] Daily daily day');
 * parseAndFormatLog({
 *   type: 'group',
 *   title: 'hello world',
 *   value: 'Daily daily day'
 * });
 * // {
 * //   type: 'group',
 * //   title: 'hello world',
 * //   value: 'Daily daily day'
 * // }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parseAndFormatLog(
  logs: string | string[] | Object | Object[]
): ILog | ILog[] {
  const isArray = Array.isArray(logs);
  logs = Array.isArray(logs) === false ? [logs] : logs;
  const logObjArray: any[] = [];

  // loop on each log
  // @ts-ignore
  logs.forEach((log) => {
    if (typeof log === 'string') {
      // search for log arguments
      const matches = log.match(/\[--?[a-zA-Z0-9-_]+[^\]]+\]/gm);
      if (matches && matches.length) {
        log = log.replace(matches[0], '').trim();
        const cli = matches[0].slice(1, -1);
        const argsObj = __parseArgs(cli);
        logObjArray.push({
          value: __parseHtml(log),
          type: 'default',
          ...argsObj
        });
      } else {
        logObjArray.push({
          type: 'default',
          value: __parseHtml(log)
        });
      }
    } else {
      if (!log.type) log.type = 'default';
      if (log.value !== undefined)
        log.value = __parseHtml(log.value.toString());
      logObjArray.push(log);
    }
  });

  if (isArray === true) return logObjArray;
  return logObjArray[0];
}
export = parseAndFormatLog;
