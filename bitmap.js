const fs = require('fs');
const path = require('path');
const filters = require('./filters');

// Contructor = = = = = = = = = 
function BitmapObj(data, headEnd) {
  this.paletteStart = 54;
  this.headEnd = headEnd;
  this.headBuffer = Buffer.from(data.buffer, 0, this.paletteStart);
  this.paletteBuffer = Buffer.from(data.buffer, this.paletteStart, this.headEnd - this.paletteStart);
  this.bodyBuffer = Buffer.from(data.buffer, this.headEnd);
}

//INPUT = = = = = = = = = = = = =
function readBMP(fileInput, filterType, callback) {
  fs.readFile(`./images/${fileInput}`, (err, data) => {
    if (err) callback(err);

    filterBMP(data, fileInput, filterType, callback);
  });
}

//FILTER = = = = = = = = = = = = =
function filterBMP(data, fileInput, filterType, callback) {
  
  const bufferData = new BitmapObj(data, data.readInt16LE(10));
  let newPalette;
  
  switch (filterType) {
  case 'bluify':
    newPalette = filters.bluify(bufferData.paletteBuffer);
    break;
  case 'brighten':
    newPalette = filters.brighten(bufferData.paletteBuffer);
    break;
  case 'darken':
    newPalette = filters.darken(bufferData.paletteBuffer);
    break;
  case 'funkify':
    newPalette = filters.funkify(bufferData.paletteBuffer);
    break;
  case 'hulkify':
    newPalette = filters.hulkify(bufferData.paletteBuffer);
    break;
  default:
    newPalette = filters.invertify(bufferData.paletteBuffer);
    break;
  }

  const newPaletteBuffer = Buffer.from(newPalette);
  const totalLength = bufferData.headBuffer.length + newPaletteBuffer.length + bufferData.bodyBuffer.length;
  const outputBuffer = Buffer.concat([bufferData.headBuffer, newPaletteBuffer, bufferData.bodyBuffer], totalLength);
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
