import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DateTimeAdapter} from 'ng-pick-datetime';
import {SubscriptionStorage} from '../../subscriptionStorage/subscription-storage';

@Component({
  selector: 'app-router-animation-base',
  templateUrl: './router-animation-base.component.html',
  styleUrls: ['./router-animation-base.component.scss']
})
export class RouterAnimationBaseComponent implements OnInit, OnDestroy {

  subs = new SubscriptionStorage();

  constructor(
    protected translateService: TranslateService,
    protected dateTimeAdapter: DateTimeAdapter<any>
  ) {
  }

  ngOnInit() {
    this.subs['dateLocale'] = this.translateService.onLangChange.subscribe((res) => {
      this.dateTimeAdapter.setLocale(res.lang);
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
