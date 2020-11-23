module.exports = {
  /**
   * @name                default
   * @namespace           config.media.iphone-5
   * @type                String
   *
   * Media query for targeting the iphone 5
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  default: `
      only screen
      and (min-device-width: 320px)
      and (max-device-width: 568px)
      and (-webkit-min-device-pixel-ratio: 2)
    `,

  /**
   * @name                portrait
   * @namespace           config.media.iphone-5
   * @type                String
   *
   * Media query for targeting the iphone 5 in portrait mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  portrait: `
      only screen
      and (min-device-width: 320px)
      and (max-device-width: 568px)
      and (-webkit-min-device-pixel-ratio: 2)
      and (orientation: portrait)
    `,

  /**
   * @name                landscape
   * @namespace           config.media.iphone-5
   * @type                String
   *
   * Media query for targeting the iphone 5 in landscape mode
   *
   * @see         https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  landscape: `
      only screen
      and (min-device-width: 320px)
      and (max-device-width: 568px)
      and (-webkit-min-device-pixel-ratio: 2)
      and (orientation: landscape)
    `
};