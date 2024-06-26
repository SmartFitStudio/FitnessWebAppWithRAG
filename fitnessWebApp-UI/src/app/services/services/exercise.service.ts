/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteExercise } from '../fn/exercise/delete-exercise';
import { DeleteExercise$Params } from '../fn/exercise/delete-exercise';
import { ExerciseResponse } from '../models/exercise-response';
import { findAllAuthenticatedUserExercisesPaginated } from '../fn/exercise/find-all-authenticated-user-exercises-paginated';
import { FindAllAuthenticatedUserExercisesPaginated$Params } from '../fn/exercise/find-all-authenticated-user-exercises-paginated';
import { findAuthenticatedUserOrDefaultExerciseById } from '../fn/exercise/find-authenticated-user-or-default-exercise-by-id';
import { FindAuthenticatedUserOrDefaultExerciseById$Params } from '../fn/exercise/find-authenticated-user-or-default-exercise-by-id';
import { findExercisesByCategories } from '../fn/exercise/find-exercises-by-categories';
import { FindExercisesByCategories$Params } from '../fn/exercise/find-exercises-by-categories';
import { getExerciseCategories } from '../fn/exercise/get-exercise-categories';
import { GetExerciseCategories$Params } from '../fn/exercise/get-exercise-categories';
import { getExercisesFromPublicStore } from '../fn/exercise/get-exercises-from-public-store';
import { GetExercisesFromPublicStore$Params } from '../fn/exercise/get-exercises-from-public-store';
import { importExercise } from '../fn/exercise/import-exercise';
import { ImportExercise$Params } from '../fn/exercise/import-exercise';
import { PageResponseExerciseResponse } from '../models/page-response-exercise-response';
import { saveExercise } from '../fn/exercise/save-exercise';
import { SaveExercise$Params } from '../fn/exercise/save-exercise';
import { uploadBookCoverPicture } from '../fn/exercise/upload-book-cover-picture';
import { UploadBookCoverPicture$Params } from '../fn/exercise/upload-book-cover-picture';

@Injectable({ providedIn: 'root' })
export class ExerciseService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveExercise()` */
  static readonly SaveExercisePath = '/exercises';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveExercise()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveExercise$Response(params: SaveExercise$Params, context?: HttpContext): Observable<StrictHttpResponse<ExerciseResponse>> {
    return saveExercise(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveExercise$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveExercise(params: SaveExercise$Params, context?: HttpContext): Observable<ExerciseResponse> {
    return this.saveExercise$Response(params, context).pipe(
      map((r: StrictHttpResponse<ExerciseResponse>): ExerciseResponse => r.body)
    );
  }

  /** Path part for operation `importExercise()` */
  static readonly ImportExercisePath = '/exercises/import/{exercise-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `importExercise()` instead.
   *
   * This method doesn't expect any request body.
   */
  importExercise$Response(params: ImportExercise$Params, context?: HttpContext): Observable<StrictHttpResponse<ExerciseResponse>> {
    return importExercise(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `importExercise$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  importExercise(params: ImportExercise$Params, context?: HttpContext): Observable<ExerciseResponse> {
    return this.importExercise$Response(params, context).pipe(
      map((r: StrictHttpResponse<ExerciseResponse>): ExerciseResponse => r.body)
    );
  }

  /** Path part for operation `uploadBookCoverPicture()` */
  static readonly UploadBookCoverPicturePath = '/exercises/cover/{exercise-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadBookCoverPicture()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadBookCoverPicture$Response(params: UploadBookCoverPicture$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadBookCoverPicture(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadBookCoverPicture$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadBookCoverPicture(params: UploadBookCoverPicture$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadBookCoverPicture$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `findAuthenticatedUserOrDefaultExerciseById()` */
  static readonly FindAuthenticatedUserOrDefaultExerciseByIdPath = '/exercises/{exercise-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAuthenticatedUserOrDefaultExerciseById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAuthenticatedUserOrDefaultExerciseById$Response(params: FindAuthenticatedUserOrDefaultExerciseById$Params, context?: HttpContext): Observable<StrictHttpResponse<ExerciseResponse>> {
    return findAuthenticatedUserOrDefaultExerciseById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAuthenticatedUserOrDefaultExerciseById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAuthenticatedUserOrDefaultExerciseById(params: FindAuthenticatedUserOrDefaultExerciseById$Params, context?: HttpContext): Observable<ExerciseResponse> {
    return this.findAuthenticatedUserOrDefaultExerciseById$Response(params, context).pipe(
      map((r: StrictHttpResponse<ExerciseResponse>): ExerciseResponse => r.body)
    );
  }

  /** Path part for operation `deleteExercise()` */
  static readonly DeleteExercisePath = '/exercises/{exercise-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteExercise()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteExercise$Response(params: DeleteExercise$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteExercise(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteExercise$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteExercise(params: DeleteExercise$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteExercise$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getExerciseCategories()` */
  static readonly GetExerciseCategoriesPath = '/exercises/exerciseCategories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getExerciseCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getExerciseCategories$Response(params?: GetExerciseCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<string>>> {
    return getExerciseCategories(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getExerciseCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getExerciseCategories(params?: GetExerciseCategories$Params, context?: HttpContext): Observable<Array<string>> {
    return this.getExerciseCategories$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<string>>): Array<string> => r.body)
    );
  }

  /** Path part for operation `getExercisesFromPublicStore()` */
  static readonly GetExercisesFromPublicStorePath = '/exercises/exercise-store';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getExercisesFromPublicStore()` instead.
   *
   * This method doesn't expect any request body.
   */
  getExercisesFromPublicStore$Response(params?: GetExercisesFromPublicStore$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseExerciseResponse>> {
    return getExercisesFromPublicStore(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getExercisesFromPublicStore$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getExercisesFromPublicStore(params?: GetExercisesFromPublicStore$Params, context?: HttpContext): Observable<PageResponseExerciseResponse> {
    return this.getExercisesFromPublicStore$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseExerciseResponse>): PageResponseExerciseResponse => r.body)
    );
  }

  /** Path part for operation `findAllAuthenticatedUserExercisesPaginated()` */
  static readonly FindAllAuthenticatedUserExercisesPaginatedPath = '/exercises/creator';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllAuthenticatedUserExercisesPaginated()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAuthenticatedUserExercisesPaginated$Response(params?: FindAllAuthenticatedUserExercisesPaginated$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseExerciseResponse>> {
    return findAllAuthenticatedUserExercisesPaginated(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllAuthenticatedUserExercisesPaginated$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAuthenticatedUserExercisesPaginated(params?: FindAllAuthenticatedUserExercisesPaginated$Params, context?: HttpContext): Observable<PageResponseExerciseResponse> {
    return this.findAllAuthenticatedUserExercisesPaginated$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseExerciseResponse>): PageResponseExerciseResponse => r.body)
    );
  }

  /** Path part for operation `findExercisesByCategories()` */
  static readonly FindExercisesByCategoriesPath = '/exercises/categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findExercisesByCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  findExercisesByCategories$Response(params: FindExercisesByCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseExerciseResponse>> {
    return findExercisesByCategories(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findExercisesByCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findExercisesByCategories(params: FindExercisesByCategories$Params, context?: HttpContext): Observable<PageResponseExerciseResponse> {
    return this.findExercisesByCategories$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseExerciseResponse>): PageResponseExerciseResponse => r.body)
    );
  }

}
