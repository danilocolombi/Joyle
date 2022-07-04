import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { LocalStorageUtils } from '../utils/localstorage';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {

  protected urlServiceV1: string = environment.apiUrlv1;
  public LocalStorage = new LocalStorageUtils();

  constructor() { }

  protected serviceError(response: Response | any) {
    if (response instanceof HttpErrorResponse) {
        if (response.statusText === "Unknown Error") 
            return throwError("There was an error, please try again later");
    }
    if (response.status === 500) 
        return throwError("There was an error handling your request");
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
