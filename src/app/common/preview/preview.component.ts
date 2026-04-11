import { Component, HostListener, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import samples from '../../components/samples.json';
import { Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouterService } from '../router.service';

const data = samples;

@Component({
  selector: 'ej-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']

})
export class PreviewComponent implements OnInit {
  private subscriptions = new Subscription();
  public homePageUrl = '/';
  public productDetailURL = '';
  constructor(private routerService: RouterService, private router: Router, private titleService: Title, private meta: Meta) { }
  ngOnInit(): void {    
    this.homePageUrl = '/angular/#/';
    this.subscriptions.add(this.routerService.previewUrl.subscribe((url) => {
      let sampleData;
      const isReportDesigner = url.indexOf('/report-designer') !== -1;
      const routerData = this.routerService.getRouterData(url);
      routerData.reportRouterPath = routerData.spilttedUrl[2] !== 'Preview' && !isReportDesigner ? routerData.spilttedUrl[2] : '';
      const params: Params = this.router.parseUrl(url).queryParams;
      if (!(isReportDesigner && !Object.keys(params).length)) {
        if (isReportDesigner) {
          let sampleName = '';
          const paramName = 'report-name';
          const reportPath = params[paramName];
          sampleName = reportPath.split('.')[0].trim();
          sampleData = data.samples.filter((sample) =>
            sample.routerPath === sampleName)[0];
        } else {
          sampleData = data.samples.filter((sample) =>
            sample.routerPath === routerData.reportRouterPath && sample.basePath === routerData.reportBasePath)[0];
        }
        this.updateMetaData(sampleData, routerData.reportBasePath);
      } else if (isReportDesigner) {
        const rdlcType = url.indexOf('/report-designer/rdlc') !== -1 ? 'RDLC' : 'RDL';
        sampleData = {
          metaData: {
            title: rdlcType + ' sample'
          }
        };
        this.updateMetaData(sampleData, 'report-designer');
      }
      this.setReportsHeight();
    }));
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.setReportsHeight();
  }

  public updateMetaData(sampleData, reportBasePath): void {
    let title: string = sampleData.metaData.title;
    if (!title) {
      title = sampleData.sampleName;
    }
    let metaContent: string;
    switch (reportBasePath) {
      case 'report-designer':
        metaContent = 'The Angular Bold Report Designer allows the end-users to arrange/customize the reports appearance in browsers.' +
          'It helps to edit the ' + title + ' for customer\'s application needs.';
        title = title + ' | Angular Report Designer';
        this.productDetailURL = 'https://www.boldreports.com/embedded-reporting/angular-report-designer';
        break;
      case 'report-viewer':
        metaContent = 'The Angular Bold Report Viewer allows the end-users to visualize the ' + title + ' report in browsers.';
        title = title + ' | Preview | Angular Report Viewer';
        this.productDetailURL ='https://www.boldreports.com/embedded-reporting/angular-report-viewer';
        break;
      default:
        title = '';
        metaContent = '';
    }
    if (title.length < 45) {
      title = title + ' | Bold Reports';
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
      height: ${window.innerHeight - 48}px
    }`;
  }
}
