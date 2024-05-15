/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PeriodoAllenamentoRequest } from '../../models/periodo-allenamento-request';
import { PeriodoAllenamentoResponse } from '../../models/periodo-allenamento-response';

export interface SavePeriodoAllenamento$Params {
      body: PeriodoAllenamentoRequest
}

export function savePeriodoAllenamento(http: HttpClient, rootUrl: string, params: SavePeriodoAllenamento$Params, context?: HttpContext): Observable<StrictHttpResponse<PeriodoAllenamentoResponse>> {
  const rb = new RequestBuilder(rootUrl, savePeriodoAllenamento.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PeriodoAllenamentoResponse>;
    })
  );
}

savePeriodoAllenamento.PATH = '/periodTraining';
