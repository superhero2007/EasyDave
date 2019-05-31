import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class OverlayLoaderService {

  private showSpinnerSource = new Subject<string>();
  showSpinnerChanged$ = this.showSpinnerSource.asObservable();

  changeSpinnerState(state) {
    this.showSpinnerSource.next(state);
  }
  constructor() { }
}
