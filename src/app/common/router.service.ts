import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RouterService {
    public sampleUrl: BehaviorSubject<string> = new BehaviorSubject('');
    public previewUrl: BehaviorSubject<string> = new BehaviorSubject('');
}
