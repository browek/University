import { User } from './../../../../shared/model/user/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './../../../main-page/components/login-form/login.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Group } from 'src/app/shared/model/groups/group';
import { MatSnackBar, MatPaginator, MatSort, MatTableDataSource, MatTable } from '@angular/material';
import { switchMap, shareReplay, map } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';



@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  groupDetails: Group = <any> { users: [] };
  displayedColumns: string[] = ['name', 'college', 'department', 'subject', 'email', 'button'];
  addUserForm: FormGroup;
  postForm: FormGroup;
  commentForm: FormGroup;
  accessToken = '123';
  groupID;
  postText = '';
  postsArray;
  usersList: User[] = [];
  groupDetails$: Observable<Group> = this.route.paramMap.pipe(
    switchMap(param => this.getGroupDetails(param.get('id'))),
    shareReplay(0)
  );

  usersList$: Observable<User[]> = this.groupDetails$.pipe(
    switchMap(groupDetails => {
      return this.getUsersList()
        .pipe(
          map(usersList => usersList.filter(user => groupDetails.users.findIndex(el => el.id === user.id) === -1)),
        );
    })
  );

  usersDataSource: MatTableDataSource<User> = new MatTableDataSource([]);
  usersDataSource2: MatTableDataSource<User> = new MatTableDataSource([]);

  usersListFilter: FormControl = new FormControl();
  usersListFilter2: FormControl = new FormControl();

  

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
  ) {
   }

  ngOnInit() {
    this.accessToken = this.loginService.getAccessToken();
    this.addUserForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
    this.postForm = new FormGroup({
      subject: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      text: new FormControl('', Validators.required),
    });
    this.commentForm = new FormGroup({
      comment: new FormControl('', Validators.required),
    });

    this.route.paramMap.subscribe((param: Params) => {
      this.groupID = param.get('id');
      console.log(this.groupDetails.id);
    });

    this.usersList$.subscribe(users => this.usersDataSource = new MatTableDataSource(users));

    this.usersListFilter.valueChanges.subscribe(val => {
      this.usersDataSource.filter = val;
    });

    this.groupDetails$.subscribe(group => this.usersDataSource2 = new MatTableDataSource(group.users));

    this.usersListFilter2.valueChanges.subscribe(val => {
      this.usersDataSource2.filter = val;
    });
    this.getPosts();
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
        console.log(this.groupDetails.users);
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

    sendPost() {
      const body = {
        'title': `${this.postForm.controls.subject.value}`,
        'content': `${this.postForm.controls.text.value}`,
        'groupId': `${this.groupID}`
      };
      const headers = {
        'Authorization': `Bearer ${this.accessToken}`
      };
      console.log(this.postForm.controls.text.value);
      if (this.postForm.valid) {
        return this.httpClient.post('http://localhost:8080/posts', body, { headers }).subscribe(
          data => {
            this.openSnackBar('Dodano post', this.postForm.controls.subject.value);
            this.getPosts();
            this.postForm.reset();
          },
            error => {
              console.log('error = ' + error);
            }
        );
      }
    }

    getPosts() {
      const headers = {
        'Authorization': `Bearer ${this.accessToken}`
      };
      return this.httpClient.get('http://localhost:8080/group/' + this.groupID + '/posts', { headers }).subscribe(
        data => {
          this.postsArray = data;
          console.log(data[0]);
        },
          error => {
            console.log('error = ' + error);
          }
      );
    }

    sendComment(content, postID) {
      const body = {
        'content': `${content}`,
        'postId': `${postID}`
      };
      const headers = {
        'Authorization': `Bearer ${this.accessToken}`
      };
      console.log(this.postForm.controls.text.value);
      if (this.postForm.valid) {
        return this.httpClient.post('http://localhost:8080/posts', body, { headers }).subscribe(
          data => {
            this.getPosts();
            this.commentForm.reset();
          },
            error => {
              console.log('error = ' + error);
            }
        );
      }
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
