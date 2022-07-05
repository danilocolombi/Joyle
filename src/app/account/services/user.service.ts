import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private userServiceUrl: string = this.urlServiceV1 + "accounts/user";

  constructor(private http: HttpClient) {
    super();
   }
}
