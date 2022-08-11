const gulp = require('gulp');
const Typo = require('typo-js');
const dictionary = new Typo('en_US');
const path = require('path');
const fs = require('fs');
var sampleJSON = JSON.parse(fs.readFileSync('./src/app/components/samples.json', 'utf8'));

var checkedFiles = {
    titles: [],
    descriptions: []
};
var titleDescription = [];
var duplicates = {
    title: [],
    description: []
};
var imgNotAvail = [], imgLargeSize = [];
const IMAGE_SIZE = 100.00;
var checkedImgFiles = {
    files: [],
    upperCase: []
};

gulp.task('seo-validation', (done) => {
    var sampleList = sampleJSON.samples;
    var sampleCount = sampleList.length;
    for (var index = 0; index < sampleCount; index++) {
        var title = sampleList[index].metaData.title;
        if (!title) {
            title = sampleList[index].sampleName;
        }
        title = title + ' | Angular Report Viewer';
        if (title.length < 45) {
            title = title + ' | Bold Reports';
        }
        var description = sampleList[index].metaData.description;
        var samplePath = sampleList[index].routerPath;
        if (title && (title.length < 45 || title.length > 60)) {
            checkedFiles.titles = checkedFiles.titles + samplePath + '\n';
        }
        if (description && (description.length < 100 || description.length > 200)) {
            checkedFiles.descriptions = checkedFiles.descriptions + samplePath + '\n';

        }
        titleDescription.push({ 'filePath': samplePath, 'title': title, 'description': description });
    }
    validateDuplicateTitleDesc();

    var glob = require('glob');
    var imgFilePath = glob.sync('./src/assets/sidebar/*.*');
    for (var k = 0; k < imgFilePath.length; k++) {
      //  checkImgSize(imgFilePath[k]);
        checkImgName(imgFilePath[k]);
    }
    printError(done);
});

function checkImgSize(filePath) {
    var content = fs.readFileSync(filePath, 'utf8');
    if (content != null) {
        if (fs.existsSync(filePath)) {
            if ((fs.statSync(filePath).size) / 1024 > IMAGE_SIZE) {
                imgLargeSize = imgLargeSize + ' ---> ' + filePath + '\n';
            }
        } else {
            imgNotAvail = imgNotAvail + ' ---> ' + filePath + '\n';
        }
    }
}

function checkImgName(filePath) {    
    var imgName = path.basename(filePath).split('.')[0];
    var splitted = imgName.split('-');
    var validImgName = true;
    var isUpperCase = false;
    for (var j = 0; j < splitted.length; j++) {
        if (splitted[j].match(new RegExp(/[A-Z]\w+/g)) !== null) {
            isUpperCase = true;
        }
        if (!dictionary.check(splitted[j]) && sampleJSON.customNames.length && sampleJSON.customNames.indexOf(splitted[j]) === -1 ) {
            validImgName = false;
        }
    }
    if (!validImgName) {
        checkedImgFiles.isFailed = true;
        checkedImgFiles.files.push(filePath);
    }
    if (isUpperCase) {
        checkedImgFiles.isFailed = true;
        checkedImgFiles.upperCase.push(filePath);
    }
}

function validateDuplicateTitleDesc() {
    checkDuplicates('title');
    checkDuplicates('description');
}

function checkDuplicates(propertyName) {
    var propArr = titleDescription.map(function (item) { return item[propertyName] });
    propArr.some(function (item, index) {
        if (propArr.indexOf(item) != index) {
            duplicates[propertyName] = duplicates[propertyName] + titleDescription[index]['filePath'] + '\n';
        }
    });
}

function printError(done) {
    var isValid = true;

    if (checkedFiles.titles.length) {
        isValid = false;
        console.log('\n******* THE BELOW SAMPLES HAVE INVALID TITLE LENGTH (EXPECTED : 45 - 60 CHARACTERTS) *******\n');
        console.log(checkedFiles.titles);
    }

    if (checkedFiles.descriptions.length) {
        isValid = false;
        console.log('\n******* THE BELOW SAMPLES HAVE INVALID DESCRIPTION LENGTH (EXPECTED : 100 - 160 CHARACTERTS) *******\n');
        console.log(checkedFiles.descriptions);
    }

    if (duplicates.title.length) {
        isValid = false;
        console.log('\n******* THE BELOW SAMPLES HAVE DUPLICATE TITLES *******\n');
        console.log(duplicates.title);
    }

    if (duplicates.description.length) {
        isValid = false;
        console.log('\n******* THE BELOW SAMPLES HAVE DUPLICATE DESCRIPTIONS *******\n');
        console.log(duplicates.description);
    }

    if (isValid) {
        console.log('\n******* ALL THE SAMPLES HAVE VALID TITLES AND DESCRIPTIONS *******\n');
    }

    if (imgLargeSize.length) {
        console.log('\n******* THE BELOW IMAGE FILES ARE TOO LARGE IN SIZE (EXPECTED 100KB) *******\n');
        console.log(imgLargeSize);
    }

    if (imgNotAvail.length) {
        console.log('\n******* THE BELOW IMAGE FILES ARE NOT AVAILABLE *******\n');
        console.log(imgNotAvail);
    }

    if (checkedImgFiles.files.length) {
        console.log('\n******* THE BELOW IMAGE FILE NAMES ARE INVALID *******\n');
        console.log(checkedImgFiles.files.toString().split(',').join('\n'));
    }

    if (checkedImgFiles.upperCase.length) {
        console.log('\n******* THE BELOW IMAGE FILE NAMES HAVE THE UPPERCASE LETTERS *******\n');
        console.log(checkedImgFiles.upperCase.toString().split(',').join('\n'));
    }

    if (!checkedImgFiles.isFailed) {
        console.log('\n******* ALL IMAGE FILES HAVE VALID NAMES *******\n');
        done();
        return;
    }
    process.exit(1);
    done();
}