/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ExerciseRequest } from '../../models/exercise-request';
import { ExerciseResponse } from '../../models/exercise-response';

export interface SaveExercise$Params {
      body: ExerciseRequest
}

export function saveExercise(http: HttpClient, rootUrl: string, params: SaveExercise$Params, context?: HttpContext): Observable<StrictHttpResponse<ExerciseResponse>> {
  const rb = new RequestBuilder(rootUrl, saveExercise.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
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

saveExercise.PATH = '/exercises';
