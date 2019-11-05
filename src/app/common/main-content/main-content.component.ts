import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import Prism from 'prismjs';
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
  prepandHash = 'report-viewer/';
  @ViewChild('tabContent') tabContent;
  @ViewChild('sourceTab') sourceTab;
  constructor(private http: Http, private router: Router, private location: Location) { }

  public loadSourceCode(sampleData: sampleInfo['samples'][0]): void {
    this.sourceData = [];
    (jQuery('#parentTab li:first-child a') as any).tab('show');
    this.getFiles(sampleData);
  }

  isUndefined(value: number): boolean {
    return ('undefined' === typeof value);
  }

  ngAfterViewInit() {
    this.updateTab();
  }

  getFiles(sampleData: sampleInfo['samples'][0]): void {
    const basePath = `app/components/${sampleData.directoryName}/${sampleData.routerPath}`;
    const observableCollection: Observable<Response>[] = [this.http.get(basePath + '.component.html'),
    this.http.get(basePath + '.component.ts')];
    forkJoin(observableCollection).subscribe(
      (resultCollection: any) => {
        for (const res of resultCollection) {
          if (res.url.indexOf('.component.html') !== -1) {
            this.sourceData.push({
              name: `${sampleData.routerPath}.component.html`,
              body: Prism.highlight(res._body, Prism.languages.html), id: 'html'
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

  onTabBtnClick(): void {
    window.open(this.location.prepareExternalUrl(this.router.url) + '/preview', '_blank"');
  }
  onTabNext(): void {
    const curRouterData: CurData = this.getCurRouterData();
    const curRouterIndex: number = curRouterData.curIndex;
    const sampleData: sampleInfo['samples'][0] = !this.isUndefined(curRouterIndex) ?
      (curRouterData.isLast ? data.samples[0] : data.samples[curRouterIndex + 1]) : data.samples[0];
    this.router.navigate([this.prepandHash + sampleData.routerPath]);
  }

  updateTab(): void {
    if (window.matchMedia('(max-width:850px)').matches) {
      (jQuery('#parentTab li:first-child a') as any).tab('show');
      this.sourceTab.nativeElement.classList.add('e-hidden');
    } else {
      if (this.sourceTab.nativeElement.classList.contains('e-hidden')) {
        this.sourceTab.nativeElement.classList.remove('e-hidden');
      }
    }
  }
  onTabPrev(): void {
    const curRouterData: CurData = this.getCurRouterData();
    const curRouterIndex: number = curRouterData.curIndex;
    const sampleData: sampleInfo['samples'][0] = !this.isUndefined(curRouterIndex) ?
      (curRouterData.isFirst ? data.samples[data.samples.length - 1] : data.samples[curRouterIndex - 1]) : data.samples[0];
    this.router.navigate([this.prepandHash + sampleData.routerPath]);
  }

  getCurRouterData(): CurData {
    const curData: CurData = { curIndex: undefined, isFirst: undefined, isLast: undefined };
    if (this.router.url === '/') {
      curData.curIndex = 0;
    } else {
      data.samples.some((sample, index) => {
        if ('/' + sample.routerPath === this.router.url.replace(this.prepandHash, '').trim()) {
          curData.curIndex = index;
          return true;
        } else {
          return false;
        }
      });
      if (!this.isUndefined(curData.curIndex)) {
        curData.isFirst = curData.curIndex === 0 ? true : false;
        curData.isLast = curData.curIndex === (data.samples.length - 1) ? true : false;
      }
      return curData;
    }
  }
}
