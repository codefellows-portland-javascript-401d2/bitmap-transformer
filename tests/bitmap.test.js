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
  
  it('assures that transformed buffer length is same as original', (done) => {
    fs.readFile('./images/mset.bmp', (err, data) => {
      const bufferData = new bitmap.BitmapObj(data);   
      const newPalette = filters.bluify(bufferData.paletteBuffer);
      const newPaletteBuffer = Buffer.from(newPalette);
      const outputBuffer = Buffer.concat([bufferData.headBuffer, newPaletteBuffer, bufferData.bodyBuffer]);
      assert.equal(outputBuffer.length, data.length);
      done();
    });
  });
  
  it('tests bitmap.writeBMP() succesfully writes test file', done => {
    const testFile = '../tests/test.txt';
    const testContent = 'This is content in test.txt';
    bitmap.writeBMP(testFile, testContent, (err, data) => {
      
      fs.readFile('./tests/' + testFile, (err, results) => {
        assert.equal(testContent, results);
        done();
      });
    });
  });
  
  
  
});
