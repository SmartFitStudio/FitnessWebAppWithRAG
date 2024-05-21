/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseProgressoResponse } from '../../models/page-response-progresso-response';

export interface GetAllProgressiPaginated$Params {
  page?: number;
  size?: number;
}

export function getAllProgressiPaginated(http: HttpClient, rootUrl: string, params?: GetAllProgressiPaginated$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseProgressoResponse>> {
  const rb = new RequestBuilder(rootUrl, getAllProgressiPaginated.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseProgressoResponse>;
    })
  );
}

getAllProgressiPaginated.PATH = '/progress/all/paginated';
