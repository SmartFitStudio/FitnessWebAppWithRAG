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
import { disableActivePeriod } from '../fn/periods/disable-active-period';
import { DisableActivePeriod$Params } from '../fn/periods/disable-active-period';
import { findAllPeriodoByCreator } from '../fn/periods/find-all-periodo-by-creator';
import { FindAllPeriodoByCreator$Params } from '../fn/periods/find-all-periodo-by-creator';
import { findPeriodoById } from '../fn/periods/find-periodo-by-id';
import { FindPeriodoById$Params } from '../fn/periods/find-periodo-by-id';
import { isThereAnActivePeriod } from '../fn/periods/is-there-an-active-period';
import { IsThereAnActivePeriod$Params } from '../fn/periods/is-there-an-active-period';
import { PageResponsePeriodoResponse } from '../models/page-response-periodo-response';
import { PeriodoResponse } from '../models/periodo-response';
import { savePeriodo } from '../fn/periods/save-periodo';
import { SavePeriodo$Params } from '../fn/periods/save-periodo';

@Injectable({ providedIn: 'root' })
export class PeriodsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `disableActivePeriod()` */
  static readonly DisableActivePeriodPath = '/periods/disable_active_period';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `disableActivePeriod()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableActivePeriod$Response(params?: DisableActivePeriod$Params, context?: HttpContext): Observable<StrictHttpResponse<PeriodoResponse>> {
    return disableActivePeriod(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `disableActivePeriod$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableActivePeriod(params?: DisableActivePeriod$Params, context?: HttpContext): Observable<PeriodoResponse> {
    return this.disableActivePeriod$Response(params, context).pipe(
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

  /** Path part for operation `findPeriodoById()` */
  static readonly FindPeriodoByIdPath = '/periods/{periodo-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findPeriodoById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPeriodoById$Response(params: FindPeriodoById$Params, context?: HttpContext): Observable<StrictHttpResponse<PeriodoResponse>> {
    return findPeriodoById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findPeriodoById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPeriodoById(params: FindPeriodoById$Params, context?: HttpContext): Observable<PeriodoResponse> {
    return this.findPeriodoById$Response(params, context).pipe(
      map((r: StrictHttpResponse<PeriodoResponse>): PeriodoResponse => r.body)
    );
  }

  /** Path part for operation `isThereAnActivePeriod()` */
  static readonly IsThereAnActivePeriodPath = '/periods/is_there_an_active_period';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `isThereAnActivePeriod()` instead.
   *
   * This method doesn't expect any request body.
   */
  isThereAnActivePeriod$Response(params?: IsThereAnActivePeriod$Params, context?: HttpContext): Observable<StrictHttpResponse<PeriodoResponse>> {
    return isThereAnActivePeriod(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `isThereAnActivePeriod$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  isThereAnActivePeriod(params?: IsThereAnActivePeriod$Params, context?: HttpContext): Observable<PeriodoResponse> {
    return this.isThereAnActivePeriod$Response(params, context).pipe(
      map((r: StrictHttpResponse<PeriodoResponse>): PeriodoResponse => r.body)
    );
  }

  /** Path part for operation `findAllPeriodoByCreator()` */
  static readonly FindAllPeriodoByCreatorPath = '/periods/creator';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPeriodoByCreator()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPeriodoByCreator$Response(params?: FindAllPeriodoByCreator$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponsePeriodoResponse>> {
    return findAllPeriodoByCreator(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllPeriodoByCreator$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPeriodoByCreator(params?: FindAllPeriodoByCreator$Params, context?: HttpContext): Observable<PageResponsePeriodoResponse> {
    return this.findAllPeriodoByCreator$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponsePeriodoResponse>): PageResponsePeriodoResponse => r.body)
    );
  }

  /** Path part for operation `deletePeriodo()` */
  static readonly DeletePeriodoPath = '/periods/{periodo-nome}';

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

}
