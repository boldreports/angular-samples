const gulp = require('gulp');
const shelljs = require('shelljs');
const argv = require('yargs').argv;

gulp.task('build', ['generate-router'], function () {
  shelljs.exec(`node_modules\\.bin\\ng build`);
});
