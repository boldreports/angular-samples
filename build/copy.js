const gulp = require('gulp');
const { cp, mkdir } = require('shelljs');

const scripts = {
    common: ['common/ej2-base.min.js', 'common/ej2-data.min.js', 'common/ej2-pdf-export.min.js', 'common/ej2-svg-base.min.js'],
    control: ['data-visualization/ej2-circulargauge.min.js', 'data-visualization/ej2-lineargauge.min.js', 'data-visualization/ej2-maps.min.js']
};

const srcDir = 'node_modules/@boldreports/javascript-reporting-controls/Scripts/';
const destDir = 'src/scripts/';

gulp.task('copy', function () {
    copyFiles(scripts.common, destDir + 'common');
    copyFiles(scripts.control, destDir + 'data-visualization');
});

function copyFiles(fileArray, dest) {
    fileArray.forEach(file => {
        mkdir('-p', dest);
        cp('-r', srcDir + file, dest);
    });
};