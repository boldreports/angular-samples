const gulp = require("gulp");
const { exec } = require('shelljs');
var argv = require('yargs').argv;
const ngCli = "node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng";
const runSequence = require('gulp4-run-sequence');

gulp.task('serve', (done) => {
  runSequence('generate-router', () => {
    exec(`${ngCli} serve --open --port ${argv.port || ''}`);
    done();
  });
});
