/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Question } from '../../models/question';
import { RagllmResponse } from '../../models/ragllm-response';

export interface AnswerQuestion$Params {
      body: Question
}

export function answerQuestion(http: HttpClient, rootUrl: string, params: AnswerQuestion$Params, context?: HttpContext): Observable<StrictHttpResponse<RagllmResponse>> {
  const rb = new RequestBuilder(rootUrl, answerQuestion.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<RagllmResponse>;
    })
  );
}

answerQuestion.PATH = '/ragllm/answer';
