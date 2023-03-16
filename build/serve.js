const gulp = require("gulp");
const { exec } = require('shelljs');
const runSequence = require('gulp4-run-sequence');
const ngCli = "node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng";

gulp.task('serve', function (done) {
  runSequence('generate-router', () => {
    exec(`${ngCli} serve --open`);
    done();
  });
})