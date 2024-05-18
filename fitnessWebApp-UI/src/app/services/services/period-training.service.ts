/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deletePeriodoAllenamento } from '../fn/period-training/delete-periodo-allenamento';
import { DeletePeriodoAllenamento$Params } from '../fn/period-training/delete-periodo-allenamento';
import { findAllAuthUserPeriodoAllenamentoByPeriodoIdNoPagination } from '../fn/period-training/find-all-auth-user-periodo-allenamento-by-periodo-id-no-pagination';
import { FindAllAuthUserPeriodoAllenamentoByPeriodoIdNoPagination$Params } from '../fn/period-training/find-all-auth-user-periodo-allenamento-by-periodo-id-no-pagination';
import { findAllAuthUserPeriodoAllenamentoByPeriodoIdPaginated } from '../fn/period-training/find-all-auth-user-periodo-allenamento-by-periodo-id-paginated';
import { FindAllAuthUserPeriodoAllenamentoByPeriodoIdPaginated$Params } from '../fn/period-training/find-all-auth-user-periodo-allenamento-by-periodo-id-paginated';
import { PageResponsePeriodoAllenamentoResponse } from '../models/page-response-periodo-allenamento-response';
import { PeriodoAllenamentoResponse } from '../models/periodo-allenamento-response';
import { savePeriodoAllenamento } from '../fn/period-training/save-periodo-allenamento';
import { SavePeriodoAllenamento$Params } from '../fn/period-training/save-periodo-allenamento';

@Injectable({ providedIn: 'root' })
export class PeriodTrainingService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `savePeriodoAllenamento()` */
  static readonly SavePeriodoAllenamentoPath = '/periodTraining';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `savePeriodoAllenamento()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  savePeriodoAllenamento$Response(params: SavePeriodoAllenamento$Params, context?: HttpContext): Observable<StrictHttpResponse<PeriodoAllenamentoResponse>> {
    return savePeriodoAllenamento(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `savePeriodoAllenamento$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  savePeriodoAllenamento(params: SavePeriodoAllenamento$Params, context?: HttpContext): Observable<PeriodoAllenamentoResponse> {
    return this.savePeriodoAllenamento$Response(params, context).pipe(
      map((r: StrictHttpResponse<PeriodoAllenamentoResponse>): PeriodoAllenamentoResponse => r.body)
    );
  }

  /** Path part for operation `findAllAuthUserPeriodoAllenamentoByPeriodoIdPaginated()` */
  static readonly FindAllAuthUserPeriodoAllenamentoByPeriodoIdPaginatedPath = '/periodTraining/{periodo-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllAuthUserPeriodoAllenamentoByPeriodoIdPaginated()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAuthUserPeriodoAllenamentoByPeriodoIdPaginated$Response(params: FindAllAuthUserPeriodoAllenamentoByPeriodoIdPaginated$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponsePeriodoAllenamentoResponse>> {
    return findAllAuthUserPeriodoAllenamentoByPeriodoIdPaginated(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllAuthUserPeriodoAllenamentoByPeriodoIdPaginated$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAuthUserPeriodoAllenamentoByPeriodoIdPaginated(params: FindAllAuthUserPeriodoAllenamentoByPeriodoIdPaginated$Params, context?: HttpContext): Observable<PageResponsePeriodoAllenamentoResponse> {
    return this.findAllAuthUserPeriodoAllenamentoByPeriodoIdPaginated$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponsePeriodoAllenamentoResponse>): PageResponsePeriodoAllenamentoResponse => r.body)
    );
  }

  /** Path part for operation `findAllAuthUserPeriodoAllenamentoByPeriodoIdNoPagination()` */
  static readonly FindAllAuthUserPeriodoAllenamentoByPeriodoIdNoPaginationPath = '/periodTraining/no_pagination/{periodo-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllAuthUserPeriodoAllenamentoByPeriodoIdNoPagination()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAuthUserPeriodoAllenamentoByPeriodoIdNoPagination$Response(params: FindAllAuthUserPeriodoAllenamentoByPeriodoIdNoPagination$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PeriodoAllenamentoResponse>>> {
    return findAllAuthUserPeriodoAllenamentoByPeriodoIdNoPagination(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllAuthUserPeriodoAllenamentoByPeriodoIdNoPagination$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAuthUserPeriodoAllenamentoByPeriodoIdNoPagination(params: FindAllAuthUserPeriodoAllenamentoByPeriodoIdNoPagination$Params, context?: HttpContext): Observable<Array<PeriodoAllenamentoResponse>> {
    return this.findAllAuthUserPeriodoAllenamentoByPeriodoIdNoPagination$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PeriodoAllenamentoResponse>>): Array<PeriodoAllenamentoResponse> => r.body)
    );
  }

  /** Path part for operation `deletePeriodoAllenamento()` */
  static readonly DeletePeriodoAllenamentoPath = '/periodTraining/{periodo-allenamento-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePeriodoAllenamento()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePeriodoAllenamento$Response(params: DeletePeriodoAllenamento$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deletePeriodoAllenamento(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deletePeriodoAllenamento$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePeriodoAllenamento(params: DeletePeriodoAllenamento$Params, context?: HttpContext): Observable<{
}> {
    return this.deletePeriodoAllenamento$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
