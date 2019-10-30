import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RegisterFormComponent>
    ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openLoginDialog(): void {
    this.dialogRef.close();
    const loginDialogRef = this.dialog.open(LoginFormComponent, {
      height: '600px',
      width: '400px',
      data: {}
    });
  }
}
