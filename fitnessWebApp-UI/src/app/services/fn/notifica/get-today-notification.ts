/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NotificaResponse } from '../../models/notifica-response';

export interface GetTodayNotification$Params {
}

export function getTodayNotification(http: HttpClient, rootUrl: string, params?: GetTodayNotification$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<NotificaResponse>>> {
  const rb = new RequestBuilder(rootUrl, getTodayNotification.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<NotificaResponse>>;
    })
  );
}

getTodayNotification.PATH = '/notifiche/today';
