import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
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

  sourceData: SourceDataCollection[] = [];
  @ViewChild('title') title;
  @ViewChild('metaDescription') metaDescription;
  @ViewChild('tabContent') tabContent;
  @ViewChild('sourceTab') sourceTab;
  @ViewChild('descTab') descTab;
  @ViewChild('description') description;
  constructor(private routerService: RouterService, private http: Http, private router: Router, private location: Location) { }

  public loadSourceCode(sampleData: sampleInfo['samples'][0]): void {
    (jQuery('#parentTab li:first-child a') as any).tab('show');
    this.getFiles(sampleData);
  }

  ngAfterViewInit(): void {
    this.updateTab();
  }

  updateSampleDetails(sampleData): void {
    this.title.nativeElement.innerText = sampleData.sampleName;
    this.metaDescription.nativeElement.innerText = sampleData.metaData.description;
    this.description.nativeElement.innerHTML = '';
    this.description.nativeElement.appendChild(this.tabContent.nativeElement.querySelector('#description'));
  }

  getFiles(sampleData: sampleInfo['samples'][0]): void {
    const reportComponentPath = sampleData.routerPath ? sampleData.directoryName + '/' +
      sampleData.routerPath : sampleData.directoryName + '/' + sampleData.basePath;
    const basePath = `app/components/${reportComponentPath}`;
    const observableCollection: Observable<Response>[] = [this.http.get(basePath + '.component.html'),
    this.http.get(basePath + '.component.ts')];
    forkJoin(observableCollection).subscribe(
      (resultCollection: any) => {
        this.sourceData = [];
        for (const res of resultCollection) {
          if (res.url.indexOf('.component.html') !== -1) {
            this.sourceData.push({
              name: `${sampleData.routerPath}.component.html`,
              body: Prism.highlight(this.getStringWithOutDescription(res._body, /(\'|\")description/g), Prism.languages.html), id: 'html'
            });
          } else {
            this.sourceData.push({
              name: `${sampleData.routerPath}.component.ts`,
              body: Prism.highlight(res._body, Prism.languages.ts), id: 'ts'
            });
          }
        }
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
      this.descTab.nativeElement.classList.add('e-hidden');
    } else {
      if (this.sourceTab.nativeElement.classList.contains('e-hidden')) {
        this.sourceTab.nativeElement.classList.remove('e-hidden');
        this.descTab.nativeElement.classList.remove('e-hidden');
      }
    }
  }
  onTabPrev(): void {
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
}
