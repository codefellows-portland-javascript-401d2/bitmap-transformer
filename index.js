//var transform = require('./transformer');
var path = require('path');
var fs = require('fs');
var transform = require('./transformer');

function BufferHeader(myBuffer){
  // header - size is 14, starts at 0
  this.headerBuffer1 = myBuffer.readInt8(0);
  this.headerBuffer2 = myBuffer.readInt8(1);
  this.headerText = String.fromCharCode(this.headerBuffer1, this.headerBuffer2);

  this.sizeNumber = myBuffer.readInt32LE(2);
  this.imageDataOffset = myBuffer.readInt32LE(10);  // 1078

  // Windows bitmapinfoheader - size is 40, starts at 14
  this.sizeOfBitMapCoreHeader = myBuffer.readInt32LE(14);  // 40
  this.widthInPixels = myBuffer.readInt32LE(18);  // 100
  this.heightInPixels = myBuffer.readInt32LE(22);  // 100
  this.numberOfColorPlanes = myBuffer.readInt16LE(26);  // 1
  this.numberOfColorsInPalette = myBuffer.readInt32LE(46); // 256
  this.imageSize = myBuffer.readInt16LE(34); //

  // color information, size is 1024 bytes, starts at 54
  const colorOffset = 14 + this.sizeOfBitMapCoreHeader;
  this.colorPalette = {};
  for (var i=0, colorName = ''; i<this.numberOfColorsInPalette; i++){
    colorOffset + (i * 4);
    colorName = 'color' + i;
    this.colorPalette[colorName] = {
      r: myBuffer.readUInt8(colorOffset + (i * 4)),
      g: myBuffer.readUInt8(colorOffset + (i * 4) + 1),
      b: myBuffer.readUInt8(colorOffset + (i * 4) + 2),
      a: myBuffer.readUInt8(colorOffset + (i * 4) + 3)
    };
  }
}

function saveAsGrayscale(fileName){
  const filePath = path.join(__dirname, fileName);
  var rawBuffer = fs.readFileSync(filePath);
  var bufferHeader = new BufferHeader(rawBuffer);
  var colorOffset = 14 + bufferHeader.sizeOfBitMapCoreHeader;

  for(var i = 0; i < bufferHeader.numberOfColorsInPalette; i++){
    bufferHeader.colorPalette['color'+i] = transform(bufferHeader.colorPalette['color'+i]);
  }

  for (var j = 0; j<bufferHeader.numberOfColorsInPalette; j++){
    colorOffset + (j * 4);
    rawBuffer.writeUInt8(bufferHeader.colorPalette['color'+j].r, colorOffset + (j * 4));
    rawBuffer.writeUInt8(bufferHeader.colorPalette['color'+j].g, colorOffset + (j * 4) + 1);
    rawBuffer.writeUInt8(bufferHeader.colorPalette['color'+j].b, colorOffset + (j * 4) + 2);
    rawBuffer.writeUInt8(bufferHeader.colorPalette['color'+j].a, colorOffset + (j * 4) + 3);
  }

  // write new file with buffer
  const newFilePath = path.join(__dirname, 'palette-bitmap-grey.bmp');
  fs.writeFile(newFilePath, rawBuffer, err => {
    if (err) return null;
  });

  //returns buffer with new grayscale palette
  return rawBuffer;
}

module.exports = saveAsGrayscale;
