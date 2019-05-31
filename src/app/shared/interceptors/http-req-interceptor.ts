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
import {OverlayLoaderService} from '../services/overlay-loader.service';

@Injectable()
export class HttpReqInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const overlayLoaderService: OverlayLoaderService = this.injector.get(OverlayLoaderService);
    overlayLoaderService.changeSpinnerState(true);
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          overlayLoaderService.changeSpinnerState(false);
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          overlayLoaderService.changeSpinnerState(false);
        }
      }),
     /* catchError((err) => {
        return throwError(new Error(err));
      })*/
    );
  }

}
