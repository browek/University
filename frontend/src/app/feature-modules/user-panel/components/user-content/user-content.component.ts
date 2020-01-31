import { Router } from '@angular/router';
import { LoginService } from 'src/app/feature-modules/main-page/components/login-form/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.scss']
})
export class UserContentComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    public router: Router,
  ) { }

  ngOnInit() {
    // const id = this.loginService.getUserDetails().id;
    // console.log('user id = ' + id);
    // this.router.navigate(['profile', id]);
  }


}
