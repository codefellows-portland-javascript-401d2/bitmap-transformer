var transformColorVal = function(color){
  var grayVal = Math.floor((color.r + color.g + color.b)/3);

  color.r = grayVal;
  color.g = grayVal;
  color.b = grayVal;

  return color;
};

module.exports = transformColorVal;
