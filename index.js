//var transform = require('./transformer');
var path = require('path');
var fs = require('fs');

var bufferFromFile = function(fileName){
  var filePath = path.join(__dirname, fileName);


  var data = fs.readFileSync(filePath);
  return data;
};


module.exports = bufferFromFile;
