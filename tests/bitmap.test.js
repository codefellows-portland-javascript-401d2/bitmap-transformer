const fs = require('fs');
const assert = require('assert');

var image = {};

it('targets image file and logs raw buffer', () => {
  fs.readFile('images/palette-bitmap.bmp', (err, buf) => {

     
    
    assert(buf);
  });
});