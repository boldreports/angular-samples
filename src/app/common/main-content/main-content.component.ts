import { Component, ViewChild, AfterViewInit, Input, EventEmitter, Output, Renderer2 } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Prism from 'prismjs';
import { RouterService } from '../router.service';
import 'prismjs/components/prism-typescript';
import * as data from '../../components/samples.json';

type sampleInfo = typeof data;

interface SourceDataCollection {
  name: string;
  body: string;
  id: string;
}

interface CurData {
  curIndex: number;
  isFirst: boolean;
  isLast: boolean;
}

@Component({
  selector: 'ej-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})

export class MainContentComponent implements AfterViewInit {
  @Input() enableOverlay: boolean;
  @Output() enableOverlayChange = new EventEmitter<boolean>();
  sourceData: SourceDataCollection[] = [];
  @ViewChild('title', { static: true }) title;
  @ViewChild('metaDescription', { static: true }) metaDescription;
  @ViewChild('tabContent', { static: true }) tabContent;
  @ViewChild('demoTab', { static: true }) demoTab;
  @ViewChild('sourceTab', { static: true }) sourceTab;
  @ViewChild('descTab', { static: true }) descTab;
  @ViewChild('description', { static: true }) description;
  @ViewChild('text', { static: true }) text;
  @ViewChild('features[0]', { static: true }) feature1;
  @ViewChild('features[1]', { static: true }) feature2;
  @ViewChild('features[2]', { static: true }) feature3;
  @ViewChild('freeTrialUrl', { static: true }) freeTrialUrl;
  constructor(private routerService: RouterService, private http: HttpClient, private router: Router, private location: Location, private renderer: Renderer2) { }

  public loadSourceCode(sampleData: sampleInfo['samples'][0]): void {
    (jQuery('#parentTab li:first-child a') as any).tab('show');
    this.getFiles(sampleData);
  }

  ngAfterViewInit(): void {
    this.updateTab();
    jQuery(this.demoTab.nativeElement.firstElementChild).on('shown.bs.tab', this.resizeReportViewer);
  }

  updateSampleDetails(sampleData): void {
    this.title.nativeElement.innerText = sampleData.sampleName;
    this.metaDescription.nativeElement.innerText = sampleData.metaData.description;
    this.description.nativeElement.innerHTML = '';
    this.description.nativeElement.appendChild(this.tabContent.nativeElement.querySelector('#description'));
  }

  updateBannerDetails(bannerData): void {
    this.text.nativeElement.innerText = bannerData.text;
    this.feature1.nativeElement.innerText = bannerData.features[0];
    this.feature2.nativeElement.innerText = bannerData.features[1];
    this.feature3.nativeElement.innerText = bannerData.features[2];
    this.renderer.setProperty(this.freeTrialUrl.nativeElement, 'href', bannerData.freeTrialUrl)
  }

  getFiles(sampleData: sampleInfo['samples'][0]): void {
    const reportComponentPath = sampleData.routerPath ? sampleData.directoryName + '/' +
      sampleData.routerPath : sampleData.directoryName + '/' + sampleData.basePath;
    const basePath = `app/components/${reportComponentPath}`;
    const observableCollection: Observable<string>[] = [this.http.get(basePath + '.component.html', { responseType: 'text' }),
    this.http.get(basePath + '.component.ts', { responseType: 'text' })];
    forkJoin(observableCollection).subscribe(
      (resultCollection: string[]) => {
        this.sourceData = [];
        this.sourceData.push({
          name: `${sampleData.routerPath}.component.ts`,
          body: Prism.highlight(resultCollection[1], Prism.languages.ts), id: 'ts'
        });
        this.sourceData.push({
          name: `${sampleData.routerPath}.component.html`,
          body: Prism.highlight(this.getStringWithOutDescription(resultCollection[0], /(\'|\")description/g), Prism.languages.html), id: 'html'
        });
      });
  }

  getStringWithOutDescription(code: string, descRegex: RegExp): string {
    const lines: string[] = code.split('\n');
    let desStartLine: number = null;
    let desEndLine: number = null;
    let desInsideDivCnt = 0;
    for (let i = 0; i < lines.length; i++) {
      const curLine: string = lines[i];
      if (desStartLine) {
        if (/<div/g.test(curLine)) {
          desInsideDivCnt = desInsideDivCnt + 1;
        }
        if (desInsideDivCnt && /<\/div>/g.test(curLine)) {
          desInsideDivCnt = desInsideDivCnt - 1;
        } else if (!desEndLine && /<\/div>/g.test(curLine)) {
          desEndLine = i + 1;
        }
      }
      if (descRegex.test(curLine)) {
        desStartLine = i;
      }
    }
    if (desEndLine && desStartLine) {
      lines.splice(desStartLine, desEndLine - desStartLine);
    }
    return lines.join('\n');
  }


  onTabBtnClick(): void {
    const modifiedUrl = this.router.url.indexOf('?') !== -1 ? this.router.url.substring(0, this.router.url.indexOf('?')) : this.router.url;
    window.open(this.location.prepareExternalUrl(modifiedUrl) + '/preview', '_blank"');
  }

  onTabNext(): void {
    this.togglePopup();
    const curRouterData: CurData = this.getCurRouterData();
    const curRouterIndex: number = curRouterData.curIndex;
    const sampleData: sampleInfo['samples'][0] = curRouterData.isLast ? data.samples[0] : data.samples[curRouterIndex + 1];
    const reportPath = sampleData.routerPath ? (sampleData.basePath + '/' + sampleData.routerPath) : sampleData.basePath;
    this.router.navigate([reportPath]);
  }

  updateTab(): void {
    if (window.matchMedia('(max-width:850px)').matches) {
      (jQuery('#parentTab li:first-child a') as any).tab('show');
      this.sourceTab.nativeElement.classList.add('e-hidden');
      //this.descTab.nativeElement.classList.add('e-hidden');
    } else {
      if (this.sourceTab.nativeElement.classList.contains('e-hidden')) {
        this.sourceTab.nativeElement.classList.remove('e-hidden');
        // this.descTab.nativeElement.classList.remove('e-hidden');
      }
    }
  }
  onTabPrev(): void {
    this.togglePopup();
    const curRouterData: CurData = this.getCurRouterData();
    const curRouterIndex: number = curRouterData.curIndex;
    const sampleData: sampleInfo['samples'][0] = curRouterData.isFirst ?
      data.samples[data.samples.length - 1] : data.samples[curRouterIndex - 1];
    const reportPath = sampleData.routerPath ? (sampleData.basePath + '/' + sampleData.routerPath) : sampleData.basePath;
    this.router.navigate([reportPath]);
  }

  getCurRouterData(): CurData {
    const curData: CurData = { curIndex: undefined, isFirst: undefined, isLast: undefined };
    if (this.router.url === '/') {
      curData.curIndex = 0;
    } else {
      const routerData = this.routerService.getRouterData(this.router.url);
      data.samples.some((sample, index) => {
        if (sample.routerPath === routerData.reportRouterPath && sample.basePath === routerData.reportBasePath) {
          curData.curIndex = index;
          return true;
        } else {
          return false;
        }
      });
    }
    curData.isFirst = curData.curIndex === 0 ? true : false;
    curData.isLast = curData.curIndex === (data.samples.length - 1) ? true : false;
    return curData;
  }

  togglePopup(): void {
    this.enableOverlayChange.emit(true);
    setTimeout(() => {
      this.enableOverlayChange.emit(false);
    });
  }

  resizeReportViewer(): void {
    const reportViewerElement = document.querySelector('.e-reportviewer.e-js');
    if (reportViewerElement) {
      jQuery(reportViewerElement).trigger('resize');
    }
  }
}
