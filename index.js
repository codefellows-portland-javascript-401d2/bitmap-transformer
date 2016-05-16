#!/usr/bin/env node
var bT = require('./bitmapTransform');
var program = require('commander');

program
  .version('1.0.4')
  .option('-i <input>, --input', 'paletted bitmap to convert')
  .option('-o <output>, --output', 'output file')
  .option('-t, --transform <method>', 'invert or greyscale', 'invert')
  .parse(process.argv);

bT.palette(program);
