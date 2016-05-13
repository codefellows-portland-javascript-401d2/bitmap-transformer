var transformToGrayScale = function(color){
  var grayVal = (color.r + color.g + color.b + color.a)/4;

  color.r = grayVal;
  color.g = grayVal;
  color.b = grayVal;
  color.a = grayVal;

  return color;
};

module.exports = transformToGrayScale;
