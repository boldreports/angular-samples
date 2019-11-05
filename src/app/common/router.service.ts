import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RouterService {
    public sampleUrl: BehaviorSubject<string> = new BehaviorSubject('');
    public previewUrl: BehaviorSubject<string> = new BehaviorSubject('');
    public navEnd: BehaviorSubject<string> = new BehaviorSubject('');

    public getRouterData(path, basePathIndex = 1, routerPathIndex = 2) {
        const routerData = { reportBasePath: '', reportRouterPath: '', spilttedUrl: [] };
        const modifiedUrl = path.indexOf('?') !== -1 ? path.substring(0, path.indexOf('?')) : path;
        const spilttedUrl = modifiedUrl.split('/');
        routerData.reportBasePath = spilttedUrl[basePathIndex];
        routerData.reportRouterPath = spilttedUrl[routerPathIndex] ? spilttedUrl[routerPathIndex] : '';
        routerData.spilttedUrl = spilttedUrl;
        return routerData;
    }

}
