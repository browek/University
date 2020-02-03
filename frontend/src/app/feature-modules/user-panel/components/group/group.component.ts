import { User } from './../../../../shared/model/user/user';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/feature-modules/main-page/components/login-form/login.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Group } from 'src/app/shared/model/groups/group';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource: MatTableDataSource<Group>;

  panelOpenState = false;
  accessToken = '123';
  addGroupForm: FormGroup;
  router: Router;
  groupsList: Group[];
  groupDetails: Group;
  displayedColumns: string[] = ['name', 'owner', 'button'];
  membershipGroupsList;

  constructor(
    private loginService: LoginService,
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar,
  ) {
    this.dataSource = new MatTableDataSource(this.groupsList);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.addGroupForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });

    this.accessToken = this.loginService.getAccessToken();

    this.resetGroups();
  }

  resetGroups() {
    this.getOwnGroups().subscribe(
      data => {
        this.groupsList = data;
        console.log('data = ' + this.groupsList);
        this.dataSource = new MatTableDataSource(this.groupsList);
      },
        error => {
          console.log('error = ' + error);
        }
    );
    this.getMembershipGroups(this.loginService.getUserDetails().id).subscribe(
      data => {
        this.membershipGroupsList = data;
      },
        error => {
          console.log('error = ' + error);
        }
    );
  }

  getOwnGroups(): Observable<Group[]> {
    const headers = {
      'Authorization': `Bearer ${this.accessToken}`
    };
    return this.httpClient.get<Group[]>('http://localhost:8080/groups/own', { headers });
  }

  getMembershipGroups(id): Observable<User> {
    return this.httpClient.get<User>('http://localhost:8080/users/' + id);
  }

  addGroup() {
    const body = {
      'name': `${this.addGroupForm.controls.name.value}`
    };
    const headers = {
      'Authorization': `Bearer ${this.accessToken}`
    };

      return this.httpClient.post('http://localhost:8080/groups', body, { headers }).subscribe(
        data => {
          console.log('data = ' + data);
          this.openSnackBar('Dodano grupę', this.addGroupForm.controls.name.value);
          this.addGroupForm.reset();
          this.resetGroups();
        },
          error => {
            console.log('error = ' + error);
          }
      );
    }

    getGroupDetails(id: string): Observable<Group> {
      return this.httpClient.get<Group>('http://localhost:8080/groups/' + id);
    }

    setGroupDetails(id: string) {
      this.getGroupDetails(id).subscribe(
        data => {
          this.groupDetails = data;
          console.log('data = ' + this.groupDetails.id);
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

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

