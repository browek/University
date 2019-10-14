import { LoginFormComponent } from '../login-form/login-form.component';

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {


  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginFormComponent, {
      height: '600px',
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
