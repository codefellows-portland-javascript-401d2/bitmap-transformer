const fs = require('fs');
const assert = require('assert');

var imageData = {
  head: [],
  body: []
};

it('targets image file and stores decimal array in var', () => {

  getBytes('palette-bitmap.bmp', function(result) {

    console.log(result);
    assert(result);
  });


});

function getBytes(file, callback) {
  fs.readFile('./images/' + file, (err, buf) => {
    if (err) throw err;

    const paletteStart = 54;
    const headEnd = buf.readInt16LE(10);
    const headBuffer = Buffer.from(buf.buffer, 0, paletteStart);
    const paletteBuffer = Buffer.from(buf.buffer, 54, 1078);
    const bodyBuffer = Buffer.from(buf.buffer, headEnd);
    const paletteDecimals = [];

    paletteBuffer.forEach(decimal => {
      paletteDecimals.push(decimal);
    });

    const newPalette = invertify(paletteDecimals);

    var newPaletteBuffer = new Buffer(newPalette);

    const test = Buffer.concat([headBuffer, newPaletteBuffer, bodyBuffer]);

    callback(newPaletteBuffer);

    fs.writeFile('./images/palette-bitmap-copy.bmp', test, (err) => {
      if (err) throw err;
      console.log('It\'s saved!');
    });

  });
}

function invertify(inputDecimals) {
  const invertedDecimals = [];
  inputDecimals.forEach((decimal, index) => {
    invertedDecimals[index] = 255 - decimal;
  });
  return invertedDecimals;
}
