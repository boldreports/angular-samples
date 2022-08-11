const gulp = require('gulp');
const { exec } = require('shelljs');
const argv = require('yargs').argv;
const runSequence = require('gulp4-run-sequence');

const ngCli = "node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng";

gulp.task('build', (done) => {
  runSequence('update-barcode', 'generate-router', () => {
    exec(`${ngCli} build`);
    done();
  })
});