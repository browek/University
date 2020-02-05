import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/feature-modules/main-page/components/login-form/login.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  addFileForm: FormGroup;
  accessToken = this.loginService.getAccessToken();
  uploader: FileUploader;
  file;
  filesArray;



  constructor(
    private loginService: LoginService,
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar,

  ) {  }

  ngOnInit() {
    this.addFileForm = new FormGroup({
      file: new FormControl(null, Validators.required),
    });

    this.accessToken = this.loginService.getAccessToken();
    this.resetFiles();
  }

  addFile() {
    const formData: FormData = new FormData();
    formData.append('file', this.file);

    const headers = {
      'Authorization': `Bearer ${this.accessToken}`
    };
      return this.httpClient.post('http://localhost:8080/files', formData, { headers }).subscribe(
        data => {
          this.openSnackBar('Dodano plik', '');
          this.addFileForm.reset();
          this.resetFiles();
        },
          error => {
            console.log('error = ' + error);
          }
      );
    }

    resetFiles() {
      const id = this.loginService.getUserDetails().id;
      this.getFiles(id);
    }

    getFiles(id) {
      const headers = {
        'Authorization': `Bearer ${this.accessToken}`
      };
      return this.httpClient.get<any>('http://localhost:8080/user/' + id + '/files', { headers }).subscribe(
        data => {
          this.filesArray = data;
        },
          error => {
            console.log('error = ' + error);
          }
      );
    }
    onFileSelect(event): void {
      if (event.target.files.length > 0) {
        this.file = event.target.files[0];
      } else {
        this.file = undefined;
      }
    }



    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 3000,
      });
    }

}
