const gulp = require('gulp');

/* Modules related SCSS and CSS */
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

/* Modules related to JS */
const concat = require('gulp-concat');
const deporder = require('gulp-deporder');
const terser = require('gulp-terser');
const stripDebug = require('gulp-strip-debug');
const noop = require('gulp-noop');

/* CSS and SCSS related modules */
sass.compiler = require('node-sass');

/* SCSS to CSS */
const styleSrc = 'src/scss/**/*.scss';
const styleDest = './public/css/';

const scriptSrc = 'src/js/**/*.js';
const scriptDest = './public/js/';

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

gulp.task('script', () => gulp.src(scriptSrc)
  .pipe(sourcemaps ? sourcemaps.init() : noop())
  .pipe(deporder())
  .pipe(concat('main.js'))
  .pipe(stripDebug ? stripDebug() : noop())
  .pipe(terser())
  .pipe(sourcemaps ? sourcemaps.write() : noop())
  .pipe(gulp.dest(scriptDest)));


gulp.task('default', gulp.series('style', 'script'));

gulp.task('watch', (done) => {
  gulp.watch(styleSrc, gulp.series('style'));
  gulp.watch(scriptSrc, gulp.series('script'));

  done();
});
