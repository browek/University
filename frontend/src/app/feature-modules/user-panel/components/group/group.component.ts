import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/feature-modules/main-page/components/login-form/login.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  panelOpenState = false;
  accessToken = '123';
  groupName = '';
  addGroupForm: FormGroup;
  router: Router;


  constructor(
    private loginService: LoginService,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.accessToken = this.loginService.getAccessToken();
    console.log('token' + this.accessToken);

    this.addGroupForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
  }

  isTeacher() {
    return this.loginService.isTeacher();
  }

  addGroup() {
    console.log(this.addGroupForm.controls.name.value);
      const body = {
        'name': `${this.addGroupForm.controls.name.value}`
      };
      const headers = {
        'Authorization': `Bearer ${this.accessToken}`
      };
      console.log(body);
      return this.httpClient.post('http://localhost:8080/groups', body, { headers }).subscribe(
        data => {
          console.log('data = ' + data);
        },
          error => {
            console.log('error = ' + error);
          }
      );
    }
}

