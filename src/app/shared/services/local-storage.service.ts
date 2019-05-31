import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private getLocalStorageItemList() {
    if (window.sessionStorage.getItem('localStorageList') !== 'undefined') {
      return JSON.parse(window.sessionStorage.getItem('localStorageList'));
    }
    return;
  }

  private setLocalStorageItemList(list: string[]) {
    window.sessionStorage.setItem('localStorageList', JSON.stringify(list));
  }

  getItem(itemName: string, string?: boolean) { // TODO: medium, upgrade, remove string
    if (window.sessionStorage.getItem(itemName) !== 'undefined') {
      if (string) {
        return window.sessionStorage.getItem(itemName);
      }
      return JSON.parse(window.sessionStorage.getItem(itemName));
    }
    return;
  }

  setItem(itemName: string,
          value: string | {} | {}[]) {
    let itemList = [];
    if (this.getLocalStorageItemList()) {
      itemList = JSON.parse(JSON.stringify(this.getLocalStorageItemList()));
    }
    const itemNameIndex = itemList.indexOf(itemName);
    if (itemNameIndex === -1) {
      itemList.push(itemName);
    }
    if (typeof value === 'string') {
      window.sessionStorage.setItem(itemName, value);
    } else {
      window.sessionStorage.setItem(itemName, JSON.stringify(value));
    }
    this.setLocalStorageItemList(itemList);
  }

  removeItem(itemName: string) {
    let itemList = [];
    if (this.getLocalStorageItemList()) {
      itemList = JSON.parse(JSON.stringify(this.getLocalStorageItemList()));
    }
    const itemNameIndex = itemList.indexOf(itemName);
    if (itemNameIndex !== -1) {
      itemList.splice(itemNameIndex, 1);
    }
    this.setLocalStorageItemList(itemList);
    window.sessionStorage.removeItem(itemName);
  }

  clearItemList() {
    if (this.getLocalStorageItemList()) {
      const itemList = JSON.parse(JSON.stringify(this.getLocalStorageItemList()));
      let i = 0;
      itemList.forEach(function (itemName: string) {
        if (
          itemName !== 'language' &&
          itemName !== 'localization' &&
          itemName !== 'classificators' &&
          itemName !== 'entities'
        ) {
          window.sessionStorage.removeItem(itemName);
          i++;
        }
      });
      if (i === itemList.length) {
        window.sessionStorage.removeItem('localStorageList');
      }
    }
  }
}
