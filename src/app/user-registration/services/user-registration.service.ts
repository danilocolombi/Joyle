import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';
import { RegisterNewUserRequest } from '../models/register-new-user-request';
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService extends BaseService {

  constructor(private http: HttpClient) {
    super();
   }

   private userRegistrationserviceUrl: string = this.urlServiceV1 + "accounts/user-registrations";

  register(request: RegisterNewUserRequest): Observable<unknown>{
    let response = this.http.post(this.userRegistrationserviceUrl, request,
      this.GetJsonHeader())
      .pipe(catchError(this.serviceError));

    return response;
  }

  confirmRegistration(id: string): Observable<unknown>{
    let response = this.http.post(`${this.userRegistrationserviceUrl}/${id}`,
      this.GetJsonHeader())
      .pipe(catchError(this.serviceError));

    return response;
  }
}
