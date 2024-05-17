/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProgressoResponse } from '../../models/progresso-response';

export interface GetAllProgressi$Params {
}

export function getAllProgressi(http: HttpClient, rootUrl: string, params?: GetAllProgressi$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProgressoResponse>>> {
  const rb = new RequestBuilder(rootUrl, getAllProgressi.PATH, 'get');
  if (params) {
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

getAllProgressi.PATH = '/progress/all';
