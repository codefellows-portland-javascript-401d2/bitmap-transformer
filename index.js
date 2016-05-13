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

  // color information, size is ?, starts at 54
  const colorStartingOffset = 54;
  var thisColorLocation = colorStartingOffset;

  this.colorPalette = {};

  for (let i=0; i<256; i++){
    let colorName = 'color' + i;
    this.colorPalette[colorName] = {
      r: myBuffer.readUInt8(thisColorLocation),
      g: myBuffer.readUInt8(thisColorLocation + 1),
      b: myBuffer.readUInt8(thisColorLocation + 2),
      a: myBuffer.readUInt8(thisColorLocation + 3)
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

  

  console.log(bufferHeader.colorPalette);
  //return rawBuffer;
}

module.exports = bitmapBuffer;



//header info
  //bitmap header offset 0; length 14
  //DIB header offset 14; length unknown but speced in byte index 14-17
  //optional RGB bit masks
      //to determine if RGB masks are present; determine DIB header length, ID bitmap format

//which means color table offset = 14 + DIB.length + RGB bit masks (??)
