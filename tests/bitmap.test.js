const fs = require('fs');
const assert = require('assert');

var imageData = {
  head: [],
  body: []
};

it('targets image file and logs raw buffer', () => {

  getBytes('palette-bitmap.bmp', function(result) {
    console.log(result);
    assert(result);
  });
    

});

function getBytes(file, callback) {
  fs.readFile('./images/' + file, (err, buf) => {
    if (err) throw err;
    
    const offset = buf.readInt16LE(10);
    const headData = Buffer.from(buf.buffer, 0, offset).toString('binary');
    const bodyData = Buffer.from(buf.buffer, offset);
    
    callback(headData);
  });
}