const __deepMerge = require('../object/deepMerge');
const __machineId = require('node-machine-id').machineIdSync;

const __SAuth = require('../auth/SAuth');
const __SApi = require('./SApi');

/**
 * @name                            SBitbucketApi
 * @namespace                       sugar.node.api
 * @type                            Class
 * 
 * Simple bitbucket api class that let you make some requests to the bitbucket services with ease
 * 
 * @example           js
 * const bitbucketApi = new SBitbucketApi('bitbucket');
 * const repos = await bitbucketApi.get('repositories');
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBitbucketApi extends __SApi {

  /**
   * @name                          constructor
   * @type                          Function
   * 
   * Construct the SBitbucketApi instance
   * 
   * @param           {String}                name                  The name of this SBitbucketApi instance
   * @param           {Object}                [settings={}]
   * An object of settings to configure this SBitbucketApi instance. Here's the list of available settings:
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {

    // init SApi instance
    super(__deepMerge({
      name: `SBitbucketApi-${__machineId()}`,
      baseUrl: 'https://api.bitbucket.org/2.0',
      auth: {
        title: 'Bitbucket API Auth',
        info: 'Log in with your Bitbucket credentials...',
        type: 'basic',
        validator: 'bitbucketApi'
      }
    }, settings));

  }

}