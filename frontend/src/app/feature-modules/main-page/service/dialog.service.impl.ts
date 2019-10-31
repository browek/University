import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RegisterFormComponent } from '../components/register-form/register-form.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { IDialogService } from './dialog.service';

@Injectable()
export class DialogService implements IDialogService {

  constructor(private dialog: MatDialog) { }

  openRegisterDialog() {
    this.dialog.open(RegisterFormComponent, {
      width: '450px'
    });
  }

  openLoginDialog() {
    this.dialog.open(LoginFormComponent, {
      width: '450px',
      data: {}
    });
  }
}
