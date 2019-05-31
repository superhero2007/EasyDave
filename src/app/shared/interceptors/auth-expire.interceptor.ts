import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
//import {LoginService} from '../../auth/services/login.service';
import {Error} from 'tslint/lib/error';

@Injectable()
export class AuthExpireInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      console.log('HERE')
        if (event instanceof HttpResponse) {

        }
      }, (err: any) => {
        console.log(err)
        if (err instanceof HttpErrorResponse) {
          // if (err.status === 401) {
          //   const loginService: LoginService = this.injector.get(LoginService);
          //   loginService.logout();
          // }
        }
      }),
       catchError((err) => {
           return  throwError(new Error(err));
       })
    );
  }

}
