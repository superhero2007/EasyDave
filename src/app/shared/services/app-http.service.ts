// @angular
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from './local-storage.service';
//import {ILogin} from '../../auth/models/login.models';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Error} from 'tslint/lib/error';

@Injectable()
export class APPHttpService {
  token: string;
  defaultHeaders: HttpHeaders;
  defaultOptions: {
    headers: HttpHeaders;
  };
  defaultHeadersOurBe: HttpHeaders;
  defaultOptionsOurBe: {
    headers: HttpHeaders;
    withCredentials: boolean;
  };

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
  ) {
  }

  private setDefaultOptions() {
    if (this.localStorageService.getItem('user')) {
      this.token = this.localStorageService.getItem('user').token;
      this.defaultHeaders = new HttpHeaders({Authorization: 'Bearer' + ' ' + this.token});
      this.defaultOptions = {headers: this.defaultHeaders};
    }
  }

  private setDefaultOurBeOptions() {
    if (this.localStorageService.getItem('user')) {
      this.token = this.localStorageService.getItem('user').Token;
      this.defaultHeadersOurBe = new HttpHeaders({
        Authorization: this.token,
      });
      this.defaultOptionsOurBe = {
        headers: this.defaultHeadersOurBe,
        withCredentials: true
      };
    }
  }

  get(route: string) {
    this.setDefaultOptions();
    return this.httpClient.get(route, this.defaultOptions).pipe(
      catchError((err) => {
        return throwError(new Error(err));
      })
    );
  }

  getWithParams(route: string, params) {
    this.setDefaultOptions();
    return this.httpClient.get(route, {...this.defaultOptions, params}).pipe(
      catchError((err) => {
        return throwError(new Error(err));
      })
    );
  }

  postWithParams(route: string, bodyData: any, params) {
    this.setDefaultOptions();
    return this.httpClient.post(route, bodyData, {...this.defaultOptions, params}).pipe(
      catchError((err) => {
        return throwError(new Error(err));
      })
    );
  }

  getNoAuth(route: string) {
    return this.httpClient.get(route).pipe(
      catchError((err) => {
        return throwError(new Error(err));
      })
    );
  }

  getText(route: string) {
    const tempOpts = {
      headers: null,
      responseType: 'text' as 'text'
    };
    return this.httpClient.get(route, tempOpts).pipe(
      catchError((err) => {
        return throwError(new Error(err));
      })
    );
  }

  post(route: string, bodyData: any) {
    this.setDefaultOptions();
    return this.httpClient.post(route, bodyData, this.defaultOptions).pipe(
      catchError((err) => {
        return throwError(new Error(err));
      })
    );
  }

  put(route: string, bodyData: any) {
    this.setDefaultOptions();
    return this.httpClient.put(route, bodyData, this.defaultOptions).pipe(
      catchError((err) => {
        return throwError(new Error(err));
      })
    );
  }

  delete(route: string) {
    this.setDefaultOptions();
    return this.httpClient.delete(route, this.defaultOptions).pipe(
      catchError((err) => {
        return throwError(new Error(err));
      })
    );
  }

  putNoAuth(route: string, bodyData: any) {
    return this.httpClient.put(route, bodyData).pipe(
      catchError((err) => {
        return throwError(new Error(err));
      })
    );
  }

  getOurBe(route: string) {
    this.setDefaultOurBeOptions();
    return this.httpClient.get(route, this.defaultOptions).pipe(
      catchError((err) => {
        return throwError(new Error(err));
      })
    );
  }

  // login(route: string, bodyData: ILogin) {
  //   return this.httpClient.post(route, bodyData).pipe(
  //     catchError((err) => {
  //       return throwError(new Error(err));
  //     })
  //   );
  // }

  renew(route: string) {
    const renewHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const renewOptions = {
      headers: renewHeaders,
      withCredentials: true,
    };
    let token = '';
    if (this.localStorageService.getItem('user')) {
      token = this.localStorageService.getItem('user').Token;
    }
    const renewBody = 'token=' + token;
    return this.httpClient.post(route, renewBody, renewOptions).pipe(
      catchError((err) => {
        return throwError(new Error(err));
      })
    );
  }

  currentUserOurBe(route: string, renewBody: any) {
    let token = '';
    if (this.localStorageService.getItem('user')) {
      token = this.localStorageService.getItem('user').Token;
    }
    const renewHeaders = new HttpHeaders({
      'authorization': token,
    });
    const renewOptions = {
      headers: renewHeaders,
    };
    return this.httpClient.post(route, renewBody, renewOptions).pipe(
      catchError((err) => {
        return throwError(new Error(err));
      })
    );
  }
}
