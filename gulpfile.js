const gulp = require('gulp');


/* General plugins */
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');
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


/* SCSS to CSS task */
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


/* Nodemon task */
gulp.task('nodemon', (done) => {
  const STARTUP_TIMEOUT = 5000;
  const server = nodemon({
    script: 'bin/www',
    stdout: false, // without this line the stdout event won't fire
  });
  let starting = false;

  const onReady = () => {
    starting = false;
    done();
  };

  server.on('start', () => {
    starting = true;
    setTimeout(onReady, STARTUP_TIMEOUT);
  });

  server.on('stdout', (stdout) => {
    process.stdout.write(stdout); // pass the stdout through
    if (starting) {
      onReady();
    }
  });
});


/* Browser-Sync Task */
gulp.task('browser-sync', (done) => {
  browserSync.init({
    proxy: 'http://localhost:3001',
    files: ['public/**/*.*', 'views/**/*.*', 'src/**/*.*', '*.js', 'routes/*.js', 'bin/www'],
    port: 3000,
    ui: {
      port: 3030,
    },
  }, done);
});


/* Watch files */
gulp.task('watch', (done) => {
  gulp.watch(styleSrc, gulp.series('style'));
  gulp.watch(scriptSrc, gulp.series('script'));

  done();
});


/* Serve project */
gulp.task('serve', gulp.series('nodemon', 'browser-sync'));


/* Build project */
gulp.task('build', gulp.series('style', 'script'));


/* Default task */
gulp.task('default', gulp.series('serve', 'watch'));
