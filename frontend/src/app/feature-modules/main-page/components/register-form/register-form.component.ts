import { RegisterService } from './register.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
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
  isPasswordWrong = false;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RegisterFormComponent>,
    private registerService: RegisterService,
    @Inject('IDialogService') private readonly dialogService: IDialogService
  ) {}

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
    console.log(this.registerForm);
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
      .subscribe();
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
  wrongPassword() {

  }
}
