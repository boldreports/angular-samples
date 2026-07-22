import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import gulp from 'gulp';
import shelljs from 'shelljs';
import runSequence from 'gulp4-run-sequence';
const argv = yargs(hideBin(process.argv)).parse();
const { exec } = shelljs;
const ngCli = "node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng";
gulp.task('serve', (done) => {
  runSequence('update-extensions-export', 'generate-router', () => {
    const portArg = argv.port ? `--port ${argv.port}` : '';
    exec(`${ngCli} serve --open ${portArg}`);
    done();
  });
});
