const fs = require('fs');
const assert = require('assert');
const filters = require('../filters');
const bitmap = require('../bitmap');

it('does everything and proves I\'m terrible at testing', (done) => {
  bitmap.readBMP('palette-bitmap.bmp', function(result) {
    bitmap.writeNewFile(result, 2);
    assert(result);
    done();
  });

});
