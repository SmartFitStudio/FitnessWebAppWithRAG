/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ExerciseResponse } from '../../models/exercise-response';

export interface ImportExercise$Params {
  'exercise-id': number;
}

export function importExercise(http: HttpClient, rootUrl: string, params: ImportExercise$Params, context?: HttpContext): Observable<StrictHttpResponse<ExerciseResponse>> {
  const rb = new RequestBuilder(rootUrl, importExercise.PATH, 'post');
  if (params) {
    rb.path('exercise-id', params['exercise-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ExerciseResponse>;
    })
  );
}

importExercise.PATH = '/exercises/import/{exercise-id}';
