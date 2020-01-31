import { User } from './../../../../shared/model/user/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './../../../main-page/components/login-form/login.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, of, zip } from 'rxjs';
import { Group } from 'src/app/shared/model/groups/group';
import { MatSnackBar } from '@angular/material';
import { switchMap, shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {

  groupDetails: Group = <any> { users: [] };
  displayedColumns: string[] = ['name', 'college', 'department', 'subject', 'email', 'button'];
  addUserForm: FormGroup;
  accessToken = '123';
  groupID;
  usersList: User[] = [];
  groupDetails$: Observable<Group> = this.route.paramMap.pipe(
    switchMap(param => this.getGroupDetails(param.get('id'))),
    shareReplay(0)
  );

  usersList$: Observable<User[]> = zip([this.groupDetails$, this.getUsersList()])
    .pipe(
      tap(console.log),
      switchMap(([group, users]: [Group, User[]]): User[] => {
        debugger
        const userList: User[] = users.filter(el => group.users.findIndex(k => k.id === el.id) === -1);
        
        return userList;
      }),
      tap(console.log)
    );

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.accessToken = this.loginService.getAccessToken();

    this.addUserForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });

    this.route.paramMap.subscribe((param: Params) => {
      this.groupID = param.get('id');
      console.log(this.groupDetails.id);
    });
  }

  getGroupDetails(id: string): Observable<Group> {
    return this.httpClient.get<Group>('http://localhost:8080/groups/' + id);
  }

  getUsersList(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:8080/users/list');
  }

  setUsersList() {
    this.getUsersList().subscribe(
      data => {
        this.usersList = data;
      },
        error => {
          console.log('error = ' + error);
        }
    );
  }

   setGroupDetails(id: string) {
    this.getGroupDetails(id).subscribe(
      data => {
        this.groupDetails = data;
      },
        error => {
          console.log('error = ' + error);
        }
    );
  }

  addUser(id) {
    const body = {
      'usersUUID': [ `${id}` ]
    };
    const headers = {
      'Authorization': `Bearer ${this.accessToken}`
    };

      return this.httpClient.post('http://localhost:8080/groups/' + this.groupID + '/addUsers', body, { headers }).subscribe(
        data => {
          console.log('data = ' + data);
          this.openSnackBar('Dodano do grupy', this.addUserForm.controls.name.value);
          this.setGroupDetails(this.groupID);
        },
          error => {
            console.log('error = ' + error);
          }
      );
    }

  isTeacher() {
    return this.loginService.isTeacher();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}

