import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from './material/material.module';
//import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {appInitializerFactory} from '@angular/platform-browser/src/browser/server-transition';
import { InlineSVGModule } from 'ng-inline-svg';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {AuthExpireInterceptor} from './shared/interceptors/auth-expire.interceptor';
import {OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {HttpReqInterceptor} from './shared/interceptors/http-req-interceptor';
import {CONFIG} from '../environments/environment';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    //AuthModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot(),
    InlineSVGModule.forRoot(),
    HttpClientModule,
    

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthExpireInterceptor,
    //   multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpReqInterceptor,
      multi: true
    },
    {
      provide: OWL_DATE_TIME_FORMATS,
      useValue: CONFIG.client.dateTimeFormats,
    },
    {
      provide: OWL_DATE_TIME_LOCALE,
      useValue: CONFIG.client.language.default
    },
    TranslateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
