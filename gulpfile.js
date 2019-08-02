const gulp = require('gulp');

/* Modules related SCSS and CSS */
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');


/* CSS processing */
sass.compiler = require('node-sass');

const srcPath = './src/scss/**/*.scss';
const distPath = './public/css/';

gulp.task('style', () => gulp.src(srcPath)
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
  .pipe(gulp.dest(distPath)));
