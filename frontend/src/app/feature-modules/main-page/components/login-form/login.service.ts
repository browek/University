import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

export interface LoginResponseDto {
    access_token: string;
    token_type: 'bearer';
    refresh_token: string;
    scope: string;
}

export interface DetailsResponseDto {
  id: string;
  createdOn: string;
  modifiedOn: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  department: string;
  college: boolean;
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  username: string;
  authorities: [
      {
          authority: string;
      },
  ];
}

const ACCESS_TOKEN_KEY = 'access_token';
const USER_DATA_KEY = 'user_data';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login (email: string, password: string): Observable<DetailsResponseDto> {
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
        tap(this.storeAuthentication),
        switchMap((loginResponse: LoginResponseDto) => this.getDetails(loginResponse.access_token))
      );
  }

  private getDetails = (accessToken: string): Observable<DetailsResponseDto> => {
    const headers = {
      'Authorization': `Bearer ${accessToken}`
    };

    return this.httpClient.get<DetailsResponseDto>('http://localhost:8080/users', { headers })
    .pipe(
      tap(this.storeDetails)
    );
  }

  private storeAuthentication = (loginResponse: LoginResponseDto): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, loginResponse.access_token);
  }

  private storeDetails = (detailsResponse: DetailsResponseDto): void => {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(detailsResponse));
  }

  logOut(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  }

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getUserDetails() {
    return JSON.parse(localStorage.getItem(USER_DATA_KEY));
  }

  isAuthorized(): boolean {
    return !!this.getAccessToken();
  }

  isStudent(): boolean {
    return !!this.getUserAuthorities().find(element => element.authority === 'STUDENT');
  }

  isTeacher(): boolean {
    return !!this.getUserAuthorities().find(element => element.authority === 'TEACHER');
  }

  getUserAuthorities(): { authority: string }[] {
    const userData: DetailsResponseDto = JSON.parse(localStorage.getItem(USER_DATA_KEY));
    return !!userData ? userData.authorities : [];
  }


}
