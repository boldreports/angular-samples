const gulp = require("gulp");
const shelljs = require('shelljs');

gulp.task('test', ['ts-lint', 'file-validation', 'seo-validation']);

gulp.task('ts-lint', () => {
  let output = shelljs.exec('ng lint');
  if (output.stdout.indexOf('ERROR') !== -1) {
    process.exit(1);
  }
});
