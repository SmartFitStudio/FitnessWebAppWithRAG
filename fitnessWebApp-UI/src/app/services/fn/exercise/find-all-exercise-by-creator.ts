/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseExerciseResponse } from '../../models/page-response-exercise-response';

export interface FindAllExerciseByCreator$Params {
  page?: number;
  size?: number;
}

export function findAllExerciseByCreator(http: HttpClient, rootUrl: string, params?: FindAllExerciseByCreator$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseExerciseResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllExerciseByCreator.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
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

findAllExerciseByCreator.PATH = '/exercises/creator';
