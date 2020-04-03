import { Component, Output, EventEmitter, Inject } from '@angular/core';
import * as data from '../../components/samples.json';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { RouterService } from '../router.service';

@Component({
  selector: 'ej-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  platforms: string[];
  platformName = data.platform;
  document;
  constructor(private routerService: RouterService, private router: Router, @Inject(DOCUMENT) document) {
    this.document = document;
    this.platforms = Object.keys(data.otherPlatforms);
  }

  // Declaring onHamBurgerClick Event to acheive sidebar toggling from the app component side.
  @Output() hamBurgerClick: EventEmitter<{}> = new EventEmitter();

  // This will be fired on clicking hamburger icon.
  public onClick(): void {
    // This will fire an event in app component.
    this.hamBurgerClick.emit();
  }

  public platformSwitcher(platform: string): void {
    const routerData = this.routerService.getRouterData(this.router.url);
    let platformBasePath;
    let platformSamplePath;
    const sampleName = routerData.reportRouterPath ? routerData.reportRouterPath : routerData.reportBasePath;
    if (routerData.reportRouterPath) {
      platformBasePath = this.getRouterPath(this.platformName, platform, routerData.reportBasePath);
    }
    platformSamplePath = this.getRouterPath(this.platformName, platform, sampleName);
    const reportPath = routerData.reportRouterPath ? (platformBasePath + '/' + platformSamplePath) : platformSamplePath;
    const url: string = location.origin.indexOf('demos.boldreports.com') !== -1 ? '/' : '/demos/';
    window.open(this.document.location.origin + url + data.otherPlatforms[platform] + reportPath, '_self');
  }

  private getRouterPath(curPlatform: string, targetplatform: string, sampleName: string): string {
    curPlatform = curPlatform.toLowerCase();
    targetplatform = targetplatform.toLowerCase();
    const samePath = (curPlatform.indexOf('asp') === -1 && targetplatform.indexOf('asp') === -1) ||
      (curPlatform.indexOf('asp') >= 0 && targetplatform.indexOf('asp') >= 0);
    if (samePath) {
      return sampleName;
    } else {
      if (curPlatform.indexOf('asp') !== -1) {
        return sampleName.split(/(?=[A-Z])/).map((name) => {
          return name.toLowerCase();
        }).join('-');

      } else {
        return sampleName.split(/-/).map((name) => {
          return name.charAt(0).toUpperCase() + name.slice(1);
        }).join('');

      }
    }
  }
}
