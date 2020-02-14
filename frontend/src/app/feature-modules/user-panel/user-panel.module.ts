import { SharedModule } from './../../shared/module/shared.module';
import { UserPanelRoutingModule } from './user-panel-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { UserContentComponent } from './components/user-content/user-content.component';
import { GroupComponent } from './components/group/group.component';
import { GroupDetailComponent } from './components/group-detail/group-detail.component';
import { FilesComponent } from './components/files/files.component';
import { FileUploadModule } from 'ng2-file-upload';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { OrderModule } from 'ngx-order-pipe';
import { ChatComponent } from './components/chat/chat.component';
import { ChatWindowComponent } from './components/chat/chat-window/chat-window.component';

@NgModule({
  declarations: [
    ProfileComponent,
    SideBarComponent,
    HeaderComponent,
    UserContentComponent,
    GroupComponent,
    GroupDetailComponent,
    FilesComponent,
    ChatComponent,
    ChatWindowComponent,

  ],
  imports: [
    CommonModule,
    UserPanelRoutingModule,
    SharedModule,
    FileUploadModule,
    AngularFileUploaderModule,
    OrderModule
  ]
})
export class UserPanelModule { }