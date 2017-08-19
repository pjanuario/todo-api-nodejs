'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const jshint = require('gulp-jshint');
const livereload = require('gulp-livereload');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const env = require('gulp-env');
const exit = require('gulp-exit');

gulp.task('scripts', () => {
  return gulp.src('*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(livereload());
});

gulp.task('watch', () => {
  livereload.listen();
  gulp.watch('*.js', ['scripts']);
});

gulp.task('run', () => {
  nodemon({
    'script': 'app/app.js'
  });
});

gulp.task('pre-test', () => {
  return gulp.src(['app/**/*.js']).pipe(istanbul()).pipe(istanbul.hookRequire());
});

function handleError(err) {
  console.log(err.toString());
  process.exit(-1);
}

const test_env = {
  vars: {
    NODE_ENV: 'testing',
    MONGO_URL: 'mongodb://localhost/test_database',
    PORT: 3001
  }
};

gulp.task('test', ['pre-test'], () => {
  env(test_env);
  return gulp.src('app/spec/**/*.spec.js')
    .pipe(mocha({ bail: false, reporter: 'spec' })).on('error', handleError)
    .pipe(istanbul.writeReports().on('error', console.error))
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }).on('error', console.error))
    .pipe(exit());
});

gulp.task('serve', ['run', 'watch']);  