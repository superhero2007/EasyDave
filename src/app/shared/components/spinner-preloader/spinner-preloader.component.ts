import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SubscriptionStorage} from '../../subscriptionStorage/subscription-storage';
import {OverlayLoaderService} from '../../services/overlay-loader.service';


@Component({
  selector: 'bbs-spinner-preloader',
  templateUrl: './spinner-preloader.component.html',
  styleUrls: ['./spinner-preloader.component.scss']
})
export class SpinnerPreloaderComponent implements OnInit, OnDestroy {

  public show = false;

  private subs = new SubscriptionStorage();

  constructor(
    private overlayLoaderService: OverlayLoaderService
  ) {
  }

  ngOnInit() {
    this.subs['spinnerState'] = this.overlayLoaderService.showSpinnerChanged$.subscribe((state: any) => {
     this.show = state;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
