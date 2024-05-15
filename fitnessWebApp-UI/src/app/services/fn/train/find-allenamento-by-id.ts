/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AllenamentoResponse } from '../../models/allenamento-response';

export interface FindAllenamentoById$Params {
  'allenamento-id': number;
}

export function findAllenamentoById(http: HttpClient, rootUrl: string, params: FindAllenamentoById$Params, context?: HttpContext): Observable<StrictHttpResponse<AllenamentoResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllenamentoById.PATH, 'get');
  if (params) {
    rb.path('allenamento-id', params['allenamento-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AllenamentoResponse>;
    })
  );
}

findAllenamentoById.PATH = '/trainings/{allenamento-id}';
