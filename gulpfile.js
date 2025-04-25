const { src, dest, watch, series, parallel } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

function styles() {
  return src('app/scss/style.scss').pipe(scss()).pipe(dest('app/css')).pipe(browserSync.stream());
}
