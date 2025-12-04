import { Component, ViewChild, OnInit, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import 'bootstrap';
import { RouterService } from './router.service';
import samples from '../components/samples.json';
import { MainContentComponent } from './main-content/main-content.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Title, Meta } from '@angular/platform-browser';

const data = samples;
type sampleInfo = typeof data;

@Component({
  selector: 'ej-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tocSlideLeft = false;
  enableOverlay = false;
  tocMobileSlideLeft = false;
  private subscriptions = new Subscription();
  @ViewChild('body', { static: true }) body: MainContentComponent;
  @ViewChild('sidebar', { static: true }) sidebar: SidebarComponent;
  constructor(private routerService: RouterService, private titleService: Title, private meta: Meta) { }
  ngOnInit(): void {
    let sampleData: sampleInfo['samples'][0];
    this.subscriptions.add(this.routerService.sampleUrl.subscribe((url) => {
      if (url === '/') {
        sampleData = data.samples[0];
      } else {
        const routerData = this.routerService.getRouterData(url);
        sampleData = data.samples.filter((sample) =>
          sample.routerPath === routerData.reportRouterPath && sample.basePath === routerData.reportBasePath)[0];
      }
      if (!sampleData) {
        sampleData = data.samples[0];
      }
      this.sidebar.selectedPath = sampleData.routerPath;
      this.body.loadSourceCode(sampleData);
      this.updateMetaData(sampleData);
    }));
    let bannerData = data.banner;
    this.subscriptions.add(this.routerService.navEnd.subscribe(() => {
      this.body.updateSampleDetails(sampleData);
      this.body.updateBannerDetails(bannerData);
      this.setReportsHeight(sampleData);
    }));
  }

  public updateMetaData(sampleData: sampleInfo['samples'][0]): void {
    let title = sampleData.metaData.title;
    if (!title) {
      title = sampleData.sampleName;
    }
    if (title.length <= 20) {
      title = `${title} | Angular Report Viewer | Bold Reports`;
    } else {
      title = `${title} | Angular Report Viewer`;
    }
    this.titleService.setTitle(title);
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ name: 'description', property: 'og:description', content: sampleData.metaData.description });
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    let sampleData: sampleInfo['samples'][0];
    this.subscriptions.add(this.routerService.sampleUrl.subscribe((url) => {
      if (url === '/') {
        sampleData = data.samples[0];
      } else {
        const routerData = this.routerService.getRouterData(url);
        sampleData = data.samples.filter((sample) =>
          sample.routerPath === routerData.reportRouterPath && sample.basePath === routerData.reportBasePath)[0];
      }
      if (!sampleData) {
        sampleData = data.samples[0];
      }
    }));
    this.setReportsHeight(sampleData);
    this.body.updateTab();
    this.updateOverlay();
  }

  updateOverlay(): void {
    if (!window.matchMedia('(max-width:550px)').matches) {
      this.tocMobileSlideLeft = false;
    }
  }

  private setReportsHeight(sampleData: sampleInfo['samples'][0]): void {
    let style: HTMLElement = document.getElementById('reports-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'reports-style';
      document.body.appendChild(style);
    }
    style.textContent = `ej-sample{
      display: flex;
      overflow: hidden;
      min-height: 600px;
    }

    #${sampleData.directoryName}_viewerContainer{
      overflow-y: hidden;
      min-height: 600px;
      height: auto !important;
      min-width: 100%;
    }

    #${sampleData.directoryName}_loadingIndicator_WaitingPopup {
      min-height: 600px !important;
    }

    #load-large-data_loadingIndicator_WaitingPopup .e-text, .e-image {
      top: 230px !important;
    }

    #${sampleData.directoryName}{
      height: auto !important;
      width: 100% !important;
    }

    #external-parameter-report, #multi-language-report {
      height: auto !important;
    }`;
  }

  public onHamBurgerClick(): void {
    if (window.matchMedia('(max-width:550px)').matches) {
      this.tocMobileSlideLeft = !this.tocMobileSlideLeft;
    } else {
      this.tocSlideLeft = !this.tocSlideLeft;
    }
  }

  public onMobileOverlayClick(): void {
    this.onHamBurgerClick();
  }

}
