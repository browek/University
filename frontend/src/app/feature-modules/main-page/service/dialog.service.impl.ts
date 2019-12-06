import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RegisterFormComponent } from '../components/register-form/register-form.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { IDialogService } from './dialog.service';
import { RemindPasswordComponent } from '../components/remind-password/remind-password.component';

@Injectable()
export class DialogService implements IDialogService {

  constructor(private dialog: MatDialog) { }

  openRegisterDialog() {
    this.dialog.open(RegisterFormComponent, {
      width: '500px'
    });
  }

  openLoginDialog() {
    this.dialog.open(LoginFormComponent, {
      width: '450px',
      data: {}
    });
  }

  openRemindDialog() {
    this.dialog.open(RemindPasswordComponent, {
      width: '450px',
      data: {}
    });
  }
}
}
