const gulp = require('gulp');
const { exec } = require('shelljs');
const argv = require('yargs').argv;
const runSequence = require('gulp4-run-sequence');

const ngCli = "node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng";

gulp.task('production-build', (done) => {
  runSequence('generate-router', ()=> {
    if (argv.prefix) {
      exec(`${ngCli} build --prod --base-href ${argv.prefix}`);
    } else {
      exec(`${ngCli} build --prod`);
    }
    done();
  });
});
