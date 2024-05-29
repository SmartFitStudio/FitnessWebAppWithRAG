/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DietBase } from '../../models/diet-base';
import { PianoAlimentareRag } from '../../models/piano-alimentare-rag';

export interface GenerateDiet$Params {
      body: DietBase
}

export function generateDiet(http: HttpClient, rootUrl: string, params: GenerateDiet$Params, context?: HttpContext): Observable<StrictHttpResponse<PianoAlimentareRag>> {
  const rb = new RequestBuilder(rootUrl, generateDiet.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PianoAlimentareRag>;
    })
  );
}

generateDiet.PATH = '/ragllm/generateDiet';
