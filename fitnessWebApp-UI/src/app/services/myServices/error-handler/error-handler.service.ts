import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor() { }

  handleError(error: any): Array<{code:number, message:string}>{
  let info : Array<{code:number, message:string}> = [];
    if (error.error.validationErrors) {
      error.error.validationErrors.forEach((value: any) => {
        info.push({code: error.error, message: value});
      });
    }
    if (error.error.businessErrorCode >= 300) {
      info.push({code:error.error.businessErrorCode, message:error.error.businessErrorDescription});
    }
    if (info.length === 0) {
      info.push({code:500, message:"Errore sconosciuto"});
    }
    return info;
  }
}
