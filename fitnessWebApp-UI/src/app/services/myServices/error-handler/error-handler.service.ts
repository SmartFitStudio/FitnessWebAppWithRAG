import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor() { }

  handleError(error: any) {
    if (error.error.validationErrors) {
      return error.error.validationErrors;
    }
    if (error.error.businessErrorCode >= 300) {
      return [error.error.businessErrorDescription];
    }
    return ["Qualcosa è andato storto, riprova più tardi"];
  }
}
