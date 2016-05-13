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
  this.numberOfColorsInPalette = myBuffer.readInt32LE(46); // 256, but only uses 126
  this.imageSize = myBuffer.readInt16LE(34); //

  // color information, size is 1024 bytes, starts at 54
  const colorStartingOffset = 54;
  var thisColorLocation = colorStartingOffset;

  this.colorPalette = {};

  for (let i=0; i<256; i++){
    let colorName = 'color' + i;
    this.colorPalette[colorName] = {
      a: myBuffer.readUInt8(thisColorLocation),
      b: myBuffer.readUInt8(thisColorLocation + 1),
      g: myBuffer.readUInt8(thisColorLocation + 2),
      r: myBuffer.readUInt8(thisColorLocation + 3)
    };
    ++thisColorLocation;

  }
}

function bitmapBuffer(fileName){
  const filePath = path.join(__dirname, fileName);
  var rawBuffer = fs.readFileSync(filePath);
  var bufferHeader = new BufferHeader(rawBuffer);


  for(var i = 0; i <= 255; i++){
    bufferHeader.colorPalette['color'+i] = transform(bufferHeader.colorPalette['color'+i]);
  }


// interate over each color in pallete,
// ... for each color
// write to each byte in the buffer color palette
// using offset and run buf.writeUINT8()
// offset starts at palette location, add for each write or 4 for each color
  var itemOffset = 54;
  for (var j = 0; j<=255; j++){
    rawBuffer.writeUInt8(bufferHeader.colorPalette['color'+j].r, itemOffset);
    itemOffset++;
    rawBuffer.writeUInt8(bufferHeader.colorPalette['color'+j].g, itemOffset);
    itemOffset++;
    rawBuffer.writeUInt8(bufferHeader.colorPalette['color'+j].b, itemOffset);
    itemOffset++;
    rawBuffer.writeUInt8(bufferHeader.colorPalette['color'+j].a, itemOffset);
    itemOffset++;
  }

  // write new file with buffer
  const newFilePath = path.join(__dirname, 'palette-bitmap-grey.bmp');
  fs.writeFile(newFilePath, rawBuffer, err => {
    console.log(err);
  });


  return rawBuffer;
}

module.exports = bitmapBuffer;
