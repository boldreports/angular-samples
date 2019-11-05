import { Component, HostListener, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import * as data from '../components/samples.json';
import { Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouterService } from './router.service';


@Component({
  selector: 'ej-preview',
  template: '<router-outlet></router-outlet>',

})
export class PreviewComponent implements OnInit {
  private subscriptions = new Subscription();
  constructor(private routerService: RouterService, private router: Router, private titleService: Title, private meta: Meta) { }
  ngOnInit(): void {
    this.subscriptions.add(this.routerService.previewUrl.subscribe((url) => {
      let sampleName = '';
      const isReportDesigner = url.indexOf('/report-designer') !== -1;
      const params: Params = this.router.parseUrl(url).queryParams;
      if (!(isReportDesigner && !Object.keys(params).length)) {
        if (isReportDesigner) {
          const paramName = 'report-name';
          const reportPath = params[paramName];
          reportPath.split('.')[0].replace(/-/g, ' ').replace(/\w\S*/g, (value) => {
            sampleName += value.charAt(0).toUpperCase() + value.substr(1).toLowerCase() + ' ';
            return sampleName.trim();
          });
        } else {
          const samplePath = url.split('/')[url.split('/').length - 2];
          sampleName = data.samples.filter((sample) => sample.routerPath === samplePath)[0].sampleName;
        }
        this.updateMetaData(sampleName, isReportDesigner);
      }
      this.setReportsHeight();
    }));
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.setReportsHeight();
  }

  public updateMetaData(sampleName, isReportDesigner): void {
    let title: string;
    let metaContent: string;
    if (isReportDesigner) {
      title = sampleName + ' | Angular Report Designer';
      if (title.length < 45) {
        title = title + ' | Syncfusion';
      }
      metaContent = `The HTML5 web report designer allows the end-users to arrange/customize the reports appearance in browsers.
       It helps to edit the ${sampleName} for customer\'s application needs.`;
    } else {
      title = `${sampleName} | Preview | Angular Report Viewer`;
      metaContent = `The HTML5 web report viewer allows the end-users to visualize the ${sampleName} report in browsers.`;
    }
    this.titleService.setTitle(title);
    this.meta.updateTag({ name: 'description', content: metaContent });
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
      height: ${window.innerHeight}px
    }`;
  }
}
