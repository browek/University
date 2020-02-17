import { LoginService } from './../../feature-modules/main-page/components/login-form/login.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../model/user/user';
import { Files } from '../model/file/files';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private readonly httpClient: HttpClient, private readonly loginService: LoginService) { }
  accessToken = this.loginService.getAccessToken();

  getFiles(id) {
    const headers = {
      'Authorization': `Bearer ${this.accessToken}`
    };
    return this.httpClient.get<Files[]>('http://localhost:8080/user/' + id + '/files', { headers });
  }
}
