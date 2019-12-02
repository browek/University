import { Router } from '@angular/router';
import { LoginService } from './../../../main-page/components/login-form/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  logout () {
    this.loginService.logOut();
    this.router.navigate(['/home']);
  }
}
