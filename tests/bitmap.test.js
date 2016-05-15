const fs = require('fs');
const assert = require('assert');
const filters = require('../filters');
const bitmap = require('../bitmap');

describe('Bitmap Transformer', () => {
  it('does everything and proves I\'m terrible at testing', done => {
    bitmap.readBMP('palette-bitmap.bmp', result => {
      bitmap.writeNewFile(result, 2);
      assert(result);
      done();
    });
  });
});
