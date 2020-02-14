import { LoginService } from './../../feature-modules/main-page/components/login-form/login.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../model/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly httpClient: HttpClient, private readonly loginService: LoginService) { }
  accessToken = this.loginService.getAccessToken();

  getUsersList(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:8080/users/list');
  }
}
