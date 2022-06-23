import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {

  protected urlServiceV1: string = environment.apiUrlv1;
  
  constructor() { }

  protected serviceError(response: Response | any) {
    if (response instanceof HttpErrorResponse) {
        if (response.statusText === "Unknown Error") 
            return throwError("Ocorreu um erro. Tente novamente mais tarde");
    }
    if (response.status === 500) 
        return throwError("Ocorreu um erro no processamento, tente novamente mais tarde ou contate o nosso suporte.");
    else
      return throwError(response.error.errors);
  } 

  protected GetJsonHeader() {
    return {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
  }
}
