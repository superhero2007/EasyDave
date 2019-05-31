// @angular
import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';
// @service
import {CONFIG} from '../../../../environments/environment';
import {LocalStorageService} from '../local-storage.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

export function filterArrayByKeyTypeString(array: {}[], key: string, keyValue: string, caseSensitive: boolean) {
  const isName = function (obj) {
    if (caseSensitive) {
      if (typeof obj[key] === 'string') {
        return obj[key].includes(keyValue);
      } else {
        return false;
      }
    } else {
      keyValue = keyValue.toLowerCase();
      return obj[key].toLowerCase().includes(keyValue);
    }
  };
  const filterByName = function (obj) {
    if (isName(obj)) {
      return true;
    }
  };
  return array.filter(filterByName);
}

export function filterArrayByKeyTypeNumber(array: {}[], key: string, keyValue: number) {
  const isName = function (obj) {
    if (typeof obj[key] === 'number') {
      return obj[key].includes(keyValue);
    } else {
      return false;
    }
  };
  const filterByName = function (obj) {
    if (isName(obj)) {
      return true;
    }
  };
  return array.filter(filterByName);
}

export function multiFilter(arr: Object[], filters: Object) {
  // filters SAMPLE:
  // {
  // 	color: ["Blue", "Black"],
  // 	size: [70, 50]
  // }
  const filterKeys = Object.keys(filters);
  return arr.filter(eachObj => {
    return filterKeys.every(eachKey => {
      if (!filters[eachKey].length) {
        return true; // passing an empty filter means that filter is ignored.
      }
      return filters[eachKey].includes(eachObj[eachKey]);
    });
  });
}

export function filterArrayByKeyTypeBoolean(array: {}[], key: string, keyValue: boolean) {
  const isName = function (obj) {
    return obj[key] === keyValue;
  };
  const filterByName = function (obj) {
    if (isName(obj)) {
      return true;
    }
  };
  return array.filter(filterByName);
}

export function spliceObjectFromArray(array: {}[], objectKey: string, objectKeyValue: string) {
  const indexOfItem = array.findIndex(x => x[objectKey] === objectKeyValue);
  if (indexOfItem > -1) {
    array.splice(indexOfItem, 1);
  }
  return array;
}

function checkPersonCode(code: number) {
  const codeString = String(code);
  const codeHasValidDate = function (dateString) {
    const date = new Date();
    let year = '';
    let month = '';
    let day = '';
    if (dateString[0] === '1' || dateString[0] === '2') {
      year = year + '18';
    }
    if (dateString[0] === '3' || dateString[0] === '4') {
      year = year + '19';
    }
    if (dateString[0] === '5' || dateString[0] === '6') {
      year = year + '20';
    }
    year = year + dateString[1] + dateString[2];
    if (dateString[3] === '0') {
      month = month + dateString[4];
    } else {
      month = month + dateString[3] + dateString[4];
    }
    if (dateString[5] === '0') {
      day = day + dateString[6];
    } else {
      day = day + dateString[5] + dateString[6];
    }
    date.setFullYear(Number(year), (Number(month) - 1), Number(day));
    if (
      (date.getFullYear() === Number(year)) &&
      (date.getMonth() === Number(month) - 1) &&
      (date.getDate() === Number(day))
    ) {
      return true;
    }
    return false;
  };
  const codeHasValidDateNoMonthDay = function (dateString) {
    if (
      dateString[3] === '0' &&
      dateString[4] === '0' &&
      dateString[5] === '0' &&
      dateString[6] === '0'
    ) {
      return true;
    }
    return false;
  };
  if (codeString.length === 11) {
    const hasValidDate = codeHasValidDate(codeString);
    const hasValidDateNoMonthDay = codeHasValidDateNoMonthDay(codeString);
    const firstNumber = Number(codeString[0]);
    const standardCode = firstNumber > 0 && firstNumber < 9 && hasValidDate;
    const oldPersonCode = firstNumber > 0 && firstNumber < 9 && hasValidDateNoMonthDay;
    const nonStandardCode = firstNumber === 9 && hasValidDate;
    if (standardCode) {
      const controlNumber = Number(codeString[codeString.length - 1]);
      let checkSum1 = 0;
      let i1 = 0;
      const j = codeString.length;
      for (i1; i1 < j; i1++) {
        if (i1 !== (j - 1) && i1 !== (j - 2)) {
          checkSum1 = checkSum1 + Number(codeString[i1]) * (i1 + 1);
        } else if (i1 === (j - 2)) {
          checkSum1 = checkSum1 + Number(codeString[i1]);
        }
      }
      const checkSum2 = checkSum1 % 11;
      let checkSum3 = 0;
      let i2 = 0;
      if (checkSum2 !== 10) {
        return controlNumber === checkSum2;
      } else {
        for (i2; i2 < j; i2++) {
          if (i2 !== (j - 1) && i2 !== (j - 2) && i2 !== (j - 3) && i2 !== (j - 4)) {
            checkSum3 = checkSum3 + Number(codeString[i2]) * (i2 + 3);
          }
          if (i2 === (j - 4)) {
            checkSum3 = checkSum3 + Number(codeString[i2]);
          }
          if (i2 === (j - 3)) {
            checkSum3 = checkSum3 + Number(codeString[i2]) * 2;
          }
          if (i2 === (j - 2)) {
            checkSum3 = checkSum3 + Number(codeString[i2]) * 3;
          }
        }
        const checkSum4 = checkSum3 % 11;
        if (checkSum4 !== 10) {
          return controlNumber === checkSum4;
        } else {
          return controlNumber === 0;
        }
      }
    }
    if (nonStandardCode) {
      return true;
    }
    if (oldPersonCode) {
      return true;
    }
    return false;
  } else {
    return false;
  }
}

