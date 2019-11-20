import { MockedHttpExampleService } from './../../../../shared/service/mocked-http-example.service';
import { LoginService, LoginResponseDto } from './login.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogService } from '../../service/dialog.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    private loginService : LoginService,
    @Inject('IDialogService') private readonly dialogService: IDialogService
    ) {
    }



  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openRegisterDialog(): void {
    this.closeDialog();
    this.dialogService.openRegisterDialog();
  }

  onSubmit() {
    const { email, password } = this.loginForm.controls;
    this.loginService.login(email.value, password.value)
      .subscribe();
  }
}
