import {NgModule, NgZone} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {OverlayLoaderService} from './services/overlay-loader.service';
import {SpinnerPreloaderComponent} from './components/spinner-preloader/spinner-preloader.component';
import {TableBaseComponent} from './components/table-base/table-base.component';
import {CustomPaginatorContainerComponent} from './components/custom-paginator-container/custom-paginator-container.component';
import {MaterialModule} from '../material/material.module';
import {APPHttpService} from './services/app-http.service';
import {AuthorizedRouteAccessService} from './guards/authorized-access.service';
import {UnauthorizedRouteAccessService} from './guards/unauthorized-access.service';
import {UtilsService} from './services/utils';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import { MessageComponent } from './components/message/message.component';
import { RouterAnimationBaseComponent } from './components/router-animation-base/router-animation-base.component';
import {LanguageSelectContainerComponent} from './components/language-select-container/component';
import {LanguageSelectComponent} from './components/language-select/component';
import { GooglePlacesComponent } from './components/google-places/google-places.component';


const SHARED_EXPORTS = [
  TranslateModule,
  MaterialModule,
  FormsModule,
  ReactiveFormsModule,
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
];

const PROVIDERS = [
  OverlayLoaderService,
  APPHttpService,
  AuthorizedRouteAccessService,
  UnauthorizedRouteAccessService,
  UtilsService
];

const DECLARATIONS = [
  TableBaseComponent,
  CustomPaginatorContainerComponent,
  SpinnerPreloaderComponent,
  MessageComponent,
  GooglePlacesComponent,
  RouterAnimationBaseComponent,
  LanguageSelectContainerComponent,
  LanguageSelectComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    ...SHARED_EXPORTS
  ],
  exports: [
    ...SHARED_EXPORTS,
    ...DECLARATIONS
  ],
  providers: [
    PROVIDERS
  ]
})
export class SharedModule {
  address: Object;
  establishmentAddress: Object;

  formattedAddress: string;
  formattedEstablishmentAddress: string;

  phone: string;

  constructor( public zone: NgZone) {}


  getAddress(place: object) {
    this.address = place['formatted_address'];
    this.phone = this.getPhone(place);
    this.formattedAddress = place['formatted_address'];
    this.zone.run(() => this.formattedAddress = place['formatted_address']);
  }

  getEstablishmentAddress(place: object) {
    this.establishmentAddress = place['formatted_address'];
    this.phone = this.getPhone(place);
    this.formattedEstablishmentAddress = place['formatted_address'];
    this.zone.run(() => {
      this.formattedEstablishmentAddress = place['formatted_address'];
      this.phone = place['formatted_phone_number'];
    });
  }

  getAddrComponent(place, componentTemplate) {
    let result;

    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        return result;
      }
    }
    return;
  }

  getStreetNumber(place) {
    const COMPONENT_TEMPLATE = { street_number: 'short_name' },
      streetNumber = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return streetNumber;
  }

  getStreet(place) {
    const COMPONENT_TEMPLATE = { route: 'long_name' },
      street = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return street;
  }

  getCity(place) {
    const COMPONENT_TEMPLATE = { locality: 'long_name' },
      city = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return city;
  }

  getState(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_1: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getDistrict(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_2: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getCountryShort(place) {
    const COMPONENT_TEMPLATE = { country: 'short_name' },
      countryShort = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return countryShort;
  }

  getCountry(place) {
    const COMPONENT_TEMPLATE = { country: 'long_name' },
      country = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return country;
  }

  getPostCode(place) {
    const COMPONENT_TEMPLATE = { postal_code: 'long_name' },
      postCode = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return postCode;
  }

  getPhone(place) {
    const COMPONENT_TEMPLATE = { formatted_phone_number: 'formatted_phone_number' },
      phone = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return phone;
  }
}