export function ValidatePersonCodeLt(control: AbstractControl) {
  if (!checkPersonCode(control.value)) {
    return {invalidPersonCodeLt: true};
  }
  return null;
}

// TODO: high, need to pass time zone from server
export function sliceDate(date: string) {
  const
    updatedDate = new Date(date),
    year = updatedDate.getFullYear();
  let
    month = String((updatedDate.getMonth() + 1)),
    day = String(updatedDate.getDate());

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  const newDate = [year, month, day].join('-');
  return newDate;
}

export function AddOneDayToDate(date: string) {
  const oneMoreDay = new Date(date);
  oneMoreDay.setDate(oneMoreDay.getDate() + 1);
  return sliceDate(oneMoreDay.toISOString());
}

export function sliceArrayInHalf(array: any[]) {
  const halfWayThough = Math.ceil(array.length / 2);
  const arrayFirstHalf = array.slice(0, halfWayThough);
  const arraySecondHalf = array.slice(halfWayThough, array.length);
  return {
    half1: arrayFirstHalf,
    half2: arraySecondHalf
  };
}

export function cutFourFromIban(iban: String) {
  const newIban = iban.slice(5, 8);
  return newIban;
}

@Injectable()
export class UtilsService {
  sessionTimer: any;
  sessionTimeOutTimer: any;

  constructor(
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {
  }

  filterArrayByKeyTypeString = filterArrayByKeyTypeString;
  filterArrayByKeyTypeNumber = filterArrayByKeyTypeNumber;
  filterArrayByKeyTypeBoolean = filterArrayByKeyTypeBoolean;
  spliceObjectFromArray = spliceObjectFromArray;
  ValidatePersonCodeLt = ValidatePersonCodeLt;
  AddOneDayToDate = AddOneDayToDate;
  sliceDate = sliceDate;
  sliceArrayInHalf = sliceArrayInHalf;
  multiFilter = multiFilter;
  cutFourFromIban = cutFourFromIban;

  checkClassificatorValue(groupName: string, groupNameKey: string) {
    const classificators = this.localStorageService.getItem('classificators');
    if (classificators[groupName] && classificators[groupName][groupNameKey]) {
      return classificators[groupName][groupNameKey];
    }
    return groupNameKey;
  }

  sliceLocalizationKey(key: string) {
    // we presume we have at least this string: key11.key12.key21, there can be more key2x
    const secondAccurance = key.indexOf('.', key.indexOf('.') + 1);
    const key1 = key.slice(0, secondAccurance);
    const key2 = key.slice(secondAccurance + 1);
    return {
      key1: key1,
      key2: key2,
    };
  }

  translate(key: string, localizationType: string) {
    const localization = this.localStorageService.getItem(localizationType);
    const has2Dots = (key.match(/./g)).length > 1;
    if (localization && has2Dots) {
      const groupName = this.sliceLocalizationKey(key).key1;
      const groupNameKey = this.sliceLocalizationKey(key).key2;
      if (localization[groupName] && (localization[groupName][groupNameKey] || localization[groupName][groupNameKey] === 0)) {
        return localization[groupName][groupNameKey];
      }
    }
    return key;
  }

  findProductAccountsByType(accounts: any[]) {
    let account: {};
    account = this.filterArrayByKeyTypeString(
      accounts,
      'accountType',
      'ACCT20',
      true
    )[0];
    return account;
  }

  sliceTime(date: string) {
    const
      updatedDate = new Date(date);
    let
      hours = String(updatedDate.getHours()),
      minutes = String(updatedDate.getMinutes()),
      seconds = String(updatedDate.getSeconds());

    if (hours.length < 2) {
      hours = '0' + hours;
    }
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }
    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }

