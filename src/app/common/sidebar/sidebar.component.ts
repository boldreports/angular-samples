import { Component, ElementRef, OnDestroy, OnInit, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouterService } from '../router.service';
import samples from '../../components/samples.json';
type sampleInfo = typeof data;
type Sample = sampleInfo['samples'][0] & { status?: string };

const data = samples;

@Component({
  selector: 'ej-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  samples: Sample[] = data.samples as Sample[];
  readonly selectedPath = signal<string | undefined>(undefined);
  @ViewChild('toc', { static: true }) toc!: ElementRef<HTMLElement>;
  private subscriptions = new Subscription();

  constructor(private router: Router, private routerService: RouterService) { }

  ngOnInit(): void {
    this.subscriptions.add(this.routerService.sampleUrl.subscribe((url) => {
      if (!url || url === '/') {
        this.selectedPath.set(data.samples[0].routerPath);
      } else {
        const routerData = this.routerService.getRouterData(url);
        const match = data.samples.find((sample) =>
          sample.routerPath === routerData.reportRouterPath && sample.basePath === routerData.reportBasePath);
        this.selectedPath.set(match ? match.routerPath : data.samples[0].routerPath);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onHomeClick(): void {
    const homePageUrl: string = location.origin.indexOf('demos.boldreports.com') !== -1 ? '/home/' : '/';
    location.href = location.origin + homePageUrl + 'angular.html';
  }

  public onSampleClick(sample: Sample): void {
    const reportPath = sample.routerPath ? (sample.basePath + '/' + sample.routerPath) : sample.basePath;
    this.router.navigate([reportPath]);
  }

  public tocSelection(toc: HTMLElement): string {
    if (!toc.classList.contains('toc-selected')) {
      toc.focus();
    }
    return 'toc-selected';
  }

  public getVerticalPosition(sample: Sample): string {
    const isLandscape = sample.imageDetails.isLandscape;
    const index = sample.imageDetails.index;
    return -(isLandscape ? index * 70 : index * 120) + 'px';
  }

}
