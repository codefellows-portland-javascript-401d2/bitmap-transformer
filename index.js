//var transform = require('./transformer');
var path = require('path');
var fs = require('fs');

function bitmapBuffer(fileName){
  this.filePath = path.join(__dirname, fileName);
  this.rawBuffer = fs.readFileSync(this.filePath);
  this.header = this.rawBuffer.readInt16LE(0);
}

module.exports = bitmapBuffer;



//header info
  //bitmap header offset 0; length 14
  //DIB header offset 14; length unknown but speced in byte index 14-17
  //optional RGB bit masks
      //to determine if RGB masks are present; determine DIB header length, ID bitmap format

//which means color table offset = 14 + DIB.length + RGB bit masks (??)

//how long is the fucking color table