    const newDate = [hours, minutes, seconds].join(':');
    return newDate;
  }

  reformatAmount(amount: number) {
    let newAmount: string;
    let newAmountReworked: string;
    if (amount || amount === 0) {
      newAmount = '';
      newAmount = newAmount + String(amount.toFixed(2));
      newAmountReworked = '' + newAmount.replace('.', ',');
    } else {
      newAmountReworked = '';
    }
    return newAmountReworked;
  }

  // TODO: high, make pipe
  reformatStringAmount(amount: string | number) {
    let newAmount = amount + '';
    let includesSeparator = false;
    const countAfterSeparator = function (separator: string) {
      return newAmount.slice(
        newAmount.indexOf(separator),
        newAmount.length
      ).length;
    };
    if (newAmount.includes('.')) {
      includesSeparator = true;
      newAmount = newAmount.replace('.', ',');
    }
    if (newAmount.includes(',')) {
      includesSeparator = true;
    }
    if (includesSeparator) {
      if (countAfterSeparator(',') === 2) {
        newAmount = newAmount + '0';
      } else if (countAfterSeparator(',') === 1) {
        newAmount = newAmount + '00';
      }
    }
    if (newAmount.length > 0 && !includesSeparator) {
      newAmount = newAmount + ',00';
    }
    return newAmount;
  }

  // TODO: low priority, what if person entered letters into number allowed is numbers, ',' and '.'
  removeDotOrComaFromNumber(number: string) {
    let newNumber = '';
    if (typeof number !== 'string') {
      newNumber = newNumber + String(number);
    } else {
      newNumber = newNumber + number;
    }
    const lastIndex = number.length - 1;
    if (newNumber.includes(',')) {
      if (number.indexOf(',') === lastIndex) {
        newNumber = newNumber.slice(0, -1);
      } else {
        newNumber = newNumber.replace(',', '.');
      }
    }
    if (newNumber.includes('.')) {
      if (newNumber.indexOf('.') === lastIndex) {
        newNumber = newNumber.slice(0, -1);
      }
    }
    return newNumber;
  }

  checkEntityDataFields(translateSelectorStart, dataObj: {}) {
    const listOfChoices = [];
    const keys = Object.keys(dataObj);
    for (let i = 0; i < keys.length; i++) {
      if (dataObj[keys[i]] !== '' && dataObj[keys[i]] !== null) {
        listOfChoices.push(translateSelectorStart + '.' + keys[i]);
      }
    }
    return listOfChoices;
  }

  handleSession() {
    const vm = this;
    vm.sessionTimer = null;
    const currentTime: number = new Date().getTime();
    let tokenExpires: number;
    if (this.localStorageService.getItem('tokenExpiresAt', true)) {
      tokenExpires = this.localStorageService.getItem('tokenExpiresAt', true);
    } else {
      tokenExpires = currentTime + CONFIG.client.sessionTimeout;
      this.localStorageService.setItem(
        'tokenExpiresAt',
        JSON.stringify(tokenExpires)
      );
    }
    const timeRemaining: number = tokenExpires - currentTime;
    const showMessage = function () {
      vm.toastr.error(vm.translateService.instant('login.components.login.sessionAboutToTimeout'));
    };

    if (timeRemaining <= 0) {
      showMessage();
    } else {
      vm.sessionTimer = setTimeout(function () {
        showMessage();
      }, timeRemaining);
    }
  } 

  findSelectedCompany(data) {
    const currentCompany = this.filterArrayByKeyTypeString(
      data.Company,
      'id',
      data.SelectedCompany,
      true
    )[0];
    return currentCompany;
  }
}

