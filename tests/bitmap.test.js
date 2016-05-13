const fs = require('fs');
const assert = require('assert');

var imageData = {
  head: [],
  body: []
};

it('targets image file and stores decimal array in var', () => {

  getBytes('palette-bitmap.bmp', function(result) {

    console.log(result);
    var decimalValues = [];
    result.forEach( (decimal, index) => {
      decimalValues.push(index + ' ' + decimal);
    });
    for (var i = 54; i < 182; i++) {
      console.log(decimalValues[i]);
    }
    assert(result);
  });


});

function getBytes(file, callback) {
  fs.readFile('./images/' + file, (err, buf) => {
    if (err) throw err;

    const offset = buf.readInt16LE(10);
    const headData = Buffer.from(buf.buffer, 0, offset);
    const bodyData = Buffer.from(buf.buffer, offset);

    // callback(headData);

    fs.writeFile('./images/palette-bitmap-copy.bmp', buf, (err) => {
      if (err) throw err;
      console.log('It\'s saved!');
    });

  });
}

