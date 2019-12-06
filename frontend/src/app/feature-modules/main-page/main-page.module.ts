import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
  MatButtonModule,
  MatRadioModule
} from '@angular/material';
import {
  LoginFormComponent,
  RegisterFormComponent,
  NavBarComponent,
  HomeComponent,
  ContentComponent,
  FooterComponent
} from './components';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';


@NgModule({
  declarations: [
    LoginFormComponent,
    HomeComponent,
    ContentComponent,
    FooterComponent,
    NavBarComponent,
    RegisterFormComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule
  ],
  entryComponents: [
    LoginFormComponent,
    RegisterFormComponent,
    ResetPasswordComponent
  ],
  providers: [
    {provide: 'IDialogService', useClass: DialogService}
  ]
})
export class MainPageModule { }
