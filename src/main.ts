import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLicense } from '@syncfusion/ej2-base';

import { AppModule } from './app/common/app.module';
import { environment } from './environments/environment';

registerLicense('ORg4AjUWIQA/Gnt2V1hiQlRPd11dXmJWfFN0QHNYflR1fV9DaUwxOX1dQl9gSXZRdEVhXXZfeXVSQWE=');
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
