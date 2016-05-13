var assert = require('assert');
var index = require('../index');
var transform = require('../transformer');

describe('bitmap-reader', () => {
  it('reads a file and returns a buffer', ()=>{
    assert.ok(index('palette-bitmap.bmp'));
  });

  it('extract header info and output to JS object', () =>{

  });

});

describe('transformer', () =>{
  it('transforms rgb color properties to expected grayscale', () =>{
    var colorTest = {
      r: 0,
      g: 52,
      b: 32,
      a: 28
    };

    var expectedColor = {
      r: 28,
      g: 28,
      b: 28,
      a: 28
    };

    assert.deepEqual(transform(colorTest), expectedColor);

  });
});
