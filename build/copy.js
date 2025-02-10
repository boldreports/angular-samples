const gulp = require('gulp');
const { cp, mkdir } = require('shelljs');
const fs = require('fs');

const scripts = {
    common: ['common/ej2-base.min.js', 'common/ej2-data.min.js', 'common/ej2-pdf-export.min.js', 'common/ej2-svg-base.min.js'],
    control: ['data-visualization/ej2-circulargauge.min.js', 'data-visualization/ej2-lineargauge.min.js', 'data-visualization/ej2-maps.min.js'],
    barcode: ['images', 'barcode.reportitem.css', 'barcode.reportitem.js', 'qrbarcode.reportitem.js'],
    signature: ['signature.reportitem.css', 'signature.dialog.css', 'signature.reportitem.js', 'signature.dialog.js']
};

const srcDir = 'node_modules/@boldreports/javascript-reporting-controls/Scripts/';
const destDir = 'src/scripts/';
const extensionsItemSrcDir = 'node_modules/@boldreports/javascript-reporting-extensions/';
const extensionsItemDir = './src/app/components/extensions/report-item-extensions/';
const extensionsExportTemp = {
    '1D': 'export { EJBarcode };',
    '2D': 'export { EJQRBarcode };',
    'signature': 'export { EJSignature }',
    'signatureDialog': 'export { SignatureDialog }'
}

gulp.task('copy', (done) => {
    copyFiles(scripts.common, srcDir, destDir + 'common');
    copyFiles(scripts.control, srcDir, destDir + 'data-visualization');
    copyFiles(scripts.barcode, extensionsItemSrcDir, extensionsItemDir);
    copyFiles(scripts.signature, extensionsItemSrcDir, extensionsItemDir);
    done();
});

function copyFiles(fileArray, src, dest) {
    fileArray.forEach(file => {
        mkdir('-p', dest);
        cp('-r', src + file, dest);
    });
};

gulp.task('update-extensions-export', (done) => {
    const files = {
        'barcode': ['barcode.reportitem.js', '1D'],
        'qrbarcode': ['qrbarcode.reportitem.js', '2D'],
        'signature': ['signature.reportitem.js', 'signature'],
        'signatureDialog': ['signature.dialog.js', 'signatureDialog'],
    };
    const updateFile = (key, [filename, exportKey]) => {
        const filePath = `${extensionsItemDir}${filename}`;
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            if (!content.includes(extensionsExportTemp[exportKey])) {
                fs.writeFileSync(filePath, `${content}\n${extensionsExportTemp[exportKey]}`);
            }
        } else {
            console.log(`!!!... The ${key} file not found in ${extensionsItemDir} ...!!!`);
            process.exit(1);
        }
    };
    Object.entries(files).forEach(([key, value]) => updateFile(key, value));
    done();
});