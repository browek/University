import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LoginResponseDto {
    access_token: string;
    token_type: 'bearer';
    refresh_token: string;
    scope: string;
}

const ACCESS_TOKEN_KEY = 'access_token';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login (email: string, password: string): Observable<LoginResponseDto> {
    const body = new HttpParams()
      .set('username', email)
      .set('password', password)
      .set('grant_type', 'password');

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${window.btoa('Cl13nTi@#$d:cl1eNt$$3cR3t')}`
    };

    return this.httpClient.post<LoginResponseDto>('http://localhost:8080/oauth/token', body, { headers })
      .pipe(
        tap(this.storeAuthentication)
      );
  }

  private storeAuthentication = (loginResponse: LoginResponseDto): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, loginResponse.access_token);
  }

  logOut(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  isAuthorized(): boolean {
    return !!this.getAccessToken();
  }
}
