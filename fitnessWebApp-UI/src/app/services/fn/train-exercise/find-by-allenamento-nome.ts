/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseAllenamentoEsercizioResponse } from '../../models/page-response-allenamento-esercizio-response';

export interface FindByAllenamentoNome$Params {
  page?: number;
  size?: number;
  'allenamento-nome': string;
}

export function findByAllenamentoNome(http: HttpClient, rootUrl: string, params: FindByAllenamentoNome$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseAllenamentoEsercizioResponse>> {
  const rb = new RequestBuilder(rootUrl, findByAllenamentoNome.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.path('allenamento-nome', params['allenamento-nome'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseAllenamentoEsercizioResponse>;
    })
  );
}

findByAllenamentoNome.PATH = '/trainingexercise/{allenamento-nome}';
