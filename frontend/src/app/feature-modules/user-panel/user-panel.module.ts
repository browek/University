import { UserPanelRoutingModule } from './user-panel-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { UserContentComponent } from './components/user-content/user-content.component';


@NgModule({
  declarations: [
    ProfileComponent,
    SideBarComponent,
    HeaderComponent,
    UserContentComponent
  ],
  imports: [
    CommonModule,
    UserPanelRoutingModule
  ]
})
export class UserPanelModule { }
