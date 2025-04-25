const { src, dest, watch, series, parallel } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');

function styles() {
  return src('app/scss/style.scss')
    .pipe(
      autoprefixer({
        overrideBrowserlist: ['last 10 versions'],
      })
    )
    .pipe(concat('style.min.css'))
    .pipe(scss({ style: 'compressed' }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(['app/js/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

function watching() {
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
  });
  watch(['app/scss/style.scss'], styles);
  watch(['app/js/main.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
}

function cleanDist() {
  return src('dist').pipe(clean());
}

function building() {
  return src(
    [
      'app/*.html',
      'app/js/main.min.js',
      'app/css/style.min.css',
      'app/images/**/*.*',
      'app/fonts/*.*',
    ],
    { base: 'app' }
  ).pipe(dest('dist'));
}

exports.styles = styles;
exports.watching = watching;
exports.scripts = scripts;
exports.cleanDist = cleanDist;
exports.building = building;

exports.default = parallel(styles, scripts, watching);
