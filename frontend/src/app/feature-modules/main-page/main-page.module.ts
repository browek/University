import { DialogService } from './service/dialog.service.impl';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageRoutingModule } from './main-page-routing.module';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import {
  LoginFormComponent,
  RegisterFormComponent,
  NavBarComponent,
  HomeComponent,
  ContentComponent,
  FooterComponent
} from './components';


@NgModule({
  declarations: [
    LoginFormComponent,
    HomeComponent,
    ContentComponent,
    FooterComponent,
    NavBarComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  entryComponents: [
    LoginFormComponent,
    RegisterFormComponent
  ],
  providers: [
    {provide: 'IDialogService', useClass: DialogService}
  ]
})
export class MainPageModule { }
