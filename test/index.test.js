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
  it('outputs a transformed buffer', () =>{
    assert.ok(transform('someString'));
  });

});
//module reads a file from disk
    //read file into buffer
    //convert header data to JS object
    //pass buffer to transform callback


//transform function(s)



//writes buffer to new file
