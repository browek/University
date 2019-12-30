import { SharedModule } from './../../shared/module/shared.module';
import { UserPanelRoutingModule } from './user-panel-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { UserContentComponent } from './components/user-content/user-content.component';
import { GroupComponent } from './components/group/group.component';


@NgModule({
  declarations: [
    ProfileComponent,
    SideBarComponent,
    HeaderComponent,
    UserContentComponent,
    GroupComponent
  ],
  imports: [
    CommonModule,
    UserPanelRoutingModule,
    SharedModule
  ]
})
export class UserPanelModule { }
