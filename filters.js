// I just blue myself
function bluify(inputDecimals) {
  const delta = 150;
  const colorizedDecimals = [];

  inputDecimals.forEach((decimal, index) => {
    if (index % 4 === 0) {
      colorizedDecimals[index] = decimal + delta;

      if (colorizedDecimals[index] > 255) {
        colorizedDecimals[index] = 255;
      }
    } else {
      colorizedDecimals[index] = decimal;
    }
  });

  return colorizedDecimals;
}

// Brightens -- out = in * delta
function brighten(inputDecimals) {
  const delta = 2;
  const colorizedDecimals = [];

  inputDecimals.forEach((decimal, index) => {
    colorizedDecimals[index] = (decimal + 1) * delta;

    if (colorizedDecimals[index] > 255) {
      colorizedDecimals[index] = 255;
    }
  });

  return colorizedDecimals;
}

// Darken -- out = in * in / delta
function darken(inputDecimals) {
  const delta = 300;
  const colorizedDecimals = [];

  inputDecimals.forEach((decimal, index) => {
    colorizedDecimals[index] = decimal * decimal/delta;

    if (colorizedDecimals[index] > 255) {
      colorizedDecimals[index] = 255;
    }
  });

  return colorizedDecimals;
}

// Get funky
function funkify(inputDecimals) {
  const delta = 50;
  const colorizedDecimals = [];

  inputDecimals.forEach((decimal, index) => {
    if (index % 2 === 0) {
      colorizedDecimals[index] = decimal + delta;
    }

    if (colorizedDecimals[index] > 255) {
      colorizedDecimals[index] = 255;
    }
  });

  return colorizedDecimals;
}

// some hulk quote here
function hulkify(inputDecimals) {
  const delta = 90;
  const colorizedDecimals = [];

  inputDecimals.forEach((decimal, index) => {
    if (index % 3 === 1) {
      colorizedDecimals[index] = decimal + delta;

      if (colorizedDecimals[index] > 255) {
        colorizedDecimals[index] = 255;
      }
    } else {
      colorizedDecimals[index] = decimal;
    }
  });

  return colorizedDecimals;
}

// Inverts -- out = 255 - in
function invertify(inputDecimals) {
  const invertedDecimals = [];

  inputDecimals.forEach((decimal, index) => {
    invertedDecimals[index] = 255 - decimal;
  });

  return invertedDecimals;
}

module.exports = {
  bluify,
  brighten,
  darken,
  funkify,
  hulkify,
  invertify
};
