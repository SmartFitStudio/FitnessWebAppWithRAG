/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PeriodoResponse } from '../../models/periodo-response';

export interface DisableAuthenticatedUserActivePeriodo$Params {
}

export function disableAuthenticatedUserActivePeriodo(http: HttpClient, rootUrl: string, params?: DisableAuthenticatedUserActivePeriodo$Params, context?: HttpContext): Observable<StrictHttpResponse<PeriodoResponse>> {
  const rb = new RequestBuilder(rootUrl, disableAuthenticatedUserActivePeriodo.PATH, 'put');
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

disableAuthenticatedUserActivePeriodo.PATH = '/periods/disable_active_period';
