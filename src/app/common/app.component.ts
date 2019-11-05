import { Component, ViewChild, OnInit, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import 'bootstrap';
import { RouterService } from './router.service';
import * as data from '../components/samples.json';
import { MainContentComponent } from './main-content/main-content.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Title, Meta } from '@angular/platform-browser';

type sampleInfo = typeof data;

@Component({
  selector: 'ej-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tocSlideLeft = false;
  tocMobileSlideLeft = false;
  prepandHash = 'report-viewer/';
  private subscriptions = new Subscription();
  @ViewChild('body') body: MainContentComponent;
  @ViewChild('sidebar') sidebar: SidebarComponent;
  constructor(private routerService: RouterService, private titleService: Title, private meta: Meta) { }
  ngOnInit(): void {
    this.subscriptions.add(this.routerService.sampleUrl.subscribe((url) => {
      url = url.replace(this.prepandHash, '').trim();
      let sampleData: sampleInfo['samples'][0];
      if (url === '/') {
        sampleData = data.samples[0];
      } else {
        sampleData = data.samples.filter((sample) => '/' + sample.routerPath === url)[0];
      }
      if (!sampleData) {
        sampleData = data.samples[0];
      }
      this.sidebar.selectedPath = sampleData.routerPath;
      this.body.loadSourceCode(sampleData);
      this.updateMetaData(sampleData);
      this.setReportsHeight();
    }));
  }

  public updateMetaData(sampleData: sampleInfo['samples'][0]): void {
    let title = sampleData.metaData.title;
    if (!title) {
      title = sampleData.sampleName;
    }
    if (title.length <= 20) {
      this.titleService.setTitle(`${title} | Angular Report Viewer | Syncfusion`);
    } else {
      this.titleService.setTitle(`${title} | Angular Report Viewer`);
    }
    this.meta.updateTag({ name: 'description', content: sampleData.metaData.description });
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.setReportsHeight();
    this.body.updateTab();
    this.updateOverlay();
  }

  updateOverlay(): void {
    if (!window.matchMedia('(max-width:550px)').matches) {
      this.tocMobileSlideLeft = false;
    }
  }

  private setReportsHeight(): void {
    let style: HTMLElement = document.getElementById('reports-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'reports-style';
      document.body.appendChild(style);
    }
    style.textContent = `ej-sample{
      display:block;
      overflow: hidden;
      height: ${window.innerHeight -
      (this.body.tabContent.nativeElement.getBoundingClientRect().top - document.body.getBoundingClientRect().top)}px
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
