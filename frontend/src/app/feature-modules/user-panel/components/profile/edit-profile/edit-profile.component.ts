import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { IDialogService } from 'src/app/feature-modules/main-page/service/dialog.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/model/user/user';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/feature-modules/main-page/components/login-form/login.service';
import { shareReplay } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  profileDetails$: Observable<User> = this.getProfileDetails(this.loginService.getUserDetails().id).pipe(
    shareReplay(0)
  );
  accessToken = this.loginService.getAccessToken();
  editProfileForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject('IDialogService') private readonly dialogService: IDialogService,
    public httpClient: HttpClient,
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.accessToken = this.loginService.getAccessToken();
    this.editProfileForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null, Validators.email),
      subject: new FormControl(null),
      department: new FormControl(null),
      college: new FormControl(null),
    });
  }

  editProfile() {
    console.log('update');
    const body = {
      'firstName': this.editProfileForm.controls.firstName.value,
      'lastName': this.editProfileForm.controls.lastName.value,
      'email': this.editProfileForm.controls.email.value,
      'subject': this.editProfileForm.controls.subject.value,
      'department': this.editProfileForm.controls.department.value,
      'college': this.editProfileForm.controls.college.value,
    };
    const headers = {
      'Authorization': `Bearer ${this.accessToken}`
    };
    return this.httpClient.put('http://localhost:8080/users/update', body, { headers }).subscribe(
      data => {
        this.openSnackBar('Pomyślnie zmieniono dane', 'Sukces');
        this.closeDialog();
        window.location.reload();
      },
        error => {
          console.log('error = ' + error);
        }
    );
  }

  getProfileDetails(id: string): Observable<User> {
    return this.httpClient.get<User>('http://localhost:8080/users/' + id);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
