import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/services/base.service';
import { ChangeUsernameRequest } from '../models/change-username-request';
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private userServiceUrl: string = this.urlServiceV1 + "accounts/user";

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
}
