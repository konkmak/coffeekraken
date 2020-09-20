"use strict";

var __imagesLoaded = require('../imagesLoaded');

var __dispatchEvent = require('../dispatchEvent');

describe('sugar.js.dom.imagesLoaded', () => {
  document.head.innerHTML = "\n    <img id=\"image1\" src=\"src/data/tests/testing.jpg\" />\n    <img id=\"image2\" src=\"src/data/tests/testing.jpg\" />\n    <img id=\"image3\" src=\"src/data/tests/testing.jpg\" />\n  ";
  var $img1 = document.head.querySelector('#image1');
  var $img2 = document.head.querySelector('#image2');
  var $img3 = document.head.querySelector('#image3');
  var isLoaded = false,
      isError = false,
      imgsCount = 0;

  __imagesLoaded([$img1, $img2, $img3]).on('img.loaded', _$img => {
    imgsCount++;
  }).then(arrayImages => {
    isLoaded = true;
  }).catch(e => {
    isError = true;
  });

  __dispatchEvent($img1, 'load');

  __dispatchEvent($img2, 'load');

  __dispatchEvent($img3, 'load');

  it('Should detect when all the images are loaded correctly', () => {
    setTimeout(() => {
      expect(isLoaded).toBe(true);
      expect(isError).toBe(false);
      expect(imgsCount).toBe(3);
    });
  });
});