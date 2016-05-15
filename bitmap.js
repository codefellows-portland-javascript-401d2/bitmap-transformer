const fs = require('fs');
const path = require('path');
const filters = require('./filters');

//INPUT = = = = = = = = = = = = =
function readBMP(fileInput, filterType, callback) {
  fs.readFile(`./images/${fileInput}`, (err, data) => {
    if (err) callback(err);

    filterBMP(data, fileInput, filterType, callback);
  });
}

//FILTER = = = = = = = = = = = = =
function filterBMP(data, fileInput, filterType, callback) {
  const paletteStart = 54;
  const headEnd = data.readInt16LE(10);
  const headBuffer = Buffer.from(data.buffer, 0, paletteStart);
  const paletteBuffer = Buffer.from(data.buffer, paletteStart, headEnd - paletteStart);
  const bodyBuffer = Buffer.from(data.buffer, headEnd);
  const paletteDecimals = [];

  paletteBuffer.forEach(decimal => {
    paletteDecimals.push(decimal);
  });

  let newPalette;

  switch (filterType) {
  case 'bluify':
    newPalette = filters.bluify(paletteDecimals);
    break;
  case 'brighten':
    newPalette = filters.brighten(paletteDecimals);
    break;
  case 'darken':
    newPalette = filters.darken(paletteDecimals);
    break;
  case 'funkify':
    newPalette = filters.funkify(paletteDecimals);
    break;
  case 'hulkify':
    newPalette = filters.hulkify(paletteDecimals);
    break;
  default:
    newPalette = filters.invertify(paletteDecimals);
    break;
  }

  const newPaletteBuffer = Buffer.from(newPalette);
  const totalLength = headBuffer.length + newPaletteBuffer.length + bodyBuffer.length;
  const outputBuffer = Buffer.concat([headBuffer, newPaletteBuffer, bodyBuffer], totalLength);
  const fileBasename = path.basename(fileInput, '.bmp');
  const fileOutput = `${fileBasename}-${filterType}.bmp`;

  writeBMP(fileOutput, outputBuffer, callback);
}

//OUTPUT = = = = = = = = = = = = =
function writeBMP(fileOutput, fileData, callback) {
  fs.writeFile(`./images/${fileOutput}`, fileData, (err) => {
    if (err) callback(err);

    callback(err, `${fileOutput} has been created in the images directory.`);
  });
}

//TRANSFORM = = = = = = = = = = = = =
function transformBMP(fileInput, filterType = 'brighten', callback) {
  readBMP(fileInput, filterType, callback);
}

module.exports = {
  readBMP,
  filterBMP,
  writeBMP,
  transformBMP
};
