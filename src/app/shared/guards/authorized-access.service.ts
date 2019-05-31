import {Injectable} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';
import { Location } from '@angular/common';
@Injectable()
export class AuthorizedRouteAccessService implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private location: Location,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    if (this.localStorageService.getItem('user') && this.localStorageService.getItem('user').token && this.localStorageService.getItem('company')) {
      // this.router.navigate(['/stopList']);
      this.location.back();
      return false;
    }
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    return this.canActivate(route, state);
  }
}
