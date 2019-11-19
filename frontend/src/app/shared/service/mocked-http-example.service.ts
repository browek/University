import { LoginService } from './../../feature-modules/main-page/components/login-form/login.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockedHttpExampleService {

  constructor(private readonly http: HttpClient, private readonly loginService: LoginService) { }

  exampleSecuredHttpCall(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const headers = {
      'Authorization': `Bearer ${this.loginService.getAccessToken()}`
    };

    return this.http.post('http://localhost:8080/api/fileStorage', formData, { headers })
      .pipe(
        catchError(error => {
          console.error(error);

          return error;
        })
      );
  }
}
