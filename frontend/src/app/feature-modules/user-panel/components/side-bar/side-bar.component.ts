import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/feature-modules/main-page/components/login-form/login.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  userID;

  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.userID = this.loginService.getUserDetails().id;
  }

}
