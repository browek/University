import { FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { LoginFormComponent } from '../login-form/login-form.component';
import { IDialogService } from '../../service/dialog.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RegisterFormComponent>,
    @Inject('IDialogService') private readonly dialogService: IDialogService
    ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({

    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openLoginDialog(): void {
    this.closeDialog();
    this.dialogService.openLoginDialog();
  }
}
