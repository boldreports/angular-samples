// bold-reports
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/common/bold.reports.common.min';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/common/bold.reports.widgets.min';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/bold.report-viewer.min';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/bold.report-designer.min';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { AppRouterModule } from './app.routing.module';
import { RouterService } from './router.service';

// code-mirror
import 'codemirror/lib/codemirror';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/sql-hint';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/vb/vb';

import { Globals } from '../../app/components/globals';
window.addEventListener('beforeunload', () => {
  
  if (Globals.DESTROY_REPORT) {
      destroyReportControls();
  } else {
      Globals.DESTROY_REPORT = true;
  }
});

function destroyReportControls(): void {
  const reportViewerElement = document.querySelector('.e-reportviewer.e-js');
  if (reportViewerElement) {
      ($(reportViewerElement).data('boldReportViewer') as any)._ajaxCallMethod('ClearCache', '_clearCurrentServerCache', false);
  }
}
import * as CodeMirror from 'codemirror';
const codemirror = 'CodeMirror';
window[codemirror] = CodeMirror;

@NgModule({
  declarations: [
    MainComponent
  ],

  imports: [
    AppRouterModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [RouterService],
  exports: [RouterModule],
  bootstrap: [MainComponent]
})
export class AppModule { }
