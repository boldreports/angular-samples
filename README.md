# Reports Angular samples

Reports Angular samples was built on [Angular CLI](https://cli.angular.io/) application.

## Pre-requisite

* Install stable `NodeJs` from https://nodejs.org and run `node -v` to check whether it is installed properly or not.

* Install `angular-cli` package with global access by executing the below command and run `ng --version` to check whether it is installed properly or not.

```cmd
npm install @angular/cli@latest -g
```

* Install gulp package with global access by executing the below command  and run `gulp -v` to check whether it is installed properly or not.

```cmd
npm install gulp -g
```


## Document Structure

The Reports Angular samples should be placed inside the `src/app/components` location.

Refer the below folder structure for further details.

    --> src
        --> app
            --> components (1)
                --> default (2)
                   --> default.component.html (3)
                   --> default.component.ts (4)
                   --> default.componenet.css (5)
                --> invoice (2)
                   --> invoice.component.html (3)
                   --> invoice.component.ts (4)
                   --> invoice.componenet.css (5)
                --> samples.json (6)

(1). This is where all our `reports samples` should be placed.

(2). This is our sample folder and this folder will contains view, model and css file.

(3). This is our sample `view/template` file.

(4). This is our sample `model` file.

(5). This is our sample `css` file.

(6). This s our sample configuration file.

```json
{
  "samples": [{
      "routerPath": "default",
      "className": "DefaultComponent",
      "sampleName": "Default Functionalities",
      "directoryName": "default",
      "imageDetails": {
        "imageName": "default.png",
        "isLandscape": false
      },
      "metaData": {
        "description": "default sample",
        "tags": "ej"
      }
    },
    {
      "routerPath": "invoice",
      "className": "InvoiceComponent",
      "sampleName": "Invoice",
      "directoryName": "invoice",
      "imageDetails": {
        "imageName": "default.png",
        "isLandscape": true
      },
      "metaData": {
        "description": "invoice sample",
        "tags": "ej"
      }
    }
  ]
} 

```
`samples` - This is an array which contains all samples information.

`routerPath` - This is the our sample navigation path.

`sampleName` - This is our sample name which will be rendered in table of contents.

`className` - This is our sample className.

`directoryName` - This is our sample directory name.

`imageDetails.imageName` - This is our sample image name which will be rendered in table of contents.

Note : keep your sample images in `src/assets/sidebar` folder.

`imageDetails.isLandscape` - if it is true, your sample image will be renderend in lansscape mode else it will be renderend in portrait mode.

`metaData.description` - This is our sample description.

`metaData.tags` - This is our sample important tags.

## QuickStart 

After completing prerequisite steps, Follow the below steps to run EJ Reports Angular samples 

Clone the repo from https://gitlab.syncfusion.com/data-science/reports-angular-samples from `development` branch.


Run `npm install` from the cloned root folder.


Run `gulp serve` to serve the application

## Gulp Tasks

The below gulp tasks can be used to build and serve the documentation.


Run the below command to serve the application. After running the command, Navigate to [localhost:4200](http://localhost:4200).

```cmd
    gulp serve
```

Run the below command to test ts lint.

```cmd
    gulp ts-lint
```

Run the below command to test file name validation.

Note: This task will throw error on using custom file names . For that, we need to include these names(need to have valid reason for using these custom names) in `customNames` array in `src/app/components/samples.json` file.

```cmd
    gulp file-validation
```

Run the below command to test ts lint and file name validation.

```cmd
    gulp test
```
## Pre-requisite for Including New Image for New Report

kindly increase the background width `src/app/common/sidebar/sidebar.css` of css class 

Portrait: `.ej-portrait-img` or


Landscape: `.ej-landscape-img`
```cmd
background-height = current-height + 100%;
```