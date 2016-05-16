const assert = require('assert');
const fs = require( 'fs' );
const cpe = require('child_process').exec;

describe('testing CLI', () => {
  var inputFilename = ('./palette-bitmap.bmp');
  var outputFilename = ('./invert.test.bmp');
  var knownGood = fs.readFileSync('./test/invert.test.bmp');

  it ('compares output file to known test file', done => {
    cpe(`./index.js -i ${inputFilename} -o ${outputFilename} -t invert`, err => {
      if (err) return done(err);
      var output = fs.readFileSync(outputFilename);
      assert.deepEqual(output, knownGood);
      done();
    });
  });

  // remove the test file after test completed.
  after (() => {
    fs.unlinkSync(outputFilename);
  });
});
