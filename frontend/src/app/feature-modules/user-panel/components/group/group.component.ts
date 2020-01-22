import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/feature-modules/main-page/components/login-form/login.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Groups } from 'src/app/shared/model/groups/groups-list';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  panelOpenState = false;
  accessToken = '123';
  // groupName = '';
  addGroupForm: FormGroup;
  router: Router;
  groupsList: Groups[];
  groupDetails: Groups;
  displayedColumns: string[] = ['name', 'owner', 'button'];

  constructor(
    private loginService: LoginService,
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.addGroupForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });

    this.accessToken = this.loginService.getAccessToken();

    this.resetGroups();

  }

  resetGroups() {
    this.getGroups().subscribe(
      data => {
        this.groupsList = data;
        console.log('data = ' + data);
        console.log(this.groupsList)
      },
        error => {
          console.log('error = ' + error);
        }
    );
  }

  getGroups(): Observable<Groups[]> {
    const headers = {
      'Authorization': `Bearer ${this.accessToken}`
    };
    return this.httpClient.get<Groups[]>('http://localhost:8080/groups/own', { headers });
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

    getGroupDetails(id: string): Observable<Groups> {
      return this.httpClient.get<Groups>('http://localhost:8080/groups/' + id);
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
  }


