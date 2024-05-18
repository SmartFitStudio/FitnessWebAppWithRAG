/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ExerciseResponse } from '../../models/exercise-response';

export interface FindAuthenticatedUserOrDefaultExerciseById$Params {
  'exercise-id': number;
}

export function findAuthenticatedUserOrDefaultExerciseById(http: HttpClient, rootUrl: string, params: FindAuthenticatedUserOrDefaultExerciseById$Params, context?: HttpContext): Observable<StrictHttpResponse<ExerciseResponse>> {
  const rb = new RequestBuilder(rootUrl, findAuthenticatedUserOrDefaultExerciseById.PATH, 'get');
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

findAuthenticatedUserOrDefaultExerciseById.PATH = '/exercises/{exercise-id}';
