import { Injectable } from '@angular/core';
import {CONFIG} from '../../../../environments/environment';
import {APPHttpService} from '../../../shared/services/app-http.service';
import {Observable} from 'rxjs';

@Injectable()
export class RemovalsService {

  trxBaseApi = CONFIG.api.trx;
  constructor(
    private bbsHttpService: APPHttpService
  ) {
  }

  getTrxList(params, data: any = {}): Observable<{}> {
    data.filter.isActual = undefined;
    data.filter.dateFrom = undefined;
    data.filter.dateTill = undefined;
    return this.bbsHttpService.postWithParams(this.trxBaseApi + 'list/', data , params);
  }

  getTrxById(id) {
    return this.bbsHttpService.get(`${this.trxBaseApi}get/${id}`);
  }

  editTrx(data, id) {
    return this.bbsHttpService.put(`${this.trxBaseApi}update/${id}`, data);
  }
}
