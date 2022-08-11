'use strict';

const gulp = require('gulp');
var gzip = require('gulp-gzip');
var shelljs = require('shelljs');

const CONFIG = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
};

var s3 = require('gulp-s3-upload')(CONFIG);


var publish = function (dirName, prefixName, done) {
    prefixName = prefixName.endsWith('/') ? prefixName : prefixName + '/';
    dirName = dirName.endsWith('/') ? dirName : dirName + '/';

    var aws = {
        Bucket: process.env.AWS_REPORTS_BUCKET,
        ACL: 'public-read',
        uploadNewFilesOnly: false,
        // ContentEncoding: 'gzip',
        keyTransform: function (relative_filename) {
            var new_name = prefixName + relative_filename;
            return new_name;
        },
    };

    gulp.src(dirName + '**', { buffer: false })
        .pipe(s3(aws, {
            maxRetries: 5,
            maxRedirects: 100,
            retryDelayOptions: {
                base: 1000
            }
        }))
        .on('end', function () {
            console.log('Published in CDN');
        })
        .on('error', function (e) {
            console.error('unable to sync: ', e.stack);
            done(e);
        });
};
exports.publish = publish;

/**
 * publish into S3
 */
gulp.task('publish', (done) => {
    shelljs.exec(`node_modules\\.bin\\gulp production-build --prefix=/demos/angular/`);
    var folderPath = './dist/';
    var filePath = './demos/angular';
    var replacePath = './';
    shelljs.rm('-rf', filePath);
    shelljs.mkdir('-p', filePath);
    var prefixName = filePath.split(replacePath)[1];

    gulp.src([folderPath + '/**/*'])
        // .pipe(gzip({
        //     append: false
        // }))
        .pipe(gulp.dest(filePath))
        .on('end', function () {
            publish(filePath, prefixName, done);
            done();
        })
        .on('error', function (e) {
            done(e);
        });
});