import { HttpClient } from '@angular/common/http';
import { User } from './../../../../shared/model/user/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';
import { LoginService } from 'src/app/feature-modules/main-page/components/login-form/login.service';
import { FilesService } from 'src/app/shared/service/files.service';
import { UserService } from 'src/app/shared/service/users.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { Files } from 'src/app/shared/model/file/files';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  id;
  accessToken = this.loginService.getAccessToken();
  filesArray;
  filesArray$ = this.route.paramMap.pipe(
    switchMap(param => this.getFiles(param.get('id'))),
    shareReplay(0)
  );
  filesArrayTable: MatTableDataSource<Files> = new MatTableDataSource([]);
  filesArrayFilter: FormControl = new FormControl();
  displayedColumns: string[] = ['name', 'creationDate'];

  profileDetails$: Observable<User> = this.route.paramMap.pipe(
    switchMap(param => this.getProfileDetails(param.get('id'))),
    shareReplay(0)
  );
  postsArray;
  postText = '';
  postForm: FormGroup;
  commentForm: FormGroup;

  // postsArray$ = this.getPosts().pipe(
  //   shareReplay(0)
  // );
  postsArray$ = this.route.paramMap.pipe(
    switchMap(param => this.getPosts(param.get('id'))),
    shareReplay(0)
  );



  constructor(
    private route: ActivatedRoute,
    public httpClient: HttpClient,
    private loginService: LoginService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((param: Params) => {
      this.id = param.get('id');
    });
    this.filesArray$.subscribe(files => {
      this.filesArrayTable = new MatTableDataSource(files);
      setTimeout(() => {
        this.filesArrayTable.sort = this.sort;
        this.filesArrayTable.paginator = this.paginator;
      });
    });

    this.filesArrayFilter.valueChanges.subscribe(val => {
      this.filesArrayTable.filter = val;
    });
    this.postForm = new FormGroup({
      subject: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      text: new FormControl('', Validators.required),
    });
    this.commentForm = new FormGroup({
      comment: new FormControl('', Validators.required),
    });
   }

   getProfileDetails(id: string): Observable<User> {
    return this.httpClient.get<User>('http://localhost:8080/users/' + id);
  }

  getFiles(id) {
    const headers = {
      'Authorization': `Bearer ${this.accessToken}`
    };
    return this.httpClient.get<Files[]>('http://localhost:8080/user/' + id + '/files', { headers });
  }

  sendPost() {
    const body = {
      'title': `${this.postForm.controls.subject.value}`,
      'content': `${this.postForm.controls.text.value}`,
      // 'groupId': `${this.groupID}`
    };
    const headers = {
      'Authorization': `Bearer ${this.accessToken}`
    };
    console.log(this.postForm.controls.subject.value);
    console.log(this.postForm.controls.text.value);
    // console.log(this.groupID);
    console.log(this.accessToken);
    if (this.postForm.valid) {
      return this.httpClient.post('http://localhost:8080/posts', body, { headers }).subscribe(
        data => {
          this.openSnackBar('Dodano post', this.postForm.controls.subject.value);
          // this.getPosts();
          this.postForm.reset();
        },
          error => {
            console.log(error);
          }
      );
    }
  }

  sendComment(postID) {
    const body = {
      'content': `${this.commentForm.controls.comment.value}`,
      'postId': `${postID}`
    };
    const headers = {
      'Authorization': `Bearer ${this.accessToken}`
    };
    if (this.commentForm.valid) {
      return this.httpClient.post('http://localhost:8080/posts/comment', body, { headers }).subscribe(
        data => {
          console.log(body);
          // this.getPosts();
          this.commentForm.reset();
        },
          error => {
            console.log(error);
          }
      );
    }
  }

  getPosts(id) {
    const headers = {
      'Authorization': `Bearer ${this.accessToken}`
    };
    return this.httpClient.get('http://localhost:8080/user/' + id + '/posts', { headers });
    // .subscribe(
    //   data => {
    //     this.postsArray = data;
    //     console.log(data[0]);
    //   },
    //     error => {
    //       console.log(error);
    //     }
    // );
  }

  isTeacher() {
    return this.loginService.isTeacher();
  }

  isOwner() {
    if (this.id === this.loginService.getUserDetails().id) {
      return true;
    } else {
      return false;
    }
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      height: '650px',
      width: '400px',
      data: { }
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
