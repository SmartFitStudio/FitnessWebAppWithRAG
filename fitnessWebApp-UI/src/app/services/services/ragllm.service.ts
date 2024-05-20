/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { answerQuestion } from '../fn/ragllm/answer-question';
import { AnswerQuestion$Params } from '../fn/ragllm/answer-question';
import { RagllmResponse } from '../models/ragllm-response';

@Injectable({ providedIn: 'root' })
export class RagllmService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `answerQuestion()` */
  static readonly AnswerQuestionPath = '/ragllm/answer';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `answerQuestion()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  answerQuestion$Response(params: AnswerQuestion$Params, context?: HttpContext): Observable<StrictHttpResponse<RagllmResponse>> {
    return answerQuestion(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `answerQuestion$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  answerQuestion(params: AnswerQuestion$Params, context?: HttpContext): Observable<RagllmResponse> {
    return this.answerQuestion$Response(params, context).pipe(
      map((r: StrictHttpResponse<RagllmResponse>): RagllmResponse => r.body)
    );
  }

}
