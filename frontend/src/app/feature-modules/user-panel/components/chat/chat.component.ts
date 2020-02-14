import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/user/user';
import { Observable } from 'rxjs';
import { switchMap, shareReplay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/feature-modules/main-page/components/login-form/login.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  users;
  usersList;

  users$ = this.getUsersList().pipe(
    map(users => {
      const loginID = this.loginService.getUserDetails().id;
       return users.filter(user => user.id !== loginID);
    }),
    shareReplay(0)
  );
  loginID = this.loginService.getUserDetails().id;



  constructor(public httpClient: HttpClient, private route: ActivatedRoute, public loginService: LoginService) { }

  ngOnInit() {
  }

  getUsersList(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:8080/users/list');
  }
}
