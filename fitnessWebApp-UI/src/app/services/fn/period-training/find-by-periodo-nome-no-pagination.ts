/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PeriodoAllenamentoResponse } from '../../models/periodo-allenamento-response';

export interface FindByPeriodoNomeNoPagination$Params {
  'periodo-nome': string;
}

export function findByPeriodoNomeNoPagination(http: HttpClient, rootUrl: string, params: FindByPeriodoNomeNoPagination$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PeriodoAllenamentoResponse>>> {
  const rb = new RequestBuilder(rootUrl, findByPeriodoNomeNoPagination.PATH, 'get');
  if (params) {
    rb.path('periodo-nome', params['periodo-nome'], {});
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

findByPeriodoNomeNoPagination.PATH = '/periodTraining/no_pagination/{periodo-nome}';
