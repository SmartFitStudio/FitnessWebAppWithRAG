/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponsePeriodoAllenamentoResponse } from '../../models/page-response-periodo-allenamento-response';

export interface FindAllAuthUserPeriodoAllenamentoByPeriodoIdPaginated$Params {
  page?: number;
  size?: number;
  'periodo-id': number;
}

export function findAllAuthUserPeriodoAllenamentoByPeriodoIdPaginated(http: HttpClient, rootUrl: string, params: FindAllAuthUserPeriodoAllenamentoByPeriodoIdPaginated$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponsePeriodoAllenamentoResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllAuthUserPeriodoAllenamentoByPeriodoIdPaginated.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.path('periodo-id', params['periodo-id'], {});
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

findAllAuthUserPeriodoAllenamentoByPeriodoIdPaginated.PATH = '/periodTraining/{periodo-id}';
