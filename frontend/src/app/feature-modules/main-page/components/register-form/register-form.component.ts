import { RegisterService } from './register.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { IDialogService } from '../../service/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  hidingPassword = true;
  hidingRePassword = true;
  isPasswordWrong = false;
  errorMessage = '';

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RegisterFormComponent>,
    private registerService: RegisterService,
    private _snackBar: MatSnackBar,
    @Inject('IDialogService') private readonly dialogService: IDialogService
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      rePassword: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      surName: new FormControl(null, Validators.required),
      college: new FormControl(null, Validators.required),
      department: new FormControl(null, Validators.required),
      direction: new FormControl(null, Validators.required),
      role: new FormControl('STUDENT', Validators.required)
    });
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.registerForm.controls.password.value
      ===
      this.registerForm.controls.rePassword.value) {
      this.isPasswordWrong = false;
      const {
        firstName,
        surName,
        password,
        email,
        role,
        department,
        direction,
        college
      } = this.registerForm.controls;
      this.registerService
        .register(
          firstName.value,
          surName.value,
          password.value,
          email.value,
          role.value,
          department.value,
          direction.value,
          college.value
        )
        .subscribe(
          data => {
            console.log('success', data);
            // this.router.navigate(['/user-panel']);
            this.closeDialog();
            this.openSnackBar('Rejestracja przebiegła pomyślnie','');
          },
          error => {
            if (error.error.error === 'USER_ALREADY_EXISTS') {
              this.errorMessage = 'Użytkownik o podanym adresie e-mail już istnieje';
            } else {
              this.errorMessage = 'Wystąpił błąd: ' + error.error.error;
            }
          }
        );
    } else {
      this.isPasswordWrong = true;
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  openLoginDialog(): void {
    this.closeDialog();
    this.dialogService.openLoginDialog();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
