/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PeriodoResponse } from '../../models/periodo-response';

export interface FindByAuthenticatedUserAndId$Params {
  'periodo-id': number;
}

export function findByAuthenticatedUserAndId(http: HttpClient, rootUrl: string, params: FindByAuthenticatedUserAndId$Params, context?: HttpContext): Observable<StrictHttpResponse<PeriodoResponse>> {
  const rb = new RequestBuilder(rootUrl, findByAuthenticatedUserAndId.PATH, 'get');
  if (params) {
    rb.path('periodo-id', params['periodo-id'], {});
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

findByAuthenticatedUserAndId.PATH = '/periods/{periodo-id}';
