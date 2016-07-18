const bitmap = require('./bitmap');

bitmap.transformBMP(process.argv[2], process.argv[3], (err, message) => {
  if (err) throw err;

  console.log(message);
});
