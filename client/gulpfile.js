const { watch, parallel, series, dest, src } = require('gulp');
const $ = require('gulp-load-plugins')();
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass')(require('sass'));

function taskSass(cb) {
  console.log('Rendering SCSS...');
  const returned = src('scss/app.scss')
    .pipe(sass()
      .on('error', sass.logError))
    // .pipe($.postcss([
    //   autoprefixer({ browsers: ['last 2 versions', 'ie >= 9'] })
    // ]))
    .pipe(dest('src/style'));
  console.log('Render complete!');
  return returned;
}

function taskImages(cb) {
  console.log('Copying images...');
  const returned = src('scss/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(dest('src/style/images'));
  console.log('Images copied!');
  return returned;
}

function taskWatch(cb) {
  watch('scss/*.scss', taskSass);
  // watch('scss/images/*', taskImages);
  cb();
}

exports.default = series(taskSass);
exports.build = series(taskSass);
exports.dev = parallel(taskWatch, series(taskSass));
