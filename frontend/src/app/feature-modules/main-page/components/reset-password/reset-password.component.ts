import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginFormComponent } from '..';
import { IDialogService } from '../../service/dialog.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    // private loginService: LoginService,
    @Inject('IDialogService') private readonly dialogService: IDialogService
    ) { }

  ngOnInit() {
    this.resetForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openLoginDialog(): void {
    this.closeDialog();
    this.dialogService.openLoginDialog();
  }

  openRegisterDialog(): void {
    this.closeDialog();
    this.dialogService.openRegisterDialog();
  }
}
