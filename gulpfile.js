const { src, dest, watch, series, parallel } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;

function styles() {
  return src('app/scss/style.scss')
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
  watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.scripts = scripts;
