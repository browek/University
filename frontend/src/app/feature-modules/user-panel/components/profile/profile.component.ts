import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/feature-modules/main-page/components/login-form/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userDetails = '';

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
    setTimeout(() => {this.getDetails(); } , 100);
  }

  getDetails() {
    this.userDetails = this.loginService.getUserDetails();
  }

}
