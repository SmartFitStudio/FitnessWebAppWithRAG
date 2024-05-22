/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseExerciseResponse } from '../../models/page-response-exercise-response';
import { ExerciseCategory } from '../../myModels/exerciseCategory';

export interface FindExercisesByCategories$Params {
  page?: number;
  size?: number;
  categories: Array<ExerciseCategory>;
}

export function findExercisesByCategories(http: HttpClient, rootUrl: string, params: FindExercisesByCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseExerciseResponse>> {
  const rb = new RequestBuilder(rootUrl, findExercisesByCategories.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.query('categories', params.categories, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseExerciseResponse>;
    })
  );
}

findExercisesByCategories.PATH = '/exercises/categories';
