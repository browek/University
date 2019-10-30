import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterFormComponent } from '../register-form/register-form.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  hide = true;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public registerDialogRef: MatDialogRef<RegisterFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}



  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openRegisterDialog(): void {
    this.dialogRef.close();
    const registerDialogRef = this.dialog.open(RegisterFormComponent, {
      height: '600px',
      width: '400px',
      data: {}
    });
  }
}
