/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProgressoRequest } from '../../models/progresso-request';
import { ProgressoResponse } from '../../models/progresso-response';

export interface AddProgresso$Params {
      body: ProgressoRequest
}

export function addProgresso(http: HttpClient, rootUrl: string, params: AddProgresso$Params, context?: HttpContext): Observable<StrictHttpResponse<ProgressoResponse>> {
  const rb = new RequestBuilder(rootUrl, addProgresso.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ProgressoResponse>;
    })
  );
}

addProgresso.PATH = '/progress';
