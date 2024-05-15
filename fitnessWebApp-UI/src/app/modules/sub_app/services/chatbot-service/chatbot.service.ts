import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { ApiConfiguration } from '../../../../services/api-configuration';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private static readonly ChatbotPath = '/chatbot';

  constructor(private config: ApiConfiguration, private http: HttpClient) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getAnswer(question: String): Observable<String> {
    const url = `${this.config.rootUrl+ChatbotService.ChatbotPath}/answer`;
    return this.http.post(url, question, { responseType: 'text' as const}).pipe(
      catchError(this.handleError<String>('getAnswer', "Qualcosa è andato storto..."))
            );
  }

}
