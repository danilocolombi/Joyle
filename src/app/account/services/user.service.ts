import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/services/base.service';
import { ChangeUserPasswordRequest } from '../models/change-user-password-request';
import { ChangeUsernameRequest } from '../models/change-username-request';
import { RenameUserRequest } from '../models/rename-user-request';
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private userServiceUrl: string = this.urlServiceV1 + "accounts/users";

  constructor(private http: HttpClient) {
    super();
   }

   changeUsername(request: ChangeUsernameRequest): Observable<unknown>{
    let response = this.http.patch(
      `${this.userServiceUrl}/username`,
      request,
      this.GetAuthHeaderJson())
      .pipe(catchError(this.serviceError))     
      
    return response;
  }

  rename(request: RenameUserRequest): Observable<unknown>{
    let response = this.http.patch(
      `${this.userServiceUrl}/name`,
      request,
      this.GetAuthHeaderJson())
      .pipe(catchError(this.serviceError))     
      
    return response;
  }

  changeUserPassword(request: ChangeUserPasswordRequest): Observable<unknown>{
    let response = this.http.patch(
      `${this.userServiceUrl}/password`,
      request,
      this.GetAuthHeaderJson())
      .pipe(catchError(this.serviceError))     
      
    return response;
  }

  inactivate(): Observable<unknown>{
    let response = this.http.post(
      `${this.userServiceUrl}/inactivation`, null, this.GetAuthHeaderJson())
      .pipe(catchError(this.serviceError))     
      
    return response;
  }
}
