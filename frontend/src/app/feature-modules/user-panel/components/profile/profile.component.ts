import { HttpClient } from '@angular/common/http';
import { User } from './../../../../shared/model/user/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileDetails$: Observable<User> = this.route.paramMap.pipe(
    switchMap(param => this.getProfileDetails(param.get('id'))),
    shareReplay(0)
  );

  constructor(
    private route: ActivatedRoute,
    public httpClient: HttpClient
  ) { }

  ngOnInit() {
  }

  getProfileDetails(id: string): Observable<User> {
    return this.httpClient.get<User>('http://localhost:8080/users/' + id);
  }

}
