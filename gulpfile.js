'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var stylish = require('gulp-jscs-stylish');
var runSequence = require('run-sequence');
var connect = require('gulp-connect');

require('gulp-watch');

var bases = {
  src: 'src/',
  dest: 'dist/'
};

var paths = {
  html: ['html/**/*.html'],
  js: ['html/**/*.js'],
  css: ['html/**/*.scss'],
  sharedJs: ['shared/**/*.js'],
  sharedTxt: ['shared/**/*.txt'],
};

gulp.task('clean', function(callback) {
  return gulp.src(bases.dest, {read:false}, callback)
    .pipe(clean({force: true}));
});

gulp.task('html', function() {
  return gulp.src(paths.html, {cwd: bases.src})
    .pipe(gulp.dest(bases.dest))
    .pipe(connect.reload())
});

gulp.task('js', function() {
  return gulp.src(paths.js, {cwd: bases.src})
    .pipe(concat('app.js'))
    .pipe(gulp.dest(bases.dest + 'assets/js/'))
    .pipe(connect.reload())
});

gulp.task('css', function() {
  return gulp.src(paths.css, {cwd: bases.src})
    .pipe(concat('app.css'))
    .pipe(gulp.dest(bases.dest + 'assets/css/'))
    .pipe(connect.reload())
});

gulp.task('sharedJs', function() {
  return gulp.src(paths.sharedJs, {cwd: bases.src})
    .pipe(concat('components.js'))
    .pipe(gulp.dest(bases.dest + 'assets/js/components/'))
    .pipe(connect.reload())
});

gulp.task('sharedTxt', function() {
  return gulp.src(paths.sharedTxt, {cwd: bases.src})
    .pipe(gulp.dest(bases.dest + 'assets/data/'))
    .pipe(connect.reload())
});

gulp.task('connect', function() {
  connect.server({
    root: bases.dest,
    port: 8000,
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.html, {cwd: bases.src}, ['html']);
  gulp.watch(paths.sharedJs, {cwd: bases.src}, ['sharedJs']);
  gulp.watch(paths.js, {cwd: bases.src}, ['js']);
  gulp.watch(paths.css, {cwd: bases.src}, ['css']);
});

gulp.task('default', function(callback) {
  runSequence('clean', ['html', 'js', 'css', 'sharedJs', 'sharedTxt'], callback);
});

gulp.task('server', function(callback) {
  runSequence('default', 'connect', 'watch', callback);
});
