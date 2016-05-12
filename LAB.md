![cf](http://i.imgur.com/7v5ASc8.png) Bitmap Transformer
====

## To Submit this Assignment

* Have team leader fork this repository, or create a team organization
and fork the repo their
* Add team members as collaborators to the team repo fork
* Team members should clone and work against team repo
* When complete:
	* submit a pull request to the class assignment repository when done :)
	* each person will submit a link to your  to your PR in canvas
	* each person will write up about what work they did on the project
	* each person write a question, observation on canvas

#### Rubric:
* Tests: 3pts
* Gulpfile/package.json 2pts
* Read Bitmap Meta Data 5pts
* Successfully Apply Transform 5pts
* Project Design 5pts

## Description

For this assignment you will be building a Bitmap reader and transformer.
It will read a Bitmap in from disk, run one or more color transforms on the bitmap
and then write it out to a new file.
This project will require the use of node `Buffer` in order to manipulate binary data.
Your project should include tests, as well as a build automation (linting and testing)
and package.json file.
Make sure to run all your code through eslint. The process will look something like this:

1. Open file using fs and read it into a buffer
2. Convert buffer headers data into a Javascript Object
3. Run a transform on the buffer
4. Write the buffer to a new file.

The wikipedia article found here [Bitmap Specification](https://en.wikipedia.org/wiki/BMP_file_format)
describes the byte specification of a "windows bitmap file."
We'll be working the simplest version, meaning no compression.
Your project should include at least one transform.
This is a difficult assignment so make sure to come to me with questions early.
Ideas for easy transformations:

* Invert the colors (essentially subtract every color value from the max color value which is 255),
* Grayscale the colors, multiply each color value by a constant, just make sure your values don't go over 255.
* (red|green|blue)scale the colors, same as above but only multiply one of the colors.

## Bonus Points For More Fun:

* Include an "API" for interfacing with the transformer via filenames
* Can handle palette and non-palette bitmaps
* Can handle multiple types of bitmaps (not just BM)
* create a command line interface
* command line interface that can select the transform
* can handle various sized bitmaps
