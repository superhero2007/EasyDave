// @angular
import {Component} from '@angular/core';
// @container
import {CONFIG} from '../../../../environments/environment';
import {LocalStorageService} from '../../services/local-storage.service';
import {TranslateService} from '@ngx-translate/core';

// TODO: low priority, maybe save what language person worked in BE and send it ?
// TODO: high, replace to make reusable
@Component({
  selector: 'bbs-language-select-container',
  templateUrl: 'component.html',
})
export class LanguageSelectContainerComponent {

  list = CONFIG.client.language.array;
  selected: string;

  constructor(
    private localStorageService: LocalStorageService,
    private translateService: TranslateService,
  ) {
    const savedLanguage = this.localStorageService.getItem('language');
    if (savedLanguage) {
      this.selected = savedLanguage;
    } else {
      this.selected = CONFIG.client.language.default;
    }
  }

  select(event: string) {
    this.selected = event;
    this.translateService.use(event);
  }
}
