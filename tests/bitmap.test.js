const fs = require('fs');
const es = require('child_process').execSync;
const assert = require('assert');
const filters = require('../filters');
const bitmap = require('../bitmap');

describe('Bitmap Transformer', () => {
  
  it('reads file as raw buffer with no errors', done => {
    fs.readFile('./images/mset.bmp', (err, data) => {
      assert(!err);
      assert(Buffer.isBuffer(data));
      done();
    });
  });
  
  it('invertify filter converts color value: 66 -> 189 (255-66)', done => {
    fs.readFile('./images/mset.bmp', (err, data) => {
      const inputColorValue = 66;
      const outputColorValue = filters.invertify([inputColorValue]);
      assert.equal(outputColorValue, 189);
      done();
    });
  });  
  
  it('logs message with output file using CLI', (done) => {
    var expected = 'mset-darken.bmp has been created in the images directory.';
    var message = es('node index.js mset.bmp darken').toString().trim();
    assert.equal(expected, message);
    done();
  });
  
  
});
