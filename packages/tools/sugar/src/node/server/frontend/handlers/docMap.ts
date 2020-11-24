// @ts-nocheck

import __SPromise from '../../../promise/SPromise';
import __SDocMap from '../../../doc/SDocMap';

/**
 * @name                docMap
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @wip
 *
 * This function is responsible of responding to express requests made on the docMap url
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = async function docMap(req, res, settings = {}) {
  const docMap = new __SDocMap();
  const docMapJson = await docMap.read();
  res.status(200);
  res.type('application/json');
  res.send(docMapJson);
}
