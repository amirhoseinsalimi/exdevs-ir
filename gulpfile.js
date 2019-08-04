const gulp = require('gulp');


/* General plugins */
const sourcemaps = require('gulp-sourcemaps');


/* Plugins related SCSS and CSS */
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');


/* Plugins related to JS */
const concat = require('gulp-concat');
const deporder = require('gulp-deporder');
const terser = require('gulp-terser');
const stripDebug = require('gulp-strip-debug');
const noop = require('gulp-noop');


/* Paths */
const styleSrc = 'src/scss/**/*.scss';
const styleDest = './public/css/';

const scriptSrc = 'src/js/**/*.js';
const scriptDest = './public/js/';


/* Plugins' configuration */
sass.compiler = require('node-sass');


/* SCSS to CSS */
gulp.task('style', () => gulp.src(styleSrc)
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'compressed',
  })
    .on('error', sass.logError))
  .pipe(autoprefixer({
    cascade: false,
  }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(styleDest)));


/* JS task */
gulp.task('script', () => gulp.src(scriptSrc)
  .pipe(sourcemaps ? sourcemaps.init() : noop())
  .pipe(deporder())
  .pipe(concat('main.js'))
  .pipe(stripDebug ? stripDebug() : noop())
  .pipe(terser())
  .pipe(sourcemaps ? sourcemaps.write() : noop())
  .pipe(gulp.dest(scriptDest)));


/* Default task */
gulp.task('default', gulp.series('style', 'script'));


/* Watch files */
gulp.task('watch', (done) => {
  gulp.watch(styleSrc, gulp.series('style'));
  gulp.watch(scriptSrc, gulp.series('script'));

  done();
});
