const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

gulp.task('lint', function(){
  return gulp.src(['**/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('run-test', function(){
  return gulp.src('./test/**/*.js', {read: false})
        
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watch-js', function(){
  gulp.watch(['**/*.js', '!node_modules/**'], ['lint', ['test']]);
});

gulp.task('default', ['lint', 'run-test']);
