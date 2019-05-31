import {AfterViewChecked, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {Meta} from '@angular/platform-browser';
import {SubscriptionStorage} from './shared/subscriptionStorage/subscription-storage';
import {TranslateService} from '@ngx-translate/core';
import {SideNavService} from './shared/services/sidenav.service';
import {LocalStorageService} from './shared/services/local-storage.service';
//import {LoginService} from './auth/services/login.service';
import {ToastrService} from 'ngx-toastr';
import {fadeInAnimation} from './animations';
import {RouterOutlet} from '@angular/router';
import {DateTimeAdapter} from 'ng-pick-datetime';
import {CONFIG} from '../environments/environment';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeInAnimation
  ]
})
export class AppComponent implements OnInit, AfterViewChecked, OnDestroy {
  mobileQuery: MediaQueryList;

  fillerNav = [
    {
      title: 'sideNav.dashboard',
      icon: 'dashboard',
      matTooltip: 'sideNav.dashboard',
      route: ['/dashboard']
    },
    /*{
      title: 'sideNav.stopList',
      icon: 'not_interested',
      matTooltip: 'sideNav.stopList',
      route: ['/stopList']
    },*/
    {
      title: 'sideNav.rules',
      icon: 'import_contacts',
      matTooltip: 'sideNav.rules',
      route: ['/rules']
    },
    {
      title: 'sideNav.testAml',
      icon: 'build',
      matTooltip: 'sideNav.testAml',
      route: ['/testAml']
    },
    {
      title: 'sideNav.userManagement',
      icon: 'supervisor_account',
      matTooltip: 'sideNav.userManagement',
      route: ['/userManagement']
    },
  ];

  private readonly _mobileQueryListener: () => void;


  isUser = true;
  private subs = new SubscriptionStorage();

  @ViewChild('snav') snav: any;

  @HostBinding('class') classes = 'app-component';

  constructor(
    private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher,
    private translate: TranslateService,
    private cdRef: ChangeDetectorRef,
    private meta: Meta,
   // private loginService: LoginService,
    private sideNavService: SideNavService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
  ) {
    translate.addLangs([...CONFIG.client.language.array]);
    translate.setDefaultLang(CONFIG.client.language.default);
    translate.use(CONFIG.client.language.default);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }

  toggleSidenav() {
    this.snav.toggle();
    const data = {width: this.snav._width - 68, opened: this.snav.opened};
    this.sideNavService.toggleNavBar(data);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subs.unsubscribe();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  /*async checkAuthState() {
    const authData = this.authService.checkAuth();
    if (!authData.token) {
      this.authService.logOut().subscribe();
      return;
    }
    if (!authData.user) {

    }
    this.authService.authenticate(authData.user);
  }*/
  // isAuthenticated() {
  //   return this.localStorageService.getItem('user') && this.localStorageService.getItem('user').token &&
  //     this.localStorageService.getItem('company');
  // }

  // logout() {
  //   this.loginService.logout();
  //   /*.subscribe((res) => {
  //         this.toastr.success('success.logout');
  //       })*/
  // }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
