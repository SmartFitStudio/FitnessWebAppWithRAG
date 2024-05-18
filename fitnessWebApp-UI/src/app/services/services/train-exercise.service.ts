/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AllenamentoEsercizioResponse } from '../models/allenamento-esercizio-response';
import { deleteAllenamentoEsercizio } from '../fn/train-exercise/delete-allenamento-esercizio';
import { DeleteAllenamentoEsercizio$Params } from '../fn/train-exercise/delete-allenamento-esercizio';
import { findAllAuthAllenamentoEsercizioByAllenamentoIdNoPagination } from '../fn/train-exercise/find-all-auth-allenamento-esercizio-by-allenamento-id-no-pagination';
import { FindAllAuthAllenamentoEsercizioByAllenamentoIdNoPagination$Params } from '../fn/train-exercise/find-all-auth-allenamento-esercizio-by-allenamento-id-no-pagination';
import { findAllAuthAllenamentoEsercizioByAllenamentoIdPaginated } from '../fn/train-exercise/find-all-auth-allenamento-esercizio-by-allenamento-id-paginated';
import { FindAllAuthAllenamentoEsercizioByAllenamentoIdPaginated$Params } from '../fn/train-exercise/find-all-auth-allenamento-esercizio-by-allenamento-id-paginated';
import { PageResponseAllenamentoEsercizioResponse } from '../models/page-response-allenamento-esercizio-response';
import { saveAllenamentoEsercizio } from '../fn/train-exercise/save-allenamento-esercizio';
import { SaveAllenamentoEsercizio$Params } from '../fn/train-exercise/save-allenamento-esercizio';

@Injectable({ providedIn: 'root' })
export class TrainExerciseService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveAllenamentoEsercizio()` */
  static readonly SaveAllenamentoEsercizioPath = '/trainingexercise';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveAllenamentoEsercizio()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveAllenamentoEsercizio$Response(params: SaveAllenamentoEsercizio$Params, context?: HttpContext): Observable<StrictHttpResponse<AllenamentoEsercizioResponse>> {
    return saveAllenamentoEsercizio(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveAllenamentoEsercizio$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveAllenamentoEsercizio(params: SaveAllenamentoEsercizio$Params, context?: HttpContext): Observable<AllenamentoEsercizioResponse> {
    return this.saveAllenamentoEsercizio$Response(params, context).pipe(
      map((r: StrictHttpResponse<AllenamentoEsercizioResponse>): AllenamentoEsercizioResponse => r.body)
    );
  }

  /** Path part for operation `findAllAuthAllenamentoEsercizioByAllenamentoIdPaginated()` */
  static readonly FindAllAuthAllenamentoEsercizioByAllenamentoIdPaginatedPath = '/trainingexercise/{allenamento-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllAuthAllenamentoEsercizioByAllenamentoIdPaginated()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAuthAllenamentoEsercizioByAllenamentoIdPaginated$Response(params: FindAllAuthAllenamentoEsercizioByAllenamentoIdPaginated$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseAllenamentoEsercizioResponse>> {
    return findAllAuthAllenamentoEsercizioByAllenamentoIdPaginated(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllAuthAllenamentoEsercizioByAllenamentoIdPaginated$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAuthAllenamentoEsercizioByAllenamentoIdPaginated(params: FindAllAuthAllenamentoEsercizioByAllenamentoIdPaginated$Params, context?: HttpContext): Observable<PageResponseAllenamentoEsercizioResponse> {
    return this.findAllAuthAllenamentoEsercizioByAllenamentoIdPaginated$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseAllenamentoEsercizioResponse>): PageResponseAllenamentoEsercizioResponse => r.body)
    );
  }

  /** Path part for operation `findAllAuthAllenamentoEsercizioByAllenamentoIdNoPagination()` */
  static readonly FindAllAuthAllenamentoEsercizioByAllenamentoIdNoPaginationPath = '/trainingexercise/no_pagination/{allenamento-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllAuthAllenamentoEsercizioByAllenamentoIdNoPagination()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAuthAllenamentoEsercizioByAllenamentoIdNoPagination$Response(params: FindAllAuthAllenamentoEsercizioByAllenamentoIdNoPagination$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AllenamentoEsercizioResponse>>> {
    return findAllAuthAllenamentoEsercizioByAllenamentoIdNoPagination(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllAuthAllenamentoEsercizioByAllenamentoIdNoPagination$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAuthAllenamentoEsercizioByAllenamentoIdNoPagination(params: FindAllAuthAllenamentoEsercizioByAllenamentoIdNoPagination$Params, context?: HttpContext): Observable<Array<AllenamentoEsercizioResponse>> {
    return this.findAllAuthAllenamentoEsercizioByAllenamentoIdNoPagination$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<AllenamentoEsercizioResponse>>): Array<AllenamentoEsercizioResponse> => r.body)
    );
  }

  /** Path part for operation `deleteAllenamentoEsercizio()` */
  static readonly DeleteAllenamentoEsercizioPath = '/trainingexercise/{allenamentoEsercizio-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAllenamentoEsercizio()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAllenamentoEsercizio$Response(params: DeleteAllenamentoEsercizio$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteAllenamentoEsercizio(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteAllenamentoEsercizio$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAllenamentoEsercizio(params: DeleteAllenamentoEsercizio$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteAllenamentoEsercizio$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
