/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProgressoResponse } from '../../models/progresso-response';

export interface GetLastNProgressi$Params {
  N: number;
}

export function getLastNProgressi(http: HttpClient, rootUrl: string, params: GetLastNProgressi$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProgressoResponse>>> {
  const rb = new RequestBuilder(rootUrl, getLastNProgressi.PATH, 'get');
  if (params) {
    rb.path('N', params.N, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ProgressoResponse>>;
    })
  );
}

getLastNProgressi.PATH = '/progress/last/{N}';
