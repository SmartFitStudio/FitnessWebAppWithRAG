/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addProgresso } from '../fn/progress/add-progresso';
import { AddProgresso$Params } from '../fn/progress/add-progresso';
import { deleteProgresso } from '../fn/progress/delete-progresso';
import { DeleteProgresso$Params } from '../fn/progress/delete-progresso';
import { getAllProgressi } from '../fn/progress/get-all-progressi';
import { GetAllProgressi$Params } from '../fn/progress/get-all-progressi';
import { getLastNProgressi } from '../fn/progress/get-last-n-progressi';
import { GetLastNProgressi$Params } from '../fn/progress/get-last-n-progressi';
import { getProgresso } from '../fn/progress/get-progresso';
import { GetProgresso$Params } from '../fn/progress/get-progresso';
import { ProgressoResponse } from '../models/progresso-response';
import { updateProgresso } from '../fn/progress/update-progresso';
import { UpdateProgresso$Params } from '../fn/progress/update-progresso';

@Injectable({ providedIn: 'root' })
export class ProgressService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getProgresso()` */
  static readonly GetProgressoPath = '/progress/{progresso-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProgresso()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProgresso$Response(params: GetProgresso$Params, context?: HttpContext): Observable<StrictHttpResponse<ProgressoResponse>> {
    return getProgresso(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProgresso$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProgresso(params: GetProgresso$Params, context?: HttpContext): Observable<ProgressoResponse> {
    return this.getProgresso$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProgressoResponse>): ProgressoResponse => r.body)
    );
  }

  /** Path part for operation `updateProgresso()` */
  static readonly UpdateProgressoPath = '/progress/{progresso-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateProgresso()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProgresso$Response(params: UpdateProgresso$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return updateProgresso(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateProgresso$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProgresso(params: UpdateProgresso$Params, context?: HttpContext): Observable<{
}> {
    return this.updateProgresso$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `deleteProgresso()` */
  static readonly DeleteProgressoPath = '/progress/{progresso-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteProgresso()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProgresso$Response(params: DeleteProgresso$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteProgresso(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteProgresso$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProgresso(params: DeleteProgresso$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteProgresso$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `addProgresso()` */
  static readonly AddProgressoPath = '/progress';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addProgresso()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProgresso$Response(params: AddProgresso$Params, context?: HttpContext): Observable<StrictHttpResponse<ProgressoResponse>> {
    return addProgresso(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addProgresso$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProgresso(params: AddProgresso$Params, context?: HttpContext): Observable<ProgressoResponse> {
    return this.addProgresso$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProgressoResponse>): ProgressoResponse => r.body)
    );
  }

  /** Path part for operation `getLastNProgressi()` */
  static readonly GetLastNProgressiPath = '/progress/last/{N}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLastNProgressi()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLastNProgressi$Response(params: GetLastNProgressi$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProgressoResponse>>> {
    return getLastNProgressi(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getLastNProgressi$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLastNProgressi(params: GetLastNProgressi$Params, context?: HttpContext): Observable<Array<ProgressoResponse>> {
    return this.getLastNProgressi$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ProgressoResponse>>): Array<ProgressoResponse> => r.body)
    );
  }

  /** Path part for operation `getAllProgressi()` */
  static readonly GetAllProgressiPath = '/progress/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllProgressi()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProgressi$Response(params?: GetAllProgressi$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProgressoResponse>>> {
    return getAllProgressi(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllProgressi$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProgressi(params?: GetAllProgressi$Params, context?: HttpContext): Observable<Array<ProgressoResponse>> {
    return this.getAllProgressi$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ProgressoResponse>>): Array<ProgressoResponse> => r.body)
    );
  }

}
