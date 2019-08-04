const gulp = require('gulp');

/* Modules related SCSS and CSS */
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

/* CSS and SCSS related modules */
sass.compiler = require('node-sass');

/* SCSS to CSS */
const styleSrc = 'src/scss/**/*.scss';
const styleDest = './public/css/';

const scriptSrc = 'src/js/**/*.js';
const scriptDest = './public/js/';

gulp
  .task('style', () => gulp.src(styleSrc)
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
    .pipe(gulp.dest(styleDest)))

  .task('script', () => {
    gulp.src(scriptSrc)
      .pipe(gulp.dest(scriptDest));
  })

  .task('default', ['style'], () => {
    console.log('Finished');
  })

  .task('watch', ['default'], () => {
    gulp.watch(styleSrc, ['style']);
    gulp.watch(styleDest, ['script']);
  });
