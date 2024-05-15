/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AllenamentoEsercizioRequest } from '../../models/allenamento-esercizio-request';
import { AllenamentoEsercizioResponse } from '../../models/allenamento-esercizio-response';

export interface SaveAllenamentoEsercizio$Params {
      body: AllenamentoEsercizioRequest
}

export function saveAllenamentoEsercizio(http: HttpClient, rootUrl: string, params: SaveAllenamentoEsercizio$Params, context?: HttpContext): Observable<StrictHttpResponse<AllenamentoEsercizioResponse>> {
  const rb = new RequestBuilder(rootUrl, saveAllenamentoEsercizio.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AllenamentoEsercizioResponse>;
    })
  );
}

saveAllenamentoEsercizio.PATH = '/trainingexercise';
