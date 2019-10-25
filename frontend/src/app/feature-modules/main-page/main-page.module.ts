import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HomeComponent } from './components/home/home.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    LoginFormComponent,
    HomeComponent,
    ContentComponent,
    FooterComponent,
    NavBarComponent
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
    LoginFormComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class MainPageModule { }
