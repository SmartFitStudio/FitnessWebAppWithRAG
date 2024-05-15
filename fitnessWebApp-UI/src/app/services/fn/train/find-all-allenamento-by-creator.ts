/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseAllenamentoResponse } from '../../models/page-response-allenamento-response';

export interface FindAllAllenamentoByCreator$Params {
  page?: number;
  size?: number;
}

export function findAllAllenamentoByCreator(http: HttpClient, rootUrl: string, params?: FindAllAllenamentoByCreator$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseAllenamentoResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllAllenamentoByCreator.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseAllenamentoResponse>;
    })
  );
}

findAllAllenamentoByCreator.PATH = '/trainings/creator';
