import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import samples from '../../components/samples.json';
type sampleInfo = typeof data;

const data = samples;

@Component({
  selector: 'ej-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false
})
export class SidebarComponent {
  samples: sampleInfo['samples'] = data.samples;
  selectedPath: string = undefined;
  @ViewChild('toc', { static: true }) toc;

  constructor(private router: Router) { }

  public onHomeClick(): void {
    const homePageUrl: string = location.origin.indexOf('demos.boldreports.com') !== -1 ? '/home/' : '/';
    location.href = location.origin + homePageUrl + 'angular.html';
  }

  public onSampleClick(sample: sampleInfo['samples'][0]): void {
    const reportPath = sample.routerPath ? (sample.basePath + '/' + sample.routerPath) : sample.basePath;
    this.router.navigate([reportPath]);
  }

  public tocSelection(toc: HTMLElement): string {
    if (!toc.classList.contains('toc-selected')) {
      toc.focus();
    }
    return 'toc-selected';
  }

  public getVerticalPosition(sample: sampleInfo['samples'][0]): string {
    const isLandscape = sample.imageDetails.isLandscape;
    const index = sample.imageDetails.index;
    return -(isLandscape ? index * 70 : index * 120) + 'px';
  }

}
