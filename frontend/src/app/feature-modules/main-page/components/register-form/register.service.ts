import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private httpClient: HttpClient
  ) { }

  register(firstName, lastName, password, email, role, department, subject, college) {
   const body = {
    firstName,
    lastName,
    password,
    email,
    role,
    department,
    subject,
    college
   };

  return this.httpClient.post('http://localhost:8080/users/registration', body);

  }
}
