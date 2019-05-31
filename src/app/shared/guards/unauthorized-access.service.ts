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

@Injectable()
export class UnauthorizedRouteAccessService implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    if (this.localStorageService.getItem('user') && this.localStorageService.getItem('user').token && this.localStorageService.getItem('company')) {
      return true;
    } else {
      this.router.navigate(['/auth']);
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    return this.canActivate(route, state);
  }
}
