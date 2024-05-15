/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getTodayNotification } from '../fn/notifica/get-today-notification';
import { GetTodayNotification$Params } from '../fn/notifica/get-today-notification';
import { NotificaResponse } from '../models/notifica-response';
import { signNotificationAsRead } from '../fn/notifica/sign-notification-as-read';
import { SignNotificationAsRead$Params } from '../fn/notifica/sign-notification-as-read';

@Injectable({ providedIn: 'root' })
export class NotificaService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `signNotificationAsRead()` */
  static readonly SignNotificationAsReadPath = '/notifiche/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `signNotificationAsRead()` instead.
   *
   * This method doesn't expect any request body.
   */
  signNotificationAsRead$Response(params: SignNotificationAsRead$Params, context?: HttpContext): Observable<StrictHttpResponse<NotificaResponse>> {
    return signNotificationAsRead(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `signNotificationAsRead$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  signNotificationAsRead(params: SignNotificationAsRead$Params, context?: HttpContext): Observable<NotificaResponse> {
    return this.signNotificationAsRead$Response(params, context).pipe(
      map((r: StrictHttpResponse<NotificaResponse>): NotificaResponse => r.body)
    );
  }

  /** Path part for operation `getTodayNotification()` */
  static readonly GetTodayNotificationPath = '/notifiche/today';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTodayNotification()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTodayNotification$Response(params?: GetTodayNotification$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<NotificaResponse>>> {
    return getTodayNotification(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTodayNotification$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTodayNotification(params?: GetTodayNotification$Params, context?: HttpContext): Observable<Array<NotificaResponse>> {
    return this.getTodayNotification$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<NotificaResponse>>): Array<NotificaResponse> => r.body)
    );
  }

}
