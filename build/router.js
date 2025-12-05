const gulp = require("gulp");
const fs = require("fs");

let importTemplate = `import { {{component}} } from '{{path}}';`;
let childRouterTemplate = `{ path: '{{path}}', component: {{component}} }`;
let routerTempalte = `{
  path: '',
  component: {{component}},
  children: [
  {{childRoute}}
  ]
}`;

let importStatements = [`import { BrowserModule } from '@angular/platform-browser';
import { Type, ModuleWithProviders, NgModule } from '@angular/core';
import { BoldReportsModule } from '@boldreports/angular-reporting-components';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PreviewComponent } from './preview/preview.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';`];
let moduleTemplate = `@NgModule({
  declarations: components,
  imports: [
    BrowserModule,
    BoldReportsModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule],
})

export class AppRouterModule { }
`
let components = ['AppComponent', 'PreviewComponent', 'HeaderComponent', 'SidebarComponent', 'MainContentComponent'];
let routes = [];
let childRoutes = [];
let previewChildRoutes = [];

gulp.task('generate-router', (done) => {
  let samples = JSON.parse(fs.readFileSync('./src/app/components/samples.json', 'utf8')).samples;
  let defaultSampleData = samples[0];
  let initilaReportRouterPath =  defaultSampleData.routerPath ? defaultSampleData.basePath + '/' + defaultSampleData.routerPath : defaultSampleData.basePath;

  //Initila routing
  routes.push(`{ path: '', redirectTo: '${initilaReportRouterPath}/', pathMatch: 'full' }`);

  for (let i = 0; i < samples.length; i++) {
    let sampleData = samples[i];
    let reportRouterPath = sampleData.routerPath ? sampleData.basePath + '/' + sampleData.routerPath : sampleData.basePath;
    let reportComponentPath = sampleData.routerPath ? sampleData.directoryName + '/' + sampleData.routerPath : sampleData.directoryName + '/' + sampleData.basePath;
    childRoutes.push(childRouterTemplate.replace('{{path}}', `${reportRouterPath}/`).replace('{{component}}', sampleData.className));
    previewChildRoutes.push(childRouterTemplate.replace('{{path}}', `${reportRouterPath}/preview/`).replace('{{component}}', sampleData.className));
    importStatements.push(importTemplate.replace('{{component}}', sampleData.className).replace('{{path}}', `../components/${reportComponentPath}.component`));
    components.push(sampleData.className);
  }

  //Designer
  importStatements.push(importTemplate.replace('{{component}}', `DesignerComponent`).replace('{{path}}', `../components/designer/designer.component`));
  components.push('DesignerComponent');
  previewChildRoutes.push(childRouterTemplate.replace('{{path}}', `report-designer/`).replace('{{component}}', 'DesignerComponent'));

  //RDLC Designer
  importStatements.push(importTemplate.replace('{{component}}', `RDLCComponent`).replace('{{path}}', `../components/rdlc/rdlc.component`));
  components.push('RDLCComponent');
  previewChildRoutes.push(childRouterTemplate.replace('{{path}}', `report-designer/rdlc/`).replace('{{component}}', 'RDLCComponent'));

  routes.push(routerTempalte.replace('{{component}}', `AppComponent`).replace('{{childRoute}}', childRoutes.join(',\n\  ')));
  routes.push(routerTempalte.replace('{{component}}', `PreviewComponent`).replace('{{childRoute}}', previewChildRoutes.join(',\n\  ')));

  //re-routing
  routes.push(`{ path: '**', redirectTo: '${initilaReportRouterPath}/' }`);
  let importContent = importStatements.join('\n');
  let componentContent = `const components: any[] | Type<any> | ModuleWithProviders<{}> = [
  ${components.join(',\n  ')}
];`;
  let routerContent = `const routes: Routes = [
  ${routes.join(',\n\  ')}
];`;
  let Content = importContent + '\n\r' + componentContent + '\n\r' + routerContent + '\n\r' + moduleTemplate;
  fs.writeFileSync('./src/app/common/app.routing.module.ts', Content, 'utf8');
  done();
});
