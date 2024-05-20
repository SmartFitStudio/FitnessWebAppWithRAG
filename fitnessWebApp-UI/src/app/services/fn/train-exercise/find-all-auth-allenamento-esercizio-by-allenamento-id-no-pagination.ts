/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AllenamentoEsercizioResponse } from '../../models/allenamento-esercizio-response';

export interface FindAllAuthAllenamentoEsercizioByAllenamentoIdNoPagination$Params {
  'allenamento-id': number;
}

export function findAllAuthAllenamentoEsercizioByAllenamentoIdNoPagination(http: HttpClient, rootUrl: string, params: FindAllAuthAllenamentoEsercizioByAllenamentoIdNoPagination$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AllenamentoEsercizioResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllAuthAllenamentoEsercizioByAllenamentoIdNoPagination.PATH, 'get');
  if (params) {
    rb.path('allenamento-id', params['allenamento-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<AllenamentoEsercizioResponse>>;
    })
  );
}

findAllAuthAllenamentoEsercizioByAllenamentoIdNoPagination.PATH = '/trainingexercise/no_pagination/{allenamento-id}';
