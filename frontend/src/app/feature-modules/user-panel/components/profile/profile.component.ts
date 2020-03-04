import { HttpClient } from '@angular/common/http';
import { User } from './../../../../shared/model/user/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';
import { LoginService } from 'src/app/feature-modules/main-page/components/login-form/login.service';
import { FilesService } from 'src/app/shared/service/files.service';
import { UserService } from 'src/app/shared/service/users.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Files } from 'src/app/shared/model/file/files';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(
    private route: ActivatedRoute,
    public httpClient: HttpClient,
    private loginService: LoginService,
    public dialog: MatDialog
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
      data: {

      }
    });
  }
}
