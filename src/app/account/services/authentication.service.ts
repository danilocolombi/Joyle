import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/services/base.service';
import { AuthenticationRequest } from '../models/authentication-request';
import { CustomResponse } from '../models/custom-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {

  private authenticationServiceUrl: string = this.urlServiceV1 + "accounts/authentication";

  constructor(private http: HttpClient) {
    super();
  }

  authenticate(request: AuthenticationRequest): Observable<CustomResponse> {
    let response = this.http.post<CustomResponse>(this.authenticationServiceUrl, request, this.GetJsonHeader())
    .pipe(catchError(this.serviceError));

    return response;
  }

}
