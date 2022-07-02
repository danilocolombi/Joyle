import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/services/base.service';
import { AuthenticationRequest } from '../models/authentication-request';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {

  private authenticationServiceUrl: string = this.urlServiceV1 + "accounts/authentication";

  constructor(private http: HttpClient) {
    super();
  }

  authenticate(request: AuthenticationRequest): Observable<unknown> {
    let response = this.http.post(this.authenticationServiceUrl, request, this.GetJsonHeader())
    .pipe(catchError(this.serviceError));

    return response;
  }
}
