/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PeriodoAllenamentoResponse } from '../../models/periodo-allenamento-response';

export interface FindAllAuthUserPeriodoAllenamentoByPeriodoIdNoPagination$Params {
  'periodo-id': number;
}

export function findAllAuthUserPeriodoAllenamentoByPeriodoIdNoPagination(http: HttpClient, rootUrl: string, params: FindAllAuthUserPeriodoAllenamentoByPeriodoIdNoPagination$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PeriodoAllenamentoResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllAuthUserPeriodoAllenamentoByPeriodoIdNoPagination.PATH, 'get');
  if (params) {
    rb.path('periodo-id', params['periodo-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<PeriodoAllenamentoResponse>>;
    })
  );
}

findAllAuthUserPeriodoAllenamentoByPeriodoIdNoPagination.PATH = '/periodTraining/no_pagination/{periodo-id}';
