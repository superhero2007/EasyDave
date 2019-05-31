import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  private toggleSideNavSource = new Subject<string>();
  navBarToggled$ = this.toggleSideNavSource.asObservable();

  toggleNavBar(data) {
    this.toggleSideNavSource.next(data);
  }
  constructor() { }
}
