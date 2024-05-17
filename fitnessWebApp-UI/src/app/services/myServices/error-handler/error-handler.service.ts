import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor() { }

  handleError(error: any) {
    let info: Array<string>  = [];
    if (error.error.validationErrors) {
      info.push(error.error.validationErrors);
    }
    if (error.error.businessErrorCode >= 300) {
      info.push(error.error.businessErrorDescription);
    }
    if(!info.length) {
    return ["Qualcosa è andato storto, riprova più tardi"];
    }
    return info;
  }
}
