import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/feature-modules/main-page/components/login-form/login.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  addFileForm: FormGroup;
  accessToken = '123';

  constructor(
    private loginService: LoginService,
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.addFileForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
    this.accessToken = this.loginService.getAccessToken();
  }

  addFile() {
    const body = {
      'file': `${this.addFileForm.controls.name.value}`
    };
    const headers = {
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type' : `application/x-www-form-urlencoded`
    };

      return this.httpClient.post('http://localhost:8080/files', body, { headers }).subscribe(
        data => {
          this.openSnackBar('Dodano plik', this.addFileForm.controls.name.value);
          this.addFileForm.reset();
          this.resetAddFile();
        },
          error => {
            console.log('error = ' + error);
          }
      );
    }
    resetAddFile() {

    }

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 3000,
      });
    }

}
