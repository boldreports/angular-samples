// bold-reports
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/common/bold.reports.common.min';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/common/bold.reports.widgets.min';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/bold.report-viewer.min';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/bold.report-designer.min';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/localization/l10n/ej.localetexts.en-US.min.js';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/localization/l10n/ej.localetexts.fr-CA.min.js';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/localization/l10n/ej.localetexts.de-DE.min.js';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/localization/l10n/ej.localetexts.hi-IN.min.js';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/localization/l10n/ej.localetexts.es-ES.min.js';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/localization/l10n/ej.localetexts.nl-NL.min.js';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/localization/l10n/ej.localetexts.ko-KR.min.js';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/localization/l10n/ej.localetexts.he-IL.min.js';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/localization/l10n/ej.localetexts.ru-RU.min.js';

// code-mirror
import 'codemirror/lib/codemirror';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/sql-hint';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/vb/vb';

import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { registerLicense } from '@syncfusion/ej2-base';
import * as CodeMirror from 'codemirror';

import { MainComponent } from './app/common/main.component';
import { appRoutingProviders } from './app/common/app.routing.module';
import { environment } from './environments/environment';
import { Globals } from './app/components/globals';

// Preserve previous AppModule side-effects: register CodeMirror globally and
// clear the report viewer cache on page unload.
(window as any).codemirror = CodeMirror;

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
    (($(reportViewerElement) as any).data('boldReportViewer') as any)
      ._ajaxCallMethod('ClearCache', '_clearCurrentServerCache', false);
  }
}

registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF5cXmdCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdlWXxdcHRXQ2hcU0R0XkNWYUs=');
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(MainComponent, {
  providers: [
    provideHttpClient(),
    appRoutingProviders
  ]
}).catch(err => console.error(err));
