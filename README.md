# ![cf](http://i.imgur.com/7v5ASc8.png) Bitmap Transformer

__Team Name__: Don Jon

__Team Members__: [Don Chatelain](https://github.com/DonChatelain), [Johnny Luangphasy](https://github.com/jluangphasy)

A Bitmap reader and transformer that will read a Bitmap in from disk, run one or more color transforms on the bitmap and then it writes out to a new file.

## Getting Started

1. Install [Node.js](https://nodejs.org/en/)
2. Run `git clone https://github.com/jluangphasy/bitmap-transformer.git`
3. Run `git checkout don-jon`
4. Run `npm install`

## Commands

Run Bitmap transformer  
- Bluify file `node index.js palette-bitmap.bmp bluify`  
  The output of the file will be `palette-bitmap-bluify.bmp`.
- Brighten file `node index.js palette-bitmap.bmp brighten`  
  The output of the file will be `palette-bitmap-brighten.bmp`.
- Darken file `node index.js palette-bitmap.bmp darken`  
  The output of the file will be `palette-bitmap-darken.bmp`.
- Funkify file `node index.js palette-bitmap.bmp funkify`  
  The output of the file will be `palette-bitmap-funkify.bmp`.
- Hulkify file `node index.js palette-bitmap.bmp hulkify`  
  The output of the file will be `palette-bitmap-hulkify.bmp`.
- Invertify file `node index.js palette-bitmap.bmp` or `node index.js palette-bitmap.bmp invertify`  
  The output of the file will be `palette-bitmap-invertify.bmp`.

Run lint  
`npm run lint`

Run test  
`npm run test`

Watch JS files for changes  
`npm run watch`

Run lint and test, watch JS files for changes  
`npm run dev`
