const gulp = require('gulp');
const { exec } = require('shelljs');
var runSequence = require('gulp4-run-sequence');
const argv = require('yargs').argv;

const ngCli = "node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng";

gulp.task('build', (done) => {
  runSequence('generate-router', () => {
    exec(`${ngCli} build`);
    done();
  });
});
