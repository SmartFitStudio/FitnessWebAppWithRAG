/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface DeleteAllenamentoEsercizio$Params {
  'allenamento-nome': string;
  index: number;
}

export function deleteAllenamentoEsercizio(http: HttpClient, rootUrl: string, params: DeleteAllenamentoEsercizio$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, deleteAllenamentoEsercizio.PATH, 'delete');
  if (params) {
    rb.path('allenamento-nome', params['allenamento-nome'], {});
    rb.path('index', params.index, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}

deleteAllenamentoEsercizio.PATH = '/trainingexercise/{allenamento-nome}/{index}';
