import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class RouterService {
    public sampleUrl: BehaviorSubject<string> = new BehaviorSubject('');
    public previewUrl: BehaviorSubject<string> = new BehaviorSubject('');
    public navEnd: BehaviorSubject<string> = new BehaviorSubject('');

    public getRouterData(path, basePathIndex = 1, routerPathIndex = 2): RouterData {
        const routerData: RouterData = { reportBasePath: '', reportRouterPath: '', spilttedUrl: [] };
        const modifiedUrl = path.indexOf('?') !== -1 ? path.substring(0, path.indexOf('?')) : path;
        const spilttedUrl = modifiedUrl.split('/');
        routerData.reportBasePath = spilttedUrl[basePathIndex];
        routerData.reportRouterPath = spilttedUrl[routerPathIndex] ? spilttedUrl[routerPathIndex] : '';
        routerData.spilttedUrl = spilttedUrl;
        return routerData;
    }

    constructor(private router: Router) { }
    public addTrailingSlash(url: string): boolean {
        const qIndex = url.indexOf('?');
        const pathPart = url.slice(0, qIndex !== -1 ? qIndex : url.length);
        if (pathPart && pathPart !== '/' && !pathPart.endsWith('/')) {
            this.router.navigateByUrl(url.replace(pathPart, `${pathPart}/`));
            return false;
        }
        return true;
    }
}

interface RouterData {
    reportBasePath: string;
    reportRouterPath: string;
    spilttedUrl: string[];
}
