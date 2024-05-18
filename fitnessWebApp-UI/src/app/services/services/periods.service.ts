/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deletePeriodo } from '../fn/periods/delete-periodo';
import { DeletePeriodo$Params } from '../fn/periods/delete-periodo';
import { disableAuthenticatedUserActivePeriodo } from '../fn/periods/disable-authenticated-user-active-periodo';
import { DisableAuthenticatedUserActivePeriodo$Params } from '../fn/periods/disable-authenticated-user-active-periodo';
import { findAllAuthenticatedUserPeriodoPaginated } from '../fn/periods/find-all-authenticated-user-periodo-paginated';
import { FindAllAuthenticatedUserPeriodoPaginated$Params } from '../fn/periods/find-all-authenticated-user-periodo-paginated';
import { findAuthenticatedUserActivePeriodo } from '../fn/periods/find-authenticated-user-active-periodo';
import { FindAuthenticatedUserActivePeriodo$Params } from '../fn/periods/find-authenticated-user-active-periodo';
import { findByAuthenticatedUserAndId } from '../fn/periods/find-by-authenticated-user-and-id';
import { FindByAuthenticatedUserAndId$Params } from '../fn/periods/find-by-authenticated-user-and-id';
import { PageResponsePeriodoResponse } from '../models/page-response-periodo-response';
import { PeriodoResponse } from '../models/periodo-response';
import { savePeriodo } from '../fn/periods/save-periodo';
import { SavePeriodo$Params } from '../fn/periods/save-periodo';

@Injectable({ providedIn: 'root' })
export class PeriodsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `disableAuthenticatedUserActivePeriodo()` */
  static readonly DisableAuthenticatedUserActivePeriodoPath = '/periods/disable_active_period';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `disableAuthenticatedUserActivePeriodo()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableAuthenticatedUserActivePeriodo$Response(params?: DisableAuthenticatedUserActivePeriodo$Params, context?: HttpContext): Observable<StrictHttpResponse<PeriodoResponse>> {
    return disableAuthenticatedUserActivePeriodo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `disableAuthenticatedUserActivePeriodo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableAuthenticatedUserActivePeriodo(params?: DisableAuthenticatedUserActivePeriodo$Params, context?: HttpContext): Observable<PeriodoResponse> {
    return this.disableAuthenticatedUserActivePeriodo$Response(params, context).pipe(
      map((r: StrictHttpResponse<PeriodoResponse>): PeriodoResponse => r.body)
    );
  }

  /** Path part for operation `savePeriodo()` */
  static readonly SavePeriodoPath = '/periods';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `savePeriodo()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  savePeriodo$Response(params: SavePeriodo$Params, context?: HttpContext): Observable<StrictHttpResponse<PeriodoResponse>> {
    return savePeriodo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `savePeriodo$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  savePeriodo(params: SavePeriodo$Params, context?: HttpContext): Observable<PeriodoResponse> {
    return this.savePeriodo$Response(params, context).pipe(
      map((r: StrictHttpResponse<PeriodoResponse>): PeriodoResponse => r.body)
    );
  }

  /** Path part for operation `findByAuthenticatedUserAndId()` */
  static readonly FindByAuthenticatedUserAndIdPath = '/periods/{periodo-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByAuthenticatedUserAndId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByAuthenticatedUserAndId$Response(params: FindByAuthenticatedUserAndId$Params, context?: HttpContext): Observable<StrictHttpResponse<PeriodoResponse>> {
    return findByAuthenticatedUserAndId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findByAuthenticatedUserAndId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByAuthenticatedUserAndId(params: FindByAuthenticatedUserAndId$Params, context?: HttpContext): Observable<PeriodoResponse> {
    return this.findByAuthenticatedUserAndId$Response(params, context).pipe(
      map((r: StrictHttpResponse<PeriodoResponse>): PeriodoResponse => r.body)
    );
  }

  /** Path part for operation `deletePeriodo()` */
  static readonly DeletePeriodoPath = '/periods/{periodo-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePeriodo()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePeriodo$Response(params: DeletePeriodo$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deletePeriodo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deletePeriodo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePeriodo(params: DeletePeriodo$Params, context?: HttpContext): Observable<{
}> {
    return this.deletePeriodo$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `findAuthenticatedUserActivePeriodo()` */
  static readonly FindAuthenticatedUserActivePeriodoPath = '/periods/is_there_an_active_period';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAuthenticatedUserActivePeriodo()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAuthenticatedUserActivePeriodo$Response(params?: FindAuthenticatedUserActivePeriodo$Params, context?: HttpContext): Observable<StrictHttpResponse<PeriodoResponse>> {
    return findAuthenticatedUserActivePeriodo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAuthenticatedUserActivePeriodo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAuthenticatedUserActivePeriodo(params?: FindAuthenticatedUserActivePeriodo$Params, context?: HttpContext): Observable<PeriodoResponse> {
    return this.findAuthenticatedUserActivePeriodo$Response(params, context).pipe(
      map((r: StrictHttpResponse<PeriodoResponse>): PeriodoResponse => r.body)
    );
  }

  /** Path part for operation `findAllAuthenticatedUserPeriodoPaginated()` */
  static readonly FindAllAuthenticatedUserPeriodoPaginatedPath = '/periods/creator';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllAuthenticatedUserPeriodoPaginated()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAuthenticatedUserPeriodoPaginated$Response(params?: FindAllAuthenticatedUserPeriodoPaginated$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponsePeriodoResponse>> {
    return findAllAuthenticatedUserPeriodoPaginated(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllAuthenticatedUserPeriodoPaginated$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAuthenticatedUserPeriodoPaginated(params?: FindAllAuthenticatedUserPeriodoPaginated$Params, context?: HttpContext): Observable<PageResponsePeriodoResponse> {
    return this.findAllAuthenticatedUserPeriodoPaginated$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponsePeriodoResponse>): PageResponsePeriodoResponse => r.body)
    );
  }

}
