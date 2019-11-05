import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as data from '../../components/samples.json';
type sampleInfo = typeof data;

@Component({
  selector: 'ej-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  samples: sampleInfo['samples'] = data.samples;
  selectedPath: string = undefined;
  @ViewChild('toc') toc;

  constructor(private router: Router) { }

  public onHomeClick(): void {
    this.router.navigate(['']);
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
