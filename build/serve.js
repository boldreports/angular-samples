var gulp = require("gulp");
const shelljs = require('shelljs');

gulp.task('serve', ['generate-router'], () => {
  shelljs.exec('ng serve --open');
});
