const gulp = require("gulp");
const shelljs = require('shelljs');
const runSequence = require('gulp4-run-sequence');

gulp.task('ts-lint', (done) => {
  let output = shelljs.exec('ng lint');
  if (output.stdout.indexOf('ERROR') !== -1) {
    process.exit(1);
  }
  done();
});

gulp.task('test', (done) => {
  runSequence('ts-lint', 'file-validation', 'seo-validation', () => {
    done();
  });
});