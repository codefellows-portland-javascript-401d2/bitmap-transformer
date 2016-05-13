const fs = require('fs');
const assert = require('assert');

var imageData = {
  head: [],
  body: []
};

it('targets image file and stores decimal array in var', () => {

  getBytes('palette-bitmap.bmp', function(result) {
    console.log('Result:',result);
    assert(result);
  });
    

});

function getBytes(file, callback) {
  fs.readFile('./images/' + file, (err, buf) => {
    if (err) throw err;
    
    const endHead = buf.readInt16LE(10);
    const headData = Buffer.from(buf.buffer, 0, endHead);
    const bodyData = Buffer.from(buf.buffer, offset);
    
    const tryData = buf.readInt16LE();
    
    callback(bodyData);
  });
}

function halfWidth(file, callback) {
  
}