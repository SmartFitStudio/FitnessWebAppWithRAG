/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NotificaResponse } from '../../models/notifica-response';

export interface SignNotificationAsRead$Params {
  id: number;
}

export function signNotificationAsRead(http: HttpClient, rootUrl: string, params: SignNotificationAsRead$Params, context?: HttpContext): Observable<StrictHttpResponse<NotificaResponse>> {
  const rb = new RequestBuilder(rootUrl, signNotificationAsRead.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<NotificaResponse>;
    })
  );
}

signNotificationAsRead.PATH = '/notifiche/{id}';
