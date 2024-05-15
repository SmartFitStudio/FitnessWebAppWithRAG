/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponsePeriodoAllenamentoResponse } from '../../models/page-response-periodo-allenamento-response';

export interface FindByPeriodoNome$Params {
  page?: number;
  size?: number;
  'periodo-nome': string;
}

export function findByPeriodoNome(http: HttpClient, rootUrl: string, params: FindByPeriodoNome$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponsePeriodoAllenamentoResponse>> {
  const rb = new RequestBuilder(rootUrl, findByPeriodoNome.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.path('periodo-nome', params['periodo-nome'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponsePeriodoAllenamentoResponse>;
    })
  );
}

findByPeriodoNome.PATH = '/periodTraining/{periodo-nome}';
