const gulp = require('gulp');
const { cp, mkdir } = require('shelljs');
const fs = require('fs');

const scripts = {
    common: ['common/ej2-base.min.js', 'common/ej2-data.min.js', 'common/ej2-pdf-export.min.js', 'common/ej2-svg-base.min.js'],
    control: ['data-visualization/ej2-circulargauge.min.js', 'data-visualization/ej2-lineargauge.min.js', 'data-visualization/ej2-maps.min.js']
};

const srcDir = 'node_modules/@boldreports/javascript-reporting-controls/Scripts/';
const destDir = 'src/scripts/';
const barcodeDir = './src/app/components/extensions/report-item-extensions/';
const barcodeTeml = {
    '1D': 'export { EJBarcode };',
    '2D': 'export { EJQRBarcode };'
}

gulp.task('copy', (done) => {
    copyFiles(scripts.common, destDir + 'common');
    copyFiles(scripts.control, destDir + 'data-visualization');
    done();
});

function copyFiles(fileArray, dest) {
    fileArray.forEach(file => {
        mkdir('-p', dest);
        cp('-r', srcDir + file, dest);
    });
};

gulp.task('update-barcode', (done) => {
    if (fs.existsSync(`${barcodeDir}barcode.reportitem.js`) && fs.existsSync(`${barcodeDir}qrbarcode.reportitem.js`)) {
        var barcode = fs.readFileSync(`${barcodeDir}barcode.reportitem.js`);
        var qrbarcode = fs.readFileSync(`${barcodeDir}qrbarcode.reportitem.js`);
        if (!barcode.includes(barcodeTeml['1D']))
            fs.writeFileSync(`${barcodeDir}barcode.reportitem.js`, `${barcode} \n ${barcodeTeml['1D']}`);
        if (!qrbarcode.includes(barcodeTeml['2D']))
            fs.writeFileSync(`${barcodeDir}qrbarcode.reportitem.js`, `${qrbarcode} \n ${barcodeTeml['2D']}`);
        done();
    }
    else {
        console.log(`!!!... The Barcode files not found in ${barcodeDir} ...!!!`);
        process.exit(1);
    }
});