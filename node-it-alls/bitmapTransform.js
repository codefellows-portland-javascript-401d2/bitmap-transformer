const fs = require('fs');
const transform = require('./transform');
const bitmapTransform = {};

function Bitmap (buffer) {
  this.bufferData = buffer;
  this.PixelDataOffset = buffer.readInt32LE(10);
  this.paletteMapOffset = 54;
}

Bitmap.prototype.modPalette = function(fn) {
  var modData = Buffer.alloc(4);
  for (var i = this.paletteMapOffset; i < this.PixelDataOffset -1; i += 4) {
    modData = fn(this.bufferData.slice(i,i + 3));
    modData.copy(this.bufferData,i);
  }
};

bitmapTransform.palette = function(options, callback) {
  const transformer = transform[options.transform];

  if (!transformer) {
    console.log('\n  error: no transform option selected.\n');
    process.exit(1);
  }

  fs.readFile(options.I, (err, buffer) => {
    const bitmap = new Bitmap(buffer);
    bitmap.modPalette(transformer);
    fs.writeFile(options.O, bitmap.bufferData, (err) => {
      if (err) console.log(err);
      if (callback) callback(err);
    });
  });
};

module.exports = bitmapTransform;
