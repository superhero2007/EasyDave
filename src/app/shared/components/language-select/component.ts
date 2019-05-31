// @angular
import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';

// @ngrx

// @component

@Component({
  selector: 'bbs-language-select',
  templateUrl: './component.html',
})
export class LanguageSelectComponent {

  @Input() list;
  @Input() selected;

  @Output() select: EventEmitter<string> = new EventEmitter<string>();

  toggleSelect = false;

  @HostListener('document:keyup.escape', ['$event']) onKeydownHandler(evt: KeyboardEvent) {
    this.toggleSelect = false;
  }

  changeLanguage(language: string) {
    this.toggleSelect = false;
    this.selected = language;
    this.select.emit(language);
  }

  setFlagSrc(language: string) {
    return 'assets/images/png/' + language + '.png';
  }

  toggleLanguageSelect() {
    this.toggleSelect = !this.toggleSelect;
  }
}
