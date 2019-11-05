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
  prepandHash = 'report-viewer/';
  samples: sampleInfo['samples'] = data.samples;
  selectedPath: string = undefined;
  @ViewChild('toc') toc;

  constructor(private router: Router) { }

  public onHomeClick(): void {
    this.router.navigate(['']);
  }

  public onSampleClick(sample: sampleInfo['samples'][0]): void {
    this.router.navigate([this.prepandHash + sample.routerPath]);
  }

  public tocSelection(toc: HTMLElement): string {
    if (!toc.classList.contains('toc-selected')) {
      toc.focus();
    }
    return 'toc-selected';
  }

}
