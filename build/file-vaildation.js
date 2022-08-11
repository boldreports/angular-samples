const gulp = require('gulp');
const Typo = require('typo-js');
const dictionary = new Typo('en_US');
const path = require('path');
const fs = require('fs');
let customNames = JSON.parse(fs.readFileSync('./src/app/components/samples.json', 'utf8')).customNames;
let checkedFiles = {
    folders: [],
    files: [],
    upperCase: []
};
function getSubFolders(baseFolder, folderList = []) {
    let folders = fs.readdirSync(baseFolder).filter(file => fs.statSync(path.join(baseFolder, file)).isDirectory());
    folders.forEach(folder => {
        folderList.push(folder);
        getSubFolders(path.join(baseFolder,folder), folderList);
    });

    return folderList;
}

gulp.task('file-validation', (done) => {
    const glob = require('glob');
    let folderNames = getSubFolders('./src/app/');
    for (let i = 0; i < folderNames.length; i++) {
        checkFileNames(folderNames[i]);
    }
    let fileNames = glob.sync('./src/app/**/*.*', {
        ignore: ['./src/app/**/*.png', './src/app/**/*.svg', './src/app/**/*.json', './src/app/**/*.eot', './src/app/**/*.ttf',
            './src/app/**/*.woff', './src/app/**/*.gif', './src/app/**/*.jpg', './src/app/**/*.JPG', './src/app/**/*.PNG']
    });
    for (let k = 0; k < fileNames.length; k++) {
        checkFileNames(fileNames[k], true);
    }
    printError(done);
});

function checkFileNames(filePath, isFiles) {
    let type = isFiles ? 'files' : 'folders';
    let fileName = isFiles ? path.basename(filePath).split('.')[0] : filePath;
    let splitted = fileName.split('-');
    let isValid = true;
    let isUpperCase = false;
    for (let j = 0; j < splitted.length; j++) {
        if (!dictionary.check(splitted[j]) && customNames.indexOf(splitted[j]) === -1) {
            isValid = false;
        }
        if (splitted[j].match(new RegExp(/^[A-Z]/)) !== null) {
            isUpperCase = true;
        }
    }
    if (!isValid) {
        checkedFiles.isFailed = true;
        checkedFiles[type].push(filePath);
    }
    if (isUpperCase) {
        checkedFiles.isFailed = true;
        checkedFiles.upperCase.push(filePath);
    }

}

function printError(done) {
    if (!checkedFiles.isFailed) {
        console.log('All Files Have Valid Names\n');
        done();
        return;
    }
    if (checkedFiles.folders.length) {
        console.log('\n******* The Below Folder Names Are Invalid *******\n');
        console.log(checkedFiles.folders.toString().split(',').join('\n'));
    }

    if (checkedFiles.files.length) {
        console.log('\n******* The Below File Names Are Invalid *******\n');
        console.log(checkedFiles.files.toString().split(',').join('\n'));
    }

    if (checkedFiles.upperCase.length) {
        console.log('\n******* The Below File Names  Have The UpperCase letters *******\n');
        console.log(checkedFiles.upperCase.toString().split(',').join('\n'));
    }
    process.exit(1);
    done();
}
