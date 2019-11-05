const gulp = require('gulp');
const shelljs = require('shelljs');
const argv = require('yargs').argv;

gulp.task('production-build', ['generate-router'], function () {
  if (argv.prefix) {
    shelljs.exec(`node_modules\\.bin\\ng build --prod --base-href ${argv.prefix}`);
  } else {
    shelljs.exec(`node_modules\\.bin\\ng build --prod`);
  }
});
