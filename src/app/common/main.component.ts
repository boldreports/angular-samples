import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterService } from './router.service';
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class MainComponent {
  constructor(private router: Router, private routerService: RouterService) {
    this.router.events.pipe(
      filter((event: NavigationStart) => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => {
      if (event.url.indexOf('/preview') === -1 && event.url.indexOf('/report-designer') === -1) {
        this.routerService.sampleUrl.next(event.url);
      } else {
        this.routerService.previewUrl.next(event.url);
      }
    });
  }
}
