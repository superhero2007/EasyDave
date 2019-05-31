import {keys} from 'lodash';
import {Subscription} from 'rxjs';

export class SubscriptionStorage {
  [key: string]: any;

  unsubscribe(): void {
    Object.keys(this).forEach(subscribtionName => {
      this[subscribtionName].unsubscribe();
    });
  }

  removeSubscription(key) {
    this[key].unsubscribe();
  }
}
