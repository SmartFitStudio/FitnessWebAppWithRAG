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
import { findByPeriodoNome } from '../fn/period-training/find-by-periodo-nome';
import { FindByPeriodoNome$Params } from '../fn/period-training/find-by-periodo-nome';
import { findByPeriodoNomeNoPagination } from '../fn/period-training/find-by-periodo-nome-no-pagination';
import { FindByPeriodoNomeNoPagination$Params } from '../fn/period-training/find-by-periodo-nome-no-pagination';
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

  /** Path part for operation `findByPeriodoNome()` */
  static readonly FindByPeriodoNomePath = '/periodTraining/{periodo-nome}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByPeriodoNome()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByPeriodoNome$Response(params: FindByPeriodoNome$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponsePeriodoAllenamentoResponse>> {
    return findByPeriodoNome(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findByPeriodoNome$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByPeriodoNome(params: FindByPeriodoNome$Params, context?: HttpContext): Observable<PageResponsePeriodoAllenamentoResponse> {
    return this.findByPeriodoNome$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponsePeriodoAllenamentoResponse>): PageResponsePeriodoAllenamentoResponse => r.body)
    );
  }

  /** Path part for operation `findByPeriodoNomeNoPagination()` */
  static readonly FindByPeriodoNomeNoPaginationPath = '/periodTraining/no_pagination/{periodo-nome}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByPeriodoNomeNoPagination()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByPeriodoNomeNoPagination$Response(params: FindByPeriodoNomeNoPagination$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PeriodoAllenamentoResponse>>> {
    return findByPeriodoNomeNoPagination(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findByPeriodoNomeNoPagination$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByPeriodoNomeNoPagination(params: FindByPeriodoNomeNoPagination$Params, context?: HttpContext): Observable<Array<PeriodoAllenamentoResponse>> {
    return this.findByPeriodoNomeNoPagination$Response(params, context).pipe(
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
