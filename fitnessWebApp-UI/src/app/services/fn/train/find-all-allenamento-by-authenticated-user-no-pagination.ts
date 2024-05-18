/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AllenamentoResponse } from '../../models/allenamento-response';

export interface FindAllAllenamentoByAuthenticatedUserNoPagination$Params {
}

export function findAllAllenamentoByAuthenticatedUserNoPagination(http: HttpClient, rootUrl: string, params?: FindAllAllenamentoByAuthenticatedUserNoPagination$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AllenamentoResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllAllenamentoByAuthenticatedUserNoPagination.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<AllenamentoResponse>>;
    })
  );
}

findAllAllenamentoByAuthenticatedUserNoPagination.PATH = '/trainings/creator/no_pagination';