export let colorSets = [
  {
    name: 'vivid',
    selectable: true,
    group: 'Ordinal',
    domain: [
      '#647c8a', '#3f51b5', '#2196f3', '#00b862', '#afdf0a', '#a7b61a', '#f3e562', '#ff9800', '#ff5722', '#ff4514'
    ]
  },
  {
    name: 'natural',
    selectable: true,
    group: 'Ordinal',
    domain: [
      '#bf9d76', '#e99450', '#d89f59', '#f2dfa7', '#a5d7c6', '#7794b1', '#afafaf', '#707160', '#ba9383', '#d9d5c3'
    ]
  },
  {
    name: 'cool',
    selectable: true,
    group: 'Ordinal',
    domain: [
      '#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886'
    ]
  },
  {
    name: 'fire',
    selectable: true,
    group: 'Ordinal',
    domain: [
      '#ff3d00', '#bf360c', '#ff8f00', '#ff6f00', '#ff5722', '#e65100', '#ffca28', '#ffab00'
    ]
  },
  {
    name: 'solar',
    selectable: true,
    group: 'Continuous',
    domain: [
      '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00'
    ]
  },
  {
    name: 'air',
    selectable: true,
    group: 'Continuous',
    domain: [
      '#e1f5fe', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b'
    ]
  },
  {
    name: 'aqua',
    selectable: true,
    group: 'Continuous',
    domain: [
      '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064'
    ]
  },
  {
    name: 'flame',
    selectable: false,
    group: 'Ordinal',
    domain: [
      '#A10A28', '#D3342D', '#EF6D49', '#FAAD67', '#FDDE90', '#DBED91', '#A9D770', '#6CBA67', '#2C9653', '#146738'
    ]
  },
  {
    name: 'ocean',
    selectable: false,
    group: 'Ordinal',
    domain: [
      '#1D68FB', '#33C0FC', '#4AFFFE', '#AFFFFF', '#FFFC63', '#FDBD2D', '#FC8A25', '#FA4F1E', '#FA141B', '#BA38D1'
    ]
  },
  {
    name: 'forest',
    selectable: false,
    group: 'Ordinal',
    domain: [
      '#55C22D', '#C1F33D', '#3CC099', '#AFFFFF', '#8CFC9D', '#76CFFA', '#BA60FB', '#EE6490', '#C42A1C', '#FC9F32'
    ]
  },
  {
    name: 'horizon',
    selectable: false,
    group: 'Ordinal',
    domain: [
      '#2597FB', '#65EBFD', '#99FDD0', '#FCEE4B', '#FEFCFA', '#FDD6E3', '#FCB1A8', '#EF6F7B', '#CB96E8', '#EFDEE0'
    ]
  },
  {
    name: 'neons',
    selectable: false,
    group: 'Ordinal',
    domain: [
      '#FF3333', '#FF33FF', '#CC33FF', '#0000FF', '#33CCFF', '#33FFFF', '#33FF66', '#CCFF33', '#FFCC00', '#FF6600'
    ]
  },
  {
    name: 'picnic',
    selectable: false,
    group: 'Ordinal',
    domain: [
      '#FAC51D', '#66BD6D', '#FAA026', '#29BB9C', '#E96B56', '#55ACD2', '#B7332F', '#2C83C9', '#9166B8', '#92E7E8'
    ]
  },
  {
    name: 'night',
    selectable: false,
    group: 'Ordinal',
    domain: [
      '#2B1B5A', '#501356', '#183356', '#28203F', '#391B3C', '#1E2B3C', '#120634',
      '#2D0432', '#051932', '#453080', '#75267D', '#2C507D', '#4B3880', '#752F7D', '#35547D'
    ]
  },
  {
    name: 'nightLights',
    selectable: false,
    group: 'Ordinal',
    domain: [
      '#4e31a5', '#9c25a7', '#3065ab', '#57468b', '#904497', '#46648b', 
      '#32118d', '#a00fb3', '#1052a2', '#6e51bd', '#b63cc3', '#6c97cb', '#8671c1', '#b455be', '#7496c3'
    ]
  }
];
