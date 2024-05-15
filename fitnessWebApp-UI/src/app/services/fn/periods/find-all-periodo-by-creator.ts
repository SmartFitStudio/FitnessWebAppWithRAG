/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponsePeriodoResponse } from '../../models/page-response-periodo-response';

export interface FindAllPeriodoByCreator$Params {
  page?: number;
  size?: number;
}

export function findAllPeriodoByCreator(http: HttpClient, rootUrl: string, params?: FindAllPeriodoByCreator$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponsePeriodoResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllPeriodoByCreator.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponsePeriodoResponse>;
    })
  );
}

findAllPeriodoByCreator.PATH = '/periods/creator';
