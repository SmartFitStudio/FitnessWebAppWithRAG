/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface DeletePeriodoAllenamento$Params {
  'periodo-allenamento-id': number;
}

export function deletePeriodoAllenamento(http: HttpClient, rootUrl: string, params: DeletePeriodoAllenamento$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, deletePeriodoAllenamento.PATH, 'delete');
  if (params) {
    rb.path('periodo-allenamento-id', params['periodo-allenamento-id'], {});
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

deletePeriodoAllenamento.PATH = '/periodTraining/{periodo-allenamento-id}';
