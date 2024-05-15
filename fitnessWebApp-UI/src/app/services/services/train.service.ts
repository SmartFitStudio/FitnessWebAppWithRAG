/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AllenamentoResponse } from '../models/allenamento-response';
import { deleteAllenamento } from '../fn/train/delete-allenamento';
import { DeleteAllenamento$Params } from '../fn/train/delete-allenamento';
import { findAllAllenamentoByCreator } from '../fn/train/find-all-allenamento-by-creator';
import { FindAllAllenamentoByCreator$Params } from '../fn/train/find-all-allenamento-by-creator';
import { findAllAllenamentoByCreatorNoPagination } from '../fn/train/find-all-allenamento-by-creator-no-pagination';
import { FindAllAllenamentoByCreatorNoPagination$Params } from '../fn/train/find-all-allenamento-by-creator-no-pagination';
import { findAllenamentoById } from '../fn/train/find-allenamento-by-id';
import { FindAllenamentoById$Params } from '../fn/train/find-allenamento-by-id';
import { PageResponseAllenamentoResponse } from '../models/page-response-allenamento-response';
import { saveAllenamento } from '../fn/train/save-allenamento';
import { SaveAllenamento$Params } from '../fn/train/save-allenamento';

@Injectable({ providedIn: 'root' })
export class TrainService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveAllenamento()` */
  static readonly SaveAllenamentoPath = '/trainings';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveAllenamento()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveAllenamento$Response(params: SaveAllenamento$Params, context?: HttpContext): Observable<StrictHttpResponse<AllenamentoResponse>> {
    return saveAllenamento(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveAllenamento$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveAllenamento(params: SaveAllenamento$Params, context?: HttpContext): Observable<AllenamentoResponse> {
    return this.saveAllenamento$Response(params, context).pipe(
      map((r: StrictHttpResponse<AllenamentoResponse>): AllenamentoResponse => r.body)
    );
  }

  /** Path part for operation `findAllenamentoById()` */
  static readonly FindAllenamentoByIdPath = '/trainings/{allenamento-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllenamentoById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllenamentoById$Response(params: FindAllenamentoById$Params, context?: HttpContext): Observable<StrictHttpResponse<AllenamentoResponse>> {
    return findAllenamentoById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllenamentoById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllenamentoById(params: FindAllenamentoById$Params, context?: HttpContext): Observable<AllenamentoResponse> {
    return this.findAllenamentoById$Response(params, context).pipe(
      map((r: StrictHttpResponse<AllenamentoResponse>): AllenamentoResponse => r.body)
    );
  }

  /** Path part for operation `findAllAllenamentoByCreator()` */
  static readonly FindAllAllenamentoByCreatorPath = '/trainings/creator';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllAllenamentoByCreator()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAllenamentoByCreator$Response(params?: FindAllAllenamentoByCreator$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseAllenamentoResponse>> {
    return findAllAllenamentoByCreator(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllAllenamentoByCreator$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAllenamentoByCreator(params?: FindAllAllenamentoByCreator$Params, context?: HttpContext): Observable<PageResponseAllenamentoResponse> {
    return this.findAllAllenamentoByCreator$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseAllenamentoResponse>): PageResponseAllenamentoResponse => r.body)
    );
  }

  /** Path part for operation `findAllAllenamentoByCreatorNoPagination()` */
  static readonly FindAllAllenamentoByCreatorNoPaginationPath = '/trainings/creator/no_pagination';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllAllenamentoByCreatorNoPagination()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAllenamentoByCreatorNoPagination$Response(params?: FindAllAllenamentoByCreatorNoPagination$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AllenamentoResponse>>> {
    return findAllAllenamentoByCreatorNoPagination(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllAllenamentoByCreatorNoPagination$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAllenamentoByCreatorNoPagination(params?: FindAllAllenamentoByCreatorNoPagination$Params, context?: HttpContext): Observable<Array<AllenamentoResponse>> {
    return this.findAllAllenamentoByCreatorNoPagination$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<AllenamentoResponse>>): Array<AllenamentoResponse> => r.body)
    );
  }

  /** Path part for operation `deleteAllenamento()` */
  static readonly DeleteAllenamentoPath = '/trainings/{allenamento-nome}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAllenamento()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAllenamento$Response(params: DeleteAllenamento$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteAllenamento(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteAllenamento$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAllenamento(params: DeleteAllenamento$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteAllenamento$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
