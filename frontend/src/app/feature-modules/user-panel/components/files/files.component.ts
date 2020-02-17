import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/feature-modules/main-page/components/login-form/login.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatTableDataSource, MatSort } from '@angular/material';
import { FileUploader } from 'ng2-file-upload';
import { Files } from 'src/app/shared/model/file/files';
import { shareReplay, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  id = this.loginService.getUserDetails().id;
  addFileForm: FormGroup;
  accessToken = this.loginService.getAccessToken();
  uploader: FileUploader;
  file;
  filesArray;
  filesArrayTable: MatTableDataSource<Files> = new MatTableDataSource([]);
  filesArrayFilter: FormControl = new FormControl();
  displayedColumns: string[] = ['name', 'creationDate'];
  filesArray$ = this.getFiles(this.id).pipe(
    shareReplay(0)
  );


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

    this.filesArray$.subscribe(files => {
      this.filesArrayTable = new MatTableDataSource(files);
      setTimeout(() => {
        this.filesArrayTable.sort = this.sort;
      });
    });

    this.filesArrayFilter.valueChanges.subscribe(val => {
      this.filesArrayTable.filter = val;
    });
  }

  addFile() {
    const formData: FormData = new FormData();
    formData.append('file', this.file);

    const headers = {
      'Authorization': `Bearer ${this.accessToken}`
    };
      return this.httpClient.post('http://localhost:8080/files', formData, { headers }).subscribe(
        data => {
          this.setFiles(this.id);
            this.addFileForm.reset();
            this.openSnackBar('Dodano plik', '');
        },
          error => {
            console.log('error = ' + error);
          }
      );
    }


    getFiles(id) {
      const headers = {
        'Authorization': `Bearer ${this.accessToken}`
      };
      return this.httpClient.get<Files[]>('http://localhost:8080/user/' + id + '/files', { headers });
    }

    setFiles(id: string) {
      this.getFiles(id).subscribe(
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
