/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PeriodoRequest } from '../../models/periodo-request';
import { PeriodoResponse } from '../../models/periodo-response';

export interface SavePeriodo$Params {
      body: PeriodoRequest
}

export function savePeriodo(http: HttpClient, rootUrl: string, params: SavePeriodo$Params, context?: HttpContext): Observable<StrictHttpResponse<PeriodoResponse>> {
  const rb = new RequestBuilder(rootUrl, savePeriodo.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
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

savePeriodo.PATH = '/periods';
