import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  hidingPassword = true;
  hidingRePassword = true;


  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RegisterFormComponent>,
    @Inject('IDialogService') private readonly dialogService: IDialogService
    ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      rePassword: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      surName: new FormControl(null, Validators.required),
      college: new FormControl(null, Validators.required),
      department: new FormControl(null, Validators.required),
      direction: new FormControl(null, Validators.required),
      role: new FormControl(true, Validators.required)
    });
  }

  onSubmit() {
    console.log(this.registerForm);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openLoginDialog(): void {
    this.closeDialog();
    this.dialogService.openLoginDialog();
  }
}
