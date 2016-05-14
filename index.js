const bitmap = require('./bitmap');

bitmap.readBMP('palette-bitmap.bmp', function(result) {
  // filter(result)             here once refactored ***
  // repackage(filtered_result) here once refactored ***
  bitmap.writeNewFile(result, 5); // (repackaged_filtered_result) ***
});