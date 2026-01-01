import { Component } from '@angular/core';
import { Router, NavigationStart, Event, NavigationEnd } from '@angular/router';
import { RouterService } from './router.service';
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: false
})
export class MainComponent {
  constructor(private router: Router, private routerService: RouterService) {
    this.router.events.subscribe((event: Event) => {

      if (event instanceof NavigationStart) {
        this.routerService.addTrailingSlash(event.url);
        if (event.url.indexOf('/preview') === -1 && event.url.indexOf('/report-designer') === -1) {
          this.routerService.sampleUrl.next(event.url);
        } else {
          this.routerService.previewUrl.next(event.url);
        }
      }

      if (event instanceof NavigationEnd) {
        if (event.url.indexOf('/preview') === -1 && event.url.indexOf('/report-designer') === -1) {
          this.routerService.navEnd.next(event.url);
        }
      }
    });
  }
}
