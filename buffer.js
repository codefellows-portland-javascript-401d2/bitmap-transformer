const fs = require('fs');
const EventEmitter = require('events');

const inFile = 'palette-bitmap.bmp';
const outFile = 'new-palette-bitmap.bmp';


fs.readFile(inFile, (err, buffer) => {
  const bitmap = new Bitmap(buffer);
  showData(bitmap);
  // console.log(bitmap.buffer.toString('ascii'));
});

function Bitmap (buffer) {
  this.PixelDataOffset = buffer.readInt32LE(10);
  this.imageWidth = buffer.readInt32LE(18);
  this.imageHeight = buffer.readInt32LE(22);
  this.pixelBits = buffer.readInt16LE(28);
  this.pixeldata = buffer.readInt32LE(this.PixelDataOffset);
}

// for testing
function showData(obj) {
  for (var d in obj) {
    console.log(`${d}: ${obj[d]}`);
  }
}
