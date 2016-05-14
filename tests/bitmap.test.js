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
    const paletteBuffer = Buffer.from(buf.buffer, paletteStart, headEnd - paletteStart);
    const bodyBuffer = Buffer.from(buf.buffer, headEnd);
    const paletteDecimals = [];
    
    paletteBuffer.forEach(decimal => {
      paletteDecimals.push(decimal);
    });
    
    // const newPalette = invertify(paletteDecimals);
    // const newPalette = brighten(paletteDecimals);
    // const newPalette = darken(paletteDecimals);
    // const newPalette = funkify(paletteDecimals);
    const newPalette = bluify(paletteDecimals);
    // const newPalette = hulkify(paletteDecimals);
    
    var newPaletteBuffer = Buffer.from(newPalette);
    
    const totalLength = headBuffer.length + newPaletteBuffer.length - 54 + bodyBuffer.length;
    
    var outputBuffer = Buffer.concat([headBuffer, newPaletteBuffer, bodyBuffer], totalLength);
        
    callback(outputBuffer);
    
    

    fs.writeFile('./images/palette-bitmap-copy-1.bmp', outputBuffer, (err) => {
      if (err) throw err;
      console.log('It\'s saved!');
    });

  });
}

//Inverts
function invertify(inputDecimals) {
  const invertedDecimals = [];
  inputDecimals.forEach((decimal, index) => {
    invertedDecimals[index] = 255 - decimal;
  });
  return invertedDecimals;
}

//Multiplies
function brighten(inputDecimals) {
  const delta = 2;
  const colorizedDecimals = [];
  inputDecimals.forEach((decimal, index) => {
    colorizedDecimals[index] = (decimal + 1) * delta;
    if (colorizedDecimals[index] > 255) {
      colorizedDecimals[index] = 255;
    }
  });
  return colorizedDecimals;
}

//
function darken(inputDecimals) {
  const delta = 300;
  const colorizedDecimals = [];
  inputDecimals.forEach((decimal, index) => {
    colorizedDecimals[index] = decimal * decimal/delta;
    if (colorizedDecimals[index] > 255) {
      colorizedDecimals[index] = 255;
    }
  });
  return colorizedDecimals;
}

// Get funky
function funkify(inputDecimals) {
  const delta = 50;
  const colorizedDecimals = [];
  inputDecimals.forEach((decimal, index) => {
    if (index % 2 === 0) {
      colorizedDecimals[index] = decimal + delta;
    }
    if (colorizedDecimals[index] > 255) {
      colorizedDecimals[index] = 255;
    }
  });
  return colorizedDecimals;
}

// I just blue myself
function bluify(inputDecimals) {
  const delta = 150;
  const colorizedDecimals = [];
  inputDecimals.forEach((decimal, index) => {
    if (index % 4 === 0) {
      colorizedDecimals[index] = decimal + delta;
      if (colorizedDecimals[index] > 255) {
        colorizedDecimals[index] = 255;
      }
    } else {
      colorizedDecimals[index] = decimal;
    }
  });
  return colorizedDecimals;
}

// some hulk quote here
function hulkify(inputDecimals) {
  const delta = 90;
  const colorizedDecimals = [];
  inputDecimals.forEach((decimal, index) => {
    if (index % 3 === 1) {
      colorizedDecimals[index] = decimal + delta;
      if (colorizedDecimals[index] > 255) {
        colorizedDecimals[index] = 255;
      }
    } else {
      colorizedDecimals[index] = decimal;
    }
  });
  return colorizedDecimals;
}