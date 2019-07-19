// Gulp.js configuration

/* Development mode? */
const devBuild = (process.env.NODE_ENV !== 'production');


/* Folders */
const src = 'src/';
const dest = 'public/';


/* Modules */
const gulp = require('gulp');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const noop = require('gulp-noop');
const concat = require('gulp-concat');
const deporder = require('gulp-deporder');
const terser = require('gulp-terser');
const stripdebug = devBuild ? null : require('gulp-strip-debug');
const sourcemaps = devBuild ? require('gulp-sourcemaps') : null;
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const assets = require('postcss-assets');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const cssnano = require('cssnano');


/* Module configuration */
sass.compiler = require('node-sass');


/* Tasks configuration */

// Image processing
function images() {
  const out = `${dest}/img`;

  return gulp.src(`${src}img/**/*`)
    .pipe(newer(out))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(out));
}

// JS processing
function js() {
  return gulp.src(`${src}js/**/*`)
    .pipe(sourcemaps ? sourcemaps.init() : noop())
    .pipe(deporder())
    .pipe(concat('main.js'))
    .pipe(stripdebug ? stripdebug() : noop())
    .pipe(terser())
    .pipe(sourcemaps ? sourcemaps.write() : noop())
    .pipe(gulp.dest(`${dest}js/`));
}

// Sass and CSS processing
function css() {
  return gulp.src(`${src}scss/main.scss`)
    .pipe(sourcemaps ? sourcemaps.init() : noop())
    .pipe(sass({
      outputStyle: 'nested',
      imagePath: '/img/',
      precision: 3,
      errLogToConsole: true,
    }).on('error', sass.logError))
    .pipe(postcss([
      assets({ loadPaths: ['img/'] }),
      autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
      mqpacker,
      cssnano,
    ]))
    .pipe(sourcemaps ? sourcemaps.write() : noop())
    .pipe(gulp.dest(`${dest}css/`));
}

// Watch for file changes
function watch(done) {
  // image changes
  gulp.watch(`${src}img/**/*`, images);

  // js changes
  gulp.watch(`${src}js/**/*`, js);

  // css changes
  gulp.watch(`${src}scss/**/*`, css);

  done();
}


/* Tasks */
exports.images = images;
exports.js = js;
exports.css = css;
exports.build = gulp.parallel(exports.images, exports.css, exports.js); // run all tasks
exports.watch = watch;
