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
import { EJ_REPORTVIEWER_COMPONENTS } from '@syncfusion/reporting-angular/src/ej/reportviewer.component';
import { EJ_REPORTDESIGNER_COMPONENTS } from '@syncfusion/reporting-angular/src/ej/reportdesigner.component';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PreviewComponent } from './preview.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';`];
let moduleTemplate = `@NgModule({
  declarations: components,
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule],
})

export class AppRouterModule { }
`
let components = ['EJ_REPORTVIEWER_COMPONENTS', 'EJ_REPORTDESIGNER_COMPONENTS', 'AppComponent', 'PreviewComponent', 'HeaderComponent', 'SidebarComponent', 'MainContentComponent'];
let routes = [];
let childRoutes = [];
let previewChildRoutes = [];
let prepandHash = 'report-viewer/';

gulp.task('generate-router', () => {
  let samples = JSON.parse(fs.readFileSync('./src/app/components/samples.json', 'utf8')).samples;
  routes.push(`{ path: '', redirectTo: '${prepandHash + samples[0].routerPath}', pathMatch: 'full' }`);
  for (let i = 0; i < samples.length; i++) {
    let sampleData = samples[i];
    childRoutes.push(childRouterTemplate.replace('{{path}}', prepandHash + sampleData.routerPath).replace('{{component}}', sampleData.className));
    previewChildRoutes.push(childRouterTemplate.replace('{{path}}', `${prepandHash + sampleData.routerPath}/preview`).replace('{{component}}', sampleData.className));
    importStatements.push(importTemplate.replace('{{component}}', sampleData.className).replace('{{path}}', `../components/${sampleData.directoryName}/${sampleData.routerPath}.component`));
    components.push(sampleData.className);
  }
  importStatements.push(importTemplate.replace('{{component}}', `DesignerComponent`).replace('{{path}}', `../components/designer/designer.component`));
  components.push('DesignerComponent');
  previewChildRoutes.push(childRouterTemplate.replace('{{path}}', `report-designer`).replace('{{component}}', 'DesignerComponent'));
  routes.push(routerTempalte.replace('{{component}}', `AppComponent`).replace('{{childRoute}}', childRoutes.join(',\n\  ')));
  routes.push(routerTempalte.replace('{{component}}', `PreviewComponent`).replace('{{childRoute}}', previewChildRoutes.join(',\n\  ')));
  routes.push(`{ path: '**', redirectTo: '${prepandHash + samples[0].routerPath}' }`);
  let importContent = importStatements.join('\n');
  let componentContent = `const components: any[] | Type<any> | ModuleWithProviders<{}> = [
  ${components.join(',\n  ')}
];`;
  let routerContent = `const routes: Routes = [
  ${routes.join(',\n\  ')}
];`;
  let Content = importContent + '\n\r' + componentContent + '\n\r' + routerContent + '\n\r' + moduleTemplate;
  fs.writeFileSync('./src/app/common/app.routing.module.ts', Content, 'utf8');
});
