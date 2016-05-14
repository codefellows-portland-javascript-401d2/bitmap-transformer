const fs = require('fs');
const filters = require('./filters');

/* ===========  T O   D O  ==================

Split up readBMP function so filter function can be called outside of it
 ^ if possible ^  
 *see outcome in index.js*

*/

//INPUT = = = = = = = = = = = = =
function readBMP(file, callback) {
  fs.readFile('./images/' + file, (err, results) => {
    if (err) throw err;

    const paletteStart = 54;
    const headEnd = results.readInt16LE(10);
    const headBuffer = Buffer.from(results.buffer, 0, paletteStart);
    const paletteBuffer = Buffer.from(results.buffer, paletteStart, headEnd - paletteStart);
    const bodyBuffer = Buffer.from(results.buffer, headEnd);
    const paletteDecimals = [];
        
    paletteBuffer.forEach(decimal => {
      paletteDecimals.push(decimal);
    });
    
    // const newPalette = filters.invertify(paletteDecimals);
    // const newPalette = filters.brighten(paletteDecimals);
    // const newPalette = filters.darken(paletteDecimals);
    const newPalette = filters.funkify(paletteDecimals);
    // const newPalette = filters.bluify(paletteDecimals);
    // const newPalette = filters.hulkify(paletteDecimals);
    
    var newPaletteBuffer = Buffer.from(newPalette);
    const totalLength = headBuffer.length + newPaletteBuffer.length + bodyBuffer.length;
    var outputBuffer = Buffer.concat([headBuffer, newPaletteBuffer, bodyBuffer], totalLength);
      
    callback(outputBuffer);
  });
}
//OUTPUT = = = = = = = = = = = = = 
function writeNewFile(someInput, file_number) {
  fs.writeFile('./images/filtered-image-'+ file_number + '.bmp', someInput, (err) => {
    if (err) throw err;
  });
}
//= = = = = = = = = = = = = = = = 
module.exports = {
  readBMP,
  writeNewFile
};