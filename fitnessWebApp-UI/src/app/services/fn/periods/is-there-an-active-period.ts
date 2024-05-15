/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PeriodoResponse } from '../../models/periodo-response';

export interface IsThereAnActivePeriod$Params {
}

export function isThereAnActivePeriod(http: HttpClient, rootUrl: string, params?: IsThereAnActivePeriod$Params, context?: HttpContext): Observable<StrictHttpResponse<PeriodoResponse>> {
  const rb = new RequestBuilder(rootUrl, isThereAnActivePeriod.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PeriodoResponse>;
    })
  );
}

isThereAnActivePeriod.PATH = '/periods/is_there_an_active_period';
