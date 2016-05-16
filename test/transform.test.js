const assert = require('assert');
const fs = require( 'fs' );
const transform = require ('../transform');
const bT = require('../bitmapTransform');
const randomHex = require('random-hexadecimal');

describe('transform', () => {
  it('invert function inverts dword', () => {
    const initial = new Buffer([ 0x00, 0x35, 0xff, 0]);
    const expectedOutput = new Buffer([ 0xff, 0xca, 0x00, 0]);
    assert.deepEqual(transform.invert(initial), expectedOutput);
  });

  it('greyscale function converts dword to grey', () => {
    const testData = [randomHex({max: 0xff}),randomHex({max: 0xff}),randomHex({max: 0xff}),0];
    const initial = new Buffer(testData);
    const testOutput = transform.greyscale(initial);

    assert(testOutput[0] === testOutput[1] && testOutput[1] === testOutput[2]);
  });
});

describe( 'conversion', () => {
  const inputFilename = ('./palette-bitmap.bmp');
  const outputFilename = ('./invert.test.bmp');
  const knownGood = fs.readFileSync('./test/invert.test.bmp');
  const options = {
    I: inputFilename,
    O: outputFilename,
    transform: 'invert'
  };

  it ('applies bitmapTransform.palette to bmp, compares output to known test file', done => {
    bT.palette(options, (err) => {
      if (err) return done(err);
      const output = fs.readFileSync(outputFilename);
      assert.deepEqual(output, knownGood);
      done();
    });
  });

  // remove the test file after test completed.
  after (() => {
    fs.unlinkSync(outputFilename);
  });
});
